import React, {PureComponent} from 'react';

import {MyView, LoadingList, MyText, MyButtonText} from 'bases/components';
import {ItemBlogDetal} from 'views/app/components';
import {blogDetailStyles} from './style/Blog.Style';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import MyI18n from 'utils/MyI18n';
import {RootState} from 'views/app/redux';
import {RefreshControl, FlatList} from 'react-native';
import {getListBlog, IBlogState, showRefresh, showLoadmore} from './redux';
import {IBlogModel} from 'models';
interface IProps extends IBlogState {
  getListBlog: typeof getListBlog;
  showRefresh: typeof showRefresh;
  showLoadmore: typeof showLoadmore;
}

class Blog extends PureComponent<IProps> {
  componentDidMount() {
    const {listBlog} = this.props;
    if (listBlog?.length === 0) {
      this.props.getListBlog({skip: 0, limit: 10});
    }
  }

  reload = () => {
    const {isFirstLoading, isLoadmore} = this.props;
    if (!isFirstLoading && !isLoadmore) {
      this.props.showRefresh(true);
      this.props.getListBlog({skip: 0, limit: 10});
    }
  };

  renderListEmptyComponent = () => {
    const {isError, isFirstLoading} = this.props;
    if (isFirstLoading) {
      return <LoadingList />;
    } else {
      if (isError) {
        return (
          <MyView style={blogDetailStyles.containerError}>
            <MyText style={blogDetailStyles.txtAgain}>{MyI18n.trans.error_message}</MyText>
            <MyButtonText
              onPress={this.reload}
              title={MyI18n.trans.try_again}
              style={blogDetailStyles.btnAgain}
            />
          </MyView>
        );
      } else {
        return <MyText style={blogDetailStyles.txtAgain}>{MyI18n.trans.data_empty}</MyText>;
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
    const {listBlog, isLoadmore, isStop} = this.props;
    if (isLoadmore || isStop) {
      return;
    }
    this.props.showLoadmore(true);
    this.props.getListBlog({skip: listBlog?.length || 0, limit: 10});
  };

  keyExtractor = (_item: any, index: number) => {
    return index.toString();
  };

  renderItem = ({item}: {item: IBlogModel}) => {
    return <ItemBlogDetal itemBlog={item} />;
  };

  renderItemSeparatorComponent = () => {
    return <MyView style={blogDetailStyles.itemSeparator} />;
  };

  render() {
    const {listBlog, isRefresh} = this.props;
    return (
      <FlatList
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl onRefresh={this.reload} refreshing={isRefresh || false} />}
        style={blogDetailStyles.list}
        contentContainerStyle={blogDetailStyles.contentList}
        data={listBlog}
        extraData={listBlog}
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
  const {isRefresh, listBlog, isError, isFirstLoading, isLoadmore, isStop} = state.BlogReducer;
  return {isRefresh, listBlog, isError, isFirstLoading, isLoadmore, isStop, iso};
};

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      getListBlog,
      showRefresh,
      showLoadmore
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Blog);
