import React, {PureComponent} from 'react';
import {FlatList, Modal, StyleSheet, ScrollView} from 'react-native';

import {SafeAreaView} from 'react-native-safe-area-context';

import {
  FONT_SIZE,
  LAYOUT,
  MARGIN,
  PADDING,
  RADIUS,
  setMargin,
  setPadding,
  setRadius
} from 'bases/styles/Core';

import {MyButton, MyButtonShadow} from '../button';
import {MyIcon} from '../icon';
import {MyText} from '../textview';
import Utilities from 'utils/Utilities';
import MyTheme from 'utils/MyTheme';

interface IProps {
  titleModal: string;
  tieuChiDaChonId?: number;
  onChange: (item: any) => void;
  arrTieuChi: any[];
}
interface IStates {
  isVisible: boolean;
}

export default class MySingleChoice extends PureComponent<IProps, IStates> {
  tieuChiDaChonId: any = null;

  constructor(props: IProps | Readonly<IProps>) {
    super(props);
    this.tieuChiDaChonId = this.props.tieuChiDaChonId;
  }
  state = {isVisible: false};

  arrTieuChi = [
    {id: 5, title: '5 sao'},
    {id: 4, title: '4 sao'},
    {id: 3, title: '3 sao'},
    {id: 2, title: '2 sao'},
    {id: 1, title: '1 sao'}
  ];

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
    this.tieuChiDaChonId = item.id;
    this.setState({
      isVisible: false
    });
  };

  keyExtractor = (_item: any, index: number) => {
    return index.toString();
  };

  renderItem = ({item}: {item: any}) => {
    const tieuChiId = item.id;
    const tieuChi = item.title;
    let isChecked = false;
    isChecked = this.tieuChiDaChonId === tieuChiId;

    return (
      <MyButton
        transparent
        style={styles.itemTieuChiContainer}
        onPress={() => this.pressItem(item)}>
        <MyIcon
          iconFontType="MaterialCommunityIcons"
          name={isChecked ? 'checkbox-marked-circle' : 'checkbox-blank-circle-outline'}
          size={20}
          color={MyTheme.themes.TEXT.PRIMARY_DARK}
        />
        <MyText style={styles.titleList}>{tieuChi}</MyText>
      </MyButton>
    );
  };

  render() {
    const {titleModal, arrTieuChi} = this.props;
    const {isVisible} = this.state;

    return (
      <Modal
        visible={isVisible}
        transparent
        supportedOrientations={['portrait', 'landscape']}
        animationType="slide"
        hardwareAccelerated
        onRequestClose={this.onHide}>
        <SafeAreaView edges={['left', 'bottom', 'right']} style={styles.container}>
          <ScrollView
            style={styles.spaceUp}
            contentContainerStyle={styles.contentScroll}
            keyboardShouldPersistTaps="handled">
            <MyButton
              style={styles.modalContainer}
              activeOpacity={1}
              onPress={this.onHide}
              transparent>
              <MyButtonShadow style={styles.content} activeOpacity={1}>
                <MyText fontStyle={'SemiBold'} style={styles.titleModal}>
                  {titleModal}
                </MyText>
                <FlatList
                  scrollEnabled={false}
                  style={styles.viewFlatList}
                  data={arrTieuChi}
                  extraData={arrTieuChi}
                  keyExtractor={this.keyExtractor}
                  showsVerticalScrollIndicator={false}
                  showsHorizontalScrollIndicator={false}
                  renderItem={this.renderItem}
                />
              </MyButtonShadow>
            </MyButton>
          </ScrollView>
        </SafeAreaView>
      </Modal>
    );
  }
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: MyTheme.themes.BG.BLACK_30
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    ...setPadding(PADDING.p_0, PADDING.p_0, PADDING.p_16, PADDING.p_16)
  },
  content: {
    width: Utilities.getWidthScreen() - PADDING.p_32,
    ...setRadius(RADIUS.r_16, RADIUS.r_16, RADIUS.r_16, RADIUS.r_16),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: MyTheme.themes.BG.WHITE,
    ...setPadding(PADDING.p_10, PADDING.p_10, PADDING.p_16, PADDING.p_16)
  },
  titleModal: {
    fontSize: FONT_SIZE.s_16,
    ...setPadding(PADDING.p_0, PADDING.p_10, PADDING.p_0, PADDING.p_0)
  },
  viewFlatList: {
    width: '100%'
  },
  titleList: {
    ...setMargin(MARGIN.m_0, MARGIN.m_0, MARGIN.m_16, MARGIN.m_0)
  },
  itemTieuChiContainer: {
    flexDirection: 'row',
    height: LAYOUT.l_38,
    width: '100%',
    alignItems: 'center'
  },

  viewChecked: {
    width: 10,
    height: 10,
    borderRadius: 10,
    backgroundColor: MyTheme.themes.TEXT.ORANGE,
    position: 'absolute',
    left: 3,
    top: 3
  },

  itemTieuChiContent: {
    width: 16,
    height: 16,
    borderRadius: 16,
    borderWidth: 1
  },
  contentScroll: {
    justifyContent: 'center',
    flex: 1
  },

  spaceUp: {
    flex: 1
  }
});
