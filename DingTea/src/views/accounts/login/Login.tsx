import React, {createRef, PureComponent} from 'react';
import {KeyboardAvoidingView, ScrollView} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {connect} from 'react-redux';
import MyI18n from 'utils/MyI18n';
import {bindActionCreators} from 'redux';

import {RootState} from 'views/app/redux/App.Reducer';

import loginStyle from './style/Login.Style';
import MyNavigator from 'utils/MyNavigator';

import {
  MyView,
  MyInput,
  MyButtonText,
  MyButtonCountDown,
  MyText,
  MyButtonIcon
} from 'bases/components';
import Utilities from 'utils/Utilities';
import validate from 'validator';

import {IAddressUserModal, IDataUser} from 'models';

import {getUserAddress, postCode, postLogin, postRegister} from 'services';
import {initUser} from 'views/accounts/person/redux';
import {chooseAddressUser} from 'views/app/reduxChooseAddressUser';

import MyStorage from 'utils/MyStorage';
import {ADDRESS_USER_CHOOSE, USER_DATA, USER_TOKEN} from 'common/KeyStorages';
import MyStaticLocal from 'utils/MyStaticLocal';

import {SvgCss} from 'react-native-svg/css';
import {svgVietNam} from 'assets/images/svgImage';
import MyTheme from 'utils/MyTheme';

interface defaultProps {
  initUser: typeof initUser;
  chooseAddressUser: typeof chooseAddressUser;
}

interface IStates {
  isEditable: boolean;
  isShowOTP: boolean;
  isShowLogin: boolean;
  isShowViewLogin: boolean;
  isShowRegister: boolean;
  isShowViewRegister: boolean;
  isShowCodeAgain: boolean;
}

class Login extends PureComponent<defaultProps, IStates> {
  state = {
    isEditable: true,
    isShowOTP: false,
    isShowLogin: true,
    isShowViewLogin: false,
    isShowRegister: true,
    isShowViewRegister: false,
    isShowCodeAgain: false
  };

  phone: string = '';
  code: string = '';
  name: string = '';
  inputPhoneRef: any = createRef();
  inputCodeRef: any = createRef();
  inputNameRef: any = createRef();

  onClose = () => {
    MyNavigator.goBack();
  };

  onShowLogin = () => {
    this.setState(
      {
        isEditable: true,
        isShowOTP: false,
        isShowLogin: true,
        isShowViewLogin: false,
        isShowRegister: true,
        isShowViewRegister: false,
        isShowCodeAgain: false
      },
      () => {
        this.inputPhoneRef.current.focus();
      }
    );
  };

  onLogin = () => {
    if (!this.phone || !validate.isMobilePhone(this.phone, 'vi-VN')) {
      Utilities.showToast(MyI18n.trans.invalid_phone_number, '', 'danger');
      this.inputPhoneRef.current.focus();
    } else {
      this.sendCode();
    }
  };

  onShowRegister = () => {
    this.setState(
      {
        isEditable: true,
        isShowOTP: false,
        isShowLogin: false,
        isShowViewLogin: true,
        isShowRegister: false,
        isShowViewRegister: true,
        isShowCodeAgain: false
      },
      () => {
        this.inputNameRef.current.focus();
      }
    );
  };

  onRegister = () => {
    if (!this.name) {
      Utilities.showToast(MyI18n.trans.please_enter_name, '', 'danger');
      this.inputNameRef.current.focus();
      return;
    }
    if (!this.phone || !validate.isMobilePhone(this.phone, 'vi-VN')) {
      Utilities.showToast(MyI18n.trans.invalid_phone_number, '', 'danger');
      this.inputPhoneRef.current.focus();
      return;
    }
    Utilities.showHideRootLoading(true, MyI18n.trans.loading);
    postRegister({phone: this.phone, name: this.name, password: this.phone})
      .then(res => {
        if (res?.code) {
          Utilities.logCrashlytics('Login - onRegister: ', res);
          switch (res?.code) {
            case 500:
              Utilities.showHideRootLoading(false);
              Utilities.showToast(MyI18n.trans.account_already_exists, '', 'danger');
              break;
            default:
              Utilities.showHideRootLoading(false);
              Utilities.showToast(MyI18n.trans.registration_failed, '', 'danger');
              break;
          }
        } else {
          this.sendCode();
        }
      })
      .catch(error => {
        Utilities.logCrashlytics('Login - onRegister: ', error);
        Utilities.showHideRootLoading(false);
        Utilities.showToast(MyI18n.trans.registration_failed, '', 'danger');
      });
  };

