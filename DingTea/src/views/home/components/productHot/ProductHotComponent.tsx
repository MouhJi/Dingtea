import {MyView, MyText} from 'bases/components';
import {IProductModel} from 'models';
import React, {PureComponent} from 'react';
import {FlatList} from 'react-native';
import {getListProduct} from 'services';
import MyI18n from 'utils/MyI18n';

import ItemProductHot from 'views/app/components/ItemProductHot';
import {productHotStyles} from 'views/home/style/Home.Style';

import {ISettingState} from 'views/setting/redux';

interface defaultProps extends ISettingState {}

interface IStates {
  arrProduct: IProductModel[] | undefined;
}

export default class ProductHotComponent extends PureComponent<defaultProps, IStates> {
  state = {arrProduct: []};

  componentDidMount() {
    getListProduct<IProductModel>({
      skip: 0,
      limit: 5,
      statuses: 'active',
      types: 'item',
      order_by: 'desc',
      sort_by: 'order_count'
    })
      .then(res => {
        if (!res?.code) {
          this.setState({
            arrProduct: res?.data
          });
        }
      })
      .catch(() => {});
  }

  keyExtractor = (_item: any, index: number) => {
    return index.toString();
  };

  renderItem = ({item}: {item: IProductModel}) => {
    return <ItemProductHot data={item} />;
  };

  renderItemSeparatorComponent = () => {
    return <MyView style={productHotStyles.itemSeparator} />;
  };

  renderListEmptyComponent = () => {
    return (
      <MyView style={productHotStyles.viewEmpty}>
        <ItemProductHot />
        <MyView style={productHotStyles.itemSeparator} />
        <ItemProductHot />
        <MyView style={productHotStyles.itemSeparator} />
        <ItemProductHot />
        <MyView style={productHotStyles.itemSeparator} />
      </MyView>
    );
  };

  render() {
    const {arrProduct} = this.state;

    return (
      <MyView style={productHotStyles.container}>
        <MyText style={productHotStyles.title} numberOfLines={1} fontStyle="Bold">
          {MyI18n.trans.drink_hot}
        </MyText>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={productHotStyles.containerList}
          data={arrProduct}
          extraData={arrProduct}
          initialNumToRender={12}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderItem}
          ItemSeparatorComponent={this.renderItemSeparatorComponent}
          ListEmptyComponent={this.renderListEmptyComponent}
        />
      </MyView>
    );
  }
}
