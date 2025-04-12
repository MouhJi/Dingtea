import React, {PureComponent} from 'react';
import {StyleProp, StyleSheet, ViewStyle} from 'react-native';
import {SvgCss} from 'react-native-svg/css';
import Utilities from 'utils/Utilities';
import {MyView, MyImage, MyText, MyButton} from 'bases/components';
import {
  setRadius,
  RADIUS,
  FONT_SIZE,
  COLOR,
  PADDING,
  setPadding,
  MARGIN,
  setShadow
} from 'bases/styles/Core';
import {svgLocation, svgDongho} from 'assets/images/svgImage';
import {IAddressShopModel} from 'models/IAddressShopModel';

interface IProps {
  onPress: () => void;
  items: IAddressShopModel;
  styleitem?: StyleProp<ViewStyle>;
}
interface IState {}

class ItemShopMarker extends PureComponent<IProps, IState> {
  render() {
    const {onPress, items, styleitem} = this.props;
    return (
      <MyButton style={[styles.container, styleitem]} onPress={onPress}>
        <MyView style={styles.containerLeft}>
          <MyView transparent style={styles.ViewImage}>
            <MyImage
              source={Utilities.convertLinkImage(items.logo)}
              height={Utilities.getResolutionByWidth(64)}
              width={Utilities.getResolutionByWidth(64)}
              style={{...setRadius(RADIUS.r_8, RADIUS.r_8, RADIUS.r_8, RADIUS.r_8)}}
            />
          </MyView>
          {/* <MyView style={styles.viewStatus}>
            <MyIcon
              iconFontType="Octicons"
              name="primitive-dot"
              color={MyTheme.themes.BG.PRIMARY_DARK}
              size={15}
            />
            <MyText
              style={{
                ...styles.textValue,
                color: MyTheme.themes.TEXT.PRIMARY_LIGHT,
                fontSize: FONT_SIZE.s_12,
                paddingLeft: Utilities.getResolutionByWidth(8)
              }}>
              Mở cửa
            </MyText>
          </MyView> */}
        </MyView>

        <MyView style={styles.containerRight}>
          <MyText
            fontStyle="Bold"
            style={{...styles.textValue, fontSize: FONT_SIZE.s_14}}
            ellipsizeMode="tail"
            numberOfLines={2}>
            {items.name}
          </MyText>
          <MyText
            fontStyle="Regular"
            style={[styles.textValue, {marginTop: MARGIN.m_8}]}
            ellipsizeMode="tail"
            numberOfLines={2}>
            Địa chỉ: {items.address}
          </MyText>
          <MyView style={styles.containerRightFooter}>
            <MyView style={styles.containerRightFooterLocation}>
              <SvgCss xml={svgDongho} />
              <MyText
                fontStyle="Regular"
                style={{...styles.textValue, paddingLeft: Utilities.getResolutionByWidth(8)}}
                ellipsizeMode="tail"
                numberOfLines={1}>
                9:00 - 22:00
              </MyText>
            </MyView>
            <MyView style={styles.containerRightFooterLocation}>
              <SvgCss xml={svgLocation} />
              <MyText
                fontStyle="Regular"
                style={{...styles.textValue, paddingLeft: Utilities.getResolutionByWidth(8)}}
                ellipsizeMode="tail"
                numberOfLines={1}>
                1 km
              </MyText>
            </MyView>
          </MyView>
        </MyView>
      </MyButton>
    );
  }
}
export default ItemShopMarker;
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    ...setPadding(PADDING.p_16, PADDING.p_16, PADDING.p_16, PADDING.p_16),
    ...setShadow()
    // ...setRadius(RADIUS.r_6, RADIUS.r_6, RADIUS.r_6, RADIUS.r_6)
  },
  containerLeft: {
    flexDirection: 'column',
    backgroundColor: 'transparent'
  },
  containerRight: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
    marginLeft: MARGIN.m_8
  },
  textValue: {
    fontSize: FONT_SIZE.s_12
  },
  viewStatus: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: 'transparent',
    height: Utilities.getResolutionByHeight(28)
  },
  ViewImage: {
    width: Utilities.getResolutionByWidth(72),
    height: Utilities.getResolutionByHeight(72),
    ...setRadius(RADIUS.r_6, RADIUS.r_6, RADIUS.r_6, RADIUS.r_6)
  },
  containerRightFooter: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    height: Utilities.getResolutionByHeight(28),
    alignItems: 'flex-end',
    justifyContent: 'space-between'
  },
  containerRightFooterLocation: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    height: Utilities.getResolutionByHeight(28),
    alignItems: 'flex-end'
  },
  ViewRatio: {
    ...setRadius(RADIUS.r_8, RADIUS.r_8, RADIUS.r_8, RADIUS.r_8),
    justifyContent: 'center',
    alignItems: 'center',
    padding: PADDING.p_0
  },
  ViewRatioColor: {
    backgroundColor: COLOR.BG.SECONDARY,
    width: Utilities.getResolutionByWidth(0),
    height: Utilities.getResolutionByHeight(16),
    position: 'absolute',
    left: 0
  }
});
