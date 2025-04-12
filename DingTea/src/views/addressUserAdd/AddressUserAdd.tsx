import React, {createRef, PureComponent} from 'react';
import {ScrollView} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {connect} from 'react-redux';
import MyI18n from 'utils/MyI18n';
import {bindActionCreators} from 'redux';
import {RootState} from 'views/app/redux/App.Reducer';

import {addressAddStyles} from './style/AddressUserAdd.Style';
import {MyView, MyButtonText, MyText, MyInput, MyButtonSelect} from 'bases/components';

import ViewChooseAddress from './components/ViewChooseAddress';
import ModalChooseAddress from './components/ModalChooseAddress';

import {ISettingState} from 'views/setting/redux';
import {IAddressUserModal} from 'models';
import Utilities from 'utils/Utilities';
import validate from 'validator';
import {
  createAddressUser,
  getDetailAddressUser,
  IAddressUserRequest,
  updateAddressUser
} from 'services';
import {showRefresh, getListAddressUser, IAddressUserState} from 'views/addressUser/redux';
import MyNavigator from 'utils/MyNavigator';
import {chooseAddressUser} from 'views/app/reduxChooseAddressUser';
import MyStorage from 'utils/MyStorage';
import {ADDRESS_USER_CHOOSE} from 'common/KeyStorages';
import MyStaticLocal from 'utils/MyStaticLocal';

interface defaultProps extends ISettingState, IAddressUserState {
  getListAddressUser: typeof getListAddressUser;
  showRefresh: typeof showRefresh;
  chooseAddressUser: typeof chooseAddressUser;

  route: any;
}

class AddressUserAdd extends PureComponent<defaultProps> {
  inputPhoneRef: any = createRef();
  inputNameRef: any = createRef();
  inputAddressRef: any = createRef();

  inputCityRef: any = createRef();
  modalCityRef: any = createRef();

  inputDistrictRef: any = createRef();
  modalDistrictRef: any = createRef();

  inputWardRef: any = createRef();
  modalWardRef: any = createRef();
  checkHomeRef: any = createRef();
  checkCompanyRef: any = createRef();

  addressUser: IAddressUserModal;

  city: any;
  district: any;
  ward: any;

  phone: string = '';
  name: string = '';
  address: string = '';
  isDefault: boolean = false;

  constructor(props: defaultProps) {
    super(props);
    this.addressUser = this.props.route.params?.addressUser;
    this.phone = this.addressUser?.phone || '';
    this.name = this.addressUser?.name || '';
    this.address = this.addressUser?.address || '';
    this.city = this.addressUser?.province;
    this.district = this.addressUser?.district;
    this.ward = this.addressUser?.ward;
    this.isDefault = this.addressUser?.is_default === true;
  }

  onChangeCity = (item: any) => {
    this.city = {
      id: item.code,
      name: item.name
    };
    this.inputCityRef.current.setText(item.name);

    this.modalDistrictRef.current.getData({skip: 0, limit: 1000, province_code: item.code});

    this.inputDistrictRef.current.cleanText();
    this.inputWardRef.current.cleanText();

    this.district = null;
    this.ward = null;
  };

  onChangeDistrict = (item: any) => {
    this.district = {
      id: item.code,
      name: item.name
    };
    this.inputDistrictRef.current.setText(item.name);

    this.modalWardRef.current.getData({skip: 0, limit: 1000, district_code: item.code});

    this.inputWardRef.current.cleanText();

    this.ward = null;
  };

  onChangeWard = (item: any) => {
    this.ward = {
      id: item.code,
      name: item.name
    };
    this.inputWardRef.current.setText(item.name);
  };

  onPressHome = (isCheck: boolean) => {
    if (isCheck) {
      this.checkCompanyRef.current.onCheck(false);
    } else {
      this.checkCompanyRef.current.onCheck(true);
    }
  };

  onPressCompany = (isCheck: boolean) => {
    if (isCheck) {
      this.checkHomeRef.current.onCheck(false);
    } else {
      this.checkHomeRef.current.onCheck(true);
    }
  };

  onChangeSetDefault = (isCheck: boolean) => {
    this.isDefault = isCheck;
  };

