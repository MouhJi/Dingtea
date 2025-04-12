import React, {PureComponent} from 'react';
import {StyleSheet, ViewProps} from 'react-native';

import {FONT_SIZE, LAYOUT, MARGIN, PADDING, setMargin, setPadding} from 'bases/styles/Core';
import {MyText, MyView, MyTextPriceMask} from 'bases/components';
import {ICartModel} from 'models';
import MyI18n from 'utils/MyI18n';
import MyNavigator from 'utils/MyNavigator';
import MyTheme from 'utils/MyTheme';

interface IProps extends ViewProps {
  item: ICartModel;
  onPressWriteNote?: (item: ICartModel) => void;
}

export default class ItemCartPay extends PureComponent<IProps, {}> {
  price_options: number = 0;
  title_options: string = '';

  constructor(props: IProps) {
    super(props);

    const {item} = this.props;
    const product_options: ICartModel[] = item.product_options || [];
    let arrTitle: string[] = [];
    if (item.option_type) {
      arrTitle.push(MyI18n.trans.size + ' ' + item.option_type);
    }

    for (let index = 0; index < product_options.length; index++) {
      let element = product_options[index];
      let priceOne = element.price || 0;
      let qty = element.total_quantity || 0;
      this.price_options = this.price_options + priceOne * qty;
      if (element.name) {
        arrTitle.push(element.name);
      }
    }
    this.title_options = arrTitle.join(', ');
  }

  onPressWriteCmt = () => {
    if (this.props.onPressWriteNote) {
      this.props.onPressWriteNote(this.props.item);
    }
  };

  onPress = () => {
    MyNavigator.navigate('ProductDetailEdit', {
      productCart: {...this.props.item, total_quantity: this.props.item.total_quantity}
    });
  };

  render() {
    const {style, item} = this.props;

    let priceOne = item.price || 0;
    let qtyTotal = item.total_quantity || 0;
    let price = (priceOne + this.price_options) * qtyTotal;

    let name = item.name || '';

    return (
      <MyView style={[itemCartStyles.container, style]}>
        <MyView style={itemCartStyles.contentTitle} transparent>
          <MyText fontStyle="Bold" numberOfLines={2} style={itemCartStyles.qtyTitleName}>
            {name}
          </MyText>
          <MyTextPriceMask text={price} fontStyle="Bold" />
        </MyView>

        <MyText fontStyle="Regular" style={itemCartStyles.textContent}>
          {this.title_options}
        </MyText>
        {item?.note ? (
          <MyText fontStyle="Regular" style={itemCartStyles.textContent} numberOfLines={1}>
            {item?.note}
          </MyText>
        ) : null}
        <MyView style={itemCartStyles.containerViewCmt} transparent>
          <MyView style={itemCartStyles.qtyView} transparent>
            <MyText fontStyle="Bold">{MyI18n.trans.amount}</MyText>
            <MyText fontStyle="Regular" style={itemCartStyles.qtyText}>
              {item?.total_quantity}
            </MyText>
          </MyView>

          {/* <MyText onPress={this.onPressWriteCmt} style={itemCartStyles.textCmt} fontStyle="Regular">
            {MyI18n.trans.write_a_note}
          </MyText> */}
        </MyView>
        <MyView style={itemCartStyles.itemSeparator} />
      </MyView>
    );
  }
}

const itemCartStyles = StyleSheet.create({
  container: {
    backgroundColor: MyTheme.themes.BG.WHITE,
    ...setPadding(PADDING.p_10, PADDING.p_10, PADDING.p_0, PADDING.p_0)
  },
  contentTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  textContent: {
    fontSize: FONT_SIZE.s_12,
    ...setMargin(MARGIN.m_2, MARGIN.m_2, MARGIN.m_0, MARGIN.m_0)
  },
  qtyView: {
    flexDirection: 'row'
  },
  qtyTitle: {
    ...setMargin(MARGIN.m_0, MARGIN.m_4, MARGIN.m_0, MARGIN.m_0)
  },
  qtyTitleName: {
    ...setMargin(MARGIN.m_0, MARGIN.m_2, MARGIN.m_0, MARGIN.m_28)
  },
  qtyText: {
    width: LAYOUT.l_40,
    textAlign: 'center'
  },
  itemSeparator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: MyTheme.themes.TEXT.SECONDARY,
    ...setMargin(MARGIN.m_8, MARGIN.m_0, MARGIN.m_0, MARGIN.m_0)
  },
  containerViewCmt: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
    ...setMargin(MARGIN.m_4, MARGIN.m_0, MARGIN.m_0, MARGIN.m_0)
  },
  textCmt: {
    color: MyTheme.themes.TEXT.ORANGE,
    textDecorationLine: 'underline',
    ...setPadding(PADDING.p_0, PADDING.p_6, PADDING.p_6, PADDING.p_0)
  }
});
