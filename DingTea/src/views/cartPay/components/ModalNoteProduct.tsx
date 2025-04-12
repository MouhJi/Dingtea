import React, {createRef, PureComponent} from 'react';
import {KeyboardAvoidingView, ScrollView, Modal} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import Utilities from 'utils/Utilities';
import {MyButton, MyView, MyText, MyInput, MyButtonText} from 'bases/components';
import {ICartModel} from 'models';
import MyI18n from 'utils/MyI18n';
import {cmtProduct} from 'views/orderDetail/style/OrderDetail.Style';
import MyStaticLocal from 'utils/MyStaticLocal';
import {initCart} from 'views/app/reduxChooseCart';

interface IProps {
  initCart: typeof initCart;
}

interface IStates {
  isVisible: boolean;
}

export default class ModalNoteProduct extends PureComponent<IProps, IStates> {
  state = {isVisible: false};
  textNote: string = '';
  itemProduct: ICartModel | undefined = undefined;

  inputEvaluateRef: any = createRef();

  setProduct = (itemProduct: ICartModel) => {
    this.itemProduct = itemProduct;
  };

  onPressNote = () => {
    this.setState(
      {
        isVisible: false
      },
      () => {
        MyStaticLocal.changeItemListProductCart({...this.itemProduct, note: this.textNote});
        this.props.initCart(MyStaticLocal.getListProductCart());
      }
    );
  };

  onShow = () => {
    this.setState({
      isVisible: true
    });
  };

  onHide = () => {
    this.setState({
      isVisible: false
    });
  };

  render() {
    const {isVisible} = this.state;

    return (
      <Modal
        visible={isVisible}
        transparent
        supportedOrientations={['portrait', 'landscape']}
        animationType="slide"
        hardwareAccelerated
        onRequestClose={this.onHide}>
        <SafeAreaView edges={['left', 'right', 'bottom']} style={cmtProduct.container}>
          <KeyboardAvoidingView
            style={cmtProduct.spaceUp}
            behavior={Utilities.isAndroid() ? undefined : 'padding'}>
            <ScrollView
              style={cmtProduct.spaceUp}
              contentContainerStyle={cmtProduct.contentScroll}
              keyboardShouldPersistTaps="handled">
              <MyButton
                style={cmtProduct.modalContainer}
                transparent
                activeOpacity={1}
                onPress={this.onHide}>
                <MyButton style={cmtProduct.content} activeOpacity={1} onPress={() => {}}>
                  <MyView style={cmtProduct.viewRow} transparent>
                    <MyText fontStyle="SemiBold" style={cmtProduct.viewTextRating}>
                      {MyI18n.trans.note}
                      {':'}
                    </MyText>
                  </MyView>
                  <MyInput
                    autoFocus
                    defaultValue={this.itemProduct?.note}
                    inputRef={this.inputEvaluateRef}
                    textAlignVertical="top"
                    containerStyle={cmtProduct.contentInput}
                    style={cmtProduct.input}
                    multiline={true}
                    placeholder={MyI18n.trans.write_a_note}
                    onChangeText={(text: string) => {
                      this.textNote = text;
                    }}
                  />
                  <MyButtonText
                    style={cmtProduct.bntPreview}
                    title={MyI18n.trans.note}
                    onPress={this.onPressNote}
                  />
                </MyButton>
              </MyButton>
            </ScrollView>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </Modal>
    );
  }
}