  onPressApply = () => {
    if (!this.phone || !validate.isMobilePhone(this.phone, 'vi-VN')) {
      Utilities.showToast(MyI18n.trans.invalid_phone_number, '', 'danger');
      this.inputPhoneRef.current.focus();
      return;
    }

    if (!this.name) {
      Utilities.showToast(
        MyI18n.trans.please_fill_in + ' ' + MyI18n.trans.full_name_of_the_consignee,
        '',
        'danger'
      );
      this.inputNameRef.current.focus();
      return;
    }

    if (!this.address) {
      Utilities.showToast(
        MyI18n.trans.please_fill_in + ' ' + MyI18n.trans.enter_house_number_street_name,
        '',
        'danger'
      );
      this.inputAddressRef.current.focus();
      return;
    }

    if (!this.city) {
      Utilities.showToast(
        MyI18n.trans.please + ' ' + MyI18n.trans.choose + ' ' + MyI18n.trans.province_city,
        '',
        'danger'
      );
      return;
    }

    if (!this.district) {
      Utilities.showToast(
        MyI18n.trans.please + ' ' + MyI18n.trans.choose + ' ' + MyI18n.trans.district,
        '',
        'danger'
      );
      return;
    }

    if (!this.ward) {
      Utilities.showToast(
        MyI18n.trans.please + ' ' + MyI18n.trans.choose + ' ' + MyI18n.trans.wards,
        '',
        'danger'
      );
      return;
    }

    let param: IAddressUserRequest = {
      type: this.checkHomeRef.current.getCheck() ? 'home' : 'company',
      name: this.name,
      phone: this.phone,
      address: this.address,
      user: {
        id: MyStaticLocal.getUser()?.id,
        name: MyStaticLocal.getUser()?.name
      },
      province: this.city,
      district: this.district,
      ward: this.ward,
      is_default: this.isDefault
    };
    Utilities.showHideRootLoading(true, MyI18n.trans.loading);
    if (this.addressUser) {
      updateAddressUser(this.addressUser.id, param)
        .then(res => {
          Utilities.showHideRootLoading(false);
          if (res?.code) {
            Utilities.logCrashlytics('AddressUserAdd - updateAddressUser: ', res);
            Utilities.showToast(MyI18n.trans.an_error_has_occurred, '', 'danger');
          } else {
            Utilities.showToast(MyI18n.trans.update_success, '', 'success');
            this.props.showRefresh(true);
            this.props.getListAddressUser({
              skip: 0,
              limit: 10,
              user: MyStaticLocal.getUser()?.id,
              keyword: this.props.keyword
            });
            if (MyStaticLocal.getAddressUser()?.id === this.addressUser.id) {
              getDetailAddressUser<IAddressUserModal>(this.addressUser.id).then(address => {
                if (!address?.code) {
                  MyStorage.create(ADDRESS_USER_CHOOSE, address?.data);
                  this.props.chooseAddressUser(address?.data);
                }
              });
            }
            MyNavigator.goBack();
          }
        })
        .catch(error => {
          Utilities.logCrashlytics('AddressUserAdd - updateAddressUser: ', error);
          Utilities.showHideRootLoading(false);
          Utilities.showToast(MyI18n.trans.an_error_has_occurred, '', 'danger');
        });
    } else {
      createAddressUser(param)
        .then(res => {
          Utilities.showHideRootLoading(false);
          if (res?.code) {
            Utilities.logCrashlytics('AddressUserAdd - createAddressUser: ', res);
            Utilities.showToast(MyI18n.trans.an_error_has_occurred, '', 'danger');
          } else {
            Utilities.showToast(MyI18n.trans.add_success, '', 'success');
            this.props.showRefresh(true);
            this.props.getListAddressUser({
              skip: 0,
              limit: 10,
              user: MyStaticLocal.getUser()?.id,
              keyword: this.props.keyword
            });
            MyNavigator.goBack();
          }
        })
        .catch(error => {
          Utilities.logCrashlytics('AddressUserAdd - createAddressUser: ', error);
          Utilities.showHideRootLoading(false);
          Utilities.showToast(MyI18n.trans.an_error_has_occurred, '', 'danger');
        });
    }
  };

  componentDidMount() {
    if (this.addressUser?.province) {
      this.inputCityRef.current.setText(this.addressUser?.province.name);

      this.modalDistrictRef.current.getData({
        skip: 0,
        limit: 1000,
        province_code: this.addressUser?.province.id
      });

      this.inputDistrictRef.current.cleanText();
      this.inputWardRef.current.cleanText();
    }
    if (this.addressUser?.district) {
      this.inputDistrictRef.current.setText(this.addressUser?.district.name);

      this.modalWardRef.current.getData({
        skip: 0,
        limit: 1000,
        district_code: this.addressUser?.district.id
      });

      this.inputWardRef.current.cleanText();
    }
    if (this.addressUser?.ward) {
      this.inputWardRef.current.setText(this.addressUser?.ward.name);
    }
  }

