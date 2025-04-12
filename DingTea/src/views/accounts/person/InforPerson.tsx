import {MyButton, MyDatePicker, MyText, MyView, MyViewShadow} from 'bases/components';
import React, {createRef, PureComponent} from 'react';
import {KeyboardAvoidingView, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import MyI18n from 'utils/MyI18n';
import {bindActionCreators} from 'redux';
import MyStaticLocal from 'utils/MyStaticLocal';
import Utilities from 'utils/Utilities';
import {RootState} from 'views/app/redux';
import {chooseAddressUser} from 'views/app/reduxChooseAddressUser';
import {ModalChangeName, ModalChangePhone, AvatarComponent} from './component';
import {initUser, showRefresh, IPersonState, updateBirthday, updateName} from './redux';
import {inforPersonStyle} from './style/Person.Style';
interface defaultProps extends IPersonState {
  initUser: typeof initUser;
  showRefresh: typeof showRefresh;
  chooseAddressUser: typeof chooseAddressUser;
  updateBirthday: typeof updateBirthday;
  updateName: typeof updateName;
}
interface IAppState {
  newName: string;
  newDate: Date | string;
}
class InforPerson extends PureComponent<defaultProps, IAppState> {
  showModalBirthdayRef: any = createRef();
  showModalNameRef: any = createRef();
  showModalPhoneRef: any = createRef();
  state = {
    newName: '',
    newDate: ''
  };

  onPressBirthDay = () => {
    if (this.showModalBirthdayRef.current) {
      this.showModalBirthdayRef.current.onShow();
    }
  };

  onChangeText = (text: string) => {
    this.setState({
      newName: text
    });
  };

  handleToSelectedDate = (value: any) => {
    Utilities.showHideRootLoading(true, MyI18n.trans.loading);
    this.props.updateBirthday(value);
    if (this.showModalBirthdayRef.current) {
      this.showModalBirthdayRef.current.onHide();
    }
  };

  handleChangeName = (name: string) => {
    Utilities.showHideRootLoading(true, MyI18n.trans.loading);
    this.props.updateName(name);
    if (this.showModalNameRef.current) {
      this.showModalNameRef.current.onHide();
    }
  };
  handleChangePhone = (name: string) => {
    // Utilities.showHideRootLoading(true, MyI18n.trans.loading);
    let textCode = '';
    let number = '0123456789';
    for (let index = 0; index < 6; index++) {
      textCode += number.charAt(Math.floor(Math.random() * number.length));
    }
    Utilities.showToast(MyI18n.trans.successful_code_submission, textCode, 'success', 5000);
    // this.props.updateName(name);
    console.log(name);
  };

  handleXacNhan = (name: string) => {
    // Utilities.showHideRootLoading(true, MyI18n.trans.loading);
    // this.props.updateName(name);
    console.log(name);
    if (this.showModalNameRef.current) {
      this.showModalNameRef.current.onHide();
    }
  };

  onPressName = () => {
    this.showModalNameRef.current.onShow();
  };
  onPressPhone = () => {
    this.showModalPhoneRef.current.onShow();
  };

  render() {
    const {name, birthday, phone} = this.props;
    const {newDate, newName} = this.state;
    let time: any = new Date();
    if (birthday) {
      time = new Date(birthday * 1000);
    }

    return (
      <MyView style={inforPersonStyle.container}>
        <KeyboardAvoidingView
          style={inforPersonStyle.container}
          behavior={Utilities.isAndroid() ? undefined : 'padding'}>
          <ScrollView style={inforPersonStyle.container}>
            <MyViewShadow style={inforPersonStyle.containerTwo}>
              <MyView transparent style={inforPersonStyle.viewName}>
                <AvatarComponent />
                {/* <MyText style={inforPersonStyle.txtName} fontStyle="SemiBold">
                  {name}
                </MyText> */}
              </MyView>
              <MyView transparent style={inforPersonStyle.viewBody}>
                <MyText fontStyle="SemiBold">{MyI18n.trans.name}</MyText>
                <MyButton onPress={this.onPressName} style={inforPersonStyle.viewinput}>
                  <MyText style={inforPersonStyle.txtBirthday} fontStyle="SemiBold">
                    {name || newName}
                  </MyText>
                </MyButton>
                <MyText fontStyle="SemiBold">{MyI18n.trans.phone}</MyText>
                <MyButton onPress={this.onPressPhone} style={inforPersonStyle.viewinput}>
                  <MyText style={inforPersonStyle.txtBirthday} fontStyle="SemiBold">
                    {phone || newName}
                  </MyText>
                </MyButton>
                <MyText fontStyle="SemiBold">{MyI18n.trans.birthday}</MyText>
                <MyButton onPress={this.onPressBirthDay} style={inforPersonStyle.viewinput}>
                  <MyText style={inforPersonStyle.txtBirthday} fontStyle="SemiBold">
                    {Utilities.convertTimeByFormat(newDate || birthday, 'DD/MM/YYYY')}
                  </MyText>
                </MyButton>
              </MyView>
              {/* <MyButtonText
                title={MyI18n.trans.update}
                style={inforPersonStyle.btnUpdate}
                titleProps={{fontStyle: 'Bold'}}
                onPress={this.onPressUpdate}
              /> */}
            </MyViewShadow>
          </ScrollView>
        </KeyboardAvoidingView>
        <MyDatePicker
          ref={this.showModalBirthdayRef}
          title={MyI18n.trans.choose_birthday}
          titleButtonChange={MyI18n.trans.ok}
          titleButtonCancel={MyI18n.trans.cancel}
          onChange={this.handleToSelectedDate}
          value={newDate || time}
        />
        <ModalChangeName
          value={MyStaticLocal.getUser()?.name || ''}
          ref={this.showModalNameRef}
          title={MyI18n.trans.edit_name}
          titleButtonCancel={MyI18n.trans.cancel}
          titleButtonChange={MyI18n.trans.update}
          onChangeName={this.handleChangeName}
        />
        <ModalChangePhone
          value={MyStaticLocal.getUser()?.phone || ''}
          ref={this.showModalPhoneRef}
          title={MyI18n.trans.edit_phone}
          titleButtonCancel={MyI18n.trans.cancel}
          titleButtonChange={MyI18n.trans.update}
          onChangePhone={this.handleChangePhone}
          onXacNhan={this.handleXacNhan}
        />
      </MyView>
    );
  }
}
const mapStateToProps = (state: RootState) => {
  const {iso, theme} = state.SettingReducer;
  const {isRefresh, name, birthday, phone} = state.PersonReducer;
  return {isRefresh, iso, name, birthday, theme, phone};
};

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      initUser,
      showRefresh,
      chooseAddressUser,
      updateBirthday,
      updateName
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(InforPerson);
