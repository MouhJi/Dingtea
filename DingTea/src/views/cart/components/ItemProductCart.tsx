import React, {createRef, PureComponent} from 'react';

import {COLOR} from 'bases/styles/Core';

import MyNavigator from 'utils/MyNavigator';
import {itemCartStyles} from '../style/Cart.Style';
import {
  MyButtonShadow,
  MyText,
  MyTextPriceMask,
  MyView,
  MyButtonIcon,
  MyDialogInput,
  MyImage
} from 'bases/components';
import {ICartModel} from 'models';
import {initCart} from 'views/app/reduxChooseCart';

import {connect} from 'react-redux';
import MyI18n from 'utils/MyI18n';
import {bindActionCreators} from 'redux';
import MyStaticLocal from 'utils/MyStaticLocal';
import Utilities from 'utils/Utilities';

interface IProps {
  item: ICartModel;

  initCart: typeof initCart;
}

interface IState {
  soLuong: number;
}

class ItemProductCart extends PureComponent<IProps, IState> {
  price_options: number = 0;
  title_options: string = '';

  constructor(props: any) {
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
      if (element.name && element.type === 'option') {
        arrTitle.push(element.name);
      }
    }
    this.title_options = arrTitle.join(', ');
  }
  state = {soLuong: this.props.item.total_quantity || 0};

  dialogDeleteRef: any = createRef();
  cancleDialogDelete = () => {
    this.dialogDeleteRef.current.onHide();
  };

  onPress = () => {
    MyNavigator.navigate('ProductDetailEdit', {
      productCart: {...this.props.item, total_quantity: this.state.soLuong}
    });
  };

  deleteItem = () => {
    const {item} = this.props;
    MyStaticLocal.removeItemListProductCart(item);
    this.props.initCart(MyStaticLocal.getListProductCart());
  };
  onPressClose = () => {
    this.dialogDeleteRef.current.onShow();
  };

  updateSoluong = () => {
    const {item} = this.props;
    let param = {...item, total_quantity: this.state.soLuong};
    MyStaticLocal.changeItemListProductCart(param);
    this.props.initCart(MyStaticLocal.getListProductCart());
  };
  onPressPlus = () => {
    this.setState(
      {
        soLuong: this.state.soLuong + 1
      },
      this.updateSoluong
    );
  };

  onPressMinus = () => {
    if (this.state.soLuong > 1) {
      this.setState(
        {
          soLuong: this.state.soLuong - 1
        },
        this.updateSoluong
      );
    } else {
      this.onPressClose();
    }
  };

  render() {
    const {item} = this.props;
    const {soLuong} = this.state;

    let priceOne = item.price || 0;
    let price = (priceOne + this.price_options) * soLuong;

    let name = item.name || '';

    const source = Utilities.convertLinkImage(item?.thumbnail_url, 'MEDIUM');

    const _viewTopping: any[] = [];
    if (item.product_options) {
      for (let i = 0; i < item.product_options.length; i++) {
        const element = item.product_options[i];
        if (element.type === 'topping') {
          let titleTmp = '';
          if (element.total_quantity && element.total_quantity > 1) {
            titleTmp = element.name + ' x ' + element.total_quantity;
          } else {
            titleTmp = element.name || '';
          }
          _viewTopping.push(
            <MyText key={i.toString()} fontStyle="SemiBold" style={itemCartStyles.titleTopping}>
              {titleTmp}
            </MyText>
          );
        }
      }
    }

    return (
      <MyButtonShadow onPress={this.onPress} style={itemCartStyles.container}>
        <MyText fontStyle="Bold" numberOfLines={2} style={itemCartStyles.qtyTitleName}>
          {name}
        </MyText>
        <MyText fontStyle="SemiBold" style={itemCartStyles.textContent}>
          {this.title_options}
        </MyText>

        <MyView style={itemCartStyles.containerImage} transparent>
          <MyView style={itemCartStyles.contentImage} transparent>
            {_viewTopping.length > 0 ? (
              <MyText fontStyle="Bold">{MyI18n.trans.topping}</MyText>
            ) : null}
            {_viewTopping}
            <MyText fontStyle="Bold" style={itemCartStyles.titleNote}>
              {MyI18n.trans.note}
            </MyText>
            <MyText
              fontStyle="Regular"
              style={item?.note ? itemCartStyles.titleContentNote : itemCartStyles.textCmt}
              numberOfLines={3}>
              {item?.note ? item.note : MyI18n.trans.write_a_note}
            </MyText>
          </MyView>
          <MyImage
            source={source}
            width={itemCartStyles.image.width}
            height={itemCartStyles.image.width}
            style={itemCartStyles.image}
          />
        </MyView>

        <MyView style={itemCartStyles.qtyView} transparent>
          <MyText fontStyle="Bold">{MyI18n.trans.amount}:</MyText>
          <MyView style={itemCartStyles.qtyViewContent} transparent>
            {/* <MyButtonIcon
              onPress={this.onPressMinus}
              iconFontType="MaterialCommunityIcons"
              iconProps={{name: 'minus-circle-outline', color: COLOR.TEXT.SECONDARY, size: 20}}
              style={itemCartStyles.minusButton}
            /> */}
            <MyText style={itemCartStyles.txtSoluong} fontStyle="Regular">
              {soLuong}
            </MyText>
            {/* <MyButtonIcon
              onPress={this.onPressPlus}
              iconFontType="MaterialCommunityIcons"
              iconProps={{name: 'plus-circle', color: COLOR.TEXT.DA_CAM, size: 20}}
              style={itemCartStyles.plusButton}
            /> */}
          </MyView>
        </MyView>

        <MyView style={itemCartStyles.qtyViewImage} transparent>
          <MyText fontStyle="Bold">{MyI18n.trans.total}</MyText>
          <MyTextPriceMask text={price} fontStyle="Bold" style={itemCartStyles.qtyTitle} />
        </MyView>

        <MyButtonIcon
          onPress={this.onPressClose}
          iconFontType="MaterialCommunityIcons"
          iconProps={{name: 'close-circle-outline', color: COLOR.TEXT.SECONDARY, size: 20}}
          style={itemCartStyles.closeButton}
        />
        <MyDialogInput
          ref={this.dialogDeleteRef}
          onRequestClose={this.cancleDialogDelete}
          title={MyI18n.trans.delete_product}
          titleStyle={{color: COLOR.TEXT.BLACK}}
          description={MyI18n.trans.question_delete_product}
          descriptionStyle={{color: COLOR.TEXT.BLACK}}
          contentStyle={{backgroundColor: COLOR.BG.WHITE}}
          actionButtons={[
            {
              label: MyI18n.trans.delete,
              color: COLOR.TEXT.POSITIVE_BTN,
              onPress: this.deleteItem
            },
            {
              label: MyI18n.trans.exit,
              color: COLOR.TEXT.NEGATIVE_BTN,
              onPress: this.cancleDialogDelete
            }
          ]}
        />
      </MyButtonShadow>
    );
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      initCart
    },
    dispatch
  );
};

export default connect(null, mapDispatchToProps)(ItemProductCart);
