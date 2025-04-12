import {MyView, MyButtonText, LoadingList, MyText} from 'bases/components';
import {SHIPPING_METHOD} from 'common/Constants';
import {ICartShipModel} from 'models';
import React, {PureComponent} from 'react';
import {FlatList} from 'react-native';

import {connect} from 'react-redux';
import MyI18n from 'utils/MyI18n';
import {bindActionCreators} from 'redux';
import MyNavigator from 'utils/MyNavigator';
import {RootState} from 'views/app/redux/App.Reducer';

import {ISettingState} from 'views/setting/redux';
import ItemShip from './components/ItemShip';
import {getListCartShip, ICartShipState, showLoadmore, showRefresh, chooseCartShip} from './redux';
import {payStyles} from './style/CartPayShip.Style';

interface defaultProps extends ISettingState, ICartShipState {
  getListCartShip: typeof getListCartShip;
  showRefresh: typeof showRefresh;
  showLoadmore: typeof showLoadmore;
  chooseCartShip: typeof chooseCartShip;
}

class CartPayShip extends PureComponent<defaultProps> {
  data: ICartShipModel[] = SHIPPING_METHOD;

  // componentDidMount() {
  //   const {listCartShip} = this.props;
  //   if (listCartShip?.length === 0) {
  //     this.props.getListCartShip();
  //   }
  // }

  reload = () => {
    // const {isFirstLoading, isLoadmore} = this.props;
    // if (!isFirstLoading && !isLoadmore) {
    //   this.props.showRefresh(true);
    //   this.props.getListCartShip();
    // }
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
    this.props.chooseCartShip(item);
    MyNavigator.goBack();
  };

  keyExtractor = (item: ICartShipModel) => {
    return item.id.toString();
  };

  renderItem = ({item}: {item: ICartShipModel}) => {
    return <ItemShip item={item} onPress={() => this.pressItem(item)} />;
  };

  renderItemSeparatorComponent = () => {
    return <MyView style={payStyles.itemSeparator} />;
  };

  render() {
    const {listCartShip} = this.props;

    return (
      <MyView style={payStyles.container}>
        <FlatList
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          // refreshControl={
          //   <RefreshControl onRefresh={this.reload} refreshing={isRefresh || false} />
          // }
          style={payStyles.list}
          contentContainerStyle={payStyles.contentList}
          data={this.data || listCartShip}
          extraData={this.data || listCartShip}
          initialNumToRender={10}
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
    listCartShip
  } = state.CartPayShipReducer;
  return {iso, isRefresh, isError, isFirstLoading, isLoadmore, isStop, listCartShip};
};
const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      getListCartShip,
      showRefresh,
      showLoadmore,
      chooseCartShip
    },
    dispatch
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(CartPayShip);
