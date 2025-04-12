import React, {PureComponent} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';

import {connect} from 'react-redux';
import MyI18n from 'utils/MyI18n';
import {bindActionCreators} from 'redux';
import {RootState} from 'views/app/redux/App.Reducer';

import {searchStyles} from './style/Search.Style';

import MyNavigator from 'utils/MyNavigator';
import {ItemProduct} from 'views/app/components';
import {FlatList, RefreshControl} from 'react-native';
import {
  MyView,
  LoadingList,
  MyButtonIcon,
  MyIcon,
  MyInput,
  MyText,
  MyButtonText
} from 'bases/components';
import {ISearchState, searchListProduct, showRefresh, showLoadmore, reset} from './redux';
import {ISettingState} from 'views/setting/redux';
import {IProductModel} from 'models';

interface IProps extends ISettingState, ISearchState {
  searchListProduct: typeof searchListProduct;
  showRefresh: typeof showRefresh;
  showLoadmore: typeof showLoadmore;
  reset: typeof reset;
}

class Search extends PureComponent<IProps> {
  keyword: string = '';

  componentWillUnmount() {
    this.props.reset();
  }

  searchProduct = () => {
    this.props.showRefresh(true);
    this.props.searchListProduct({
      skip: 0,
      limit: 10,
      statuses: 'active',
      keyword: this.keyword.trim(),
      types: 'item'
    });
  };

  reload = () => {
    const {isFirstLoading, isLoadmore} = this.props;
    if (!isFirstLoading && !isLoadmore) {
      this.props.showRefresh(true);
      this.props.searchListProduct({
        skip: 0,
        limit: 10,
        statuses: 'active',
        keyword: this.keyword.trim(),
        types: 'item'
      });
    }
  };

  keyExtractor = (_item: any, index: number) => {
    return index.toString();
  };

  renderItem = ({item}: {item: IProductModel}) => {
    return <ItemProduct data={item} />;
  };

  renderItemSeparatorComponent = () => {
    return <MyView style={searchStyles.itemSeparator} />;
  };

  renderListEmptyComponent = () => {
    const {isError, isFirstLoading} = this.props;
    if (isFirstLoading) {
      return <MyText style={searchStyles.txtAgain}>{MyI18n.trans.data_empty}</MyText>;
    } else {
      if (isError) {
        return (
          <MyView style={searchStyles.containerError}>
            <MyText style={searchStyles.txtAgain}>{MyI18n.trans.error_message}</MyText>
            <MyButtonText
              onPress={this.reload}
              title={MyI18n.trans.try_again}
              style={searchStyles.btnAgain}
            />
          </MyView>
        );
      } else {
        return <MyText style={searchStyles.txtAgain}>{MyI18n.trans.data_empty}</MyText>;
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
    this.props.searchListProduct({
      skip: data?.length || 0,
      limit: 10,
      statuses: 'active',
      keyword: this.keyword.trim(),
      types: 'item'
    });
  };

  render() {
    const {data, isRefresh} = this.props;

    return (
      <MyView style={searchStyles.contentView}>
        <SafeAreaView style={searchStyles.container} edges={['top']}>
          <MyView style={searchStyles.content} transparent>
            <MyButtonIcon
              iconFontType={'AntDesign'}
              iconProps={{name: 'arrowleft', size: 26}}
              style={searchStyles.left}
              onPress={() => MyNavigator.goBack()}
            />
            <MyView style={searchStyles.contentSearch}>
              <MyIcon
                iconFontType="AntDesign"
                size={searchStyles.iconSearch.fontSize}
                name="search1"
                color={searchStyles.iconSearch.color}
              />
              <MyInput
                autoFocus={true}
                containerStyle={searchStyles.containerSearch}
                style={searchStyles.inputSearch}
                placeholder="Ding Tea"
                returnKeyType="search"
                onChangeText={text => {
                  this.keyword = text;
                }}
                onSubmitEditing={this.searchProduct}
              />
            </MyView>
          </MyView>
        </SafeAreaView>

        <FlatList
          keyboardShouldPersistTaps="handled"
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl onRefresh={this.reload} refreshing={isRefresh || false} />
          }
          style={searchStyles.contentView}
          contentContainerStyle={searchStyles.contentList}
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
      </MyView>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  const {iso} = state.SettingReducer;
  const {isRefresh, data, isError, isFirstLoading, isLoadmore, isStop} = state.SearchReducer;
  return {iso, isRefresh, data, isError, isFirstLoading, isLoadmore, isStop};
};

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      searchListProduct,
      showRefresh,
      showLoadmore,
      reset
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
