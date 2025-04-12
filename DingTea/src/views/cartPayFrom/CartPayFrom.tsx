import {MyView, MyButtonText, LoadingList, MyText} from 'bases/components';
import {PAYMENT_METHOD_LIST} from 'common/Constants';
import {ICartPayModel} from 'models';
import React, {PureComponent} from 'react';
import {FlatList, RefreshControl} from 'react-native';

import {connect} from 'react-redux';
import MyI18n from 'utils/MyI18n';
import {bindActionCreators} from 'redux';
import MyNavigator from 'utils/MyNavigator';
import {RootState} from 'views/app/redux/App.Reducer';

import {ISettingState} from 'views/setting/redux';
import ItemPayment from './components/ItemPayment';
import {
  getListCartPay,
  ICartPayState,
  showLoadmore,
  showRefresh,
  chooseCartPayMemment
} from './redux';
import {payStyles} from './style/CartPayForm.Style';

interface defaultProps extends ISettingState, ICartPayState {
  getListCartPay: typeof getListCartPay;
  showRefresh: typeof showRefresh;
  showLoadmore: typeof showLoadmore;
  chooseCartPayMemment: typeof chooseCartPayMemment;
}

class CartPayForm extends PureComponent<defaultProps> {
  data: ICartPayModel[] = PAYMENT_METHOD_LIST;

  componentDidMount() {
    const {listCartPay} = this.props;
    if (listCartPay?.length === 0) {
      this.props.getListCartPay();
    }
  }

  reload = () => {
    const {isFirstLoading, isLoadmore} = this.props;
    if (!isFirstLoading && !isLoadmore) {
      this.props.showRefresh(true);
      this.props.getListCartPay();
    }
  };

  renderListEmptyComponent = () => {
    const {isError, isFirstLoading} = this.props;
    if (isFirstLoading) {
      return <LoadingList />;
    } else {
      if (isError) {
        return (
          <MyView style={payStyles.containerError}>
            <MyText style={payStyles.txtAgain}>{MyI18n.trans.error_message}</MyText>
            <MyButtonText
              onPress={this.reload}
              title={MyI18n.trans.try_again}
              style={payStyles.btnAgain}
            />
          </MyView>
        );
      } else {
        return <MyText style={payStyles.txtAgain}>{MyI18n.trans.data_empty}</MyText>;
      }
    }
  };

  pressItem = (item: any) => {
    this.props.chooseCartPayMemment(item);
    MyNavigator.goBack();
  };

  keyExtractor = (item: ICartPayModel) => {
    return item.id.toString();
  };

  renderItem = ({item}: {item: ICartPayModel}) => {
    return <ItemPayment item={item} onPress={() => this.pressItem(item)} />;
  };

  renderItemSeparatorComponent = () => {
    return <MyView style={payStyles.itemSeparator} />;
  };

  render() {
    const {isRefresh, listCartPay} = this.props;

    return (
      <MyView style={payStyles.container}>
        <FlatList
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl onRefresh={this.reload} refreshing={isRefresh || false} />
          }
          style={payStyles.list}
          contentContainerStyle={payStyles.contentList}
          data={this.data || listCartPay}
          extraData={this.data || listCartPay}
          initialNumToRender={16}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderItem}
          ItemSeparatorComponent={this.renderItemSeparatorComponent}
          ListEmptyComponent={this.renderListEmptyComponent}
          // onEndReachedThreshold={0.5}
        />
      </MyView>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  const {iso} = state.SettingReducer;
  const {
    isRefresh,
    isError,
    isFirstLoading,
    isLoadmore,
    isStop,
    listCartPay
  } = state.CartPayFromReducer;
  return {iso, isRefresh, isError, isFirstLoading, isLoadmore, isStop, listCartPay};
};
const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      getListCartPay,
      showRefresh,
      showLoadmore,
      chooseCartPayMemment
    },
    dispatch
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(CartPayForm);
