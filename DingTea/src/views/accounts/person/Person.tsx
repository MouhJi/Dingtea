import React, {PureComponent, createRef} from 'react';
import {Linking, RefreshControl, ScrollView} from 'react-native';

import {connect} from 'react-redux';
import MyI18n from 'utils/MyI18n';
import {RootState} from 'views/app/redux/App.Reducer';
import {bindActionCreators} from 'redux';

import {MyView, MyViewShadow, MyText, MyImage} from 'bases/components';

import MyNavigator from 'utils/MyNavigator';
import Utilities from 'utils/Utilities';

import {IPersonState, initUser, showRefresh} from './redux';
import {personStyles} from './style/Person.Style';
import MyStorage from 'utils/MyStorage';
import {ADDRESS_USER_CHOOSE, USER_DATA} from 'common/KeyStorages';
import {getDetailPerson} from 'services';
import {IUserModel} from 'models';
import {chooseAddressUser} from 'views/app/reduxChooseAddressUser';
import MyStaticLocal from 'utils/MyStaticLocal';
import {MyDialogInput} from 'bases/components';
import {COLOR} from 'bases/styles/Core';
import {svgDieuKhoan, svgGopY, svgLichSuDonHang, svgTinTucKhuyenMai} from 'assets/images/svgImage';
import MyButtonSvg from 'bases/components/button/MyButtonSvg';
import {MyButtonNext} from 'bases/components';
import MyTheme from 'utils/MyTheme';
import {SCREEN} from 'views/router/type';
import deviceInfoModule from 'react-native-device-info';

interface defaultProps extends IPersonState {
  initUser: typeof initUser;
  showRefresh: typeof showRefresh;
  chooseAddressUser: typeof chooseAddressUser;
}

class Person extends PureComponent<defaultProps> {
  dialogLogoutRef: any = createRef();

  handleToLogin = () => {
    MyNavigator.navigate('Login');
  };
  handleToHistoryGift = () => {
    MyNavigator.navigate('HistoryGift');
  };
  onPressRules = () => {
    MyNavigator.navigate('PreviewWeb');
  };
  onPressGopY = () => {
    MyNavigator.navigate('CmtShop');
  };

  onPressCheckLogin = (nameSceen: SCREEN) => {
    const {id} = this.props;
    if (id) {
      MyNavigator.navigate(nameSceen);
    } else {
      MyNavigator.navigate('Login');
    }
  };

  onPressLogout = () => {
    const {id} = this.props;
    if (id) {
      this.dialogLogoutRef.current.onShow();
    } else {
      MyNavigator.navigate('Login');
    }
  };

  reload = () => {
    if (MyStaticLocal.getUser()?.id && MyStaticLocal.getUserToken()?.access_token) {
      this.props.showRefresh(true);
      getDetailPerson<IUserModel>(MyStaticLocal.getUser()?.id || -1)
        .then(res => {
          if (res?.code) {
            this.props.showRefresh(false);
            Utilities.showToast(MyI18n.trans.an_error_has_occurred, '', 'danger');
          } else {
            this.saveDataUser(res?.data);
          }
        })
        .catch(() => {
          this.props.showRefresh(false);
          Utilities.showToast(MyI18n.trans.an_error_has_occurred, '', 'danger');
        });
    }
  };

  saveDataUser = (data?: IUserModel) => {
    if (data) {
      MyStorage.create(USER_DATA, data)
        .then(() => {
          MyStaticLocal.setUser(data);
          this.props.initUser(data);
        })
        .catch(() => {
          this.props.showRefresh(false);
          Utilities.showToast(MyI18n.trans.an_error_has_occurred, '', 'danger');
        });
    } else {
      this.props.showRefresh(false);
      Utilities.showToast(MyI18n.trans.incorrect_code, '', 'danger');
    }
  };

  updateApp = async () => {
    if (Utilities.isAndroid()) {
      Linking.openURL('market://details?id=com.dingteavn.android');
    } else {
      Linking.openURL('https://apps.apple.com/us/app/dingtea/id1564371342');
    }
  };

  logout = () => {
    this.cancleDialog();
    Utilities.showHideRootLoading(true, MyI18n.trans.loading);
    MyStorage.delete(USER_DATA)
      .then(() => {
        MyStaticLocal.setUserToken(undefined);
        MyStaticLocal.setUser(undefined);
        this.props.initUser(undefined);
        MyStorage.delete(ADDRESS_USER_CHOOSE);
        this.props.chooseAddressUser(undefined);
        Utilities.showHideRootLoading(false);
      })
      .catch(() => {
        Utilities.showHideRootLoading(false);
        Utilities.showToast(MyI18n.trans.an_error_has_occurred, '', 'danger');
      });
  };

  cancleDialog = () => {
    this.dialogLogoutRef.current.onHide();
  };

