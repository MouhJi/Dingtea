import React, {PureComponent} from 'react';
import {StyleSheet, Modal} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import DatePicker from 'react-native-date-picker';

import {MyButton, MyButtonShadow} from '../button';
import {MyText} from '../textview';
import {MyView, MyViewShadow} from '../view';

import {
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
import MyTheme from 'utils/MyTheme';

const PADDING_TOP = Utilities.getStatusBarHeight() || LAYOUT.l_30;

interface IProps {
  title: string;
  value?: Date | string;
  titleButtonChange: string;
  titleButtonCancel: string;

  onChange: (date: Date) => void;
}

interface IStates {
  isVisible: boolean;
  date: Date | string;
}

export default class MyDatePicker extends PureComponent<IProps, IStates> {
  state = {isVisible: false, date: new Date()};

  onShow = () => {
    const {value} = this.props;
    if (value) {
      this.setState({
        isVisible: true,
        date: value
      });
    } else {
      this.setState({
        isVisible: true,
        date: new Date()
      });
    }
  };

  onHide = () => {
    this.setState({
      isVisible: false
    });
  };

  onChange = () => {
    this.onHide();
    this.props.onChange(this.state.date);
  };

  render() {
    const {title, titleButtonChange, titleButtonCancel} = this.props;

    const {isVisible, date} = this.state;
    return (
      <Modal
        visible={isVisible}
        transparent
        supportedOrientations={['portrait', 'landscape']}
        animationType="slide"
        hardwareAccelerated
        onRequestClose={this.onHide}>
        <SafeAreaView edges={['left', 'bottom', 'right']} style={styles.container}>
          <MyButton style={styles.container} activeOpacity={1} onPress={this.onHide} transparent>
            <MyViewShadow transparent style={styles.modalContainer}>
              <MyView style={styles.content}>
                <MyText fontStyle="SemiBold" style={styles.title}>
                  {title}
                </MyText>
              </MyView>
              <MyView style={styles.line} />
              <DatePicker
                locale="vi"
                mode="date"
                date={date}
                style={styles.datePicker}
                onDateChange={(dateValue) => this.setState({date: dateValue})}
                maximumDate={new Date()}
              />
              <MyView style={styles.line} />
              <MyButton activeOpacity={1} style={styles.btnDeleteAction} onPress={this.onChange}>
                <MyText fontStyle="Bold" style={styles.textDelete}>
                  {titleButtonChange}
                </MyText>
              </MyButton>

              <MyButtonShadow activeOpacity={1} style={styles.btnClose} onPress={this.onHide}>
                <MyText fontStyle="Bold" style={styles.textClose}>
                  {titleButtonCancel}
                </MyText>
              </MyButtonShadow>
            </MyViewShadow>
          </MyButton>
        </SafeAreaView>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: MyTheme.themes.BG.BLACK_30
  },
  modalContainer: {
    flex: 1,
    width: Utilities.getWidthScreen() - PADDING.p_16,
    justifyContent: 'flex-end',
    alignSelf: 'center',
    ...setPadding(PADDING.p_8, PADDING.p_8, PADDING.p_8, PADDING.p_8)
  },

  content: {
    ...setRadius(RADIUS.r_12, RADIUS.r_12, RADIUS.r_0, RADIUS.r_0),
    height: LAYOUT.l_46,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: MyTheme.themes.BG.WHITE
  },
  title: {
    fontSize: FONT_SIZE.s_14,
    color: MyTheme.themes.TEXT.PRIMARY
  },
  datePicker: {
    width: Utilities.getWidthScreen() - PADDING.p_16 * 2,
    height:
      Utilities.getWidthScreen() -
      PADDING.p_8 * 3 -
      LAYOUT.l_46 * 3 -
      StyleSheet.hairlineWidth * 2 -
      PADDING_TOP,
    backgroundColor: MyTheme.themes.BG.WHITE
  },

  line: {
    width: '100%',
    height: StyleSheet.hairlineWidth,
    backgroundColor: MyTheme.themes.TEXT.PRIMARY
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
    color: MyTheme.themes.TEXT.POSITIVE_BTN
  },

  btnDeleteAction: {
    ...setRadius(RADIUS.r_0, RADIUS.r_0, RADIUS.r_12, RADIUS.r_12),
    justifyContent: 'center',
    alignItems: 'center',
    height: LAYOUT.l_46,
    backgroundColor: MyTheme.themes.BG.WHITE
  },
  textDelete: {
    fontSize: FONT_SIZE.s_14,
    textAlign: 'center',
    color: MyTheme.themes.TEXT.POSITIVE_BTN
  },

  btnClose: {
    ...setMargin(MARGIN.m_8, MARGIN.m_0, MARGIN.m_0, MARGIN.m_0),
    justifyContent: 'center',
    alignItems: 'center',
    ...setRadius(RADIUS.r_12, RADIUS.r_12, RADIUS.r_12, RADIUS.r_12),
    height: LAYOUT.l_46,
    backgroundColor: MyTheme.themes.BG.WHITE
  },
  textClose: {
    fontSize: FONT_SIZE.s_14,
    textAlign: 'center',
    color: MyTheme.themes.TEXT.NEGATIVE_BTN
  }
});
