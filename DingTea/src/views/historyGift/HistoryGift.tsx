import React, {PureComponent} from 'react';
import {FlatList, RefreshControl} from 'react-native';

import {ItemGift} from 'views/app/components';
import {historyGiftStyles} from './style/historyGift.Style';
import {LoadingList, MyButtonText, MyText, MyView} from 'bases/components';
import {ISettingState} from 'views/setting/redux';
import {getListHistoryGift, IHistoryGiftState, showRefresh, showLoadmore} from './redux';
import {RootState} from 'views/app/redux';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import MyI18n from 'utils/MyI18n';
let data: any = [0, 1, 2, 3, 4, 5, 6, 7, 8];
interface IProps extends ISettingState, IHistoryGiftState {
  getListHistoryGift: typeof getListHistoryGift;
  showRefresh: typeof showRefresh;
  showLoadmore: typeof showLoadmore;
}
export class HistoryGift extends PureComponent<IProps> {
  componentDidMount() {
    const {historyGift} = this.props;
    if (historyGift?.length === 0) {
      // this.props.getListHistoryGift({skip: 0, limit: 10, is_app_visible: true});
    }
  }

  reload = () => {
    const {isFirstLoading, isLoadmore} = this.props;
    if (!isFirstLoading && !isLoadmore) {
      this.props.showRefresh(true);
      // this.props.getListHistoryGift({skip: 0, limit: 10, is_app_visible: true});
    }
  };
  renderListEmptyComponent = () => {
    const {isError, isFirstLoading} = this.props;
    if (isFirstLoading) {
      return <LoadingList />;
    } else {
      if (isError) {
        return (
          <MyView style={historyGiftStyles.containerError}>
            <MyText style={historyGiftStyles.txtAgain}>{MyI18n.trans.error_message}</MyText>
            <MyButtonText
              onPress={this.reload}
              title={MyI18n.trans.try_again}
              style={historyGiftStyles.btnAgain}
            />
          </MyView>
        );
      } else {
        return <MyText style={historyGiftStyles.txtAgain}>{MyI18n.trans.data_empty}</MyText>;
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
    const {isLoadmore, isStop} = this.props;
    if (isLoadmore || isStop) {
      return;
    }
    this.props.showLoadmore(true);
    // this.props.getListHistoryGift({skip: historyGift?.length || 0, limit: 10, is_app_visible: true});
  };
  keyExtractor = (_item: any, index: number) => {
    return index.toString();
  };

  renderItem = () => {
    return <ItemGift isGifted />;
  };

  renderItemSeparatorComponent = () => {
    return <MyView style={historyGiftStyles.itemSeparator} />;
  };

  render() {
    const {historyGift, isRefresh} = this.props;
    return (
      <FlatList
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        style={historyGiftStyles.list}
        contentContainerStyle={historyGiftStyles.contentList}
        refreshControl={<RefreshControl onRefresh={this.reload} refreshing={isRefresh || false} />}
        data={data || historyGift}
        extraData={data || historyGift}
        initialNumToRender={12}
        keyExtractor={this.keyExtractor}
        renderItem={this.renderItem}
        ItemSeparatorComponent={this.renderItemSeparatorComponent}
        ListEmptyComponent={this.renderListEmptyComponent}
        // ListFooterComponent={this.renderListFooterComponent}
        onEndReachedThreshold={0.5}
        onEndReached={this.onEndReached}
      />
    );
  }
}

const mapStateToProps = (state: RootState) => {
  const {iso} = state.SettingReducer;
  const {
    isRefresh,
    historyGift,
    isError,
    isFirstLoading,
    isLoadmore,
    isStop
  } = state.HistoryGiftReducer;
  return {iso, isRefresh, historyGift, isError, isFirstLoading, isLoadmore, isStop};
};

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      getListHistoryGift,
      showRefresh,
      showLoadmore
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(HistoryGift);
