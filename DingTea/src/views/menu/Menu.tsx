import React, {PureComponent} from 'react';
import {FlatList, RefreshControl} from 'react-native';

import {connect} from 'react-redux';
import MyI18n from 'utils/MyI18n';
import {bindActionCreators} from 'redux';
import {RootState} from 'views/app/redux/App.Reducer';

import {ItemMenuDetail} from 'views/app/components/ItemMenu';
import {menuStyles} from './style/Menu.Style';
import {LoadingList, MyButtonText, MyText, MyView} from 'bases/components';

import {getListCate, IMenuState, showRefresh, showLoadmore} from './redux';
import {ISettingState} from 'views/setting/redux';
import {ICategoryModel} from 'models';

interface IProps extends ISettingState, IMenuState {
  getListCate: typeof getListCate;
  showRefresh: typeof showRefresh;
  showLoadmore: typeof showLoadmore;
}

class Menu extends PureComponent<IProps> {
  componentDidMount() {
    const {data} = this.props;
    if (data?.length === 0) {
      this.props.getListCate({skip: 0, limit: 10, is_app_visible: true});
    }
  }

  reload = () => {
    const {isFirstLoading, isLoadmore} = this.props;
    if (!isFirstLoading && !isLoadmore) {
      this.props.showRefresh(true);
      this.props.getListCate({skip: 0, limit: 10, is_app_visible: true});
    }
  };

  keyExtractor = (_item: any, index: number) => {
    return index.toString();
  };

  renderItem = ({item}: {item: ICategoryModel}) => {
    return <ItemMenuDetail data={item} />;
  };

  renderItemSeparatorComponent = () => {
    return <MyView style={menuStyles.itemSeparator} />;
  };

  renderListEmptyComponent = () => {
    const {isError, isFirstLoading} = this.props;
    if (isFirstLoading) {
      return <LoadingList />;
    } else {
      if (isError) {
        return (
          <MyView style={menuStyles.containerError}>
            <MyText style={menuStyles.txtAgain}>{MyI18n.trans.error_message}</MyText>
            <MyButtonText
              onPress={this.reload}
              title={MyI18n.trans.try_again}
              style={menuStyles.btnAgain}
            />
          </MyView>
        );
      } else {
        return <MyText style={menuStyles.txtAgain}>{MyI18n.trans.data_empty}</MyText>;
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
    this.props.getListCate({skip: data?.length || 0, limit: 10, is_app_visible: true});
  };

  render() {
    const {data, isRefresh} = this.props;

    return (
      <FlatList
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl onRefresh={this.reload} refreshing={isRefresh || false} />}
        style={menuStyles.list}
        contentContainerStyle={menuStyles.contentList}
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
  const {isRefresh, data, isError, isFirstLoading, isLoadmore, isStop} = state.MenuReducer;
  return {iso, isRefresh, data, isError, isFirstLoading, isLoadmore, isStop};
};

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      getListCate,
      showRefresh,
      showLoadmore
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
