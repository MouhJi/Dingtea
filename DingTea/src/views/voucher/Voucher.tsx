import React, {PureComponent} from 'react';
import {FlatList, RefreshControl} from 'react-native';

import {connect} from 'react-redux';
import MyI18n from 'utils/MyI18n';
import {bindActionCreators} from 'redux';
import {RootState} from 'views/app/redux/App.Reducer';

import {MyButtonText, MyText, MyView} from 'bases/components';
import {ItemVoucher} from 'views/app/components';
import {LoadingList} from 'bases/components';
import {IVoucherModel} from 'models';
import {getListVouchers, showRefresh, showLoadmore, reset, IVoucherState} from './redux';
import MyStaticLocal from 'utils/MyStaticLocal';
import {tabVoucherStyles} from './style/Voucher.Style';
import MyNavigator from 'utils/MyNavigator';

interface IProps extends IVoucherState {
  getListVouchers: typeof getListVouchers;
  showRefresh: typeof showRefresh;
  showLoadmore: typeof showLoadmore;
  reset: typeof reset;

  route?: {
    params?: {
      isBanHang: boolean;
    };
  };
}

class Voucher extends PureComponent<IProps> {
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

  //   componentWillUnmount() {
  //     this.props.reset();
  //   }

  reload = () => {
    const {isFirstLoading, isLoadmore} = this.props;
    if (!isFirstLoading && !isLoadmore) {
      this.props.showRefresh(true);
      this.props.getListVouchers({
        skip: 0,
        limit: 1000,
        statuses: 'active'
      });
    }
  };

  keyExtractor = (item: IVoucherModel) => {
    return item.id.toString();
  };
  onPress = (item: IVoucherModel) => {
    MyNavigator.navigate('VoucherDetail', {voucher: item});
  };

  renderItem = ({item}: {item: IVoucherModel}) => {
    return (
      <ItemVoucher
        title={item.name}
        date={item.applied_stop_time}
        image={item.thumbnail_url}
        item={item}
        onPress={() => this.onPress(item)}
        status_local={item.status_local}
      />
    );
  };

  renderListEmptyComponent = () => {
    const {isError, isFirstLoading} = this.props;
    if (isFirstLoading) {
      return <LoadingList />;
    } else {
      if (isError) {
        return (
          <MyView style={tabVoucherStyles.containerError}>
            <MyText style={tabVoucherStyles.txtAgain}>{MyI18n.trans.error_message}</MyText>
            <MyButtonText
              onPress={this.reload}
              title={MyI18n.trans.try_again}
              style={tabVoucherStyles.btnAgain}
            />
          </MyView>
        );
      } else {
        return (
          <MyText style={tabVoucherStyles.txtAgain}>{MyI18n.trans.you_do_not_have_a_coupon}</MyText>
        );
      }
    }
  };

  renderListFooterComponent = () => {
    const {isLoadmore} = this.props;
    if (isLoadmore) {
      return <LoadingList />;
    } else {
      return null;
    }
  };

  onEndReached = () => {
    const {data, isLoadmore, isStop} = this.props;
    if (isLoadmore || isStop) {
      return;
    }
    this.props.showLoadmore(true);
    this.props.getListVouchers({
      skip: data?.length || 0,
      limit: 1000,
      statuses: 'active'
    });
  };

  renderItemSeparatorComponent = () => {
    return <MyView style={tabVoucherStyles.itemSeparator} transparent />;
  };

  checkVoucher = (): IVoucherModel[] => {
    let store = MyStaticLocal.getAddressShop();

    let priceTotal = MyStaticLocal.getSumPriceCart(); // tổng tiền đơn hàng

    let arrApply: IVoucherModel[] = [];
    let arrChuaDu: IVoucherModel[] = [];
    let arrHetHan: IVoucherModel[] = [];
    const {data} = this.props;
    if (data) {
      for (let i = 0; i < data.length; i++) {
        let element = data[i];
        if (element.discount_value) {
          element = {
            ...element,
            type: element.discount_type,
            group: 'voucher',
            value: element.discount_value
          };
          if (element.applied_stop_time) {
            // có hạn sử dụng
            if (element.applied_stop_time * 1000 < Date.now()) {
              // hết hạn sử dụng
              arrHetHan.push({...element, status_local: 3});
            } else {
              // còn hạn sử dụng
              if (element.applied_order_value) {
                // có giá tối thiểu
                if (priceTotal >= element.applied_order_value) {
                  // đủ giá tối thiểu
                  if (store && store.id) {
                    // đã chọn cửa hàng
                    if (element.applied_stores && element.applied_stores.length > 0) {
                      // chỉ một số cửa hàng áp dụng
                      let indexShopDuocGiam = -1;
                      indexShopDuocGiam = element.applied_stores.indexOf(store.id);
                      if (indexShopDuocGiam > -1) {
                        // cửa hàng đang chọn có áp dụng
                        arrApply.push({...element, status_local: 1});
                      } else {
                        // cửa hàng đang chọn không áp dụng
                        arrChuaDu.push({...element, status_local: 2});
                      }
                    } else {
                      // tất cả cửa hàng áp dụng
                      arrApply.push({...element, status_local: 1});
                    }
                  } else {
                    // chưa chọn cửa hàng
                    arrChuaDu.push({...element, status_local: 2});
                  }
                } else {
                  // thiếu giá tối thiểu
                  arrChuaDu.push({...element, status_local: 2});
                }
              } else {
                // không giá tối thiểu
                if (store && store.id) {
                  // đã chọn cửa hàng
                  if (element.applied_stores && element.applied_stores.length > 0) {
                    // chỉ một số cửa hàng áp dụng
                    let indexShopDuocGiam = -1;
                    indexShopDuocGiam = element.applied_stores.indexOf(store.id);
                    if (indexShopDuocGiam > -1) {
                      // cửa hàng đang chọn có áp dụng
                      arrApply.push({...element, status_local: 1});
                    } else {
                      // cửa hàng đang chọn không áp dụng
                      arrChuaDu.push({...element, status_local: 2});
                    }
                  } else {
                    // tất cả cửa hàng áp dụng
                    arrApply.push({...element, status_local: 1});
                  }
                } else {
                  // chưa chọn cửa hàng
                  arrChuaDu.push({...element, status_local: 2});
                }
              }
            }
          } else {
            // không hạn sử dụng
            arrHetHan.push({...element, status_local: 3});
          }
        }
      }
    }
    let dataDaSapXep: IVoucherModel[] = [];

    dataDaSapXep = dataDaSapXep.concat(arrApply);
    dataDaSapXep = dataDaSapXep.concat(arrChuaDu);
    dataDaSapXep = dataDaSapXep.concat(arrHetHan);

    return dataDaSapXep;
  };

  render() {
    const {isRefresh, data, route} = this.props;
    let listVoucher = route?.params?.isBanHang ? this.checkVoucher() : data;
    return (
      <FlatList
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl onRefresh={this.reload} refreshing={isRefresh || false} />}
        style={tabVoucherStyles.list}
        contentContainerStyle={tabVoucherStyles.contentList}
        data={listVoucher}
        extraData={listVoucher}
        initialNumToRender={12}
        keyExtractor={this.keyExtractor}
        renderItem={this.renderItem}
        ListEmptyComponent={this.renderListEmptyComponent}
        ListFooterComponent={this.renderListFooterComponent}
        ItemSeparatorComponent={this.renderItemSeparatorComponent}
        onEndReachedThreshold={0.5}
        onEndReached={this.onEndReached}
      />
    );
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
      getListVouchers,
      showRefresh,
      showLoadmore,
      reset
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Voucher);
