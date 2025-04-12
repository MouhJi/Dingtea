import React, {PureComponent} from 'react';
import {StyleSheet, Alert, Platform, Linking, PermissionsAndroid} from 'react-native';

import {connect} from 'react-redux';
import MyI18n from 'utils/MyI18n';
import {RootState} from 'views/app/redux/App.Reducer';

import {MyText, MyIcon, MyButton, MyView} from 'bases/components';

import {
  FONT_SIZE,
  LAYOUT,
  MARGIN,
  PADDING,
  RADIUS,
  setMargin,
  setPadding,
  setRadius
} from 'bases/styles/Core';
import MyNavigator from 'utils/MyNavigator';
import {IChooseAddressUserState} from 'views/app/reduxChooseAddressUser';
import MyStaticLocal from 'utils/MyStaticLocal';
import MyTheme from 'utils/MyTheme';
import {IChooseAddressShopState} from 'views/app/reduxChooseAddressShop';
import {ICartShipModel} from 'models';
import Geolocation from 'react-native-geolocation-service';
import Utilities from 'utils/Utilities';
import MyStorage from 'utils/MyStorage';
import {COORDINATE_USER} from 'common/KeyStorages';

interface IProps extends IChooseAddressUserState, IChooseAddressShopState {
  shipping?: ICartShipModel;
}

class LocationHeader extends PureComponent<IProps> {
  onPress = async () => {
    const {shipping} = this.props;
    if (shipping) {
      /* Giao tan noi */
      if (shipping.id === 5) {
        await this.getLocation();
      } else {
        /* tu den lay */
        MyNavigator.navigate('AddressShop');
      }
    }
  };

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
        if (MyStaticLocal.getUser()) {
          MyNavigator.navigate('AddressUser');
        } else {
          MyNavigator.navigate('Login');
        }
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

  render() {
    const {addressUserChoose, shipping, addressShopChoose} = this.props;
    if (shipping?.id === 5) {
      return (
        <MyButton style={styles.contentTitle} onPress={this.onPress}>
          <MyView style={styles.viewTitle} transparent>
            <MyIcon
              iconFontType={'MaterialIcons'}
              name="location-pin"
              size={styles.iconLocation.width}
              color={styles.iconLocation.color}
            />
            <MyText numberOfLines={2} style={styles.titleSmall} fontStyle="SemiBold">
              {addressUserChoose?.address || MyI18n.trans.your_address}
            </MyText>
          </MyView>
          <MyView style={styles.content}>
            <MyText style={styles.textChange} fontStyle="SemiBold">
              {MyI18n.trans.change}
            </MyText>
          </MyView>
        </MyButton>
      );
    } else {
      let shop = '';
      if (addressShopChoose) {
        shop = addressShopChoose?.name + ' (' + addressShopChoose?.address + ')';
      }
      return (
        <MyButton style={styles.contentTitle} onPress={this.onPress}>
          <MyView style={styles.viewTitle} transparent>
            <MyIcon
              iconFontType={'Entypo'}
              name="shop"
              size={styles.iconLocation.width}
              color={styles.iconLocation.color}
            />
            <MyText numberOfLines={2} style={styles.titleSmall} fontStyle="SemiBold">
              {shop || MyI18n.trans.noti_choose_shop}
            </MyText>
          </MyView>
          <MyView style={styles.content}>
            <MyText style={styles.textChange} fontStyle="SemiBold">
              {MyI18n.trans.change}
            </MyText>
          </MyView>
        </MyButton>
      );
    }
  }
}

const mapStateToProps = (state: RootState) => {
  const {iso, theme} = state.SettingReducer;
  const {addressUserChoose} = state.ChooseAddressUserReducer;
  const {addressShopChoose} = state.ChooseAddressShopReducer;
  const {shipping} = state.DoUongReducer;
  return {iso, theme, addressUserChoose, shipping, addressShopChoose};
};

export default connect(mapStateToProps, null)(LocationHeader);

const styles = StyleSheet.create({
  contentTitle: {
    backgroundColor: MyTheme.themes.BG.PRIMARY_LIGHT,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    ...setPadding(PADDING.p_8, PADDING.p_8, PADDING.p_10, PADDING.p_16),
    ...setMargin(MARGIN.m_8, MARGIN.m_16, MARGIN.m_16, MARGIN.m_16),
    ...setRadius(RADIUS.r_8, RADIUS.r_8, RADIUS.r_8, RADIUS.r_8)
  },
  viewTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    ...setMargin(MARGIN.m_0, MARGIN.m_0, MARGIN.m_0, MARGIN.m_16),
    flex: 1
  },
  iconLocation: {
    color: MyTheme.themes.BG.PRIMARY_DARK,
    width: LAYOUT.l_18
  },
  titleSmall: {
    fontSize: FONT_SIZE.s_12,
    textAlign: 'left',
    color: MyTheme.themes.TEXT.SECONDARY,
    ...setMargin(MARGIN.m_0, MARGIN.m_0, MARGIN.m_4, MARGIN.m_0),
    flex: 1
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    ...setRadius(RADIUS.r_4, RADIUS.r_4, RADIUS.r_4, RADIUS.r_4),
    height: LAYOUT.l_32,
    backgroundColor: MyTheme.themes.BG.PRIMARY_DARK
  },
  textChange: {
    fontSize: FONT_SIZE.s_12,
    color: MyTheme.themes.TEXT.WHITE,
    ...setMargin(MARGIN.m_0, MARGIN.m_0, MARGIN.m_16, MARGIN.m_16)
  }
});
