import React, {PureComponent} from 'react';

import {COLOR} from 'bases/styles/Core';
import MyNavigator from 'utils/MyNavigator';
import {personStyles} from '../style/Person.Style';
import {MyButton, MyView, MyIcon} from 'bases/components';

class IconNotifyComponent extends PureComponent {
  handleToNotify = () => {
    MyNavigator.navigate('Notify');
  };

  render() {
    return (
      <MyButton onPress={this.handleToNotify} transparent style={personStyles.viewDot}>
        <MyView transparent>
          <MyIcon
            name="notifications-none"
            size={18}
            iconFontType="MaterialIcons"
            color={COLOR.TEXT.PRIMARY}
          />
          <MyView style={personStyles.dot} />
        </MyView>
      </MyButton>
    );
  }
}

export default IconNotifyComponent;
