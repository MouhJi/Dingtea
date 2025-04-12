import {MyView, MyViewShadow} from 'bases/components';
import React, {PureComponent} from 'react';
import {FlatList} from 'react-native';
import MyNavigator from 'utils/MyNavigator';
import {ItemGift} from 'views/app/components';
import {tabtichDiemStyle} from 'views/tichDiem/style/TichDiem.Style';

const data = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
interface IAppProps {
  arrGift?: any;
}
export default class DoiQuaTangComponent extends PureComponent<IAppProps> {
  arrDoiQuaTang: any = [];
  onPress = () => {
    MyNavigator.navigate('GiftDetail', {gift: 'id'});
  };
  keyExtractor = (item: any) => {
    return item.toString();
  };

  renderItem = ({item, index}: {item: any; index: any}) => {
    return (
      <MyView key={item} transparent>
        <ItemGift
          title={'Son kem lì Black Rouge 200k' + index + '   ' + item}
          point={20}
          nameGift="Dingtea"
          image={'https://i.pinimg.com/564x/b8/fd/f5/b8fdf550338f7364b4e4055c13b74ac2.jpg'}
          onPress={this.onPress}
        />
        {/* 2 phần tử view ren 1 line, nếu tăng lên thì sửa lại logic view */}
        {index === 0 ? this.renderItemSeparatorComponent() : null}
      </MyView>
    );
  };
  renderItemSeparatorComponent = () => {
    return <MyView style={tabtichDiemStyle.itemSeparator} />;
  };
  render() {
    this.arrDoiQuaTang = data.slice(0, 2);
    return (
      <MyViewShadow style={tabtichDiemStyle.containerDoiQua}>
        <MyView style={tabtichDiemStyle.contentList}>
          {this.arrDoiQuaTang.map((item: any, index: any) => this.renderItem({item, index}))}
        </MyView>
      </MyViewShadow>
    );
  }
}
