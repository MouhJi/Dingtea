import React, {PureComponent} from 'react';

import {MyButtonText, MyText, MyView} from 'bases/components';
import {copyInputStyles} from '../style/PaymentBank.Style';
import Utilities from 'utils/Utilities';
import Clipboard from '@react-native-clipboard/clipboard';
import MyI18n from 'utils/MyI18n';

interface IProps {
  title: string;
  content: string | number;
}

export default class CopyInputInfo extends PureComponent<IProps> {
  copy = () => {
    const {title, content} = this.props;
    Utilities.showToast(MyI18n.trans.successfully_copied + ' ' + title);
    Clipboard.setString(String(content));
  };

  render() {
    const {title, content} = this.props;

    return (
      <MyView style={copyInputStyles.container} transparent>
        <MyText style={copyInputStyles.title} fontStyle="SemiBold">
          {title}
        </MyText>
        <MyView style={copyInputStyles.boxCopy} transparent>
          <MyText numberOfLines={1} style={copyInputStyles.content} fontStyle="Medium">
            {content}
          </MyText>
          <MyButtonText
            title={MyI18n.trans.copy}
            style={copyInputStyles.btnCopy}
            titleProps={{fontStyle: 'SemiBold'}}
            onPress={this.copy}
          />
        </MyView>
      </MyView>
    );
  }
}
