import React, {PureComponent} from 'react';
import {StyleSheet, ViewProps} from 'react-native';

import {FONT_SIZE, LAYOUT, MARGIN, PADDING, setMargin, setPadding} from 'bases/styles/Core';
import {MyText, MyView, MyTextPriceMask} from 'bases/components';
import {ICartModel} from 'models';
import MyI18n from 'utils/MyI18n';
import MyTheme from 'utils/MyTheme';

interface IProps extends ViewProps {
  isShowCmt?: boolean;
  item: ICartModel;
  onPressWriteCmt?: (item: ICartModel) => void;
}

export default class ItemCart extends PureComponent<IProps, {}> {
  title_options: string = '';

  constructor(props: any) {
    super(props);

    const {item} = this.props;
    const product_options: ICartModel[] = item.product_options || [];
    let arrTitle: string[] = [MyI18n.trans.size + ' ' + item.option_name || ''];

    for (let index = 0; index < product_options.length; index++) {
      let element = product_options[index];
      if (element.name) {
        let name = element.name;
        let optionName = element.option_name;
        if (optionName) {
          name = name.replace(' ' + optionName, '');
        }
        arrTitle.push(name);
      }
    }
    this.title_options = arrTitle.join(', ');
  }

  onPressWriteCmt = () => {
    if (this.props.onPressWriteCmt) {
      this.props.onPressWriteCmt(this.props.item);
    }
  };

  render() {
    const {style, isShowCmt, item} = this.props;

    let _viewCmt = null;
    if (isShowCmt) {
      _viewCmt = (
        <MyText onPress={this.onPressWriteCmt} style={itemCartStyles.textCmt} fontStyle="Regular">
          {MyI18n.trans.write_a_review}
        </MyText>
      );
    }

    let name = item.name || '';
    let optionName = item.option_name;
    if (optionName) {
      name = name.replace('-', '');
      name = name.replace(' ' + optionName, '');
    }

    let price = item.total_price || 0;

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

          {_viewCmt}
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
