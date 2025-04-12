/* eslint-disable react-native/no-inline-styles */
import React, {PureComponent} from 'react';
import {LAYOUT, MARGIN} from 'bases/styles/Core';
import {MyButtonShadow, MyText, MyIcon, MyView, MyImage} from 'bases/components';
import {IAddressShopModel} from 'models';
import Utilities from 'utils/Utilities';
import {itemStoreStyle} from '../style/AddressShop.Style';

interface IProps {
  onPress: () => void;
  items: IAddressShopModel;
}

export default class ItemAddressShop extends PureComponent<IProps, {}> {
  render() {
    const {onPress, items} = this.props;
    return (
      <MyButtonShadow style={itemStoreStyle.containerDetail} onPress={onPress}>
        <MyImage
          width={LAYOUT.l_40}
          height={LAYOUT.l_40}
          style={itemStoreStyle.logoShop}
          source={Utilities.convertLinkImage(items.logo)}
        />
        <MyView style={itemStoreStyle.viewInfor} transparent>
          <MyText>{items.name}</MyText>
          <MyText style={itemStoreStyle.titleDetail} fontStyle="SemiBold" numberOfLines={2}>
            {items.address}
          </MyText>
          <MyView transparent style={itemStoreStyle.viewInforCall}>
            <MyView style={itemStoreStyle.viewCall} transparent>
              <MyIcon
                iconFontType="MaterialIcons"
                name={'email'}
                size={14}
                color={itemStoreStyle.icon.color}
              />
              <MyText style={itemStoreStyle.txtCall} fontStyle="Regular" numberOfLines={2}>
                {items.email}
              </MyText>
            </MyView>
            <MyView
              style={[
                itemStoreStyle.viewCall,
                {justifyContent: 'flex-end', marginLeft: MARGIN.m_16}
              ]}>
              <MyIcon
                iconFontType="MaterialIcons"
                name={'call'}
                size={14}
                color={itemStoreStyle.icon.color}
              />
              <MyText style={itemStoreStyle.txtCall} fontStyle="Regular" numberOfLines={2}>
                {items.phone}
              </MyText>
            </MyView>
          </MyView>
        </MyView>
      </MyButtonShadow>
    );
  }
}
