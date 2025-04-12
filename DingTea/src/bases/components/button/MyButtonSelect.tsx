import React, {PureComponent} from 'react';
import {StyleSheet} from 'react-native';

import {LAYOUT, MARGIN, setMargin} from '../../styles/Core';
import {MyButton} from './MyButton';
import {MyIcon} from '../icon';
import {MyText} from '../textview';
import MyTheme from 'utils/MyTheme';

interface IProps {
  text?: string;
  isChecked?: boolean;
  onChange?: (isCheck: boolean) => void;
}

interface IStates {
  isChecked: boolean;
}

export default class MyButtonSelect extends PureComponent<IProps, IStates> {
  state = {isChecked: this.props.isChecked || false};

  onPress = () => {
    this.setState(
      {
        isChecked: !this.state.isChecked
      },
      () => {
        if (this.props.onChange) {
          this.props.onChange(this.state.isChecked);
        }
      }
    );
  };

  onCheck = (isChecked: boolean) => {
    this.setState({
      isChecked: isChecked
    });
  };

  getCheck = () => {
    return this.state.isChecked;
  };

  render() {
    const {text} = this.props;
    const {isChecked} = this.state;

    return (
      <MyButton transparent style={styles.container} onPress={this.onPress}>
        <MyIcon
          iconFontType="MaterialCommunityIcons"
          name={isChecked ? 'checkbox-marked-circle' : 'checkbox-blank-circle-outline'}
          size={20}
          color={MyTheme.themes.BG.PRIMARY_DARK}
        />
        <MyText style={styles.title}>{text}</MyText>
      </MyButton>
    );
  }
}

export const styles = StyleSheet.create({
  title: {
    ...setMargin(MARGIN.m_0, MARGIN.m_0, MARGIN.m_16, MARGIN.m_0)
  },
  container: {
    flexDirection: 'row',
    height: LAYOUT.l_38,
    flex: 1,
    alignItems: 'center'
  }
});
