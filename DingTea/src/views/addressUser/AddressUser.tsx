import React, {createRef, PureComponent} from 'react';
import {FlatList, RefreshControl} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {connect} from 'react-redux';
import MyI18n from 'utils/MyI18n';
import {bindActionCreators} from 'redux';
import {RootState} from 'views/app/redux/App.Reducer';

import {ISettingState} from 'views/setting/redux';
import ItemAddressUser from './components/ItemAddressUser';
import {addressStyles} from './style/AddressUser.Style';
import {MyView, MyButtonText, MyText, LoadingList, MyInput} from 'bases/components';
import MyNavigator from 'utils/MyNavigator';
import {
  IAddressUserState,
  showRefresh,
  showLoadmore,
  getListAddressUser,
  reset,
  setKeywordAddress
} from './redux';
import {IAddressUserModal} from 'models';
import MyStaticLocal from 'utils/MyStaticLocal';
import {chooseAddressUser} from 'views/app/reduxChooseAddressUser';
import MyStorage from 'utils/MyStorage';
import {ADDRESS_USER_CHOOSE} from 'common/KeyStorages';
import Utilities from 'utils/Utilities';

interface defaultProps extends ISettingState, IAddressUserState {
  getListAddressUser: typeof getListAddressUser;
  showRefresh: typeof showRefresh;
  showLoadmore: typeof showLoadmore;
  chooseAddressUser: typeof chooseAddressUser;
  reset: typeof reset;
  setKeywordAddress: typeof setKeywordAddress;
}

class AddressUser extends PureComponent<defaultProps> {
  inputSearchRef: any = createRef();

  componentDidMount() {
    const {keyword} = this.props;
    this.props.getListAddressUser({
      skip: 0,
      limit: 10,
      user: MyStaticLocal.getUser()?.id,
      keyword: keyword?.trim()
    });
  }

  componentWillUnmount() {
    this.props.reset();
  }

  searchAddressUser = () => {
    const {keyword} = this.props;
    this.props.showRefresh(true);
    this.props.getListAddressUser({
      skip: 0,
      limit: 10,
      user: MyStaticLocal.getUser()?.id,
      keyword: keyword?.trim()
    });
  };

  reload = () => {
    const {isFirstLoading, isLoadmore, keyword} = this.props;
    if (!isFirstLoading && !isLoadmore) {
      this.props.showRefresh(true);
      this.props.getListAddressUser({
        skip: 0,
        limit: 10,
        user: MyStaticLocal.getUser()?.id,
        keyword: keyword?.trim()
      });
    }
  };

  pressItem = (item: IAddressUserModal) => {
    MyStorage.create(ADDRESS_USER_CHOOSE, item);
    this.props.chooseAddressUser(item);
    MyNavigator.goBack();
  };

  pressEditItem = (item: IAddressUserModal) => {
    MyNavigator.navigate('AddressUserAdd', {addressUser: item});
  };

  onPressAdd = () => {
    MyNavigator.navigate('AddressUserAdd');
  };

  renderListHeader = () => {
    const {keyword} = this.props;
    return (
      <MyInput
        inputRef={this.inputSearchRef}
        autoFocus={false}
        containerStyle={addressStyles.contentSearch}
        style={addressStyles.inputSearch}
        placeholder={MyI18n.trans.find_a_your_address}
        returnKeyType="search"
        defaultValue={keyword}
        onChangeText={text => {
          this.props.setKeywordAddress(text);
        }}
        onSubmitEditing={this.searchAddressUser}
      />
    );
  };

  keyExtractor = (item: IAddressUserModal) => {
    return item.id?.toString() || Utilities.randomNumber().toString();
  };

  renderItem = ({item}: {item: IAddressUserModal}) => {
    return (
      <ItemAddressUser onPress={this.pressItem} data={item} onPressEdit={this.pressEditItem} />
    );
  };

  renderItemSeparatorComponent = () => {
    return <MyView style={addressStyles.itemSeparator} transparent />;
  };

  renderListEmptyComponent = () => {
    const {isError, isFirstLoading} = this.props;
    if (isFirstLoading) {
      return <LoadingList />;
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
    const {data, isLoadmore, isStop, keyword} = this.props;
    if (isLoadmore || isStop) {
      return;
    }
    this.props.showLoadmore(true);
    this.props.getListAddressUser({
      skip: data?.length || 0,
      limit: 10,
      user: MyStaticLocal.getUser()?.id,
      keyword: keyword?.trim()
    });
  };

  render() {
    const {data, isRefresh, isError} = this.props;

    return (
      <MyView style={addressStyles.container}>
        <FlatList
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl onRefresh={this.reload} refreshing={isRefresh || false} />
          }
          style={addressStyles.list}
          contentContainerStyle={addressStyles.contentList}
          data={data}
          extraData={data}
          initialNumToRender={12}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderItem}
          ItemSeparatorComponent={this.renderItemSeparatorComponent}
          ListEmptyComponent={this.renderListEmptyComponent}
          ListHeaderComponent={this.renderListHeader}
          ListFooterComponent={this.renderListFooterComponent}
          onEndReachedThreshold={0.5}
          onEndReached={this.onEndReached}
        />
        {isError ? null : (
          <SafeAreaView edges={['bottom']} style={addressStyles.safeView}>
            <MyButtonText
              title={MyI18n.trans.add_a_new_address}
              style={addressStyles.bottomButton}
              titleProps={{fontStyle: 'SemiBold'}}
              onPress={this.onPressAdd}
            />
          </SafeAreaView>
        )}
      </MyView>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  const {iso} = state.SettingReducer;
  const {
    isRefresh,
    data,
    isError,
    isFirstLoading,
    isLoadmore,
    isStop,
    keyword
  } = state.AddressUserReducer;
  return {iso, isRefresh, data, isError, isFirstLoading, isLoadmore, isStop, keyword};
};

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      getListAddressUser,
      setKeywordAddress,
      showRefresh,
      showLoadmore,
      reset,
      chooseAddressUser
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(AddressUser);
