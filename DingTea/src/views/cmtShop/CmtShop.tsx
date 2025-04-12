import React, {createRef, PureComponent} from 'react';
import {ScrollView} from 'react-native';

import {connect} from 'react-redux';
import MyI18n from 'utils/MyI18n';
import {RootState} from 'views/app/redux/App.Reducer';

import {cmtShop} from './style/CmtShop.Style';

import MyNavigator from 'utils/MyNavigator';
import ChooseAddressShop from 'views/cartPay/components/ChooseAddressShop';
import Utilities from 'utils/Utilities';
import {MyViewShadow, MyText, MyInput, MyButtonText, MyPickImageList} from 'bases/components';
import {IAddressShopState} from 'views/addressShop/redux';
import {IPersonState} from 'views/accounts/person/redux';
import validate from 'validator';
import {uploadImage} from 'services/UpLoadImage.Api';
import {IResponseImageModel} from 'models';
import MyStaticLocal from 'utils/MyStaticLocal';

interface defaultProps extends IAddressShopState, IPersonState {}

class CmtShop extends PureComponent<defaultProps> {
  txtUseName: string = MyStaticLocal.getUser()?.name || '';
  txtPhone: string = MyStaticLocal.getUser()?.phone || '';
  txtCmtShop: string = '';
  arrImage: any[] = [];

  inputNameRef: any = createRef();
  inputPhoneRef: any = createRef();
  inputCmtShopRef: any = createRef();

  onGetListImage = (images: any[]) => {
    this.arrImage = images;
  };

  onPressReview = () => {
    if (!this.txtUseName) {
      Utilities.showToast(
        MyI18n.trans.please_fill_in + ' ' + MyI18n.trans.first_and_last_name,
        '',
        'danger'
      );
      this.inputNameRef.current.focus();
      return;
    }
    if (!this.txtPhone || !validate.isMobilePhone(this.txtPhone, 'vi-VN')) {
      Utilities.showToast(MyI18n.trans.invalid_phone_number, '', 'danger');
      this.inputPhoneRef.current.focus();
      return;
    }
    if (!this.txtCmtShop) {
      Utilities.showToast(MyI18n.trans.please_fill_in + ' ' + MyI18n.trans.evaluate, '', 'danger');
      this.inputCmtShopRef.current.focus();
      return;
    }

    let shop = MyStaticLocal.getAddressShop();
    if (!shop) {
      Utilities.showToast(MyI18n.trans.noti_choose_shop, '', 'danger');
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
        //   phone: this.txtPhone,
        //   name: this.txtUseName,
        //   des: this.txtCmtShop,
        //   images: arrImageResponse,
        //   shop: shop
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
        MyNavigator.goBack();
      })
      .catch(() => {
        // let param = {
        //   phone: this.txtPhone,
        //   name: this.txtUseName,
        //   des: this.txtCmtShop,
        //   shop: shop
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
        MyNavigator.goBack();
      });
  };

  render() {
    const name = MyStaticLocal.getUser()?.name;
    const phone = MyStaticLocal.getUser()?.phone;

    return (
      <ScrollView style={cmtShop.container}>
        <MyViewShadow style={cmtShop.content}>
          <MyText fontStyle="Bold" style={cmtShop.viewTextRating}>
            {MyI18n.trans.feedback}
          </MyText>
          <ChooseAddressShop titleChonCuaHang={MyI18n.trans.choose_a_store} />
          <MyInput
            inputRef={this.inputNameRef}
            containerStyle={cmtShop.contentInput}
            style={cmtShop.inputName}
            returnKeyType="done"
            keyboardType="name-phone-pad"
            placeholder={MyI18n.trans.first_and_last_name}
            maxLength={15}
            onChangeText={text => {
              this.txtUseName = text;
            }}
            defaultValue={name}
            onSubmitEditing={() => this.inputPhoneRef.current.focus()}
          />
          <MyInput
            inputRef={this.inputPhoneRef}
            containerStyle={cmtShop.contentInput}
            style={cmtShop.inputName}
            placeholder={MyI18n.trans.phone}
            returnKeyType="done"
            keyboardType="phone-pad"
            onChangeText={text => {
              this.txtPhone = text;
            }}
            defaultValue={phone}
            onSubmitEditing={() => this.inputCmtShopRef.current.focus()}
          />
          <MyInput
            inputRef={this.inputCmtShopRef}
            textAlignVertical={'top'}
            containerStyle={cmtShop.contentInput}
            style={cmtShop.input}
            multiline={true}
            placeholder={MyI18n.trans.write_a_review}
            onChangeText={text => {
              this.txtCmtShop = text;
            }}
          />
          <MyText fontStyle="SemiBold" style={cmtShop.txtNote}>
            {MyI18n.trans.attached_photo}
          </MyText>
          <MyPickImageList
            titleDialog={MyI18n.trans.pictures_of_the_product}
            titleCamera={MyI18n.trans.take_photo}
            titleGallery={MyI18n.trans.pick_image}
            titleCancel={MyI18n.trans.cancel}
            style={cmtShop.viewImage}
            maxFiles={3}
            onGetListImage={this.onGetListImage}
          />
          <MyButtonText
            title={MyI18n.trans.evaluate}
            onPress={this.onPressReview}
            style={cmtShop.viewTextAttachedPhoto}
          />
        </MyViewShadow>
      </ScrollView>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  const {iso, theme} = state.SettingReducer;
  return {iso, theme};
};

export default connect(mapStateToProps, null)(CmtShop);
