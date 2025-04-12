import React, {createRef, PureComponent} from 'react';
import {
  RefreshControl,
  SectionList,
  Animated,
  NativeSyntheticEvent,
  NativeScrollEvent,
  LayoutChangeEvent,
  Linking,
  PermissionsAndroid,
  Alert,
  Platform
} from 'react-native';

import {connect} from 'react-redux';
import MyI18n from 'utils/MyI18n';
import {bindActionCreators} from 'redux';
import {RootState} from 'views/app/redux/App.Reducer';

import {getListProducts, showRefresh, showLoadmore, IDoUongState} from './redux';

import {LoadingList, MyButtonText, MyText, MyView} from 'bases/components';
import LocationHeader from './components/LocationHeader';
import ShippingMethod from './components/ShippingMethod';
import ListTagComponent from './components/ListTagComponent';

import {doUongStyles} from './style/DoUong.Style';
import {ItemProduct} from 'views/app/components';
import {ICategoryModel, IProductModel} from 'models';
import CartBottom from 'views/home/components/cartBottom/CartBottom';
import CategoryHeader from './components/CategoryHeader';
import MyTheme from 'utils/MyTheme';
import {LAYOUT} from 'bases/styles/Core';
import Utilities from 'utils/Utilities';
import Geolocation from 'react-native-geolocation-service';
import {COORDINATE_USER} from 'common/KeyStorages';
import MyStorage from 'utils/MyStorage';
import MyStaticLocal from 'utils/MyStaticLocal';

const HEADER_COLOR_0 = 0;
const HEADER_COLOR_1 = Utilities.getResolutionByHeight(140);
const HEADER_COLOR_2 = Utilities.getResolutionByHeight(170);

const HEADER_HEIGHT_START = Utilities.getResolutionByHeight(160);
const HEADER_HEIGHT_END = Utilities.getResolutionByHeight(161);

interface IProps extends IDoUongState {
  getListProducts: typeof getListProducts;
  showRefresh: typeof showRefresh;
  showLoadmore: typeof showLoadmore;
}

class DoUong extends PureComponent<IProps> {
  valueScroolY = new Animated.Value(0);
  scrollY = Animated.add(this.valueScroolY, 0);

  arrIndexCate: {min: number; max: number}[] = [];

  heightHeaderView: number = 0;
  heightHeaderList: number = 0;

  heightItemList: number = 0;
  heightSeparatorList: number = 0;

  categoryHeaderRef: any = createRef();
  sectionListRef: any = createRef();

  componentDidMount() {
    const {isFirstLoading} = this.props;
    if (isFirstLoading) {
      this.props.getListProducts({
        skip: 0,
        limit: 1000,
        statuses: 'active',
        types: 'item'
      });
    }

    // this.getLocation();
  }

  componentWillUnmount() {
    this.valueScroolY.removeAllListeners();
  }

  hasPermissionIOS = async () => {
    const openSetting = () => {
      Linking.openSettings().catch(() => {
        Alert.alert('Unable to open settings');
      });
    };
    const status = await Geolocation.requestAuthorization('whenInUse');

    if (status === 'granted') {
      return true;
    }

    if (status === 'denied') {
      Alert.alert('Location permission denied');
    }

    if (status === 'disabled') {
      Alert.alert('Vui lòng bật định vị GPS và cho phép DingTea sử dụng dịch vụ vị trí.', '', [
        {text: 'Đi cài đặt', onPress: openSetting},
        {text: 'Không cho phép', onPress: () => {}}
      ]);
    }

    return false;
  };

  hasLocationPermission = async () => {
    if (Platform.OS === 'ios') {
      const hasPermission = await this.hasPermissionIOS();
      return hasPermission;
    }

    if (Platform.OS === 'android' && Platform.Version < 23) {
      return true;
    }

    const hasPermission = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    );

    if (hasPermission) {
      return true;
    }

