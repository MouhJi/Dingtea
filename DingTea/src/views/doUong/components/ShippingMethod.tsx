import React, {PureComponent} from 'react';
import {StyleSheet} from 'react-native';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {RootState} from 'views/app/redux/App.Reducer';

import {MyText, MyButton, MyView} from 'bases/components';

import {FONT_SIZE, LAYOUT, MARGIN, RADIUS, setMargin, setRadius} from 'bases/styles/Core';
import MyTheme from 'utils/MyTheme';
import {changeShippingMethod, IDoUongState} from '../redux';
import {SHIPPING_METHOD} from 'common/Constants';
import {ICartShipModel} from 'models';
import {chooseCartShip} from 'views/cartPayShip/redux';
let ARR_SHIPPING_METHOD = [SHIPPING_METHOD[1], SHIPPING_METHOD[0]];
interface IProps extends IDoUongState {
  changeShippingMethod: typeof changeShippingMethod;
  chooseCartShip: typeof chooseCartShip;
}

class ShippingMethod extends PureComponent<IProps> {
  onPress = (value: ICartShipModel) => {
    this.props.changeShippingMethod(value);
    this.props.chooseCartShip(value);
  };

  onPressTuDenLay = () => {
    this.props.changeShippingMethod(ARR_SHIPPING_METHOD[1]);
    this.props.chooseCartShip(ARR_SHIPPING_METHOD[1]);
  };

  renderContent = () => {
    const {shipping} = this.props;
    let _view = [];
    for (let index = ARR_SHIPPING_METHOD.length - 1; index >= 0; index--) {
      const value = ARR_SHIPPING_METHOD[index];
      _view.push(
        <MyButton
          key={index.toString()}
          style={[
            styles.content,
            {
              backgroundColor:
                shipping?.type === value.type
                  ? MyTheme.themes.BG.PRIMARY_DARK
                  : MyTheme.themes.BG.SECONDARY_DARK
            }
          ]}
          onPress={() => this.onPress(value)}>
          <MyText
            style={[
              styles.text,
              {
                color:
                  shipping?.type === value.type
                    ? MyTheme.themes.TEXT.WHITE
                    : MyTheme.themes.TEXT.SECONDARY
              }
            ]}
            fontStyle="SemiBold">
            {value.type}
          </MyText>
        </MyButton>
      );
    }

    return _view;
  };

  render() {
    return <MyView style={styles.contentTitle}>{this.renderContent()}</MyView>;
  }
}

const mapStateToProps = (state: RootState) => {
  const {iso, theme} = state.SettingReducer;
  const {shipping} = state.DoUongReducer;
  return {iso, theme, shipping};
};

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      changeShippingMethod,
      chooseCartShip
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ShippingMethod);

const styles = StyleSheet.create({
  contentTitle: {
    backgroundColor: MyTheme.themes.BG.SECONDARY_DARK,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    ...setMargin(MARGIN.m_8, MARGIN.m_0, MARGIN.m_16, MARGIN.m_16),
    ...setRadius(RADIUS.r_8, RADIUS.r_8, RADIUS.r_8, RADIUS.r_8)
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    ...setRadius(RADIUS.r_8, RADIUS.r_8, RADIUS.r_8, RADIUS.r_8),
    ...setMargin(MARGIN.m_2, MARGIN.m_2, MARGIN.m_2, MARGIN.m_2),
    height: LAYOUT.l_45,
    backgroundColor: MyTheme.themes.BG.PRIMARY_DARK,
    flex: 1
  },
  text: {
    fontSize: FONT_SIZE.s_14,
    color: MyTheme.themes.TEXT.PRIMARY
  }
});
