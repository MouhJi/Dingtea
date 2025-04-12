import React, {PureComponent} from 'react';
import {FlatList} from 'react-native';

import {itemTextStyles} from '../../style/ProductDetail.Style';
import {MyButton, MyIcon, MyText, MyTextPriceMask, MyView} from 'bases/components';
import {IProductModel} from 'models';
import MyTheme from 'utils/MyTheme';

interface IProps {
  title: string;
  /**
   * data: mảng các size của 1 sản phẩm
   */
  data?: IProductModel[];
  tieuChiDaChonId?: number;
  /**
   * item: sản phẩm có size mà bạn chọn
   */
  onChange: (item: IProductModel) => void;
}

interface IStates {
  numberOfRefresh: number;
}

export default class ItemPrice extends PureComponent<IProps, IStates> {
  state = {numberOfRefresh: 0};
  tieuChiDaChonId: number = this.props.tieuChiDaChonId || -1;

  onPressItem = (item: IProductModel) => {
    this.props.onChange(item);
    if (item.id) {
      this.tieuChiDaChonId = item.id;
    }
    this.setState({
      numberOfRefresh: this.state.numberOfRefresh + 1
    });
  };

  keyExtractor = (item: IProductModel) => {
    return item.id.toString();
  };

  renderItem = ({item}: {item: IProductModel}) => {
    const tieuChiId = item.id;
    let isChecked = false;
    isChecked = this.tieuChiDaChonId === tieuChiId;

    const {price, normal_price} = item;
    let giaBan = 0;
    let giaGoc = 0;
    if (price) {
      giaBan = price;
    }
    if (normal_price) {
      giaGoc = normal_price;
    }

    let _viewPriceOrigin = null;
    if (giaGoc - giaBan > 0) {
      _viewPriceOrigin = (
        <MyTextPriceMask
          text={giaGoc}
          currency="VND"
          fontStyle="Regular"
          style={itemTextStyles.priceOrigin}
        />
      );
    }

    return (
      <MyButton style={itemTextStyles.viewItem} transparent onPress={() => this.onPressItem(item)}>
        <MyView style={itemTextStyles.viewTextPrice} transparent>
          <MyText style={itemTextStyles.textType} fontStyle="Bold" numberOfLines={1}>
            {item.option_name}
          </MyText>
          <MyTextPriceMask
            text={giaBan}
            currency="VND"
            fontStyle="Regular"
            style={itemTextStyles.price}
          />
          {_viewPriceOrigin}
        </MyView>
        <MyIcon
          iconFontType="MaterialCommunityIcons"
          name={isChecked ? 'checkbox-marked-circle' : 'checkbox-blank-circle-outline'}
          size={20}
          color={MyTheme.themes.BG.PRIMARY_DARK}
          style={itemTextStyles.viewCheck}
        />
      </MyButton>
    );
  };

  renderHeader = () => {
    const {title} = this.props;
    return (
      <MyView style={itemTextStyles.viewTitleItem}>
        <MyText fontStyle="Bold">{title}</MyText>
      </MyView>
    );
  };

  render() {
    const {data} = this.props;
    if (data) {
      data.sort(function (a, b) {
        if (a.indexes && a.indexes.length > 0 && b.indexes && b.indexes.length > 0) {
          return a.indexes[0] - b.indexes[0];
        } else {
          return 1;
        }
      });
    }
    return (
      <FlatList
        scrollEnabled={false}
        data={data || []}
        extraData={this.state.numberOfRefresh}
        keyExtractor={this.keyExtractor}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        renderItem={this.renderItem}
        ListHeaderComponent={this.renderHeader}
      />
    );
  }
}
