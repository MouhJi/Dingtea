import React, {PureComponent} from 'react';
import {ScrollView} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {MyButtonText, MyImage, MyText, MyView, MyViewShadow} from 'bases/components';
import {IVoucherModel} from 'models';

import {connect} from 'react-redux';
import MyI18n from 'utils/MyI18n';
import {bindActionCreators} from 'redux';
import {RootState} from 'views/app/redux';

import {ISettingState} from 'views/setting/redux';
import Utilities from 'utils/Utilities';
import {COLOR} from 'bases/styles/Core';
import MyNavigator from 'utils/MyNavigator';
import {initVoucher} from 'views/app/reduxChooseVoucher';
import {detailVCStyle, itemStyle} from './style/VoucherDetail.Style';

import MyStaticLocal from 'utils/MyStaticLocal';

interface IProps extends ISettingState {
  initVoucher: typeof initVoucher;

  route: any;
}

class VoucherDetail extends PureComponent<IProps> {
  voucher: IVoucherModel;

  constructor(props: IProps) {
    super(props);
    this.voucher = this.props.route.params.voucher;
  }

  onPressApply = () => {
    MyStaticLocal.addListVoucher(this.voucher);
    this.props.initVoucher(MyStaticLocal.getListVoucher());
    MyNavigator.popTo('CartPay');
  };

  render() {
    let voucherDetail = this.voucher;

    let _viewTextApply = null;
    switch (voucherDetail?.status_local) {
      case 1:
        _viewTextApply = (
          <MyButtonText
            title={MyI18n.trans.apply}
            style={detailVCStyle.bottomButton}
            titleProps={{fontStyle: 'SemiBold'}}
            onPress={this.onPressApply}
          />
        );
        break;

      case 2:
        _viewTextApply = (
          <MyButtonText
            title={MyI18n.trans.unqualified}
            style={[detailVCStyle.bottomButton, {backgroundColor: COLOR.TEXT.SECONDARY}]}
            titleProps={{fontStyle: 'SemiBold'}}
          />
        );
        break;

      case 3:
        _viewTextApply = (
          <MyButtonText
            title={MyI18n.trans.expired}
            style={[detailVCStyle.bottomButton, {backgroundColor: COLOR.TEXT.SECONDARY}]}
            titleProps={{fontStyle: 'SemiBold'}}
          />
        );
        break;

      default:
        break;
    }
    let applied_start_time = voucherDetail.applied_start_time || 0;
    let applied_stop_time = voucherDetail.applied_stop_time || 0;
    const source = Utilities.convertLinkImage(voucherDetail.thumbnail_url, 'MEDIUM');
    const time = Utilities.convertTimeByFormat(applied_stop_time, 'DD/MM/YYYY');
    let content = '';
    if (voucherDetail.discount_type === 1) {
      content =
        MyI18n.trans.reduction +
        ' ' +
        voucherDetail.discount_value +
        ' % ' +
        MyI18n.trans.max +
        ' ' +
        voucherDetail.max_discount_value +
        ' VND';
    }
    if (voucherDetail.discount_type === 2) {
      content = MyI18n.trans.reduction + ' ' + voucherDetail.discount_value + ' VND';
    }
    return (
      <MyView style={detailVCStyle.container}>
        <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
          <MyViewShadow style={detailVCStyle.contentList}>
            <MyViewShadow style={itemStyle.container}>
              <MyImage
                height={itemStyle.image.width}
                width={itemStyle.image.width}
                source={source}
                style={itemStyle.image}
              />
              <MyView transparent style={itemStyle.contentText}>
                <MyText fontStyle="Bold" numberOfLines={2}>
                  {voucherDetail.name}
                </MyText>

                <MyText fontStyle="Regular" style={itemStyle.textHSD}>
                  {MyI18n.trans.due_date}
                  {': '}
                  {time}
                </MyText>
              </MyView>
            </MyViewShadow>
            <MyView style={detailVCStyle.containerTextTitle}>
              <MyText style={detailVCStyle.title} fontStyle="Bold" numberOfLines={2}>
                {MyI18n.trans.promo_code}
              </MyText>
              <MyView style={detailVCStyle.contentPromotion} transparent>
                <MyText style={detailVCStyle.textPromotion} fontStyle="Regular">
                  {voucherDetail.code}
                </MyText>
              </MyView>
              <MyText style={detailVCStyle.title} fontStyle="Bold" numberOfLines={2}>
                {MyI18n.trans.time_apply}
              </MyText>
              <MyText style={detailVCStyle.txtExpirydate} fontStyle={'Regular'}>
                {Utilities.convertTimeByFormat(applied_start_time, 'HH:mm DD/MM/YYYY')}
                {' - '}
                {Utilities.convertTimeByFormat(applied_stop_time, 'HH:mm DD/MM/YYYY')}
              </MyText>
              <MyView style={detailVCStyle.itemSeparator} />
              <MyText style={detailVCStyle.title} fontStyle="Bold" numberOfLines={2}>
                {MyI18n.trans.content}
              </MyText>
              <MyText style={detailVCStyle.txtExpirydate} fontStyle={'Regular'}>
                {content}
              </MyText>
              <MyView style={detailVCStyle.itemSeparator} />
              <MyText fontStyle="Bold" style={detailVCStyle.titleBold}>
                {MyI18n.trans.condition}
              </MyText>
              <MyText fontStyle="Regular">{voucherDetail.content}</MyText>
            </MyView>
          </MyViewShadow>
        </ScrollView>
        <SafeAreaView edges={['bottom']} style={detailVCStyle.safeView}>
          {_viewTextApply}
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
      initVoucher
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(VoucherDetail);
