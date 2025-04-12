import React, {PureComponent} from 'react';
import {FlatList, Modal} from 'react-native';

import {SafeAreaView} from 'react-native-safe-area-context';

import {modalGift} from '../style/Promotion.Style';
import {ItemMenuSvg} from 'views/app/components/ItemMenu';
import {MyButton, MyViewShadow, MyText, MyButtonText} from 'bases/components';

let dataFilter: any = [
  {
    id: 0,
    icon: 'http://raw.csell.vn/dingtea/public/cosmetics.svg',
    name: 'Son môi'
  },
  {
    id: 1,
    icon: 'http://raw.csell.vn/dingtea/public/giftcode.svg',
    name: 'Mỹ phẩm'
  },
  {
    id: 2,
    icon: 'http://raw.csell.vn/dingtea/public/lipstick.svg',
    name: 'Trang sức'
  },
  {
    id: 3,
    icon: 'http://raw.csell.vn/dingtea/public/fastfood.svg',
    name: 'Phụ kiện'
  },
  {
    id: 4,
    icon: 'http://raw.csell.vn/dingtea/public/jewelry.svg',
    name: 'Nước hoa'
  },
  {
    id: 5,
    icon: 'http://raw.csell.vn/dingtea/public/jewelry.svg',
    name: 'Nước hoa'
  },
  {
    id: 6,
    icon: 'http://raw.csell.vn/dingtea/public/jewelry.svg',
    name: 'Phụ kiện'
  },
  {
    id: 7,
    icon: 'http://raw.csell.vn/dingtea/public/jewelry.svg',
    name: 'Nước hoa'
  }
];
interface IProps {
  value?: string;
  titleButton: string;
}

interface IStates {
  isVisible: boolean;
}

export default class ModalGift extends PureComponent<IProps, IStates> {
  state = {isVisible: false};

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

  keyExtractor = (_item: any, index: number) => {
    return index.toString();
  };

  renderItem = ({item, index}: {item: any; index: number}) => {
    return (
      <MyButton onPress={this.onHide} style={modalGift.viewItem} transparent>
        <ItemMenuSvg url={item.icon} />
        <MyText style={modalGift.titleItem} fontStyle={index === 0 ? 'Bold' : 'Regular'}>
          {item.name}
        </MyText>
      </MyButton>
    );
  };

  render() {
    const {titleButton} = this.props;
    const {isVisible} = this.state;

    return (
      <Modal
        visible={isVisible}
        transparent
        supportedOrientations={['portrait', 'landscape']}
        animationType="slide"
        hardwareAccelerated
        onRequestClose={this.onHide}>
        <SafeAreaView edges={['left', 'right']} style={modalGift.container}>
          <MyButton style={modalGift.container} activeOpacity={1} onPress={this.onHide} transparent>
            <MyViewShadow style={modalGift.viewModal}>
              <FlatList
                contentContainerStyle={modalGift.contentList}
                data={dataFilter}
                extraData={dataFilter}
                keyExtractor={this.keyExtractor}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                renderItem={this.renderItem}
              />
              <SafeAreaView edges={['bottom']} style={modalGift.safeView}>
                <MyButtonText
                  title={titleButton}
                  style={modalGift.bottomButtonFillter}
                  titleProps={{fontStyle: 'SemiBold'}}
                  onPress={this.onHide}
                />
              </SafeAreaView>
            </MyViewShadow>
          </MyButton>
        </SafeAreaView>
      </Modal>
    );
  }
}
