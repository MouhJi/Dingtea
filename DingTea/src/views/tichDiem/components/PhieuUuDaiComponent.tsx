import {MyText, MyView} from 'bases/components';
import {IVoucherModel} from 'models';
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import MyI18n from 'utils/MyI18n';
import {bindActionCreators} from 'redux';
import MyNavigator from 'utils/MyNavigator';
import {ItemVoucher} from 'views/app/components';
import {RootState} from 'views/app/redux';
import {tabtichDiemStyle} from 'views/tichDiem/style/TichDiem.Style';
import {getListVouchers, IVoucherState} from 'views/voucher/redux';

interface IProps extends IVoucherState {
  getListVouchers: typeof getListVouchers;
}
class PhieuUuDaiComponent extends PureComponent<IProps> {
  arrDoiQuaTang: any = [];
  componentDidMount() {
    const {isFirstLoading} = this.props;
    if (isFirstLoading) {
      this.props.getListVouchers({
        skip: 0,
        limit: 1000,
        statuses: 'active'
      });
    }
  }
  onPress = (item: IVoucherModel) => {
    MyNavigator.navigate('VoucherDetail', {voucher: item});
  };
  render() {
    const {data} = this.props;
    if (data && data.length > 0) {
      this.arrDoiQuaTang = data.slice(0, 2);
      return (
        <MyView transparent style={tabtichDiemStyle.containerUuDai}>
          <MyView transparent style={[tabtichDiemStyle.viewTitle, tabtichDiemStyle.viewUuDai]}>
            <MyText fontStyle={'Bold'}>{MyI18n.trans.vouchers}</MyText>
            {/* <MyText fontStyle={'SemiBold'} style={tabtichDiemStyle.txtTitle}>
              {MyI18n.trans.all}
            </MyText> */}
          </MyView>
          {this.arrDoiQuaTang.map((k: IVoucherModel) => (
            <ItemVoucher
              key={k.id}
              title={k.name}
              date={k.applied_stop_time}
              image={k.thumbnail_url}
              item={k}
              onPress={() => this.onPress(k)}
              style={tabtichDiemStyle.itemPhieuUuDai}
            />
          ))}
        </MyView>
      );
    } else {
      return <MyView style={tabtichDiemStyle.itemPhieuUuDai} />;
    }
  }
}

const mapStateToProps = (state: RootState) => {
  const {iso, theme} = state.SettingReducer;
  const {isRefresh, data, isError, isFirstLoading, isLoadmore, isStop} = state.VoucherReducer;
  return {iso, theme, isRefresh, data, isError, isFirstLoading, isLoadmore, isStop};
};
const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      getListVouchers
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(PhieuUuDaiComponent);
