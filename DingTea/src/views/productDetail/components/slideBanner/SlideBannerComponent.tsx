import React, {PureComponent} from 'react';

import MyNavigator from 'utils/MyNavigator';
import {slideBannerStyles} from 'views/productDetail/style/ProductDetail.Style';
import {PADDING} from 'bases/styles/Core';
import {MyImageSlider, MyText, MyView} from 'bases/components';
import {IProductModel} from 'models';

interface IProps {
  data: IProductModel;
}

export default class SlideBannerComponent extends PureComponent<IProps> {
  arrImages: string[] = [this.props.data.thumbnail_url || ''];

  onPressBanner = (_item: any, index: number) => {
    MyNavigator.navigate('PreviewImage', {arrImages: this.arrImages, indexSelected: index});
  };

  render() {
    const {data} = this.props;
    const {price, normal_price} = data;
    let giaBan = 0;
    let giaGoc = 0;
    if (price) {
      giaBan = price;
    }
    if (normal_price) {
      giaGoc = normal_price;
    }
    let percent = 0;
    if (giaGoc) {
      percent = Math.round(((giaGoc - giaBan) / giaGoc) * 100);
    }
    let _viewDiscount = null;
    if (percent) {
      _viewDiscount = (
        <MyView style={slideBannerStyles.styleViewDiscount}>
          <MyText style={slideBannerStyles.styleDiscount} fontStyle="Bold">
            {'-'}
            {percent}
            {'%'}
          </MyText>
        </MyView>
      );
    }

    return (
      <MyView style={slideBannerStyles.container}>
        <MyImageSlider
          style={slideBannerStyles.slider}
          styleContainerImage={slideBannerStyles.styleContainerImage}
          images={this.arrImages}
          onPress={this.onPressBanner}
          isLoop={false}
          isAnimBack
          widthImage={slideBannerStyles.image.width}
          ratio={1}
          styleImage={slideBannerStyles.styleImage}
          styleBar={slideBannerStyles.styleBar}
          paddingImage={PADDING.p_32}
        />
        {_viewDiscount}
      </MyView>
    );
  }
}
