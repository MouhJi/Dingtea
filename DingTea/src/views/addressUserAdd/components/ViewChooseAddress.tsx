import React, {PureComponent} from 'react';
import {MyButton, MyIcon, MyText} from 'bases/components';

import {inputStyles} from '../style/AddressUserAdd.Style';

interface IProps {
  text?: string;
  isActive?: boolean;
  placeholder: string;
  onPress: () => void;
}

interface IStates {
  text: string;
  isActive: boolean;
}

export default class ViewChooseAddress extends PureComponent<IProps, IStates> {
  state = {text: this.props.text || this.props.placeholder, isActive: this.props.isActive || false};

  setText = (text: string) => {
    this.setState({
      text: text,
      isActive: true
    });
  };

  cleanText = () => {
    this.setState({
      text: this.props.placeholder,
      isActive: false
    });
  };

  render() {
    const {onPress} = this.props;
    const {text, isActive} = this.state;

    return (
      <MyButton style={inputStyles.container} onPress={onPress}>
        <MyText style={isActive ? {} : inputStyles.text}>{text}</MyText>
        <MyIcon iconFontType="AntDesign" name={'down'} size={18} />
      </MyButton>
    );
  }
}