  render() {
    let isTypeHome = true;
    if (this.addressUser) {
      isTypeHome = this.addressUser?.type === 'home';
    }
    return (
      <MyView style={addressAddStyles.container}>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={addressAddStyles.list}>
          <MyText style={addressAddStyles.titleInput}>{MyI18n.trans.phone}</MyText>
          <MyInput
            inputRef={this.inputPhoneRef}
            placeholder={MyI18n.trans.enter_the_phone_number_of_consignee}
            containerStyle={addressAddStyles.viewinput}
            returnKeyType="done"
            keyboardType="phone-pad"
            onSubmitEditing={() => this.inputNameRef.current.focus()}
            defaultValue={this.addressUser?.phone}
            onChangeText={text => (this.phone = text)}
          />
          <MyText style={addressAddStyles.titleInput}>
            {MyI18n.trans.full_name_of_the_consignee}
          </MyText>
          <MyInput
            inputRef={this.inputNameRef}
            placeholder={MyI18n.trans.full_name_of_the_consignee}
            containerStyle={addressAddStyles.viewinput}
            returnKeyType="done"
            keyboardType="name-phone-pad"
            onSubmitEditing={() => this.inputAddressRef.current.focus()}
            defaultValue={this.addressUser?.name}
            onChangeText={text => (this.name = text)}
          />
          <MyText style={addressAddStyles.titleInput}>{MyI18n.trans.delivery_address}</MyText>
          <MyInput
            inputRef={this.inputAddressRef}
            placeholder={MyI18n.trans.enter_house_number_street_name}
            containerStyle={addressAddStyles.viewinput}
            returnKeyType="done"
            keyboardType="default"
            defaultValue={this.addressUser?.address}
            onChangeText={text => (this.address = text)}
          />
          <MyText style={addressAddStyles.titleInput}>{MyI18n.trans.province_city}</MyText>
          <ViewChooseAddress
            ref={this.inputCityRef}
            placeholder={MyI18n.trans.choose + ' ' + MyI18n.trans.province_city}
            onPress={() => this.modalCityRef.current.onShow()}
          />
          <ModalChooseAddress
            ref={this.modalCityRef}
            titleModal={MyI18n.trans.choose + ' ' + MyI18n.trans.province_city}
            type="city"
            params={{skip: 0, limit: 1000}}
            onChange={this.onChangeCity}
            titleReload={MyI18n.trans.reload}
            noti={MyI18n.trans.data_empty}
          />
          <MyText style={addressAddStyles.titleInput}>{MyI18n.trans.district}</MyText>
          <ViewChooseAddress
            ref={this.inputDistrictRef}
            placeholder={MyI18n.trans.choose + ' ' + MyI18n.trans.district}
            onPress={() => this.modalDistrictRef.current.onShow()}
          />
          <ModalChooseAddress
            type="district"
            ref={this.modalDistrictRef}
            titleModal={MyI18n.trans.choose + ' ' + MyI18n.trans.district}
            onChange={this.onChangeDistrict}
            noti={MyI18n.trans.select_province_city_before}
            titleReload={MyI18n.trans.reload}
          />
          <MyText style={addressAddStyles.titleInput}>{MyI18n.trans.wards}</MyText>
          <ViewChooseAddress
            ref={this.inputWardRef}
            placeholder={MyI18n.trans.choose + ' ' + MyI18n.trans.wards}
            onPress={() => this.modalWardRef.current.onShow()}
          />
          <ModalChooseAddress
            type="ward"
            ref={this.modalWardRef}
            titleModal={MyI18n.trans.choose + ' ' + MyI18n.trans.wards}
            onChange={this.onChangeWard}
            noti={MyI18n.trans.select_district_before}
            titleReload={MyI18n.trans.reload}
          />
          <MyView style={addressAddStyles.pickType} transparent>
            <MyButtonSelect
              ref={this.checkHomeRef}
              text={MyI18n.trans.home}
              onChange={this.onPressHome}
              isChecked={isTypeHome}
            />
            <MyButtonSelect
              ref={this.checkCompanyRef}
              text={MyI18n.trans.company}
              onChange={this.onPressCompany}
              isChecked={!isTypeHome}
            />
          </MyView>
          <MyButtonSelect
            text={MyI18n.trans.set_as_default_address}
            onChange={this.onChangeSetDefault}
            isChecked={this.isDefault}
          />
        </ScrollView>
        <SafeAreaView edges={['bottom']} style={addressAddStyles.safeView}>
          <MyButtonText
            title={this.addressUser ? MyI18n.trans.update : MyI18n.trans.add}
            style={addressAddStyles.bottomButton}
            titleProps={{fontStyle: 'SemiBold'}}
            onPress={this.onPressApply}
          />
        </SafeAreaView>
      </MyView>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  const {iso} = state.SettingReducer;
  const {keyword} = state.AddressUserReducer;
  return {iso, keyword};
};

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      getListAddressUser,
      showRefresh,
      chooseAddressUser
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(AddressUserAdd);
