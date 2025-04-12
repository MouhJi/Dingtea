import {MyButton, MyIcon, MyText, MyView} from 'bases/components';
import React, {PureComponent} from 'react';
import {FlatList} from 'react-native';
import MyI18n from 'utils/MyI18n';
import MyNavigator from 'utils/MyNavigator';
import {ItemGiftDetail} from 'views/app/components';
import {tabGiftStyle} from 'views/tichDiem/style/TichDiem.Style';

const data = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
export default class headerQuaTang extends PureComponent {
  showAll = () => {
    MyNavigator.navigate('Gift');
  };

  keyExtractor = (_item: any, index: number) => {
    return index.toString();
  };
  onPress = () => {
    MyNavigator.navigate('GiftDetail', {gift: 'id'});
  };
  renderItem = ({item}: {item: any}) => {
    return (
      <ItemGiftDetail
        title={'Son kem lì Black Rouge 200k' + item}
        point={20}
        nameGift="Dingtea"
        image={'https://i.pinimg.com/564x/b8/fd/f5/b8fdf550338f7364b4e4055c13b74ac2.jpg'}
        onPress={this.onPress}
      />
    );
  };

  renderItemSeparatorComponent = () => {
    return <MyView transparent style={tabGiftStyle.itemSeparator} />;
  };

  renderFooter = () => {
    return (
      <MyButton transparent style={tabGiftStyle.containerBtnAll} onPress={this.showAll}>
        <MyView style={tabGiftStyle.containerBtn} transparent>
          <MyView style={tabGiftStyle.contentBtn}>
            <MyIcon
              iconFontType="AntDesign"
              name="arrowright"
              size={tabGiftStyle.icon.fontSize}
              color={tabGiftStyle.icon.color}
              style={tabGiftStyle.icon}
            />
          </MyView>
        </MyView>
        <MyText style={tabGiftStyle.textAll} fontStyle="Bold" numberOfLines={1}>
          {MyI18n.trans.all}
        </MyText>
      </MyButton>
    );
  };
  render() {
    return (
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={tabGiftStyle.containerList}
        data={data}
        extraData={data}
        initialNumToRender={12}
        keyExtractor={this.keyExtractor}
        renderItem={this.renderItem}
        ItemSeparatorComponent={this.renderItemSeparatorComponent}
        ListFooterComponent={this.renderFooter}
      />
    );
  }
}
