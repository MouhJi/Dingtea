import {LoadingList, MyButtonText, MyText, MyView} from 'bases/components';
import React, {PureComponent} from 'react';
import {FlatList, RefreshControl} from 'react-native';
import {connect} from 'react-redux';
import MyI18n from 'utils/MyI18n';
import {bindActionCreators} from 'redux';
import ItemNotification from 'views/app/components/ItemNofitication';
import {RootState} from 'views/app/redux';
import {menuStyles} from 'views/menu/style/Menu.Style';
import {ISettingState} from 'views/setting/redux';
import {getListNotify, INotifyState, showRefresh, showLoadmore} from './redux';
import {notifyStyles} from './style/Notify.Style';
let data: any = [0, 1, 2, 3, 4, 5, 6, 7, 8];
interface IProps extends ISettingState, INotifyState {
  getListNotify: typeof getListNotify;
  showRefresh: typeof showRefresh;
  showLoadmore: typeof showLoadmore;
}

class Notification extends PureComponent<IProps> {
  componentDidMount() {
    const {listNotify} = this.props;
    if (listNotify?.length === 0) {
      this.props.getListNotify({skip: 0, limit: 10});
    }
  }
  reload = () => {
    const {isFirstLoading, isLoadmore} = this.props;
    if (!isFirstLoading && !isLoadmore) {
      this.props.showRefresh(true);
      this.props.getListNotify({skip: 0, limit: 10});
    }
  };

  keyExtractor = (_item: any, index: number) => {
    return index.toString();
  };

  renderItem = () => {
    return <ItemNotification />;
  };

  renderItemSeparatorComponent = () => {
    return <MyView style={notifyStyles.itemSeparator} />;
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
    const {listNotify, isLoadmore, isStop} = this.props;
    if (isLoadmore || isStop) {
      return;
    }
    this.props.showLoadmore(true);
    this.props.getListNotify({skip: listNotify?.length || 0, limit: 10});
  };

  render() {
    const {listNotify, isRefresh} = this.props;
    return (
      <FlatList
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        style={notifyStyles.list}
        refreshControl={<RefreshControl onRefresh={this.reload} refreshing={isRefresh || false} />}
        contentContainerStyle={notifyStyles.contentList}
        data={data || listNotify}
        extraData={data || listNotify}
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
  const {isRefresh, listNotify, isError, isFirstLoading, isLoadmore, isStop} = state.NotifyReducer;
  return {iso, isRefresh, listNotify, isError, isFirstLoading, isLoadmore, isStop};
};

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      getListNotify,
      showRefresh,
      showLoadmore
    },
    dispatch
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(Notification);
