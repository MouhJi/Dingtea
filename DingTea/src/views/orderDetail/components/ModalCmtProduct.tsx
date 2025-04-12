import React, {createRef, PureComponent} from 'react';
import {KeyboardAvoidingView, ScrollView, Modal} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import Utilities from 'utils/Utilities';
import {
  MyButton,
  MyView,
  MyText,
  Rating,
  MyInput,
  MyButtonText,
  MyPickImageList
} from 'bases/components';
import {cmtProduct} from '../style/OrderDetail.Style';
import {ICartModel, IResponseImageModel} from 'models';
import {uploadImage} from 'services/UpLoadImage.Api';
import MyI18n from 'utils/MyI18n';

interface defaultProps {}

interface IStates {
  isVisible: boolean;
}

export default class ModalCmtProduct extends PureComponent<defaultProps, IStates> {
  state = {isVisible: false};
  levelRating: number = 5;
  textCmt: string = '';
  arrImage: any[] = [];
  itemProduct: ICartModel | undefined = undefined;

  inputEvaluateRef: any = createRef();

  ratingCompleted = (rating: number) => {
    this.levelRating = rating;
  };

  onGetListImage = (images: any[]) => {
    this.arrImage = images;
  };

  setProduct = (itemProduct: ICartModel) => {
    this.itemProduct = itemProduct;
  };

  onPressReview = () => {
    if (!this.textCmt) {
      Utilities.showToast(MyI18n.trans.please_fill_in + ' ' + MyI18n.trans.evaluate, '', 'danger');
      this.inputEvaluateRef.current.focus();
      return;
    }

    let arrImgRequest: any = [];
    for (let i = 0; i < this.arrImage.length; i++) {
      const element = this.arrImage[i];
      let req = uploadImage<IResponseImageModel>(element);
      arrImgRequest.push(req);
    }

    let arrImageResponse: string[] = [];

    Utilities.showHideRootLoading(true, MyI18n.trans.please_wait);

    Promise.all<IResponseImageModel>(arrImgRequest)
      .then(resRequest => {
        // for (let i = 0; i < resRequest.length; i++) {
        //   const element = resRequest[i];
        //   arrImageResponse.push(element.url);
        // }
        // let param = {
        //   soSao: this.levelRating,
        //   danhGia: this.textCmt,
        //   images: arrImageResponse
        // };
        // Utilities.log(param);
        // createComment(param)
        //   .then()
        //   .catch(() => {
        //     Utilities.showHideRootLoading(false);
        //     Utilities.showToast(MyI18n.trans.an_error_has_occurred, '', 'danger');
        //   });
        Utilities.showHideRootLoading(false);
        Utilities.showToast(MyI18n.trans.thank_you_for_rating, '', 'success');
        this.onHide();
      })
      .catch(() => {
        // let param = {
        //   soSao: this.levelRating,
        //   danhGia: this.textCmt,
        //   images: arrImageResponse
        // };
        // Utilities.log(param);
        // createComment(param)
        //   .then()
        //   .catch(() => {
        //     Utilities.showHideRootLoading(false);
        //     Utilities.showToast(MyI18n.trans.an_error_has_occurred, '', 'danger');
        //   });
        Utilities.showHideRootLoading(false);
        Utilities.showToast(MyI18n.trans.thank_you_for_rating, '', 'success');
        this.onHide();
      });
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
                      {MyI18n.trans.evaluate}
                      {':'}
                    </MyText>
                    <Rating onChange={this.ratingCompleted} rating={5} />
                  </MyView>
                  <MyInput
                    inputRef={this.inputEvaluateRef}
                    textAlignVertical="top"
                    containerStyle={cmtProduct.contentInput}
                    style={cmtProduct.input}
                    multiline={true}
                    placeholder={MyI18n.trans.write_a_review}
                    onChangeText={(text: string) => {
                      this.textCmt = text;
                    }}
                  />
                  <MyText fontStyle="SemiBold">{MyI18n.trans.attached_photo}</MyText>
                  <MyPickImageList
                    titleDialog={MyI18n.trans.pictures_of_the_product}
                    titleCamera={MyI18n.trans.take_photo}
                    titleGallery={MyI18n.trans.pick_image}
                    titleCancel={MyI18n.trans.cancel}
                    style={cmtProduct.viewImage}
                    maxFiles={3}
                    onGetListImage={this.onGetListImage}
                  />
                  <MyButtonText
                    style={cmtProduct.bntPreview}
                    title={MyI18n.trans.evaluate}
                    onPress={this.onPressReview}
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
