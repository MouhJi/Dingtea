import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {Provider} from 'react-redux';
import store from 'views/app';
import {StatusBar} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import FlashMessage from 'react-native-flash-message';
import {RootLoading} from 'bases/components';
import {COLOR} from 'bases/styles/Core';
import {enableScreens} from 'react-native-screens';
import Router from 'views/router/Router';

enableScreens();

interface IStates {
  validCloseWindow: boolean;
}

export default class App extends Component<{}, IStates> {
  constructor(props: any) {
    super(props);
    this.state = {validCloseWindow: false};
  }

  // backAction = () => {
  //   if (this.state.validCloseWindow) {
  //     BackHandler.exitApp();
  //   }
  //   this.setState(
  //     {
  //       validCloseWindow: true
  //     },
  //     () => {
  //       setTimeout(() => {
  //         this.setState({
  //           validCloseWindow: false
  //         });
  //       }, 3000);
  //       ToastAndroid.show('Nhấn một lần nữa để thoát ra. Tap again to exit', ToastAndroid.SHORT);
  //     }
  //   );
  //   return true;
  // };

  async componentDidMount() {
    // await firebase.analytics().setAnalyticsCollectionEnabled(true);
    // BackHandler.addEventListener('hardwareBackPress', this.backAction);
  }

  componentWillUnmount() {
    // BackHandler.removeEventListener('hardwareBackPress', this.backAction);
  }

  render() {
    return (
      <Provider store={store}>
        <SafeAreaView style={styles.container} edges={['left', 'right']}>
          <StatusBar barStyle="dark-content" backgroundColor={COLOR.BG.WHITE} />
          <Router />
          <FlashMessage position="top" />
          <RootLoading />
        </SafeAreaView>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.BG.WHITE
  }
});
