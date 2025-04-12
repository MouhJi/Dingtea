import React, {PureComponent} from 'react';
import {FlatList, RefreshControl} from 'react-native';

import {MyView, MyIcon, LoadingList, MyButtonText, MyText, MyInput} from 'bases/components';
import ItemShopMarker from './components/ItemShopMarker';
import {storeStyles} from './styles/Store.Styles';
import MyTheme from 'utils/MyTheme';
import {IAppState} from 'views/app/redux';

import {IAddressShopModel} from 'models/IAddressShopModel';
import MyNavigator from 'utils/MyNavigator';
import {getAddressShop, IAddressShopRequest} from 'services';
import Utilities from 'utils/Utilities';
import MyI18n from 'utils/MyI18n';
// interface defaultProps extends ISettingState, IStoreShopState {
//   getListStoreShop: typeof getListStoreShop;
//   showRefresh: typeof showRefresh;
//   showLoadmore: typeof showLoadmore;
// }

interface IState extends IAppState {
  listStoreShop: IAddressShopModel[];
  limit: number;
  count: number;
  isLoadMore: boolean;
  isStop: boolean;
}

class StoreScreen extends PureComponent<any, IState> {
  keyword: string = '';

  constructor(props: any) {
    super(props);
    this.state = {
      limit: 15,
      listStoreShop: [],
      count: 0,
      isFirstLoading: true,
      isRefresh: false,
      isLoadMore: false,
      isStop: false
    };
  }

  componentDidMount() {
    this.fetchListShop(false);
  }

  fetchListShop = (isLoadMore: boolean) => {
    let param: IAddressShopRequest = {
      skip: 0,
      limit: this.state.limit,
      status: 'active',
      keyword: this.keyword.trim(),
      is_app_visible: true
    };
    if (isLoadMore) {
      param.skip = this.state.listStoreShop.length;
    }

    getAddressShop<IAddressShopModel>(param)
      .then(res => {
        let arrShop: IAddressShopModel[] = this.state.listStoreShop;
        let isStop = false;
        if (res?.code) {
          isStop = true;
        } else {
          if (res?.data && res?.data?.length > 0) {
            if (isLoadMore) {
              arrShop = arrShop.concat(res?.data || []);
            } else {
              arrShop = res?.data || [];
            }
          } else {
            isStop = true;
          }
        }

        if (!isLoadMore) {
          Utilities.showHideRootLoading(false);
        }
        this.setState({
          isFirstLoading: false,
          isLoadMore: false,
          listStoreShop: arrShop,
          isRefresh: false,
          isStop,
          count: res?.count || 0
        });
      })
      .catch(() => {
        this.setState({
          isFirstLoading: false,
          isLoadMore: false,
          isRefresh: false,
          isStop: true,
          count: 0
        });
      });
  };

  searchShop = () => {
    Utilities.showHideRootLoading(true);
    this.fetchListShop(false);
  };

  renderItem = ({item}: {item: IAddressShopModel}) => {
    const {listStoreShop} = this.state;
    let checkItemFist;
    let checkItemLast;
    let styesBottom;
    let styesTop;
    if (listStoreShop) {
      checkItemFist = listStoreShop[0];
      checkItemLast = listStoreShop[listStoreShop.length - 1];
      if (checkItemFist?.id === item.id) {
        styesTop = {
          borderTopRightRadius: 6,
          borderTopLeftRadius: 6
        };
      }
      if (checkItemLast?.id === item.id) {
        styesBottom = {
          borderBottomRightRadius: 6,
          borderBottomLeftRadius: 6
        };
      }
    }
    return (
      <ItemShopMarker
        styleitem={[styesBottom, styesTop]}
        items={item}
        onPress={() => {
          MyNavigator.navigate<{store: IAddressShopModel}>('StoreDetails', {store: item});
        }}
      />
    );
  };
  keyExtractor = (item: any, index: number) => {
    return index.toString();
  };
  renderItemSeparatorComponent = () => {
    return <MyView style={storeStyles.itemSeparator} />;
  };

  reload = () => {
    this.setState({isRefresh: true}, () => {
      this.fetchListShop(false);
    });
  };

  renderListEmptyComponent = () => {
    const {isError, isFirstLoading} = this.props;
    if (isFirstLoading) {
      return <MyText style={storeStyles.txtAgain}>{MyI18n.trans.data_empty}</MyText>;
    } else {
      if (isError) {
        return (
          <MyView style={storeStyles.containerError} transparent>
            <MyText style={storeStyles.txtAgain}>{MyI18n.trans.error_message}</MyText>
            <MyButtonText
              onPress={this.reload}
              title={MyI18n.trans.try_again}
              style={storeStyles.btnAgain}
            />
          </MyView>
        );
      } else {
        return <MyText style={storeStyles.txtAgain}>{MyI18n.trans.data_empty}</MyText>;
      }
    }
  };

  renderListHeader = () => {
    return (
      <MyView style={storeStyles.inputSearchStore}>
        <MyIcon
          style={storeStyles.inputSearch}
          iconFontType="FontAwesome"
          name="circle-o"
          color={MyTheme.themes.BG.BLACK}
          size={15}
        />
        <MyInput
          containerStyle={{flex: 1}}
          autoFocus={false}
          placeholder="Nhập tên cửa hàng bạn muốn tìm kiếm..."
          placeholderTextColor={'gray'}
          returnKeyType="search"
          onChangeText={(text: string) => {
            this.keyword = text;
          }}
          onSubmitEditing={this.searchShop}
        />
      </MyView>
    );
  };

  renderListFooterComponent = () => {
    const {isLoadMore} = this.props;
    if (isLoadMore) {
      return <LoadingList />;
    } else {
      return null;
    }
  };

  onEndReached = () => {
    const {isLoadMore, isStop, listStoreShop, count} = this.state;
    if (isLoadMore || isStop) {
      return;
    }
    if (listStoreShop.length >= count) return;
    this.setState(
      {
        isLoadMore: true
      },
      () => {
        this.fetchListShop(true);
      }
    );
  };

  render() {
    const {listStoreShop, isRefresh} = this.state;
    return (
      <MyView style={storeStyles.container}>
        {this.renderListHeader()}

        <FlatList
          keyboardShouldPersistTaps="handled"
          showsHorizontalScrollIndicator={false}
          refreshControl={
            <RefreshControl onRefresh={this.reload} refreshing={isRefresh || false} />
          }
          showsVerticalScrollIndicator={false}
          style={storeStyles.list}
          initialNumToRender={16}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderItem}
          contentContainerStyle={storeStyles.contentList}
          ItemSeparatorComponent={this.renderItemSeparatorComponent}
          ListEmptyComponent={this.renderListEmptyComponent}
          onEndReachedThreshold={0.5}
          onEndReached={this.onEndReached}
          ListFooterComponent={this.renderListFooterComponent}
          data={listStoreShop}
          extraData={listStoreShop}
        />
      </MyView>
    );
  }
}
export default StoreScreen;
