import React, {createRef, PureComponent} from 'react';
import {FlatList, RefreshControl} from 'react-native';

import {connect} from 'react-redux';
import MyI18n from 'utils/MyI18n';
import {RootState} from 'views/app/redux/App.Reducer';

import ItemComment from 'views/app/components/ItemComment';
import {cmtStyles} from './style/ProductComment.Style';

import {ISettingState} from 'views/setting/redux';
import {
  MyView,
  MyToolbar,
  MySingleChoice,
  LoadingList,
  MyText,
  MyButtonText
} from 'bases/components';
import {getListProComment, IProCommentState, showRefresh, showLoadmore} from './redux';
import {bindActionCreators} from 'redux';

let data: any = [0, 1, 2, 3, 4, 5, 6, 7, 8];
interface defaultProps extends ISettingState, IProCommentState {
  getListProComment: typeof getListProComment;
  showRefresh: typeof showRefresh;
  showLoadmore: typeof showLoadmore;
}
class ProductComment extends PureComponent<defaultProps> {
  showModalRef: any = createRef();
  componentDidMount() {
    const {listProComment} = this.props;
    if (listProComment?.length === 0) {
      this.props.getListProComment({skip: 0, limit: 10});
    }
  }

  reload = () => {
    const {isFirstLoading, isLoadmore} = this.props;
    if (!isFirstLoading && !isLoadmore) {
      this.props.showRefresh(true);
      this.props.getListProComment({skip: 0, limit: 10});
    }
  };
  renderListEmptyComponent = () => {
    const {isError, isFirstLoading} = this.props;
    if (isFirstLoading) {
      return <LoadingList />;
    } else {
      if (isError) {
        return (
          <MyView style={cmtStyles.containerError}>
            <MyText style={cmtStyles.txtAgain}>{MyI18n.trans.error_message}</MyText>
            <MyButtonText
              onPress={this.reload}
              title={MyI18n.trans.try_again}
              style={cmtStyles.btnAgain}
            />
          </MyView>
        );
      } else {
        return <MyText style={cmtStyles.txtAgain}>{MyI18n.trans.data_empty}</MyText>;
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
    const {listProComment, isLoadmore, isStop} = this.props;
    if (isLoadmore || isStop) {
      return;
    }
    this.props.showLoadmore(true);
    this.props.getListProComment({skip: listProComment?.length || 0, limit: 10});
  };

  showModal = () => {
    this.showModalRef.current.onShow();
  };

  keyExtractor = (_item: any, index: number) => {
    return index.toString();
  };

  renderItem = () => {
    return <ItemComment />;
  };

  renderItemSeparatorComponent = () => {
    return <MyView style={cmtStyles.itemSeparator} />;
  };

  chooseTieuChi = (item: {id: number; title: string}) => {
    // Utilities.log('Item id: ' + item.id + ' title: ' + item.title);
  };

  arrTieuChi = [
    {id: 5, title: '5 ' + MyI18n.trans.star},
    {id: 4, title: '4 ' + MyI18n.trans.star},
    {id: 3, title: '3 ' + MyI18n.trans.star},
    {id: 2, title: '2 ' + MyI18n.trans.star},
    {id: 1, title: '1 ' + MyI18n.trans.star}
  ];

  render() {
    const {listProComment, isRefresh} = this.props;

    return (
      <MyView style={cmtStyles.container}>
        <MyToolbar
          title={MyI18n.trans.evaluate}
          isShowBtnLeft
          isShowBtnRight
          onPressRight={this.showModal}
        />
        <FlatList
          showsHorizontalScrollIndicator={false}
          refreshControl={
            <RefreshControl onRefresh={this.reload} refreshing={isRefresh || false} />
          }
          showsVerticalScrollIndicator={false}
          style={cmtStyles.list}
          contentContainerStyle={cmtStyles.contentList}
          data={data || listProComment}
          extraData={data || listProComment}
          initialNumToRender={12}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderItem}
          ItemSeparatorComponent={this.renderItemSeparatorComponent}
          ListEmptyComponent={this.renderListEmptyComponent}
        />
        <MySingleChoice
          ref={this.showModalRef}
          titleModal={MyI18n.trans.filter_by_number_of_stars}
          tieuChiDaChonId={0}
          onChange={this.chooseTieuChi}
          arrTieuChi={this.arrTieuChi}
        />
      </MyView>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  const {iso} = state.SettingReducer;
  const {
    isRefresh,
    listProComment,
    isError,
    isFirstLoading,
    isLoadmore,
    isStop
  } = state.ProCommentReducer;
  return {iso, isRefresh, listProComment, isError, isFirstLoading, isLoadmore, isStop};
};
const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      getListProComment,
      showRefresh,
      showLoadmore
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductComment);
