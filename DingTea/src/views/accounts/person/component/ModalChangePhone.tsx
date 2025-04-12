import React, {createRef, PureComponent} from 'react';
import {KeyboardAvoidingView, ScrollView, Modal, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {
  COLOR,
  FONT_SIZE,
  LAYOUT,
  MARGIN,
  PADDING,
  RADIUS,
  setMargin,
  setPadding,
  setRadius
} from 'bases/styles/Core';

import Utilities from 'utils/Utilities';
import {
  MyButton,
  MyView,
  MyText,
  MyInput,
  MyButtonShadow,
  MyButtonCountDown
} from 'bases/components';
import MyTheme from 'utils/MyTheme';
import MyI18n from 'utils/MyI18n';

interface IProps {
  value: string;
  code?: string;
  title: string;
  titleButtonChange: string;
  titleButtonCancel: string;

  onChangePhone: (text: string) => void;
  onXacNhan: (text: string) => void;
}

export default class ModalChangePhone extends PureComponent<IProps> {
  state = {isVisible: false, isShowXacNhan: false};

  newPhone: string = '';
  code: string = '';
  codeRef: any = createRef();

  onShow = () => {
    this.setState({
      isVisible: true
    });
  };

  onHide = () => {
    this.setState({
      isVisible: false,
      isShowXacNhan: false
    });
  };

  onChange = () => {
    if (!this.code) {
      this.codeRef.current.focus();
    } else if (this.newPhone) {
      this.props.onXacNhan(this.code);
      this.setState({
        isShowXacNhan: false
      });
    } else {
      this.onHide();
      this.setState({
        isShowXacNhan: false
      });
    }
  };
  onSendCode = () => {
    this.props.onChangePhone(this.newPhone);
    this.setState(
      {
        isShowXacNhan: true
      },
      () => {
        this.codeRef.current.focus();
      }
    );
  };
  resendCode = () => {
    this.onSendCode();
  };

  onChangeText = (text: string) => {
    this.newPhone = text;
  };
  onChangeTextcode = (text: string) => {
    this.code = text;
  };

  render() {
    const {value, title, titleButtonChange, titleButtonCancel, code} = this.props;

    const {isVisible, isShowXacNhan} = this.state;
    return (
      <Modal
        visible={isVisible}
        transparent
        supportedOrientations={['portrait', 'landscape']}
        animationType="fade"
        hardwareAccelerated
        onRequestClose={this.onHide}>
        <SafeAreaView edges={['left', 'bottom', 'right']} style={styles.container}>
          <KeyboardAvoidingView
            style={styles.spaceUp}
            behavior={Utilities.isAndroid() ? undefined : 'padding'}>
            <ScrollView
              style={styles.spaceUp}
              contentContainerStyle={styles.contentScroll}
              keyboardShouldPersistTaps="handled">
              <MyButton
                style={styles.modalContainerFull}
                transparent
                activeOpacity={1}
                // onPress={this.onHide}
              >
                <MyButtonShadow style={styles.modalContainer} activeOpacity={1}>
                  <MyText fontStyle="Bold" style={styles.title}>
                    {title}
                  </MyText>
                  <MyView style={styles.line} />
                  <MyInput
                    containerStyle={styles.viewinput}
                    editable={!isShowXacNhan}
                    returnKeyType="done"
                    keyboardType="phone-pad"
                    onChangeText={this.onChangeText}
                    defaultValue={value}
                  />
                  {isShowXacNhan && (
                    <MyInput
                      inputRef={this.codeRef}
                      containerStyle={styles.viewinput}
                      returnKeyType="done"
                      maxLength={6}
                      keyboardType="phone-pad"
                      onChangeText={this.onChangeTextcode}
                      defaultValue={code}
                    />
                  )}
                  {/* <MyView style={styles.line} /> */}
                  <MyView transparent style={styles.viewBtn}>
                    <MyButton activeOpacity={1} style={styles.btnClose} onPress={this.onHide}>
                      <MyText fontStyle="SemiBold" style={styles.textClose}>
                        {titleButtonCancel}
                      </MyText>
                    </MyButton>
                    {isShowXacNhan ? (
                      <MyButton
                        activeOpacity={1}
                        style={styles.btnChangeAction}
                        onPress={this.onChange}>
                        <MyText fontStyle="SemiBold" style={styles.textChange}>
                          {titleButtonChange}
                        </MyText>
                      </MyButton>
                    ) : (
                      <MyButton
                        activeOpacity={1}
                        style={styles.btnChangeAction}
                        onPress={this.onSendCode}>
                        <MyText fontStyle="SemiBold" style={styles.textChange}>
                          {MyI18n.trans.send_code}
                        </MyText>
                      </MyButton>
                    )}
                  </MyView>
                  {isShowXacNhan ? (
                    <MyButtonCountDown
                      onPressBtn={this.resendCode}
                      style={styles.btnResend}
                      titleStyle={styles.txtResend}
                      title={MyI18n.trans.resend_code}
                      timer={60}
                      isShowTextTime={true}
                    />
                  ) : null}
                </MyButtonShadow>
              </MyButton>
            </ScrollView>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </Modal>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.BG.BLACK_30,
    justifyContent: 'center'
  },
  modalContainer: {
    width: Utilities.getWidthScreen() - PADDING.p_64,
    justifyContent: 'center',
    alignSelf: 'center',
    ...setPadding(PADDING.p_8, PADDING.p_16, PADDING.p_0, PADDING.p_0),
    ...setRadius(RADIUS.r_8, RADIUS.r_8, RADIUS.r_8, RADIUS.r_8),
    backgroundColor: COLOR.BG.WHITE
  },

  contentScroll: {
    justifyContent: 'center',
    flex: 1
  },

  spaceUp: {
    flex: 1
  },
  modalContainerFull: {
    flex: 1,
    justifyContent: 'center',
    ...setPadding(PADDING.p_0, PADDING.p_0, PADDING.p_16, PADDING.p_16),
    alignItems: 'center'
  },

  title: {
    fontSize: FONT_SIZE.s_14,
    color: COLOR.TEXT.PRIMARY,
    ...setMargin(MARGIN.m_8, MARGIN.m_14, MARGIN.m_16, MARGIN.m_16),
    textAlign: 'center'
  },

  line: {
    width: '100%',
    height: StyleSheet.hairlineWidth,
    backgroundColor: COLOR.BG.PRIMARY
  },

  btnAction: {
    marginTop: StyleSheet.hairlineWidth,
    justifyContent: 'center',
    alignItems: 'center',
    height: LAYOUT.l_46
  },
  textAction: {
    ...setMargin(MARGIN.m_0, MARGIN.m_0, MARGIN.m_16, MARGIN.m_16),
    fontSize: FONT_SIZE.s_14,
    textAlign: 'center',
    color: COLOR.TEXT.POSITIVE_BTN
  },

  btnChangeAction: {
    ...setRadius(RADIUS.r_8, RADIUS.r_8, RADIUS.r_8, RADIUS.r_8),
    justifyContent: 'center',
    alignItems: 'center',
    height: LAYOUT.l_46,
    backgroundColor: MyTheme.themes.BG.PRIMARY,
    ...setMargin(MARGIN.m_0, MARGIN.m_0, MARGIN.m_16, MARGIN.m_16),
    flex: 1
  },
  textChange: {
    textAlign: 'center',
    color: MyTheme.themes.TEXT.WHITE
  },

  btnClose: {
    ...setMargin(MARGIN.m_0, MARGIN.m_0, MARGIN.m_16, MARGIN.m_16),
    justifyContent: 'center',
    alignItems: 'center',
    ...setRadius(RADIUS.r_8, RADIUS.r_8, RADIUS.r_8, RADIUS.r_8),
    height: LAYOUT.l_46,
    backgroundColor: MyTheme.themes.TEXT.SECONDARY_LIGHT,
    flex: 1
  },
  textClose: {
    textAlign: 'center',
    color: MyTheme.themes.TEXT.BLACK
  },
  viewinput: {
    borderWidth: 1,
    backgroundColor: COLOR.BG.WHITE,
    ...setMargin(MARGIN.m_0, MARGIN.m_30, MARGIN.m_16, MARGIN.m_16),
    ...setRadius(RADIUS.r_6, RADIUS.r_6, RADIUS.r_6, RADIUS.r_6),
    borderColor: COLOR.BG.BLACK_10
  },
  viewBtn: {
    ...setMargin(MARGIN.m_0, MARGIN.m_0, MARGIN.m_0, MARGIN.m_0),
    flexDirection: 'row',
    justifyContent: 'space-between',
    ...setRadius(RADIUS.r_15, RADIUS.r_15, RADIUS.r_15, RADIUS.r_15)
  },
  btnResend: {
    ...setMargin(MARGIN.m_8, MARGIN.m_0, MARGIN.m_0, MARGIN.m_0),
    height: LAYOUT.l_45,
    backgroundColor: 'transparent'
  },
  txtResend: {
    // color: MyTheme.themes.TEXT.ORANGE,
    textDecorationLine: 'underline'
  }
});
