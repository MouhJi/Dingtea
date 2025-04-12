import React, {PureComponent} from 'react';
import {Linking, ScrollView, View, Share} from 'react-native';
import {SvgCss} from 'react-native-svg/css';
import {connect} from 'react-redux';
import MyI18n from 'utils/MyI18n';
import MyNavigator from 'utils/MyNavigator';
import Utilities from 'utils/Utilities';
import {StoreDetailsStyles} from '../styles/Store.Styles';
import {MyImage, MyText, MyView, MyIcon, LoadingList, MyButton} from 'bases/components';
import {svgChiaSe, svgDiachi, svgLienHe, svgYeuThich} from 'assets/images/svgImage';
import MyTheme from 'utils/MyTheme';
import {SafeAreaView} from 'react-native-safe-area-context';
import {IAddressShopModel} from 'models/IAddressShopModel';
import {bindActionCreators} from 'redux';
import {chooseAddressShop} from 'views/app/reduxChooseAddressShop';
import MyStorage from 'utils/MyStorage';
import {ADDRESS_SHOP_CHOOSE} from 'common/KeyStorages';
import {SHIPPING_METHOD} from 'common/Constants';
import {changeShippingMethod} from 'views/doUong/redux';
import {RootState} from 'views/app/redux';
interface IProps {
  chooseAddressShop: typeof chooseAddressShop;
  changeShippingMethod: typeof changeShippingMethod;
  route?: {
    params: {
      store?: IAddressShopModel;
    };
  };
}
interface IState {
  shopDetails?: IAddressShopModel;
  isLoading: boolean;
}
class StoreDetails extends PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      shopDetails: {
        address: '',
        logo: ''
      },
      isLoading: false
    };
  }
  componentDidMount() {
    this.getShopDetails();
  }

  getShopDetails = () => {
    this.setState({isLoading: true});
    if (this.props.route?.params?.store) {
      setTimeout(() => {
        this.setState({isLoading: false, shopDetails: this.props.route?.params?.store});
      }, 300);
    }
  };
  gotoScan = () => {
    MyNavigator.navigate('Scan');
  };
  phoneCall = () => {
    Linking.openURL(`tel:${this.state.shopDetails?.phone}`);
  };

  onShare = async () => {
    const {shopDetails} = this.state;
    try {
      const result = await Share.share({
        message: shopDetails?.address ? shopDetails?.address : ''
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {}
  };

  onSubmitStore = () => {
    MyStorage.create(ADDRESS_SHOP_CHOOSE, this.props.route?.params.store);
    this.props.chooseAddressShop(this.props.route?.params.store);
    this.props.changeShippingMethod(SHIPPING_METHOD[0]);
    MyNavigator.navigate('HomeRouter', {screen: 'DoUong'});
  };

  render() {
    if (this.state.isLoading) {
      return <LoadingList />;
    }
    const {shopDetails} = this.state;
    return (
      <MyView style={{flex: 1}}>
        <ScrollView style={StoreDetailsStyles.container}>
          <MyImage
            source={Utilities.convertLinkImage(shopDetails?.logo)}
            height={Utilities.getResolutionByHeight(200)}
            width={Utilities.getResolutionByWidth(343)}
            style={StoreDetailsStyles.images}
          />
          <MyView style={StoreDetailsStyles.addressStore} transparent>
            <MyText fontStyle="Bold" style={StoreDetailsStyles.text24}>
              {shopDetails?.name}
            </MyText>
            <MyText fontStyle="Bold" style={StoreDetailsStyles.text25}>
              {shopDetails?.address}
            </MyText>
            <MyView style={StoreDetailsStyles.viewRow} transparent>
              <MyIcon
                iconFontType="Octicons"
                name="dot-fill"
                color={MyTheme.themes.BG.PRIMARY_DARK}
                size={15}
              />
              <MyText style={StoreDetailsStyles.textGreen}>{MyI18n.trans.open_door}</MyText>
              <MyText style={StoreDetailsStyles.text18}>9:00 - 22:00</MyText>
            </MyView>
          </MyView>
          <View style={StoreDetailsStyles.viewLine} />
          <MyView style={StoreDetailsStyles.addressStore2} transparent>
            <MyView style={StoreDetailsStyles.viewRow} transparent>
              <SvgCss xml={svgDiachi} />
              <MyView style={StoreDetailsStyles.viewText} transparent>
                <MyText fontStyle="Bold" style={StoreDetailsStyles.textTitle}>
                  {MyI18n.trans.address}
                </MyText>
                <MyText style={StoreDetailsStyles.textBlack27}>{shopDetails?.address}</MyText>
                <View style={StoreDetailsStyles.viewLine} />
              </MyView>
            </MyView>
            <MyButton style={StoreDetailsStyles.viewRow} transparent onPress={this.phoneCall}>
              <SvgCss xml={svgLienHe} />
              <MyView style={StoreDetailsStyles.viewText} transparent>
                <MyText fontStyle="Bold" style={StoreDetailsStyles.textTitle}>
                  {shopDetails?.phone}
                </MyText>
                <MyText style={StoreDetailsStyles.textBlack27}>{MyI18n.trans.help}</MyText>
                <View style={StoreDetailsStyles.viewLine} />
              </MyView>
            </MyButton>
            <MyView style={StoreDetailsStyles.viewRow} transparent>
              <SvgCss xml={svgYeuThich} />
              <MyView style={StoreDetailsStyles.viewText} transparent>
                <MyText fontStyle="Bold" style={StoreDetailsStyles.textTitle2}>
                  {MyI18n.trans.address_favorite}
                </MyText>
                <View style={StoreDetailsStyles.viewLine} />
              </MyView>
            </MyView>
            <MyButton style={StoreDetailsStyles.viewRow} transparent onPress={this.onShare}>
              <SvgCss xml={svgChiaSe} />
              <MyView style={StoreDetailsStyles.viewText} transparent>
                <MyText fontStyle="Bold" style={StoreDetailsStyles.textTitle2}>
                  {MyI18n.trans.address_share}
                </MyText>
              </MyView>
            </MyButton>
          </MyView>
          <View style={StoreDetailsStyles.viewLine} />
          {/* <MyImage
            source={Utilities.convertLinkImage(
              'https://cdn-thumb-image-dingtea.csell.com.vn/2021/03/users/1615457391131-hungyen.png'
            )}
            height={Utilities.getResolutionByHeight(200)}
            width={Utilities.getResolutionByWidth(343)}
            style={StoreDetailsStyles.images}
          /> */}
          {/* <MyView style={StoreDetailsStyles.viewMap}>
          <MapView
            style={StoreDetailsStyles.mapView}
            initialRegion={{
              latitude: Number(this.state.shopDetails?.latitude),
              longitude: Number(this.state.shopDetails?.longitude),
              latitudeDelta: 0.065,
              longitudeDelta: 0.061
            }}>
            <Marker
              coordinate={{
                latitude: Number(this.state.shopDetails?.latitude),
                longitude: Number(this.state.shopDetails?.longitude)
              }}
            />
          </MapView>
        </MyView> */}
        </ScrollView>
        <SafeAreaView edges={['bottom']}>
          <MyButton style={StoreDetailsStyles.viewBtnScan} onPress={this.onSubmitStore}>
            <MyText style={{color: MyTheme.themes.TEXT.WHITE}}>{MyI18n.trans.pickup_store}</MyText>
          </MyButton>
        </SafeAreaView>
      </MyView>
    );
  }
}
const mapStateToProps = (state: RootState) => {
  const {iso} = state.SettingReducer;
  return {iso};
};

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      chooseAddressShop,
      changeShippingMethod
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(StoreDetails);
