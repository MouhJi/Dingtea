import React, {PureComponent} from 'react';
import {FlatList, Modal, ScrollView} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {LoadingList, MyButton, MyButtonShadow, MyText} from 'bases/components';

import {modalStyles} from '../style/AddressUserAdd.Style';
import {getListCity, getListDistrict, getListWards, IAddressRequset} from 'services/Address.Api';
import {IAddress} from 'models';

interface IProps {
  titleModal: string;
  data?: any[];
  onChange: (item: IAddress) => void;
  noti: string;
  type: 'city' | 'district' | 'ward';
  params?: IAddressRequset;
  titleReload: string;
}

interface IStates {
  isVisible: boolean;
  data: IAddress[];
  isError: boolean;
  isLoading: boolean;
}

export default class ModalChooseAddress extends PureComponent<IProps, IStates> {
  state = {
    isVisible: false,
    data: this.props.data || [],
    isError: false,
    isLoading: this.props.type === 'city' ? true : false
  };

  paramsQuery: IAddressRequset = {skip: 0, limit: 100};

  componentDidMount() {
    const {type, params} = this.props;
    if (params) {
      switch (type) {
        case 'city':
          getListCity<IAddress>(params)
            .then((res) => {
              if (res?.code) {
                this.setState({
                  isError: true,
                  isLoading: false
                });
              } else {
                this.setState({
                  data: res?.data || this.state.data,
                  isError: false,
                  isLoading: false
                });
              }
            })
            .catch(() => {
              this.setState({
                isError: true,
                isLoading: false
              });
            });
          break;

        case 'district':
          break;

        case 'ward':
          break;

        default:
          break;
      }
    }
  }

  reload = () => {
    this.setState(
      {
        isLoading: true
      },
      () => {
        this.reFresh();
      }
    );
  };

  reFresh = () => {
    const {type} = this.props;
    if (this.paramsQuery) {
      switch (type) {
        case 'city':
          getListCity<IAddress>(this.paramsQuery)
            .then((res) => {
              if (res?.code) {
                this.setState({
                  isError: true,
                  isLoading: false
                });
              } else {
                this.setState({
                  data: res?.data || this.state.data,
                  isError: false,
                  isLoading: false
                });
              }
            })
            .catch(() => {
              this.setState({
                isError: true,
                isLoading: false
              });
            });
          break;

        case 'district':
          getListDistrict<IAddress>(this.paramsQuery)
            .then((res) => {
              if (res?.code) {
                this.setState({
                  isError: true,
                  isLoading: false
                });
              } else {
                this.setState({
                  data: res?.data || this.state.data,
                  isError: false,
                  isLoading: false
                });
              }
            })
            .catch(() => {
              this.setState({
                isError: true,
                isLoading: false
              });
            });
          break;

        case 'ward':
          getListWards<IAddress>(this.paramsQuery)
            .then((res) => {
              if (res?.code) {
                this.setState({
                  isError: true,
                  isLoading: false
                });
              } else {
                this.setState({
                  data: res?.data || this.state.data,
                  isError: false
                });
              }
            })
            .catch(() => {
              this.setState({
                isError: true,
                isLoading: false
              });
            });
          break;

        default:
          break;
      }
    }
  };

  getData = (params: IAddressRequset) => {
    this.paramsQuery = params;
    const {type} = this.props;
    if (params) {
      switch (type) {
        case 'city':
          getListCity<IAddress>(params)
            .then((res) => {
              if (res?.code) {
                this.setState({
                  isError: true,
                  isLoading: false
                });
              } else {
                this.setState({
                  data: res?.data || this.state.data,
                  isError: false,
                  isLoading: false
                });
              }
            })
            .catch(() => {
              this.setState({
                isError: true,
                isLoading: false
              });
            });
          break;

        case 'district':
          getListDistrict<IAddress>(params)
            .then((res) => {
              if (res?.code) {
                this.setState({
                  isError: true,
                  isLoading: false
                });
              } else {
                this.setState({
                  data: res?.data || this.state.data,
                  isError: false,
                  isLoading: false
                });
              }
            })
            .catch(() => {
              this.setState({
                isError: true,
                isLoading: false
              });
            });
          break;

        case 'ward':
          getListWards<IAddress>(params)
            .then((res) => {
              if (res?.code) {
                this.setState({
                  isError: true,
                  isLoading: false
                });
              } else {
                this.setState({
                  data: res?.data || this.state.data,
                  isError: false,
                  isLoading: false
                });
              }
            })
            .catch(() => {
              this.setState({
                isError: true,
                isLoading: false
              });
            });
          break;

        default:
          break;
      }
    }
  };

  onShow = () => {
    this.setState({
      isVisible: true
    });
  };

  onHide = () => {
    this.setState({
      isVisible: false
    });
  };

  pressItem = (item: any) => {
    this.props.onChange(item);
    this.setState({
      isVisible: false
    });
  };

  keyExtractor = (_item: any, index: number) => {
    return index.toString();
  };

  renderItem = ({item}: {item: any}) => {
    return (
      <MyText style={modalStyles.titleList} onPress={() => this.pressItem(item)}>
        {item.name}
      </MyText>
    );
  };

  renderListEmptyComponent = () => {
    const {isError, isLoading} = this.state;
    const {noti, titleReload} = this.props;
    if (isError) {
      return (
        <MyText onPress={this.reload} style={modalStyles.textCmt}>
          {titleReload}
        </MyText>
      );
    } else {
      if (isLoading) {
        return <LoadingList />;
      } else {
        return <MyText style={modalStyles.titleList}>{noti}</MyText>;
      }
    }
  };

  setData = (data: any[]) => {
    this.setState({
      data: data
    });
  };

  render() {
    const {titleModal} = this.props;
    const {isVisible, data} = this.state;

    return (
      <Modal
        visible={isVisible}
        transparent
        supportedOrientations={['portrait', 'landscape']}
        animationType="slide"
        hardwareAccelerated
        onRequestClose={this.onHide}>
        <SafeAreaView edges={['left', 'bottom', 'right']} style={modalStyles.container}>
          <ScrollView
            style={modalStyles.spaceUp}
            contentContainerStyle={modalStyles.contentScroll}
            keyboardShouldPersistTaps="handled">
            <MyButton
              style={modalStyles.modalContainer}
              transparent
              activeOpacity={1}
              onPress={this.onHide}>
              <MyButtonShadow style={modalStyles.content} activeOpacity={1}>
                <MyText fontStyle={'SemiBold'} style={modalStyles.titleModal}>
                  {titleModal}
                </MyText>
                <FlatList
                  style={modalStyles.viewFlatList}
                  data={data}
                  extraData={data}
                  keyExtractor={this.keyExtractor}
                  showsVerticalScrollIndicator={false}
                  showsHorizontalScrollIndicator={false}
                  renderItem={this.renderItem}
                  ListEmptyComponent={this.renderListEmptyComponent}
                />
              </MyButtonShadow>
            </MyButton>
          </ScrollView>
        </SafeAreaView>
      </Modal>
    );
  }
}
