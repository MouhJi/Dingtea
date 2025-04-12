import React, {createRef, PureComponent} from 'react';

import {connect} from 'react-redux';
import MyI18n from 'utils/MyI18n';
import {RootState} from 'views/app/redux/App.Reducer';

import {ISettingState} from 'views/setting/redux';
import {Alert, FlatList, ScrollView} from 'react-native';
import {promotionStyles} from './style/Promotion.Style';
import ItemGift from 'views/app/components/ItemGift';
import {COLOR} from 'bases/styles/Core';

import ModalGift from './components/ModalGift';
import {MyView, MyInput, MyButtonIcon, MyText, MyToolbar, LoadingList} from 'bases/components';
import TotalPointComponent from 'views/accounts/person/component/TotalPointComponent';
import {IPersonState} from 'views/accounts/person/redux';
import {LoginView} from 'views/accounts/person/component';
let data: any = [0, 1, 2, 3, 4, 5, 6, 7, 8];

interface defaultProps extends ISettingState, IPersonState {}

interface IStates {
  showModal: boolean;
}

class Promotion extends PureComponent<defaultProps, IStates> {
  state = {showModal: false};
  modalRef: any = createRef();

  keyExtractor = (_item: any, index: number) => {
    return index.toString();
  };

  renderItem = () => {
    return <ItemGift />;
  };

  renderItemSeparatorComponent = () => {
    return <MyView style={promotionStyles.itemSeparator} />;
  };

  renderListEmptyComponent = () => {
    return <LoadingList />;
  };

  handleFillter = () => {
    Alert.alert('Chọn lọc');
  };

  renderHeader = () => {
    return (
      <MyView style={promotionStyles.viewHeader}>
        <TotalPointComponent
          styleContainer={promotionStyles.totalPoint}
          titlePoint={MyI18n.trans.point}
        />
        <MyView style={promotionStyles.viewSearch}>
          <MyInput
            returnKeyType="search"
            placeholder={MyI18n.trans.find_Gift}
            containerStyle={promotionStyles.viewInput}
          />
          <MyButtonIcon
            onPress={this.onShowModal}
            style={promotionStyles.btnFillter}
            iconFontType="AntDesign"
            iconProps={{
              name: 'filter',
              color: COLOR.BG.WHITE,
              size: 14
            }}
          />
        </MyView>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <MyView style={promotionStyles.contentPromotion} transparent>
            <MyText
              style={promotionStyles.textPromotion}
              fontStyle="SemiBold"
              onPress={this.handleFillter}>
              {MyI18n.trans.lowest_score}
            </MyText>
            <MyText
              onPress={this.handleFillter}
              style={[promotionStyles.textPromotion, promotionStyles.txtUnselect]}
              fontStyle="SemiBold">
              {MyI18n.trans.highest_score}
            </MyText>
            <MyText
              onPress={this.handleFillter}
              style={[promotionStyles.textPromotion, promotionStyles.txtUnselect]}
              fontStyle="SemiBold">
              {MyI18n.trans.most_popular}
            </MyText>
          </MyView>
        </ScrollView>
        <MyText fontStyle="Bold" style={promotionStyles.txtAll}>
          {MyI18n.trans.all}
        </MyText>
      </MyView>
    );
  };

  onShowModal = () => {
    this.modalRef.current.onShow();
  };

  render() {
    const {id} = this.props;

    let _viewContent = id ? (
      <FlatList
        ListHeaderComponent={this.renderHeader}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        style={promotionStyles.list}
        contentContainerStyle={promotionStyles.contentList}
        data={data}
        extraData={data}
        initialNumToRender={12}
        keyExtractor={this.keyExtractor}
        renderItem={this.renderItem}
        ItemSeparatorComponent={this.renderItemSeparatorComponent}
        ListEmptyComponent={this.renderListEmptyComponent}
      />
    ) : (
      <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
        {/* <LoginView  /> */}
        <LoginView />
      </ScrollView>
    );
    return (
      <MyView style={promotionStyles.container}>
        <MyToolbar title={MyI18n.trans.gift} />
        {_viewContent}
        <ModalGift ref={this.modalRef} titleButton={MyI18n.trans.fillter} />
      </MyView>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  const {iso} = state.SettingReducer;
  const {id} = state.PersonReducer;
  return {iso, id};
};

export default connect(mapStateToProps, null)(Promotion);
