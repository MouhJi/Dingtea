import React, {PureComponent} from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';

import {LAYOUT, MARGIN, RADIUS} from 'bases/styles/Core';
import MyTheme from 'utils/MyTheme';

interface IProps {
  buttonSeparatorStyle?: object;
  children: any;
  contentStyle?: object;
  footerStyle?: object;
  headerStyle?: object;
  onRequestClose?: () => void;
}

export default class MyContentInDialog extends PureComponent<IProps> {
  render() {
    const {
      buttonSeparatorStyle = {},
      children,
      contentStyle = {},
      footerStyle = {},
      headerStyle = {},
      onRequestClose
    } = this.props;
    const titleChildrens: any[] = [];
    const descriptionChildrens: any[] = [];
    const buttonChildrens: any[] = [];
    const otherChildrens: any[] = [];
    React.Children.forEach(children, (child) => {
      if (!child) {
        return;
      }
      if (child.type.name === 'MyTitleInDialog' || child.type.displayName === 'MyTitleInDialog') {
        titleChildrens.push(child);
      } else if (
        child.type.name === 'MyDescriptionInDialog' ||
        child.type.displayName === 'MyDescriptionInDialog'
      ) {
        descriptionChildrens.push(child);
      } else if (
        child.type.name === 'MyButtonInDialog' ||
        child.type.displayName === 'MyButtonInDialog'
      ) {
        if (buttonChildrens.length > 0) {
          buttonChildrens.push(<View style={[styles.buttonSeparator, buttonSeparatorStyle]} />);
        }
        buttonChildrens.push(child);
      } else {
        otherChildrens.push(child);
      }
    });
    return (
      <TouchableOpacity onPress={onRequestClose} style={styles.containerTouch}>
        <View style={[styles.content, contentStyle]}>
          <View style={[styles.header, headerStyle]}>
            {titleChildrens}
            {descriptionChildrens}
          </View>
          {otherChildrens}
          {Boolean(buttonChildrens.length) && (
            <View style={[styles.footer, footerStyle]}>
              {buttonChildrens.map((x, i) =>
                React.cloneElement(x, {
                  key: `dialog-button-${i}`
                })
              )}
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    marginLeft: 0,
    marginRight: 0,
    marginTop: 0,
    marginBottom: 0
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: MyTheme.themes.BG.BLACK_30
  },
  containerTouch: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: MyTheme.themes.BG.BLACK_30
  },
  content: {
    width: LAYOUT.l_270,
    flexDirection: 'column',
    borderRadius: RADIUS.r_10,
    overflow: 'hidden'
  },
  header: {
    margin: MARGIN.m_16
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopColor: '#A9ADAE',
    borderTopWidth: StyleSheet.hairlineWidth,
    height: LAYOUT.l_46
  },
  buttonSeparator: {
    height: '100%',
    backgroundColor: '#A9ADAE',
    width: StyleSheet.hairlineWidth * 1.00009
  }
});