  render() {
    const {id, isRefresh, avatar} = this.props;
    let renderViewAvatar = null;
    let renderViewLogin = null;
    if (id) {
      if (avatar) {
        renderViewAvatar = (
          <MyImage
            source={Utilities.convertLinkImage(avatar)}
            style={personStyles.imgAvatar}
            width={personStyles.imageAvatar.width}
            height={personStyles.imageAvatar.width}
          />
        );
      }
      renderViewLogin = (
        <>
          <MyButtonNext
            onPress={this.onPressLogout}
            title={MyI18n.trans.logout}
            // titleFontStyle="Bold"
            // titleStyle={personStyles.txtLogout}
            iconFontType="MaterialIcons"
            iconProps={{name: 'navigate-next', size: 26, color: MyTheme.themes.TEXT.WHITE}}
          />
        </>
      );
    } else {
      renderViewLogin = (
        <>
          <MyButtonNext
            onPress={this.onPressLogout}
            title={MyI18n.trans.login}
            // titleFontStyle="Bold"
            // titleStyle={personStyles.txtLogout}
            iconFontType="MaterialIcons"
            iconProps={{name: 'navigate-next', size: 26, color: MyTheme.themes.TEXT.WHITE}}
          />
        </>
      );
    }
    return (
      <MyView style={personStyles.viewContainer}>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl onRefresh={this.reload} refreshing={isRefresh || false} />
          }>
          <MyView transparent style={personStyles.viewheader}>
            <MyButtonSvg
              svgImage={svgLichSuDonHang}
              title={MyI18n.trans.order_history}
              onPress={() => this.onPressCheckLogin('Order')}
            />
            <MyButtonSvg
              svgImage={svgDieuKhoan}
              title={MyI18n.trans.terms}
              onPress={() => {
                MyNavigator.navigate('PreviewWeb');
              }}
            />
          </MyView>
          <MyView transparent style={personStyles.viewheader}>
            <MyButtonSvg
              svgImage={svgGopY}
              title={MyI18n.trans.feedback}
              onPress={() => {
                MyNavigator.navigate('CmtShop');
              }}
            />
            <MyButtonSvg
              svgImage={svgTinTucKhuyenMai}
              title={MyI18n.trans.promotion_news}
              onPress={() => {
                MyNavigator.navigate('Blog');
              }}
            />
          </MyView>

          {/* {renderView} */}
          <MyView transparent style={personStyles.person}>
            <MyText
              // onPress={this.handleToHistoryGift}
              style={personStyles.nameUser}
              fontStyle="Bold">
              {MyI18n.trans.account}
            </MyText>
            {renderViewAvatar}
          </MyView>
          <MyViewShadow style={personStyles.container}>
            {id && (
              <MyButtonNext
                onPress={() => this.onPressCheckLogin('InforPerson')}
                title={MyI18n.trans.personal_information}
                iconFontType="MaterialIcons"
                iconProps={{name: 'navigate-next', size: 26, color: MyTheme.themes.TEXT.BROWN}}
              />
            )}
            {id && <MyView style={personStyles.line} />}
            {/* <MyButtonNext
              title={MyI18n.trans.setting}
              iconFontType="MaterialIcons"
              iconProps={{name: 'navigate-next', size: 26, color: MyTheme.themes.TEXT.BROWN}}
            />
            <MyView style={personStyles.line} /> */}
            {id && (
              <MyButtonNext
                onPress={() => {
                  MyNavigator.navigate('AddressUser');
                }}
                title={MyI18n.trans.address}
                iconFontType="MaterialIcons"
                iconProps={{name: 'navigate-next', size: 26, color: MyTheme.themes.TEXT.BROWN}}
              />
            )}
            {id && <MyView style={personStyles.line} />}
            {renderViewLogin}
          </MyViewShadow>
          <MyText
            onPress={this.handleToHistoryGift}
            style={personStyles.txtSupport}
            fontStyle="Bold">
            {MyI18n.trans.support}
          </MyText>

          <MyViewShadow style={personStyles.container}>
            <MyButtonNext
              onPress={() => {
                MyNavigator.navigate('PreviewWeb');
              }}
              title={MyI18n.trans.contact}
              iconFontType="MaterialIcons"
              iconProps={{name: 'navigate-next', size: 26, color: MyTheme.themes.TEXT.WHITE}}
            />
            <MyView style={personStyles.line} />
            <MyButtonNext
              onPress={this.updateApp}
              title={MyI18n.trans.update_app}
              iconFontType="MaterialIcons"
              iconProps={{name: 'navigate-next', size: 26, color: MyTheme.themes.TEXT.WHITE}}
            />
          </MyViewShadow>
          <MyDialogInput
            ref={this.dialogLogoutRef}
            onRequestClose={this.cancleDialog}
            title={MyI18n.trans.logout}
            titleStyle={{color: COLOR.TEXT.BLACK}}
            description={MyI18n.trans.question_log_out}
            descriptionStyle={{color: COLOR.TEXT.BLACK}}
            contentStyle={{backgroundColor: COLOR.BG.WHITE}}
            actionButtons={[
              {
                label: MyI18n.trans.logout,
                color: COLOR.TEXT.POSITIVE_BTN,
                onPress: this.logout
              },
              {
                label: MyI18n.trans.cancel,
                color: COLOR.TEXT.NEGATIVE_BTN,
                onPress: this.cancleDialog
              }
            ]}
          />

          <MyText style={personStyles.version}>
            v{deviceInfoModule.getVersion()}
            {' (' + MyStaticLocal.version_of_codepush + ')'}
          </MyText>
        </ScrollView>
      </MyView>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  const {iso, theme} = state.SettingReducer;
  const {id, isRefresh, avatar} = state.PersonReducer;
  return {id, isRefresh, iso, avatar, theme};
};

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      initUser,
      showRefresh,
      chooseAddressUser
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Person);
