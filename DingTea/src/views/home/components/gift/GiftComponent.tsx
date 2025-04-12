import React, {PureComponent} from 'react';
import {FlatList} from 'react-native';

import {giftStyles, listMenuComponent} from 'views/home/style/Home.Style';

import {ItemMenuSvg} from 'views/app/components/ItemMenu';

import {ISettingState} from 'views/setting/redux';
import MyNavigator from 'utils/MyNavigator';
import {MyButton, MyView, MyIcon, MyText} from 'bases/components';
import {getListCateGift} from 'services';
import {IGiftCateModel} from 'models';
import MyI18n from 'utils/MyI18n';

interface defaultProps extends ISettingState {}

interface IStates {
  arrCateGift: IGiftCateModel[] | undefined;
}

let data: any = [
  'http://raw.csell.vn/dingtea/public/cosmetics.svg',
  'http://raw.csell.vn/dingtea/public/giftcode.svg',
  'http://raw.csell.vn/dingtea/public/lipstick.svg',
  'http://raw.csell.vn/dingtea/public/phone.svg',
  'http://raw.csell.vn/dingtea/public/fastfood.svg',
  'http://raw.csell.vn/dingtea/public/jewelry.svg',
  'http://raw.csell.vn/dingtea/public/perfume.svg'
];
export default class GiftComponent extends PureComponent<defaultProps, IStates> {
  state = {arrCateGift: []};

  showAll = () => {
    MyNavigator.navigate('Promotion');
  };

  componentDidMount() {
    getListCateGift<IGiftCateModel>({skip: 0, limit: 7})
      .then(res => {
        if (!res?.code) {
          this.setState({
            arrCateGift: res?.data
          });
        }
      })
      .catch(() => {});
  }

  keyExtractor = (_item: any, index: number) => {
    return index.toString();
  };

  renderItem = ({item}: {item: IGiftCateModel}) => {
    return <ItemMenuSvg url={item} isShowTitle />;
  };

  renderFooter = () => {
    return (
      <MyButton style={giftStyles.containerBtnAll} onPress={this.showAll} transparent>
        <MyView style={listMenuComponent.containerBtn} transparent>
          <MyView style={listMenuComponent.contentBtn}>
            <MyIcon
              iconFontType="AntDesign"
              name="arrowright"
              size={listMenuComponent.icon.fontSize}
              color={listMenuComponent.icon.color}
              style={listMenuComponent.icon}
            />
          </MyView>
        </MyView>
        <MyText style={listMenuComponent.textAll} fontStyle="Bold" numberOfLines={1}>
          {MyI18n.trans.all}
        </MyText>
      </MyButton>
    );
  };

  render() {
    return (
      <MyView style={giftStyles.container}>
        <MyText style={giftStyles.title} numberOfLines={1} fontStyle="Bold">
          {MyI18n.trans.gifts_for_you}
        </MyText>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={giftStyles.containerList}
          data={data}
          extraData={data}
          initialNumToRender={12}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderItem}
          ListFooterComponent={this.renderFooter}
        />
      </MyView>
    );
  }
}
