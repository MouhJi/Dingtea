import React, {PureComponent} from 'react';
import {LAYOUT, MARGIN, RADIUS} from 'bases/styles/Core';

import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  View,
  Modal,
  ActivityIndicator,
  TouchableOpacity
} from 'react-native';
import Utilities from 'utils/Utilities';
import MyTheme from 'utils/MyTheme';

interface IProps {
  buttonSeparatorStyle?: object;
  children?: any;
  contentStyle?: object;
  footerStyle?: object;
  headerStyle?: object;
  visible?: boolean;
  loading?: boolean;
  onRequestClose?: () => void;
}

export default class MyContainerInDialog extends PureComponent<IProps> {
  render() {
    const {
      buttonSeparatorStyle = {},
      children,
      contentStyle = {},
      footerStyle = {},
      headerStyle = {},
      visible = false,
      loading = false,
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
      <Modal
        visible={visible}
        transparent={true}
        supportedOrientations={['portrait', 'landscape']}
        animationType="fade"
        hardwareAccelerated={true}
        onRequestClose={onRequestClose}>
        {loading ? (
          <View style={styles.containerLoading}>
            <View style={styles.contentLoading}>
              <ActivityIndicator size="large" color={MyTheme.themes.BG.BLACK} />
            </View>
          </View>
        ) : (
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            style={styles.container}>
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
          </KeyboardAvoidingView>
        )}
      </Modal>
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
    alignItems: 'center'
  },
  content: {
    width: Utilities.getWidthScreen() - LAYOUT.l_64,
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
  },
  containerLoading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: MyTheme.themes.BG.BLACK_30,
    zIndex: 999,
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  },
  contentLoading: {
    width: Utilities.getStatusBarHeight() * 4,
    height: Utilities.getStatusBarHeight() * 4,
    borderRadius: RADIUS.r_16,
    backgroundColor: MyTheme.themes.BG.WHITE,
    justifyContent: 'center'
  }
});
