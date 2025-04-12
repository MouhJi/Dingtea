import React, {Component} from 'react';

import {MyButtonText, MyText, MyView} from 'bases/components';

import MyNavigator from 'utils/MyNavigator';
import {errorStyles} from './style/Error.Style';
import {ActivityIndicator} from 'react-native';

interface IStates {
  isShowLoading: boolean;
}

export default class Error extends Component<{}, IStates> {
  state = {isShowLoading: false};

  timeOut: any = null;

  componentWillUnmount() {
    if (this.timeOut) {
      clearTimeout(this.timeOut);
    }
  }

  reLoad = () => {
    this.setState(
      {
        isShowLoading: true
      },
      () => {
        this.timeOut = setTimeout(() => {
          MyNavigator.replace('HomeRouter');
        }, 1000);
      }
    );
  };

  render() {
    const {isShowLoading} = this.state;
    return (
      <MyView style={errorStyles.containerError}>
        <MyText style={errorStyles.txtAgain}>
          {'Đã có lỗi xảy ra. Vui lòng kiểm tra kết nối và thử lại!'}
        </MyText>
        <MyText style={errorStyles.txtAgain}>
          {'An error has occurred. Please check connect and try again!'}
        </MyText>
        {isShowLoading ? (
          <ActivityIndicator size="large" color={'black'} style={errorStyles.activityIndicator} />
        ) : (
          <MyButtonText
            onPress={this.reLoad}
            title={'Thử lại / Try again'}
            style={errorStyles.btnAgain}
          />
        )}
      </MyView>
    );
  }
}
