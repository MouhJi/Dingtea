import React, {PureComponent} from 'react';
import {FlatList, RefreshControl} from 'react-native';

import {connect} from 'react-redux';
import MyI18n from 'utils/MyI18n';
import {bindActionCreators} from 'redux';
import MyNavigator from 'utils/MyNavigator';
import {RootState} from 'views/app/redux/App.Reducer';

import {ISettingState} from 'views/setting/redux';
import {getListAddressShop, showRefresh, showLoadmore, reset, IAddressShopState} from './redux';
import {addressStyles} from './style/AddressShop.Style';
import {MyInput, MyView, LoadingList, MyText, MyButtonText} from 'bases/components';
import {IAddressShopModel} from 'models';
import {chooseAddressShop} from 'views/app/reduxChooseAddressShop';
import MyStorage from 'utils/MyStorage';
import {ADDRESS_SHOP_CHOOSE} from 'common/KeyStorages';
import ItemShopMarker from 'views/store/components/ItemShopMarker';
import {SafeAreaView} from 'react-native-safe-area-context';

interface defaultProps extends ISettingState, IAddressShopState {
  getListAddressShop: typeof getListAddressShop;
  showRefresh: typeof showRefresh;
  showLoadmore: typeof showLoadmore;
  reset: typeof reset;
  chooseAddressShop: typeof chooseAddressShop;
}

class AddressShop extends PureComponent<defaultProps> {
  keyword: string = '';

  componentDidMount() {
    if (this.props.listAddressShop?.length === 0) {
      this.props.getListAddressShop({
        skip: 0,
        limit: 10,
        status: 'active',
        keyword: this.keyword.trim(),
        is_app_visible: true
      });
    }
  }

  // componentWillUnmount() {
  // this.props.reset();
  // }

  searchShop = () => {
    this.props.showRefresh(true);
    this.props.getListAddressShop({
      skip: 0,
      limit: 10,
      status: 'active',
      keyword: this.keyword.trim(),
      is_app_visible: true
    });
  };

  reload = () => {
    const {isFirstLoading, isLoadmore} = this.props;
    if (!isFirstLoading && !isLoadmore) {
      this.props.showRefresh(true);
      this.props.getListAddressShop({
        skip: 0,
        limit: 10,
        status: 'active',
        keyword: this.keyword.trim(),
        is_app_visible: true
      });
    }
  };

  pressItem = (item: IAddressShopModel) => {
    MyStorage.create(ADDRESS_SHOP_CHOOSE, item);
    this.props.chooseAddressShop(item);
    MyNavigator.goBack();
  };

  renderListHeader = () => {
    return (
      <MyView style={{height: 64}}>
        <MyInput
          containerStyle={addressStyles.containerSearch}
          style={addressStyles.inputSearch}
          placeholder={MyI18n.trans.find_a_store}
          returnKeyType="search"
          onChangeText={text => {
            this.keyword = text;
          }}
          onSubmitEditing={this.searchShop}
        />
      </MyView>
    );
  };

  keyExtractor = (_item: any, index: number) => {
    return index.toString();
  };

  renderItem = ({item}: {item: IAddressShopModel}) => {
    return <ItemShopMarker items={item} onPress={() => this.pressItem(item)} />;
  };

  renderItemSeparatorComponent = () => {
    return <MyView style={addressStyles.itemSeparator} />;
  };

  renderListEmptyComponent = () => {
    const {isError, isFirstLoading} = this.props;
    if (isFirstLoading) {
      return <MyText style={addressStyles.txtAgain}>{MyI18n.trans.data_empty}</MyText>;
    } else {
      if (isError) {
        return (
          <MyView style={addressStyles.containerError}>
            <MyText style={addressStyles.txtAgain}>{MyI18n.trans.error_message}</MyText>
            <MyButtonText
              onPress={this.reload}
              title={MyI18n.trans.try_again}
              style={addressStyles.btnAgain}
            />
          </MyView>
        );
      } else {
        return <MyText style={addressStyles.txtAgain}>{MyI18n.trans.data_empty}</MyText>;
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
    const {listAddressShop, isLoadmore, isStop} = this.props;
    if (isLoadmore || isStop) {
      return;
    }
    this.props.showLoadmore(true);
    this.props.getListAddressShop({
      skip: listAddressShop?.length || 0,
      limit: 10,
      status: 'active',
      keyword: this.keyword.trim(),
      is_app_visible: true
    });
  };

  render() {
    const {listAddressShop, isRefresh} = this.props;

    return (
      <SafeAreaView edges={['bottom']} style={addressStyles.container}>
        <MyView style={addressStyles.container}>
          {this.renderListHeader()}
          <FlatList
            keyboardShouldPersistTaps="handled"
            showsHorizontalScrollIndicator={false}
            refreshControl={
              <RefreshControl onRefresh={this.reload} refreshing={isRefresh || false} />
            }
            showsVerticalScrollIndicator={false}
            style={addressStyles.list}
            // contentContainerStyle={addressStyles.contentList}
            data={listAddressShop}
            extraData={listAddressShop}
            initialNumToRender={12}
            keyExtractor={this.keyExtractor}
            renderItem={this.renderItem}
            ItemSeparatorComponent={this.renderItemSeparatorComponent}
            ListEmptyComponent={this.renderListEmptyComponent}
            // ListHeaderComponent={this.renderListHeader}
            onEndReachedThreshold={0.1}
            onEndReached={this.onEndReached}
            ListFooterComponent={this.renderListFooterComponent}
          />
        </MyView>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  const {iso} = state.SettingReducer;
  const {
    isRefresh,
    listAddressShop,
    isError,
    isFirstLoading,
    isLoadmore,
    isStop
  } = state.AddressShopReducer;
  return {
    iso,
    isRefresh,
    isError,
    isFirstLoading,
    isLoadmore,
    isStop,
    listAddressShop
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      getListAddressShop,
      showRefresh,
      showLoadmore,
      reset,
      chooseAddressShop
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(AddressShop);
