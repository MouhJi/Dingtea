import React, {createRef, PureComponent} from 'react';
import {Animated, FlatList, StyleSheet, ViewStyle} from 'react-native';
import {ImageStyle} from 'react-native-fast-image';

import {MyView} from '../view';
import {LAYOUT, setRadius, setMargin, RADIUS, MARGIN} from '../../styles/Core';

import {MyButton} from '../button';
import {MyImage} from './MyImage';

import Utilities from 'utils/Utilities';
import MyTheme from 'utils/MyTheme';
const DEFAULT_WIDTH = Utilities.getWidthScreen();
const DOT_WIDTH = LAYOUT.l_10;

interface IProps {
  style?: ViewStyle;
  styleContainerImage?: ViewStyle;
  styleImage?: ImageStyle;
  widthImage: number;
  ratio?: number;
  styleBar?: ViewStyle;

  images: string[];
  onPress: (item: any, index: number) => void;

  interval?: number;
  isLoop?: boolean;
  isShowDot?: boolean;
  isAnimBack?: boolean;

  paddingImage?: number;
}
/**
 ** ratio default '9 / 16' tỉ lệ giữa width và height
 */
export default class MyImageSlider extends PureComponent<IProps, {}> {
  nextIndex: number = 0;
  animVal: any = new Animated.Value(0);
  listRef: any = createRef();
  timerId: any = null;

  componentDidMount() {
    this.stopAutoPlay();
    if (this.props.images && this.props.images.length > 1) {
      if (this.props.isLoop) {
        this.startAutoPlay();
      }
    }
  }

  componentWillUnmount() {
    this.stopAutoPlay();
  }

  keyExtractor = (_item: any, index: number) => {
    return index.toString();
  };

  renderItem = ({item, index}: {item: any; index: number}) => {
    const {styleImage, styleContainerImage, onPress, widthImage, ratio} = this.props;

    let widthImg: number = Utilities.getWidthScreen();
    if (widthImage) {
      widthImg = widthImage;
    }

    let ratioImg: number = 9 / 16;
    if (ratio) {
      ratioImg = ratio;
    }
    const onPressImg = () => {
      onPress(item, index);
    };
    const source = Utilities.convertLinkImage(item, 'HIGH');
    return (
      <MyButton
        activeOpacity={1}
        key={index}
        transparent
        onPress={onPressImg}
        style={styleContainerImage}>
        <MyImage source={source} width={widthImg} height={widthImg * ratioImg} style={styleImage} />
      </MyButton>
    );
  };

  onScrollEnd = (e: any) => {
    try {
      let contentOffset = e.nativeEvent.contentOffset;
      let viewSize = e.nativeEvent.layoutMeasurement;

      let pageNum = Math.floor(contentOffset.x / viewSize.width);
      this.nextIndex = pageNum;
    } catch (error) {
      Utilities.logCrashlytics('MyImageSlider - onScrollEnd: ', error);
    }
  };

  scrollToIndex = (index: number, animated?: boolean) => {
    try {
      if (this.listRef) {
        this.listRef?.current?.scrollToIndex({index, animated});
      }
    } catch (error) {
      Utilities.logCrashlytics('MyImageSlider - scrollToIndex: ', error);
    }
  };

  goToNextPage = () => {
    if (this.nextIndex + 1 < this.props.images.length) {
      this.nextIndex = this.nextIndex + 1;
      this.scrollToIndex(this.nextIndex, true);
    } else {
      this.nextIndex = 0;
      this.scrollToIndex(this.nextIndex, this.props.isAnimBack);
    }
  };

  startAutoPlay = () => {
    if (this.props.interval) {
      this.timerId = setInterval(this.goToNextPage, this.props.interval);
    } else {
      this.timerId = setInterval(this.goToNextPage, 3000);
    }
  };

  stopAutoPlay = () => {
    if (this.timerId) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
  };

  getItemLayout = (data: any, index: number) => {
    return {
      index,
      length: this.props.widthImage,
      offset: this.props.widthImage * index
    };
  };

  render() {
    const {images, style, styleBar, paddingImage, isShowDot} = this.props;
    let paddingTmp = 0;
    if (paddingImage) {
      paddingTmp = paddingImage;
    }

    if (images && images.length > 0) {
      let listDotView: any = [];
      images.forEach((_url, i) => {
        let scrollBarVal = this.animVal.interpolate({
          inputRange: [
            (DEFAULT_WIDTH - paddingTmp) * (i - 1),
            (DEFAULT_WIDTH - paddingTmp) * (i + 1)
          ],
          outputRange: [-DOT_WIDTH, DOT_WIDTH],
          extrapolate: 'clamp'
        });
        let renderItemDotView = (
          <MyView
            key={i.toString()}
            style={[
              sliderStyles.track,
              {
                backgroundColor: MyTheme.themes.TAB.INACTIVE
              }
            ]}>
            <Animated.View
              style={[
                sliderStyles.bar,
                {
                  backgroundColor: MyTheme.themes.TAB.ACTIVE,
                  width: DOT_WIDTH,
                  transform: [{translateX: scrollBarVal}]
                }
              ]}
            />
          </MyView>
        );
        listDotView.push(renderItemDotView);
      });

      return (
        <MyView style={[sliderStyles.container, style]}>
          <FlatList
            ref={this.listRef}
            onMomentumScrollEnd={this.onScrollEnd}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            initialNumToRender={12}
            horizontal
            pagingEnabled
            data={images}
            extraData={images}
            getItemLayout={this.getItemLayout}
            keyExtractor={this.keyExtractor}
            renderItem={this.renderItem}
            onScroll={Animated.event([{nativeEvent: {contentOffset: {x: this.animVal}}}], {
              useNativeDriver: false
            })}
          />
          {isShowDot ? (
            <MyView style={[sliderStyles.barContainer, styleBar]}>{listDotView}</MyView>
          ) : null}
        </MyView>
      );
    } else {
      const {styleImage, styleContainerImage, widthImage, ratio} = this.props;
      let widthImg: number = Utilities.getWidthScreen();
      if (widthImage) {
        widthImg = widthImage;
      }

      let ratioImg: number = 9 / 16;
      if (ratio) {
        ratioImg = ratio;
      }
      return (
        <MyView style={[sliderStyles.container, style]}>
          <MyView transparent style={styleContainerImage}>
            <MyImage
              source={Utilities.convertLinkImage('')}
              width={widthImg}
              height={widthImg * ratioImg}
              style={styleImage}
            />
          </MyView>
        </MyView>
      );
    }
  }
}

const sliderStyles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  barContainer: {
    backgroundColor: 'transparent',
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'center',
    bottom: MARGIN.m_10,
    zIndex: 2
  },
  track: {
    overflow: 'hidden',
    ...setRadius(RADIUS.r_50, RADIUS.r_50, RADIUS.r_50, RADIUS.r_50),
    height: LAYOUT.l_8,
    width: LAYOUT.l_8,
    ...setMargin(MARGIN.m_0, MARGIN.m_0, MARGIN.m_5, MARGIN.m_5)
  },
  bar: {
    position: 'absolute',
    ...setRadius(RADIUS.r_50, RADIUS.r_50, RADIUS.r_50, RADIUS.r_50),
    height: LAYOUT.l_8,
    width: LAYOUT.l_8,
    left: 0,
    top: 0
  }
});