  onConfirm = () => {
    if (this.code.length < 6) {
      Utilities.showToast(MyI18n.trans.invalid_phone_number, '', 'danger');
      this.inputCodeRef.current.focus();
    }
    Utilities.showHideRootLoading(true, MyI18n.trans.loading);
    postLogin<IDataUser>({username: this.phone, password: this.code})
      .then(res => {
        if (res?.code) {
          Utilities.showHideRootLoading(false);
          Utilities.logCrashlytics('Login - onConfirm: ', res);
          Utilities.showToast(MyI18n.trans.incorrect_code, '', 'danger');
        } else {
          this.saveDataLogin(res?.data);
        }
      })
      .catch(error => {
        Utilities.logCrashlytics('Login - onConfirm: ', error);
        Utilities.showHideRootLoading(false);
        Utilities.showToast(MyI18n.trans.incorrect_code, '', 'danger');
      });
  };

  saveDataLogin = (data?: IDataUser) => {
    if (data) {
      MyStorage.create(USER_DATA, data.user)
        .then(() => {
          MyStorage.create(USER_TOKEN, data.token);
          MyStaticLocal.setUserToken(data.token);
          MyStaticLocal.setUser(data.user);
          this.props.initUser(data.user);
          this.setAddressUserDefault();
          Utilities.showHideRootLoading(false);
          MyNavigator.popToTop();
        })
        .catch(() => {
          Utilities.showHideRootLoading(false);
          Utilities.showToast(MyI18n.trans.an_error_has_occurred, '', 'danger');
        });
    } else {
      Utilities.showHideRootLoading(false);
      Utilities.showToast(MyI18n.trans.incorrect_code, '', 'danger');
    }
  };

  setAddressUserDefault = () => {
    getUserAddress<IAddressUserModal>({
      skip: 0,
      limit: 1,
      user: MyStaticLocal.getUser()?.id,
      is_default: true
    })
      .then(res => {
        if (!res?.code) {
          if (res?.data && res?.data.length > 0) {
            MyStorage.create(ADDRESS_USER_CHOOSE, res?.data[0]);
            this.props.chooseAddressUser(res?.data[0]);
          }
        }
      })
      .catch(() => {});
  };

  sendCode = () => {
    Utilities.showHideRootLoading(true, MyI18n.trans.loading);
    postCode({phone: this.phone})
      .then(resCode => {
        Utilities.showHideRootLoading(false);
        if (resCode?.code) {
          Utilities.logCrashlytics('Login - sendCode: ', resCode);
          switch (resCode?.code) {
            case 404:
              Utilities.showToast(MyI18n.trans.could_not_find_this_account, '', 'danger');
              break;
            default:
              Utilities.showToast(MyI18n.trans.failed_code_submission, '', 'danger');
              break;
          }
        } else {
          this.setState(
            {
              isEditable: false,
              isShowOTP: true,
              isShowLogin: false,
              isShowViewLogin: false,
              isShowRegister: false,
              isShowViewRegister: false,
              isShowCodeAgain: true
            },
            () => {
              if (__DEV__) {
                Utilities.showToast(
                  MyI18n.trans.successful_code_submission,
                  resCode?.message,
                  'success',
                  5000
                );
              } else {
                Utilities.showToast(MyI18n.trans.successful_code_submission, '', 'success');
              }
              this.inputCodeRef.current.focus();
            }
          );
        }
      })
      .catch(error => {
        Utilities.logCrashlytics('Login - sendCode: ', error);
        Utilities.showHideRootLoading(false);
        Utilities.showToast(MyI18n.trans.failed_code_submission, '', 'danger');
      });
  };

  resendCode = () => {
    this.sendCode();
  };

