import React, {PureComponent} from 'react';
import {FlatList, RefreshControl} from 'react-native';

import {connect} from 'react-redux';
import MyI18n from 'utils/MyI18n';
import {bindActionCreators} from 'redux';
import {RootState} from 'views/app/redux/App.Reducer';

import {menuDetailStyles} from './style/MenuDetail.Style';
import ItemProduct from 'views/app/components/ItemProduct';
import {LoadingList, MyButtonText, MyText, MyView} from 'bases/components';
import {getListProducts, showRefresh, showLoadmore, IMenuDetailState, reset} from './redux';
import {ISettingState} from 'views/setting/redux';
import {ICategoryModel, IProductModel} from 'models';
import {getDetailCategory} from 'services';

interface IProps extends ISettingState, IMenuDetailState {
  getListProducts: typeof getListProducts;
  showRefresh: typeof showRefresh;
  showLoadmore: typeof showLoadmore;
  reset: typeof reset;

  route: any;
  navigation: any;
}

class MenuDetail extends PureComponent<IProps> {
  cateId: number;

  constructor(props: IProps) {
    super(props);
    this.cateId = this.props.route.params?.id || -1;
  }

  componentDidMount() {
    getDetailCategory<ICategoryModel>(this.cateId)
      .then(res => {
        if (!res?.code) {
          this.props.navigation.setOptions({title: res?.data?.name});
        }
      })
      .catch();

    this.props.getListProducts({
      skip: 0,
      limit: 10,
      categories: this.cateId,
      statuses: 'active',
      types: 'item'
    });
  }

  componentWillUnmount() {
    this.props.reset();
  }

  reload = () => {
    const {isFirstLoading, isLoadmore} = this.props;

    if (!isFirstLoading && !isLoadmore) {
      this.props.showRefresh(true);
      this.props.getListProducts({
        skip: 0,
        limit: 10,
        categories: this.cateId,
        statuses: 'active',
        types: 'item'
      });
    }
  };

  keyExtractor = (item: IProductModel) => {
    return item.id.toString();
  };

  renderItem = ({item}: {item: IProductModel}) => {
    return <ItemProduct data={item} />;
  };

  renderItemSeparatorComponent = () => {
    return <MyView style={menuDetailStyles.itemSeparator} />;
  };

  renderListEmptyComponent = () => {
    const {isError, isFirstLoading} = this.props;
    if (isFirstLoading) {
      return <LoadingList />;
    } else {
      if (isError) {
        return (
          <MyView style={menuDetailStyles.containerError}>
            <MyText style={menuDetailStyles.txtAgain}>{MyI18n.trans.error_message}</MyText>
            <MyButtonText
              onPress={this.reload}
              title={MyI18n.trans.try_again}
              style={menuDetailStyles.btnAgain}
            />
          </MyView>
        );
      } else {
        return <MyText style={menuDetailStyles.txtAgain}>{MyI18n.trans.data_empty}</MyText>;
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
    this.props.getListProducts({
      skip: data?.length || 0,
      limit: 10,
      categories: this.cateId,
      statuses: 'active',
      types: 'item'
    });
  };

  render() {
    const {data, isRefresh} = this.props;

    return (
      <FlatList
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl onRefresh={this.reload} refreshing={isRefresh || false} />}
        style={menuDetailStyles.list}
        contentContainerStyle={menuDetailStyles.contentList}
        data={data}
        extraData={data}
        initialNumToRender={12}
        keyExtractor={this.keyExtractor}
        renderItem={this.renderItem}
        ItemSeparatorComponent={this.renderItemSeparatorComponent}
        ListEmptyComponent={this.renderListEmptyComponent}
        ListFooterComponent={this.renderListFooterComponent}
        onEndReachedThreshold={0.5}
        onEndReached={this.onEndReached}
      />
    );
  }
}

const mapStateToProps = (state: RootState) => {
  const {iso} = state.SettingReducer;
  const {isRefresh, data, isError, isFirstLoading, isLoadmore, isStop} = state.MenuDetailReducer;
  return {iso, isRefresh, data, isError, isFirstLoading, isLoadmore, isStop};
};

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      getListProducts,
      showRefresh,
      showLoadmore,
      reset
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(MenuDetail);
