import React, {PureComponent} from 'react';
import {StyleSheet} from 'react-native';

import {
  FONT_SIZE,
  MARGIN,
  PADDING,
  RADIUS,
  setMargin,
  setPadding,
  setRadius
} from 'bases/styles/Core';
import {MyButtonShadow, MyText, MyIcon, MyView} from 'bases/components';
import {IAddressUserModal} from 'models';
import MyTheme from 'utils/MyTheme';

interface IProps {
  data: IAddressUserModal;
  onPress: (item: IAddressUserModal) => void;
  onPressEdit: (item: IAddressUserModal) => void;
}

export default class ItemAddressUser extends PureComponent<IProps> {
  render() {
    const {data, onPress, onPressEdit} = this.props;
    return (
      <MyButtonShadow style={styles.containerDetail} onPress={() => onPress(data)}>
        <MyView style={styles.container} transparent>
          <MyText style={styles.titleDetail} fontStyle="SemiBold" numberOfLines={2}>
            {data.address}
          </MyText>
          <MyView style={styles.containerRow} transparent>
            <MyIcon iconFontType="Fontisto" name={'person'} size={12} color={styles.icon.color} />
            <MyText style={styles.titleDetail2} fontStyle="Medium" numberOfLines={2}>
              {data.name}
            </MyText>
            <MyIcon iconFontType="Fontisto" name={'phone'} size={12} color={styles.icon.color} />
            <MyText style={styles.titleDetail2} fontStyle="Medium" numberOfLines={2}>
              {data.phone}
            </MyText>
          </MyView>
        </MyView>
        <MyIcon
          iconFontType="MaterialCommunityIcons"
          name={'home-edit'}
          size={20}
          onPress={() => onPressEdit(data)}
          style={styles.icon}
        />
      </MyButtonShadow>
    );
  }
}

const styles = StyleSheet.create({
  containerDetail: {
    backgroundColor: MyTheme.themes.BG.WHITE,
    flexDirection: 'row',
    ...setPadding(PADDING.p_14, PADDING.p_14, PADDING.p_14, PADDING.p_0),
    ...setRadius(RADIUS.r_8, RADIUS.r_8, RADIUS.r_8, RADIUS.r_8),
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  titleDetail: {
    fontSize: FONT_SIZE.s_14,
    flex: 1
  },
  titleDetail2: {
    fontSize: FONT_SIZE.s_14,
    flex: 1,
    ...setMargin(MARGIN.m_0, MARGIN.m_0, MARGIN.m_6, MARGIN.m_0)
  },
  container: {
    flex: 1
  },
  containerRow: {
    flexDirection: 'row',
    ...setMargin(MARGIN.m_8, MARGIN.m_0, MARGIN.m_0, MARGIN.m_0),
    alignItems: 'center'
  },
  icon: {
    ...setPadding(PADDING.p_10, PADDING.p_10, PADDING.p_10, PADDING.p_10),
    color: MyTheme.themes.BG.PRIMARY_DARK
  }
});
