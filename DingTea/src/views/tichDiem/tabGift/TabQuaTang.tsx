import {MyButtonNext, MyText, MyView, MyViewShadow} from 'bases/components';
import {MARGIN} from 'bases/styles/Core';
import React, {PureComponent} from 'react';
import {ScrollView} from 'react-native';
import {connect} from 'react-redux';
import MyI18n from 'utils/MyI18n';
import MyNavigator from 'utils/MyNavigator';
import MyTheme from 'utils/MyTheme';
import {RootState} from 'views/app/redux';
import DoiQuaTangComponent from '../components/DoiQuaTangComponent';
import {tabGiftStyle} from '../style/TichDiem.Style';
import HeaderQuaTang from './components/HeaderQuaTang';

class TabQuaTang extends PureComponent {
  showAll = () => {
    MyNavigator.navigate('Gift');
  };
  render() {
    return (
      <MyView style={tabGiftStyle.container}>
        <ScrollView style={tabGiftStyle.container} showsVerticalScrollIndicator={false}>
          <MyText fontStyle={'Bold'} style={tabGiftStyle.txtNoiBat}>
            {MyI18n.trans.highlights}
          </MyText>
          <HeaderQuaTang />
          <MyView transparent style={tabGiftStyle.viewTitle}>
            <MyText fontStyle={'Bold'}>{MyI18n.trans.from_dingtea}</MyText>
            <MyText onPress={this.showAll} fontStyle={'SemiBold'} style={tabGiftStyle.txtTitle}>
              {MyI18n.trans.all}
            </MyText>
          </MyView>
          <DoiQuaTangComponent />
          <MyView transparent style={tabGiftStyle.viewTitle}>
            <MyText fontStyle={'Bold'}>{MyI18n.trans.from_partner}</MyText>
            <MyText onPress={this.showAll} fontStyle={'SemiBold'} style={tabGiftStyle.txtTitle}>
              {MyI18n.trans.all}
            </MyText>
          </MyView>
          <DoiQuaTangComponent />
          <MyText fontStyle={'Bold'} style={[tabGiftStyle.txtNoiBat, {marginTop: MARGIN.m_40}]}>
            {MyI18n.trans.gift_catalog}
          </MyText>
          <MyViewShadow style={tabGiftStyle.containerShadow}>
            <MyButtonNext
              // onPress={() => MyNavigator.navigate('InforPerson')}
              title={MyI18n.trans.all}
              iconFontType="MaterialIcons"
              iconProps={{name: 'navigate-next', size: 26, color: MyTheme.themes.TEXT.BROWN}}
            />
            <MyView style={tabGiftStyle.line} />
            <MyButtonNext
              title={MyI18n.trans.drink}
              iconFontType="MaterialIcons"
              iconProps={{name: 'navigate-next', size: 26, color: MyTheme.themes.TEXT.BROWN}}
            />
          </MyViewShadow>
        </ScrollView>
      </MyView>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  const {iso, theme} = state.SettingReducer;
  return {iso, theme};
};

export default connect(mapStateToProps, null)(TabQuaTang);
