import {MyView} from 'bases/components';
import React, {PureComponent} from 'react';
import {FlatList} from 'react-native';
import {connect} from 'react-redux';
import MyNavigator from 'utils/MyNavigator';
import {ItemGift} from 'views/app/components';
import {RootState} from 'views/app/redux';
import {giftStyle} from './styles/Gift.Styles';
const data = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
interface IAppProps {
  arrGift?: any;
}
class Gift extends PureComponent<IAppProps> {
  arrDoiQuaTang: any = [];
  onPress = () => {
    MyNavigator.navigate('GiftDetail', {gift: 'id'});
  };
  keyExtractor = (item: any) => {
    return item.toString();
  };

  renderItem = ({item}: {item: any}) => {
    return (
      <ItemGift
        title={'Son kem lì Black Rouge 200k' + item}
        point={20}
        nameGift="Dingtea"
        image={'https://i.pinimg.com/564x/b8/fd/f5/b8fdf550338f7364b4e4055c13b74ac2.jpg'}
        onPress={this.onPress}
      />
    );
  };
  renderItemSeparatorComponent = () => {
    return <MyView style={giftStyle.itemSeparator} />;
  };
  render() {
    return (
      // <MyView style={giftStyle.containerDoiQua}>
      <FlatList
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        style={giftStyle.list}
        contentContainerStyle={giftStyle.contentList}
        data={data}
        extraData={data}
        initialNumToRender={12}
        keyExtractor={this.keyExtractor}
        renderItem={this.renderItem}
        ItemSeparatorComponent={this.renderItemSeparatorComponent}
      />
      // </MyView>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  const {iso, theme} = state.SettingReducer;
  return {iso, theme};
};

export default connect(mapStateToProps, null)(Gift);
