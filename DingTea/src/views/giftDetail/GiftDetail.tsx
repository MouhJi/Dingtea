import React, {PureComponent} from 'react';
import {Alert, ScrollView} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {connect} from 'react-redux';
import MyI18n from 'utils/MyI18n';
import {RootState} from 'views/app/redux/App.Reducer';
import {giftDetailStyles} from './style/GiftDetail.Style';

import {MyView, MyViewShadow, MyButtonText, MyText, MyImage} from 'bases/components';
import {bindActionCreators} from 'redux';
import {getGiftDetail, IGiftDetailState, showFirstLoading, reset, showRefresh} from './redux';
import {IGiftModel} from 'models';
import Utilities from 'utils/Utilities';

interface defaultProps extends IGiftDetailState {
  showFirstLoading: typeof showFirstLoading;
  getGiftDetail: typeof getGiftDetail;
  reset: typeof reset;
  showRefresh: typeof showRefresh;

  route?: any;
}

class GiftDetail extends PureComponent<defaultProps> {
  gift: IGiftModel;
  constructor(props: defaultProps) {
    super(props);
    this.gift = this.props.route.params.gift;
  }
  // componentDidMount() {
  //   this.props.getGiftDetail(this.gift.id);
  // }
  componentWillUnmount() {
    this.props.reset();
  }

  reload = () => {
    this.props.showFirstLoading(true);
    // this.props.getGiftDetail(this.gift.id);
  };

  refresh = () => {
    this.props.showRefresh(true);
    // this.props.getGiftDetail(this.gift.id);
  };

  pressChangeGift = () => {
    Alert.alert('Đổi quà');
  };

  render() {
    return (
      <MyView style={giftDetailStyles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <ScrollView style={giftDetailStyles.container} showsVerticalScrollIndicator={false}>
            <MyViewShadow style={giftDetailStyles.contentList}>
              <MyText fontStyle="SemiBold" numberOfLines={2}>
                {'Son kem lì Black Rouge 200k'}
              </MyText>
              <MyImage
                width={giftDetailStyles.styleImage.width}
                height={giftDetailStyles.styleImage.height}
                style={giftDetailStyles.styleImage}
                source={Utilities.convertLinkImage(
                  'https://i.pinimg.com/564x/58/d3/bd/58d3bdc7e2a5302a4ba48d69eee7076f.jpg'
                )}
              />
              <MyText fontStyle="SemiBold" style={giftDetailStyles.txtPoint} numberOfLines={2}>
                20 {MyI18n.trans.point}
              </MyText>
              <MyView style={giftDetailStyles.itemSeparator} />
              <MyText fontStyle="Regular" style={giftDetailStyles.title}>
                Trà sữa trân châu đường đen là sự kết hợp hoàn hảo giữa vị ngọt đặc trưng của siro
                đường hổ quyện với vị ngậy béo của sữa tươi cùng trân châu dẻo dai uống rồi lại muốn
                thêm ly nữa.
              </MyText>
            </MyViewShadow>
          </ScrollView>
        </ScrollView>
        <SafeAreaView edges={['bottom']} style={giftDetailStyles.safeView}>
          <MyButtonText
            title={MyI18n.trans.redeem_gifts}
            style={giftDetailStyles.bottomButton}
            titleProps={{fontStyle: 'SemiBold'}}
            onPress={this.pressChangeGift}
          />
        </SafeAreaView>
      </MyView>
    );
  }
}
const mapStateToProps = (state: RootState) => {
  const {iso, theme} = state.SettingReducer;
  const {isRefresh, data, isFirstLoading} = state.GiftDetailReducer;
  return {iso, theme, isRefresh, data, isFirstLoading};
};

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      showFirstLoading,
      getGiftDetail,
      reset,
      showRefresh
    },
    dispatch
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(GiftDetail);