    const status = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    );

    if (status === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    }

    if (status === PermissionsAndroid.RESULTS.DENIED) {
      Utilities.showToast('Location permission denied by user.');
    } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
      Utilities.showToast('Location permission revoked by user.');
    }

    return false;
  };

  getLocation = async () => {
    const hasPermission = await this.hasLocationPermission();

    if (!hasPermission) {
      return;
    }

    Geolocation.getCurrentPosition(
      position => {
        let coordinate = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        };
        console.log(coordinate);
        MyStorage.create(COORDINATE_USER, coordinate);
        MyStaticLocal.setCoordinate(coordinate.latitude, coordinate.longitude);
      },
      error => {
        Alert.alert(`Code ${error.code}`, error.message);
        console.log(error);
      },
      {
        accuracy: {
          android: 'high',
          ios: 'best'
        },
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
        distanceFilter: 0,
        forceRequestLocation: true,
        showLocationDialog: true
      }
    );
  };

  onScrollEndDrag = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const {data} = this.props;
    if (data) {
      let heightScroll = this.heightHeaderView - 48 + 10;
      let heightAfter = heightScroll;

      for (let i = 0; i < data.length; i++) {
        const element = data[i];
        let heightElement =
          this.heightHeaderList -
          4 +
          this.heightItemList * element.data.length +
          this.heightSeparatorList * (element.data.length - 1);

        let heightBefore = heightAfter + 1;
        heightAfter = heightBefore + heightElement;

        if (i === 0) {
          this.arrIndexCate.push({min: 0, max: heightAfter});
        } else {
          this.arrIndexCate.push({min: heightBefore, max: heightAfter});
        }
      }
    }

    const positionYList = event.nativeEvent.contentOffset.y;
    let indexSectionList = -1;

    for (let j = 0; j < this.arrIndexCate.length; j++) {
      const element = this.arrIndexCate[j];
      if (positionYList >= element.min && positionYList <= element.max) {
        indexSectionList = j;
        break;
      }
    }

    if (indexSectionList > -1 && data && data.length > indexSectionList) {
      this.categoryHeaderRef.current.chooseItem(data[indexSectionList]);
    }
  };

  reload = () => {
    const {isFirstLoading, isLoadmore} = this.props;

    if (!isFirstLoading && !isLoadmore) {
      this.props.showRefresh(true);
      this.props.getListProducts({
        skip: 0,
        limit: 1000,
        statuses: 'active',
        types: 'item'
      });
    }
  };

  keyExtractor = (item: IProductModel) => {
    return item.id.toString();
  };

  renderItem = ({item}: {item: IProductModel}) => {
    const {data} = this.props;
    let checkItemFist;
    let checkItemLast;
    let styesBottom;
    let styesTop;
    if (data) {
      for (let i = 0; i < data.length; i++) {
        const element = data[i].data;
        checkItemFist = element[0];
        checkItemLast = element[element.length - 1];
        if (checkItemFist?.id === item.id) {
          styesTop = {
            borderTopRightRadius: 8,
            borderTopLeftRadius: 8
          };
        }
        if (checkItemLast?.id === item.id) {
          styesBottom = {
            borderBottomRightRadius: 8,
            borderBottomLeftRadius: 8
          };
        }
      }
    }

    return (
      <ItemProduct
        data={item}
        style={[doUongStyles.item, styesBottom, styesTop]}
        onLayout={(event: LayoutChangeEvent) => {
          this.heightItemList = parseInt(event.nativeEvent.layout.height.toFixed(0), 10);
        }}
      />
    );
  };

  renderSectionHeader = ({section: {title}}: {section: {title: ICategoryModel}}) => {
    return (
      <MyView
        style={doUongStyles.headerSection}
        onLayout={(event: LayoutChangeEvent) => {
          this.heightHeaderList = parseInt(event.nativeEvent.layout.height.toFixed(0), 10);
        }}>
        <MyText fontStyle="Bold">{title.name}</MyText>
      </MyView>
    );
  };

  renderItemSeparatorComponent = () => {
    return (
      <MyView
        style={doUongStyles.itemSeparator}
        onLayout={(event: LayoutChangeEvent) => {
          this.heightSeparatorList = parseInt(event.nativeEvent.layout.height.toFixed(0), 10);
        }}>
        <MyView style={doUongStyles.itemSeparator2} />
      </MyView>
    );
  };

  renderListEmptyComponent = () => {
    const {isError, isFirstLoading} = this.props;
    if (isFirstLoading) {
      return <LoadingList />;
    } else {
      if (isError) {
        return (
          <MyView style={doUongStyles.containerError}>
            <MyText style={doUongStyles.txtAgain}>{MyI18n.trans.error_message}</MyText>
            <MyButtonText
              onPress={this.reload}
              title={MyI18n.trans.try_again}
              style={doUongStyles.btnAgain}
            />
          </MyView>
        );
      } else {
        return <MyText style={doUongStyles.txtAgain}>{MyI18n.trans.data_empty}</MyText>;
      }
    }
  };

  renderListHeaderComponent = () => {
    return (
      <MyView
        style={doUongStyles.containerHeader}
        onLayout={(event: LayoutChangeEvent) => {
          this.heightHeaderView = parseInt(event.nativeEvent.layout.height.toFixed(0), 10);
        }}>
        <MyView style={doUongStyles.header}>
          <ShippingMethod />
          <LocationHeader />
        </MyView>
        <ListTagComponent />
      </MyView>
    );
  };

  renderListFooterComponent = () => {
    const {isLoadmore} = this.props;
    if (isLoadmore) {
      return <LoadingList />;
    } else {
      return null;
    }
  };

  onEndReached = () => {
    const {data, isLoadmore, isStop} = this.props;

    if (isLoadmore || isStop) {
      return;
    }
    this.props.showLoadmore(true);
    this.props.getListProducts({
      skip: data?.length || 0,
      limit: 1000,
      statuses: 'active',
      types: 'item'
    });
  };

  onChooseItem = (index: number) => {
    this.sectionListRef.current.scrollToLocation({
      animated: true,
      itemIndex: 0,
      sectionIndex: index,
      viewOffset: LAYOUT.l_40,
      viewPosition: 0
    });
  };

  render() {
    const {data, isRefresh} = this.props;

    let backgroundColorAnimated = this.scrollY.interpolate({
      inputRange: [HEADER_COLOR_0, HEADER_COLOR_1, HEADER_COLOR_2],
      outputRange: ['transparent', 'transparent', MyTheme.themes.BG.WHITE],
      extrapolate: 'clamp'
    });

    let textColorAnimated = this.scrollY.interpolate({
      inputRange: [HEADER_COLOR_0, HEADER_COLOR_1, HEADER_COLOR_2],
      outputRange: ['transparent', 'transparent', MyTheme.themes.TEXT.PRIMARY],
      extrapolate: 'clamp'
    });

    let textSecondColorAnimated = this.scrollY.interpolate({
      inputRange: [HEADER_COLOR_0, HEADER_COLOR_1, HEADER_COLOR_2],
      outputRange: ['transparent', 'transparent', MyTheme.themes.TEXT.SECONDARY],
      extrapolate: 'clamp'
    });

    let indicatorColorAnimated = this.scrollY.interpolate({
      inputRange: [HEADER_COLOR_0, HEADER_COLOR_1, HEADER_COLOR_2],
      outputRange: ['transparent', 'transparent', MyTheme.themes.TEXT.BROWN],
      extrapolate: 'clamp'
    });

    let heightViewAnimated = this.scrollY.interpolate({
      inputRange: [HEADER_COLOR_0, HEADER_HEIGHT_START, HEADER_HEIGHT_END],
      outputRange: [0, 0, LAYOUT.l_48],
      extrapolate: 'clamp'
    });
    return (
      <MyView style={doUongStyles.container}>
        <CategoryHeader
          ref={this.categoryHeaderRef}
          backgroundColor={backgroundColorAnimated}
          textColor={textColorAnimated}
          textSecondColor={textSecondColorAnimated}
          indicatorColor={indicatorColorAnimated}
          heightView={heightViewAnimated}
          data={data}
          onChooseItem={this.onChooseItem}
        />
        <SectionList
          ref={this.sectionListRef}
          onScroll={Animated.event([{nativeEvent: {contentOffset: {y: this.valueScroolY}}}], {
            useNativeDriver: false
          })}
          stickySectionHeadersEnabled={false}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl onRefresh={this.reload} refreshing={isRefresh || false} />
          }
          style={doUongStyles.list}
          contentContainerStyle={doUongStyles.contentList}
          sections={data || []}
          extraData={data}
          initialNumToRender={12}
          maxToRenderPerBatch={10}
          windowSize={11}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderItem}
          renderSectionHeader={this.renderSectionHeader}
          ItemSeparatorComponent={this.renderItemSeparatorComponent}
          ListEmptyComponent={this.renderListEmptyComponent}
          ListHeaderComponent={this.renderListHeaderComponent}
          //   ListFooterComponent={this.renderListFooterComponent}
          //   onEndReachedThreshold={0.5}
          //   onEndReached={this.onEndReached}
          onScrollEndDrag={this.onScrollEndDrag}
          onMomentumScrollEnd={this.onScrollEndDrag}
        />
        <CartBottom />
      </MyView>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  const {iso, theme} = state.SettingReducer;
  const {isRefresh, data, isError, isFirstLoading, isLoadmore, isStop} = state.DoUongReducer;
  return {iso, theme, isRefresh, data, isError, isFirstLoading, isLoadmore, isStop};
};

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      getListProducts,
      showRefresh,
      showLoadmore
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps, null, {forwardRef: true})(DoUong);
