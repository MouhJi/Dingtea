import {FONT_FAMILY} from 'bases/styles/Core';
import React, {Component} from 'react';
import {View, StyleSheet, Text, Linking, TouchableOpacity, ScrollView} from 'react-native';
import {ReactNativeModal} from 'react-native-modal';
import Utilities from '../../../../utils/Utilities';
interface IState {
  isOpenModal: boolean;
  url_app: string;
  content: string;
  is_required: boolean;
}
export default class UpdateAppModal extends Component<{}, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      isOpenModal: false,
      url_app: '',
      content: '',
      is_required: false
    };
  }

  isShowModal(url: string = '', content: string = '', is_required: boolean = false) {
    this.setState({
      isOpenModal: true,
      url_app: url,
      content,
      is_required
    });
  }

  isHideModal() {
    this.setState({
      isOpenModal: false
    });
  }

  render() {
    return (
      <ReactNativeModal
        useNativeDriver
        hideModalContentWhileAnimating
        // onBackdropPress={() => this.isHideModal()}
        // onBackButtonPress={() => this.isHideModal()}
        isVisible={this.state.isOpenModal}
        animationIn="slideInDown"
        animationOut="slideOutDown"
        animationInTiming={500}
        style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.viewHeader}>
            <Text style={styles.txtTitle}>Cập nhập ứng dụng</Text>
          </View>
          <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
            <View style={styles.viewBody}>
              <Text style={styles.txt}>
                {`Đã có phiên bản mới trên ${
                  Utilities.isAndroid() ? 'CH Play' : 'App Store'
                }, hãy cập nhập ngay thôi bạn thân mến!`}
              </Text>
              {this.state.content ? (
                <Text style={styles.txtContent}>{this.state.content}</Text>
              ) : null}
            </View>
          </ScrollView>
          <View style={styles.viewFooter}>
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
              {!this.state.is_required && (
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => {
                    this.isHideModal();
                    /* Nếu modal bật ở màn Splash thì chuyển tới home, còn không thì chỉ tắt modal đi */
                    // MyNavigator.replace('HomeRouter');
                  }}
                  style={styles.btnCancel}>
                  <Text style={styles.btnTextCancel}>Để sau</Text>
                </TouchableOpacity>
              )}
              {!this.state.is_required && <View style={styles.space} />}
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  Linking.openURL(this.state.url_app);
                }}
                style={styles.btnUpdateNow}>
                <Text style={styles.btnText}>Cập nhập</Text>
              </TouchableOpacity>
            </View>
            {/* <Text style={styles.txt}>Mọi ý kiến đóng góp vui lòng liên hệ:</Text>
            <Text style={styles.txt}>
              Hotline:{' '}
              <Text
                style={{color: 'blue', textDecorationLine: 'underline'}}
                onPress={() => {
                  Linking.openURL('tel: 0988888825');
                }}>
                0988888825
              </Text>
            </Text>
            <Text style={styles.txt}>
              Email:{' '}
              <Text
                style={{color: 'blue', textDecorationLine: 'underline'}}
                onPress={() => {
                  Linking.openURL('mailto:cskh@cocolux.com');
                }}>
                cskh@cocolux.com
              </Text>
            </Text> */}
          </View>
        </View>
      </ReactNativeModal>
    );
  }
}

const styles = StyleSheet.create({
  modalContainer: {
    margin: 0,
    // flex: 1,
    backgroundColor: 'transparent'
    // justifyContent: 'center'
  },
  modalContent: {
    margin: 16,
    borderRadius: 16,
    backgroundColor: 'white',
    paddingHorizontal: 32
  },
  viewHeader: {marginTop: 24},
  viewBody: {marginVertical: 16},
  viewFooter: {marginBottom: 24},
  txtTitle: {
    textAlign: 'center',
    fontSize: 20,
    fontFamily: FONT_FAMILY.Bold
  },
  txt: {
    fontSize: 14,
    fontFamily: FONT_FAMILY.Regular
  },
  txtContent: {
    fontSize: 14,
    fontFamily: FONT_FAMILY.Regular,
    marginTop: 10
  },
  app_name: {
    fontFamily: FONT_FAMILY.Bold,
    fontSize: 18,
    textTransform: 'uppercase'
  },
  btnUpdateNow: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: 'black',
    borderRadius: 16
  },
  btnCancel: {flex: 1, borderWidth: 1, borderColor: 'silver', borderRadius: 16},
  btnText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 14,
    paddingHorizontal: 16,
    paddingVertical: 8
  },
  btnTextCancel: {
    textAlign: 'center',
    color: 'black',
    fontSize: 14,
    paddingHorizontal: 16,
    paddingVertical: 8
  },
  space: {
    width: 8
  }
});
