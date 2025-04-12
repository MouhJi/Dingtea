import React, {PureComponent} from 'react';

import {searchComponentStyles} from '../../style/Home.Style';
import MyNavigator from 'utils/MyNavigator';
import {MyView, MyButton, MyIcon, MyText} from 'bases/components';

export default class SearchComponent extends PureComponent {
  onPressSearch = () => {
    MyNavigator.navigate('Search');
  };

  render() {
    return (
      <MyView style={searchComponentStyles.container}>
        <MyButton style={searchComponentStyles.content} onPress={this.onPressSearch}>
          <MyIcon
            iconFontType="AntDesign"
            size={searchComponentStyles.icon.fontSize}
            name="search1"
            color={searchComponentStyles.icon.color}
          />
          <MyText fontStyle="SemiBold" style={searchComponentStyles.title}>
            {'Ding Tea'}
          </MyText>
        </MyButton>
      </MyView>
    );
  }
}
