import React, {PureComponent} from 'react';

import {connect} from 'react-redux';
import MyI18n from 'utils/MyI18n';
import {bindActionCreators} from 'redux';
import {RootState} from 'views/app/redux/App.Reducer';

import {slideBannerStyles} from '../../style/Home.Style';
import MyNavigator from 'utils/MyNavigator';
import {MyView, MyImageSlider} from 'bases/components';
import {IBannerModel} from 'models';
import {getListBanner} from 'services';
import MyButtonSvg from 'bases/components/button/MyButtonSvg';
import {svgShop, svgXeMay} from 'assets/images/svgImage';
import {SvgCss} from 'react-native-svg/css';
import Utilities from 'utils/Utilities';
import {changeShippingMethod} from 'views/doUong/redux';
import {SHIPPING_METHOD} from 'common/Constants';
import {chooseCartShip} from 'views/cartPayShip/redux';

interface IProps {
  changeShippingMethod: typeof changeShippingMethod;
  chooseCartShip: typeof chooseCartShip;
}

interface IStates {
  arrImageBanner: string[] | undefined;
}

class SlideBannerComponent extends PureComponent<IProps, IStates> {
  state = {arrImageBanner: []};

  arrBanner: IBannerModel[] = [];

  onPressBanner = (_item: string, index: number) => {
    MyNavigator.navigate('PreviewWeb', {uri: this.arrBanner[index]?.url});
  };

  componentDidMount() {
    getListBanner<IBannerModel>({skip: 0, limit: 5})
      .then(res => {
        if (!res?.code) {
          if (res?.data) {
            this.arrBanner = res.data;

            let arrImg: string[] = [];
            for (let index = 0; index < res?.data.length; index++) {
              const element: any = res?.data[index]?.mobile_url;
              arrImg.push(element);
            }
            if (arrImg.length > 0) {
              this.setState({
                arrImageBanner: arrImg
              });
            }
          }
        }
      })
      .catch(() => {});
  }

  render() {
    const {arrImageBanner} = this.state;

    return (
      <MyView style={slideBannerStyles.container}>
        <SvgCss
          xml={Utilities.getSvgBackground(Utilities.getWidthScreen())}
          style={slideBannerStyles.background}
        />
        <MyImageSlider
          style={slideBannerStyles.slider}
          styleContainerImage={slideBannerStyles.styleContainerImage}
          images={arrImageBanner}
          onPress={this.onPressBanner}
          isLoop
          isAnimBack
          isShowDot
          widthImage={slideBannerStyles.image.width}
        />
        <MyView style={slideBannerStyles.contentBtn} transparent>
          <MyButtonSvg
            svgImage={svgXeMay}
            title={MyI18n.trans.assigned_site}
            onPress={() => {
              this.props.chooseCartShip(SHIPPING_METHOD[0]);
              this.props.changeShippingMethod(SHIPPING_METHOD[0]);
              MyNavigator.navigate('DoUong');
            }}
          />
          <MyButtonSvg
            svgImage={svgShop}
            title={MyI18n.trans.take_it_personally}
            onPress={() => {
              this.props.chooseCartShip(SHIPPING_METHOD[1]);
              this.props.changeShippingMethod(SHIPPING_METHOD[1]);
              MyNavigator.navigate('DoUong');
            }}
          />
        </MyView>
      </MyView>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  const {iso, theme} = state.SettingReducer;
  return {iso, theme};
};

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      changeShippingMethod,
      chooseCartShip
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps, null, {forwardRef: true})(
  SlideBannerComponent
);