  render() {
    const {
      isEditable,
      isShowOTP,
      isShowLogin,
      isShowViewLogin,
      isShowRegister,
      isShowViewRegister,
      isShowCodeAgain
    } = this.state;

    return (
      <SafeAreaView edges={['top', 'bottom']} style={loginStyle.container}>
        <KeyboardAvoidingView
          style={loginStyle.spaceUp}
          // keyboardVerticalOffset={60}`
          behavior={Utilities.isAndroid() ? undefined : 'padding'}>
          <MyButtonIcon
            iconFontType={'AntDesign'}
            iconProps={{
              name: 'arrowleft',
              color: MyTheme.themes.BG.BLACK,
              size: 26,
              style: loginStyle.close
            }}
            onPress={this.onClose}
            style={loginStyle.btnClose}
          />
          <ScrollView keyboardShouldPersistTaps="handled" style={loginStyle.spaceUp}>
            {isShowOTP ? (
              <MyView transparent style={loginStyle.viewWellcome}>
                <MyText fontStyle="SemiBold" style={loginStyle.txtDingteaSay}>
                  {MyI18n.trans.enter_otp_note}
                </MyText>
              </MyView>
            ) : (
              <MyView transparent style={loginStyle.viewWellcome}>
                <MyText fontStyle="Bold">{MyI18n.trans.dingtea_hello}</MyText>
                <MyText fontStyle="SemiBold" style={loginStyle.txtDingteaSay}>
                  {MyI18n.trans.dingtea_say_introduct}
                </MyText>
              </MyView>
            )}

            <MyView transparent style={loginStyle.viewForm}>
              {/* input nhập Name */}
              {isShowViewRegister ? (
                <>
                  <MyText fontStyle="SemiBold" style={loginStyle.txtName}>
                    {MyI18n.trans.first_and_last_name}
                  </MyText>
                  <MyInput
                    inputRef={this.inputNameRef}
                    placeholder={MyI18n.trans.first_and_last_name}
                    containerStyle={loginStyle.viewinput}
                    returnKeyType="done"
                    keyboardType="default"
                    onSubmitEditing={() => this.inputPhoneRef.current.focus()}
                    onChangeText={text => (this.name = text)}
                  />
                </>
              ) : null}
              <MyView transparent style={loginStyle.viewName}>
                <MyText fontStyle="SemiBold" style={loginStyle.txtName}>
                  {MyI18n.trans.phone}
                </MyText>
                <SvgCss xml={svgVietNam} />
              </MyView>
              <MyView style={loginStyle.viewInputLogin}>
                {/* <MyText style={loginStyle.txtContry}>+84</MyText> */}
                <MyButtonText
                  titleStyle={loginStyle.txtContry}
                  style={loginStyle.btnContry}
                  title={'+84'}
                />
                <MyInput
                  inputRef={this.inputPhoneRef}
                  editable={isEditable}
                  placeholder={MyI18n.trans.phone}
                  containerStyle={loginStyle.viewinputTwo}
                  returnKeyType="done"
                  keyboardType="phone-pad"
                  onChangeText={text => (this.phone = Utilities.formatPhoneNumber(text))}
                  //   autoFocus={true}
                />
              </MyView>
              {/* input nhập OTP */}
              {isShowOTP ? (
                <>
                  <MyText fontStyle="SemiBold" style={loginStyle.txtName}>
                    {MyI18n.trans.enter_otp}
                  </MyText>
                  <MyInput
                    inputRef={this.inputCodeRef}
                    placeholder={MyI18n.trans.enter_otp}
                    containerStyle={loginStyle.viewinput}
                    returnKeyType="done"
                    keyboardType="phone-pad"
                    maxLength={6}
                    onChangeText={text => (this.code = text)}
                  />
                </>
              ) : null}

              {/* button Login */}
              {isShowLogin ? (
                <MyButtonText
                  onPress={this.onLogin}
                  style={loginStyle.btnLogin}
                  title={MyI18n.trans.login}
                />
              ) : null}
              {/* button Register */}
              {isShowViewRegister ? (
                <MyButtonText
                  onPress={this.onRegister}
                  style={loginStyle.btnLogin}
                  title={MyI18n.trans.register}
                />
              ) : null}
              {/* button confirm code */}
              {isShowOTP ? (
                <MyButtonText
                  onPress={this.onConfirm}
                  style={loginStyle.btnLogin}
                  title={MyI18n.trans.confirm}
                />
              ) : null}
              {/* text Register */}
              {isShowRegister ? (
                <MyView style={loginStyle.viewTextLogin} transparent>
                  <MyText fontStyle="Regular" style={loginStyle.textTitle}>
                    {MyI18n.trans.do_not_have_an_account}
                  </MyText>
                  <MyText
                    onPress={this.onShowRegister}
                    style={loginStyle.textCmt}
                    fontStyle="SemiBold">
                    {MyI18n.trans.register}
                  </MyText>
                </MyView>
              ) : null}
              {/* text Login */}
              {isShowViewLogin ? (
                <MyView style={loginStyle.viewTextLogin} transparent>
                  <MyText fontStyle="Regular" style={loginStyle.textTitle}>
                    {MyI18n.trans.do_you_already_have_an_account}
                  </MyText>
                  <MyText
                    onPress={this.onShowLogin}
                    style={loginStyle.textCmt}
                    fontStyle="SemiBold">
                    {MyI18n.trans.login}
                  </MyText>
                </MyView>
              ) : null}
              {/* text countdown Code */}
              {isShowCodeAgain ? (
                <MyButtonCountDown
                  onPressBtn={this.resendCode}
                  style={loginStyle.btnResend}
                  titleStyle={loginStyle.txtResend}
                  title={MyI18n.trans.resend_code}
                  timer={60}
                  isShowTextTime={true}
                />
              ) : null}
            </MyView>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
}
const mapStateToProps = (state: RootState) => {
  const {iso, theme} = state.SettingReducer;
  return {iso, theme};
};

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      initUser,
      chooseAddressUser
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
