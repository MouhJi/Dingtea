import React, {createRef, PureComponent} from 'react';
import {StyleSheet, FlatList} from 'react-native';

import {ReactNativeZoomableView} from '@openspacelabs/react-native-zoomable-view';
import FastImage from 'react-native-fast-image';
import {SafeAreaView} from 'react-native-safe-area-context';

import Utilities from 'utils/Utilities';
import {COLOR, FONT_SIZE, LAYOUT, MARGIN} from 'bases/styles/Core';
import MyNavigator from 'utils/MyNavigator';
import {MyView, MyButtonIcon, MyText} from 'bases/components';

interface IProps {
  route?: any;
}

interface IState {
  enableSwiper: boolean;
  numberOfRefresh: number;
}

export default class PreviewImage extends PureComponent<IProps, IState> {
  state = {enableSwiper: true, numberOfRefresh: 0};

  currentIntext: any;
  flatList: any = createRef();

  constructor(props: IProps) {
    super(props);
    this.currentIntext = this.props.route.params.indexSelected;
  }

  inZoom = (event?: any, gestureState?: any, zoomableViewEventObject?: any) => {
    if (zoomableViewEventObject.zoomLevel === 1) {
      if (this.state.enableSwiper === false) {
        this.setState({
          enableSwiper: true
        });
        return true;
      }
      return false;
    } else {
      if (this.state.enableSwiper) {
        this.setState({
          enableSwiper: false
        });
        return false;
      }
      return true;
    }
  };

  renderZoomImage = ({item}: any) => {
    const source = Utilities.convertLinkImage(item, 'HIGH');
    return (
      <ReactNativeZoomableView
        zoomEnabled
        minZoom={1}
        doubleTapDelay={200}
        initialZoom={1}
        bindToBorders
        onZoomAfter={this.inZoom}
        onDoubleTapAfter={this.inZoom}>
        <FastImage source={source} style={styles.itemImage} resizeMode="contain" />
      </ReactNativeZoomableView>
    );
  };

  onScrollEnd = (e: any) => {
    try {
      const {contentOffset} = e.nativeEvent;
      const viewSize = e.nativeEvent.layoutMeasurement;
      const pageNum = Math.floor(contentOffset.x / viewSize.width);
      if (this.currentIntext === pageNum) return;
      this.currentIntext = pageNum;
      this.setState({
        numberOfRefresh: this.state.numberOfRefresh + 1
      });
    } catch (error) {
      Utilities.logCrashlytics('PreviewImage - onScrollEnd: ', error);
    }
  };

  handleToBack = () => {
    MyNavigator.goBack();
  };

  render() {
    const {arrImages, indexSelected} = this.props.route.params;

    return (
      <SafeAreaView edges={['top', 'bottom']} style={styles.container}>
        <MyView style={styles.container}>
          <MyButtonIcon
            iconFontType={'Ionicons'}
            iconProps={{
              name: 'close',
              color: COLOR.BG.WHITE,
              size: 30,
              style: styles.close
            }}
            onPress={this.handleToBack}
            style={styles.btnClose}
          />
          <FlatList
            pagingEnabled
            scrollEnabled={this.state.enableSwiper}
            horizontal
            onMomentumScrollEnd={this.onScrollEnd}
            data={arrImages}
            extraData={arrImages}
            keyExtractor={item => item.toString()}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            renderItem={this.renderZoomImage}
            ref={this.flatList}
            initialScrollIndex={indexSelected}
            onScrollToIndexFailed={info => {
              const wait = new Promise(resolve => setTimeout(resolve, 500));
              wait.then(() => {
                this.flatList.current?.scrollToIndex({index: info.index, animated: true});
              });
            }}
          />
          <MyView style={styles.paginationStyle} transparent>
            <MyText style={{color: COLOR.BG.SECONDARY}}>
              <MyText style={styles.paginationText}>{this.currentIntext + 1}</MyText> /{' '}
              {arrImages.length}
            </MyText>
          </MyView>
        </MyView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.BG.BLACK
  },
  close: {
    alignSelf: 'center'
  },
  btnClose: {
    width: LAYOUT.l_50,
    height: LAYOUT.l_50,
    justifyContent: 'center',
    top: 0,
    right: 0,
    position: 'absolute',
    zIndex: 999
  },
  paginationStyle: {
    position: 'absolute',
    bottom: MARGIN.m_20,
    right: MARGIN.m_20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  paginationText: {
    fontSize: FONT_SIZE.s_20,
    color: COLOR.TEXT.WHITE
  },
  itemImage: {
    width: Utilities.getWidthScreen(),
    height: '100%'
  }
});
