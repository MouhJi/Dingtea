import React, {PureComponent} from 'react';

import {soLuongStyles} from '../../style/ProductDetail.Style';
import {MyButtonIcon, MyText, MyView} from 'bases/components';
import MyTheme from 'utils/MyTheme';

interface IProps {
  titleSoLuong: string;
  soLuong?: number;
  isGiamXuong0?: boolean;
  onChange: (soLuong: number) => void;
}

interface IStates {
  soLuong: number;
}

export default class SoLuong extends PureComponent<IProps, IStates> {
  state = {soLuong: this.props.soLuong || 0};

  onPressPlus = () => {
    this.setState(
      {
        soLuong: this.state.soLuong + 1
      },
      () => this.props.onChange(this.state.soLuong)
    );
  };

  onPressMinus = () => {
    if (this.props.isGiamXuong0) {
      if (this.state.soLuong >= 1) {
        this.setState(
          {
            soLuong: this.state.soLuong - 1
          },
          () => this.props.onChange(this.state.soLuong)
        );
      }
    } else {
      if (this.state.soLuong > 1) {
        this.setState(
          {
            soLuong: this.state.soLuong - 1
          },
          () => this.props.onChange(this.state.soLuong)
        );
      }
    }
  };

  render() {
    const {titleSoLuong} = this.props;
    const {soLuong} = this.state;
    return (
      <MyView style={soLuongStyles.qtyView} transparent>
        <MyText fontStyle="Bold">{titleSoLuong}</MyText>
        <MyView style={soLuongStyles.qtyViewContent} transparent>
          <MyButtonIcon
            onPress={this.onPressMinus}
            iconFontType="MaterialCommunityIcons"
            iconProps={{
              name: 'minus-circle-outline',
              color: MyTheme.themes.TEXT.SECONDARY_LIGHT,
              size: 20
            }}
            style={soLuongStyles.minusButton}
          />
          <MyText style={soLuongStyles.txtSoluong} fontStyle="Regular">
            {soLuong}
          </MyText>
          <MyButtonIcon
            onPress={this.onPressPlus}
            iconFontType="MaterialCommunityIcons"
            iconProps={{name: 'plus-circle', color: MyTheme.themes.BG.PRIMARY_DARK, size: 20}}
            style={soLuongStyles.plusButton}
          />
        </MyView>
      </MyView>
    );
  }
}
