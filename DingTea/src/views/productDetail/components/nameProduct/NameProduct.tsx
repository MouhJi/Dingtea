import React, {PureComponent} from 'react';

import {styleNameProduct} from '../../style/ProductDetail.Style';

import {MyButtonIcon, MyIcon, MyText, MyTextPriceMask, MyView} from 'bases/components';
import {IProductModel} from 'models';
import MyTheme from 'utils/MyTheme';

interface IProps {
  data: IProductModel;
}

interface IState {
  isFavorite: boolean;
}

export default class NameProduct extends PureComponent<IProps, IState> {
  state = {isFavorite: false};

  pressFavorite = () => {
    this.setState({
      isFavorite: !this.state.isFavorite
    });
  };

  render() {
    const {data} = this.props;
    const {name, price, normal_price, rating_count, hashtag} = data;

    let _viewPriceOrigin = null;
    let giaBan = 0;
    let giaGoc = 0;
    if (price) {
      giaBan = price;
    }
    if (normal_price) {
      giaGoc = normal_price;
    }
    if (giaGoc - giaBan > 0) {
      _viewPriceOrigin = (
        <MyTextPriceMask
          text={normal_price || 0}
          currency="VND"
          fontStyle="Regular"
          style={styleNameProduct.priceOrigin}
        />
      );
    }

    let _viewHashtag: any[] = [];
    hashtag?.map((element, index) => {
      _viewHashtag.push(
        <MyText key={index} style={styleNameProduct.textPromotion} fontStyle="Regular">
          {element}
        </MyText>
      );
    });

    const {isFavorite} = this.state;

    return (
      <MyView style={styleNameProduct.container}>
        <MyView style={styleNameProduct.containerText} transparent>
          <MyText style={styleNameProduct.title} fontStyle="Bold" numberOfLines={2}>
            {name}
            <MyText style={styleNameProduct.titleStar} fontStyle="Bold">
              {' '}
              {rating_count}
            </MyText>
            <MyIcon
              iconFontType="AntDesign"
              name="star"
              size={styleNameProduct.titleStar.fontSize}
              color={styleNameProduct.titleStar.color}
            />
          </MyText>
          <MyView style={styleNameProduct.contentPrice} transparent>
            <MyTextPriceMask
              text={price || 0}
              currency="VND"
              fontStyle="Regular"
              style={styleNameProduct.price}
            />
            {_viewPriceOrigin}
          </MyView>
          {_viewHashtag.length > 0 ? (
            <MyView style={styleNameProduct.contentPromotion} transparent>
              {_viewHashtag}
            </MyView>
          ) : null}
        </MyView>
        <MyButtonIcon
          disabled
          onPress={this.pressFavorite}
          style={styleNameProduct.btnHeart}
          iconFontType="AntDesign"
          iconProps={{
            name: isFavorite ? 'heart' : 'hearto',
            color: MyTheme.themes.TEXT.WHITE,
            size: 18
          }}
        />
      </MyView>
    );
  }
}
