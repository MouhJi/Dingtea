import React, {createRef, PureComponent} from 'react';
import {FlatList, KeyboardAvoidingView} from 'react-native';

import {connect} from 'react-redux';
import MyI18n from 'utils/MyI18n';
import {bindActionCreators} from 'redux';
import {RootState} from 'views/app/redux/App.Reducer';

import ButtonBottomComponent from './components/ButtonBottomComponent';
import {cartPayStyles, ghiChuStyles} from './style/CartPay.Style';
import MyNavigator from 'utils/MyNavigator';

import ChooseAddressShop from './components/ChooseAddressShop';
import ChooseAddressUser from './components/ChooseAddressUser';

import ChooseVoucher from './components/ChooseVoucher';
import SumPrice from './components/SumPrice';
import {MyView, MyIcon, MyText, MyButton, MyInput} from 'bases/components';
import {ICartModel} from 'models';
import ItemCartPay from './components/ItemCartPay';
import {IPersonState} from 'views/accounts/person/redux';
import ChooseShip from './components/ChooseShip';
import Utilities from 'utils/Utilities';
import ModalNoteProduct from './components/ModalNoteProduct';
import {IChooseCartState, initCart} from 'views/app/reduxChooseCart';
import MyTheme from 'utils/MyTheme';

interface IProps extends IPersonState, IChooseCartState {
  initCart: typeof initCart;
}

class CartPay extends PureComponent<IProps> {
  noteRef: any = createRef();
  showModalNoteProductRef: any = createRef();

  onPressWriteNote = (item: ICartModel) => {
    this.showModalNoteProductRef.current.setProduct(item);
    this.showModalNoteProductRef.current.onShow();
  };

  renderListItem = ({item, index}: {item: ICartModel; index: number}) => {
    return (
      <ItemCartPay
        key={index}
        item={item}
        style={cartPayStyles.item}
        onPressWriteNote={this.onPressWriteNote}
      />
    );
  };

  renderChooseVoucher = () => {
    const {phone} = this.props;
    if (phone) {
      return <ChooseVoucher />;
    } else {
      return (
        <MyView transparent>
          <MyText fontStyle="Bold" style={cartPayStyles.titleGiamGia}>
            {MyI18n.trans.discount_code}
          </MyText>
          <MyButton style={cartPayStyles.viewChonGiamGia} onPress={this.onPressLogin} transparent>
            <MyText style={cartPayStyles.chonGiamGia} fontStyle="Regular">
              {MyI18n.trans.log_in_now}
            </MyText>
          </MyButton>
        </MyView>
      );
    }
  };

  onPressLogin = () => {
    const {phone} = this.props;
    if (!phone) {
      MyNavigator.navigate('Login');
    }
  };

  renderChooseShip = () => {
    return <ChooseShip />;
  };

  changeNote = (text: string) => {
    this.noteRef.current.setNoteOrder(text);
  };

  render() {
    const {listProductCart} = this.props;
    if (listProductCart && listProductCart.length > 0)
      return (
        <KeyboardAvoidingView
          style={cartPayStyles.container}
          behavior={Utilities.isAndroid() ? undefined : 'padding'}>
          <FlatList
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={cartPayStyles.contentList}
            data={listProductCart}
            extraData={listProductCart}
            keyExtractor={item => item.id + ''}
            renderItem={this.renderListItem}
            ListHeaderComponent={this.renderHeaderCartPay}
            ListFooterComponent={this.renderFooterCartPay}
          />
          <ButtonBottomComponent ref={this.noteRef} />
          <ModalNoteProduct ref={this.showModalNoteProductRef} initCart={this.props.initCart} />
        </KeyboardAvoidingView>
      );

    return <MyView />;
  }

  renderHeaderCartPay = () => {
    const {name, phone} = this.props;
    return (
      <MyView transparent>
        <MyButton style={cartPayStyles.viewEditText} transparent onPress={this.onPressLogin}>
          <MyIcon
            style={cartPayStyles.icon}
            iconFontType="Ionicons"
            name="person-outline"
            size={14}
            color={MyTheme.themes.TEXT.SECONDARY_LIGHT}
          />
          <MyText fontStyle="Regular" style={cartPayStyles.textTitlePrime} numberOfLines={1}>
            {name || MyI18n.trans.not_logged_in}
            {' - '}
          </MyText>
          <MyText fontStyle="Bold" style={cartPayStyles.textTitlePrime}>
            {phone || MyI18n.trans.log_in_now}
          </MyText>
        </MyButton>
        <ChooseAddressShop titleChonCuaHang={MyI18n.trans.choose_a_store} />
        <ChooseAddressUser titleChonDiaChi={MyI18n.trans.choose_your_address} />
        {/* <MyView style={cartPayStyles.viewEditText} transparent>
  <MyIcon
    style={cartPayStyles.icon}
    iconFontType="Ionicons"
    name="time-outline"
    size={14}
    color={MyTheme.themes.TEXT.SECONDARY_LIGHT}
  />
  <MyText fontStyle="Regular" style={cartPayStyles.textTitlePrime} numberOfLines={1}>
    {MyI18n.trans.delivery_time}
    {': '}
  </MyText>
  <MyText fontStyle="Bold" style={cartPayStyles.textTitlePrime}>
    {'~20-30'} {MyI18n.trans.minutes}
  </MyText>
</MyView> */}
        <MyView style={cartPayStyles.detailOrder}>
          <MyText fontStyle="Bold">{MyI18n.trans.cart}</MyText>
        </MyView>
      </MyView>
    );
  };

  renderFooterCartPay = () => {
    return (
      <MyView transparent>
        {this.renderChooseVoucher()}
        <MyView style={cartPayStyles.itemSeparator} />
        {this.renderChooseShip()}
        <MyView style={cartPayStyles.itemSeparator} />
        <SumPrice titleTotalPrice={MyI18n.trans.total} />
        <MyView style={cartPayStyles.itemSeparator} />
        <MyView style={ghiChuStyles.container} transparent>
          <MyText fontStyle="Bold">{MyI18n.trans.note}</MyText>
          <MyInput
            placeholder={MyI18n.trans.notes_for_order}
            containerStyle={ghiChuStyles.viewinput}
            style={ghiChuStyles.input}
            returnKeyType="done"
            keyboardType="default"
            onChangeText={this.changeNote}
            multiline
            numberOfLines={5}
          />
        </MyView>
      </MyView>
    );
  };
}

const mapStateToProps = (state: RootState) => {
  const {iso, theme} = state.SettingReducer;
  const {name, phone} = state.PersonReducer;
  const {listProductCart} = state.ChooseCartReducer;
  return {iso, theme, name, phone, listProductCart};
};

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      initCart
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(CartPay);
