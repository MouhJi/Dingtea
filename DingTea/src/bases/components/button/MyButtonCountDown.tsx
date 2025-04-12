import React, {PureComponent} from 'react';
import {StyleSheet, TextStyle, TouchableOpacity, ViewProps} from 'react-native';

import {IPropsMyText, MyText} from '../textview';
import {FONT_FAMILY, FONT_SIZE, LAYOUT, RADIUS, setRadius} from '../../styles/Core';
import MyTheme from 'utils/MyTheme';

interface IProps extends ViewProps {
  timer: number;
  isShowTextTime: boolean;

  onPressBtn: () => void;

  title: string;
  titleStyle?: TextStyle;
  titleProps?: IPropsMyText;
}

interface IStates {
  timer: number;
  isShowTextTime: boolean;
}

export default class MyButtonCountDown extends PureComponent<IProps, IStates> {
  state = {timer: this.props.timer, isShowTextTime: this.props.isShowTextTime};

  myInterval: any = null;

  runTimer = () => {
    this.myInterval = setInterval(() => {
      if (this.state.timer === 0) {
        clearInterval(this.myInterval);
        this.setState({
          isShowTextTime: false
        });
      } else {
        this.setState((prevState) => ({
          timer: prevState.timer - 1
        }));
      }
    }, 1000);
  };

  reClick = () => {
    this.setState(
      {
        timer: this.props.timer,
        isShowTextTime: true
      },
      () => {
        this.runTimer();
        this.props.onPressBtn();
      }
    );
  };

  componentDidMount() {
    if (this.props.isShowTextTime) {
      this.runTimer();
    }
  }

  componentWillUnmount() {
    clearInterval(this.myInterval);
  }

  render() {
    const {style, title, titleProps, titleStyle} = this.props;
    const {isShowTextTime, timer} = this.state;
    const color = isShowTextTime ? MyTheme.themes.BG.SECONDARY : MyTheme.themes.TEXT.ORANGE;
    if (isShowTextTime) {
      return (
        <TouchableOpacity disabled activeOpacity={1} style={[styles.buttonText, style]}>
          <MyText {...titleProps} style={[styles.title, titleStyle]} fontStyle="SemiBold">
            {title + ' (' + timer + 's)'}
          </MyText>
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity
          onPress={this.reClick}
          activeOpacity={0.9}
          {...this.props}
          style={[styles.buttonText, style]}>
          <MyText
            {...titleProps}
            style={[styles.title, titleStyle, {color: color}]}
            fontStyle="SemiBold">
            {title}
          </MyText>
        </TouchableOpacity>
      );
    }
  }
}

const styles = StyleSheet.create({
  buttonText: {
    backgroundColor: MyTheme.themes.BG.PRIMARY_DARK,
    height: LAYOUT.l_38,
    ...setRadius(RADIUS.r_8, RADIUS.r_8, RADIUS.r_8, RADIUS.r_8),
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    color: MyTheme.themes.TEXT.SECONDARY,
    fontFamily: FONT_FAMILY.SemiBold,
    fontSize: FONT_SIZE.s_14
  }
});
