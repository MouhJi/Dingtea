import React, {PureComponent} from 'react';

import {itemTextStyles} from '../../style/ProductDetail.Style';
import {MyButtonIcon, MyText, MyTextPriceMask, MyView} from 'bases/components';
import {IProductModel} from 'models';
import MyTheme from 'utils/MyTheme';

interface IProps {
  soLuong?: number;
  onChange: (soLuong: number) => void;
  item: IProductModel;
}

interface IStates {
  soLuong: number;
}

export default class ItemTopping extends PureComponent<IProps, IStates> {
  state = {soLuong: this.props.soLuong || 0};

  onPressPlus = () => {
    this.setState(
      {
        soLuong: this.state.soLuong + 1
      },
      () => this.props.onChange(this.state.soLuong)
    );
  };

  onPressMinus = () => {
    if (this.state.soLuong >= 1) {
      this.setState(
        {
          soLuong: this.state.soLuong - 1
        },
        () => this.props.onChange(this.state.soLuong)
      );
    }
  };

  render() {
    const {soLuong} = this.state;
    const {item} = this.props;
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
          style={itemTextStyles.priceToppingOrigin}
        />
      );
    }

    return (
      <MyView style={itemTextStyles.qtyView} transparent>
        <MyView transparent>
          <MyText fontStyle="Regular">{item.parent_name}</MyText>
          <MyView style={itemTextStyles.viewTextPrice} transparent>
            <MyTextPriceMask
              text={giaBan}
              currency="VND"
              fontStyle="SemiBold"
              style={itemTextStyles.priceTopping}
            />
            {_viewPriceOrigin}
          </MyView>
        </MyView>
        <MyView style={itemTextStyles.qtyViewContent} transparent>
          <MyButtonIcon
            onPress={this.onPressMinus}
            iconFontType="MaterialCommunityIcons"
            iconProps={{
              name: 'minus-circle-outline',
              color: MyTheme.themes.TEXT.SECONDARY_LIGHT,
              size: 20
            }}
            style={itemTextStyles.minusButton}
          />
          <MyText style={itemTextStyles.txtSoluong} fontStyle="Regular">
            {soLuong}
          </MyText>
          <MyButtonIcon
            onPress={this.onPressPlus}
            iconFontType="MaterialCommunityIcons"
            iconProps={{name: 'plus-circle', color: MyTheme.themes.BG.PRIMARY_DARK, size: 20}}
            style={itemTextStyles.plusButton}
          />
        </MyView>
      </MyView>
    );
  }
}
