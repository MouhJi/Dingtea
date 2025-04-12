import React, {PureComponent} from 'react';

import MyNavigator from 'utils/MyNavigator';
import {PADDING} from 'bases/styles/Core';
import {slideBannerStyles} from '../style/GiftDetail.Style';
import {MyView, MyImageSlider} from 'bases/components';
import Utilities from 'utils/Utilities';

const Images = [
  'https://i.pinimg.com/564x/15/bf/db/15bfdb2ecdbf46743697285beea4b8cf.jpg',
  'https://i.pinimg.com/564x/b4/a5/70/b4a5709c95750b8de924577689247fcb.jpg',
  'https://i.pinimg.com/564x/ea/2d/0e/ea2d0e21cd5147b2d62dc634cf45f9dc.jpg',
  'https://i.pinimg.com/236x/3a/cd/25/3acd256803f5250297d556d63f00181f.jpg'
];
export default class SlideBannerComponentGift extends PureComponent {
  onPressBanner = (item: string, index: number) => {
    MyNavigator.navigate('PreviewImage', {arrImages: Images, indexSelected: index});
    // Utilities.log('Image in index: ' + index + ' = ' + item);
  };

  render() {
    return (
      <MyView style={slideBannerStyles.container}>
        <MyImageSlider
          style={slideBannerStyles.slider}
          styleContainerImage={slideBannerStyles.styleContainerImage}
          images={Images}
          onPress={this.onPressBanner}
          isLoop={false}
          isAnimBack
          widthImage={slideBannerStyles.image.width}
          ratio={1}
          styleImage={slideBannerStyles.styleImage}
          styleBar={slideBannerStyles.styleBar}
          paddingImage={PADDING.p_32}
        />
      </MyView>
    );
  }
}
