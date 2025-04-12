import React, {createRef, PureComponent} from 'react';
import {FlatList, StyleSheet, ViewProps} from 'react-native';

import ImagePicker from 'react-native-image-crop-picker';

import {LAYOUT, MARGIN, RADIUS, setMargin, setRadius} from '../../styles/Core';

import {MyView} from '../view';
import {MyButton, MyButtonIcon} from '../button';
import {MyIcon} from '../icon';
import {MyImage} from '../image';
import {MyDialogInput} from '../dialog';
import MyTheme from 'utils/MyTheme';

interface IProps extends ViewProps {
  titleDialog: string;
  titleGallery: string;
  titleCamera: string;
  titleCancel: string;

  maxFiles?: number;
  onGetListImage?: (images: any[]) => void;
}

interface IStates {
  arrImages: any[];
}

export default class MyPickImageList extends PureComponent<IProps, IStates> {
  state = {arrImages: []};

  dialogImageRef: any = createRef();
  cancleDialogImage = () => {
    this.dialogImageRef.current.onHide();
  };

  selectFromCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 300,
      cropping: false
    })
      .then((image: any) => {
        this.cancleDialogImage();

        let arrTmp: any = [...this.state.arrImages];
        arrTmp.push(image);

        this.setState({
          arrImages: arrTmp
        });
      })
      .catch(() => {
        this.cancleDialogImage();
      });
  };

  selectFromGallery = () => {
    const {arrImages} = this.state;
    const {maxFiles} = this.props;

    const maxFilesTmp1 = maxFiles || 3;
    let maxFilesTmp2 = maxFilesTmp1 - arrImages.length;

    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: false,
      multiple: true,
      maxFiles: maxFilesTmp2
    })
      .then(images => {
        this.cancleDialogImage();

        let imgTmp: any = [...images].slice(0, maxFilesTmp2);
        this.setState({
          arrImages: arrImages.concat(imgTmp)
        });
      })
      .catch(() => {
        this.cancleDialogImage();
      });
  };

  showDialog = () => {
    this.dialogImageRef.current.onShow();
  };

  deleteImg = (index: number) => {
    let arrTmp = [...this.state.arrImages];
    if (index > -1) {
      arrTmp.splice(index, 1);
    }

    this.setState({
      arrImages: arrTmp
    });
  };

  keyExtractor = (_item: any, index: number) => {
    return index.toString();
  };

  renderItem = ({item, index}: {item: any; index: number}) => {
    return (
      <MyView style={itemPickStyles.btnPlus}>
        <MyImage
          source={{uri: item.path}}
          width={itemPickStyles.btnPlus.width}
          height={itemPickStyles.btnPlus.height}
          style={itemPickStyles.image}
        />
        <MyButtonIcon
          onPress={() => this.deleteImg(index)}
          style={itemPickStyles.btnClose}
          iconFontType="AntDesign"
          iconProps={{name: 'closecircleo', size: 26, color: MyTheme.themes.TEXT.SECONDARY}}
        />
      </MyView>
    );
  };

  renderListFooterComponent = () => {
    const {arrImages} = this.state;
    const {maxFiles} = this.props;
    let maxFilesTmp = maxFiles || 3;
    if (arrImages.length >= maxFilesTmp) {
      return null;
    }
    return (
      <MyButton style={itemPickStyles.btnPlus} onPress={this.showDialog}>
        <MyIcon
          iconFontType="AntDesign"
          name="plussquareo"
          color={MyTheme.themes.TEXT.PRIMARY}
          size={26}
        />
      </MyButton>
    );
  };

  render() {
    const {style, onGetListImage, titleDialog, titleGallery, titleCamera, titleCancel} = this.props;
    const {arrImages} = this.state;
    if (onGetListImage) {
      onGetListImage(arrImages);
    }
    return (
      <>
        <FlatList
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          style={style}
          horizontal
          keyExtractor={this.keyExtractor}
          renderItem={this.renderItem}
          data={arrImages}
          extraData={arrImages}
          ListFooterComponent={this.renderListFooterComponent}
        />
        <MyDialogInput
          ref={this.dialogImageRef}
          onRequestClose={this.cancleDialogImage}
          title={titleDialog}
          titleStyle={{color: MyTheme.themes.TEXT.PRIMARY}}
          contentStyle={{backgroundColor: MyTheme.themes.BG.WHITE}}
          footerStyle={itemPickStyles.footerDialog}
          buttonSeparatorStyle={itemPickStyles.buttonSeparatorHoz}
          actionButtons={[
            {
              label: titleCamera,
              color: MyTheme.themes.TEXT.POSITIVE_BTN,
              onPress: this.selectFromCamera
            },
            {
              label: titleGallery,
              color: MyTheme.themes.TEXT.POSITIVE_BTN,
              onPress: this.selectFromGallery
            },
            {
              label: titleCancel,
              color: MyTheme.themes.TEXT.NEGATIVE_BTN,
              onPress: this.cancleDialogImage
            }
          ]}
        />
      </>
    );
  }
}

const itemPickStyles = StyleSheet.create({
  btnPlus: {
    height: LAYOUT.l_60,
    width: LAYOUT.l_60,
    ...setMargin(MARGIN.m_10, MARGIN.m_0, MARGIN.m_0, MARGIN.m_16),
    justifyContent: 'center',
    alignItems: 'center',
    ...setRadius(RADIUS.r_6, RADIUS.r_6, RADIUS.r_6, RADIUS.r_6),
    backgroundColor: MyTheme.themes.BG.SECONDARY
  },
  image: {
    ...setRadius(RADIUS.r_6, RADIUS.r_6, RADIUS.r_6, RADIUS.r_6)
  },
  btnClose: {
    position: 'absolute',
    right: -5,
    top: -5,
    backgroundColor: MyTheme.themes.BG.WHITE,
    ...setRadius(RADIUS.r_20, RADIUS.r_20, RADIUS.r_20, RADIUS.r_20)
  },
  footerDialog: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderTopColor: '#A9ADAE',
    borderTopWidth: StyleSheet.hairlineWidth,
    height: LAYOUT.l_46 * 3
  },
  buttonSeparatorHoz: {
    height: StyleSheet.hairlineWidth * 1.00009,
    backgroundColor: '#A9ADAE',
    width: '100%'
  }
});
