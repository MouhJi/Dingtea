import React, {createRef, PureComponent} from 'react';
import {StyleSheet} from 'react-native';

import ImagePicker from 'react-native-image-crop-picker';

import {MyButton, MyButtonIcon} from '../button';
import {MyIcon} from '../icon';
import {MyImage} from '../image';
import {MyView} from '../view';

import {LAYOUT, MARGIN, RADIUS, setMargin, setRadius} from '../../styles/Core';
import {MyDialogInput} from '../dialog';
import MyTheme from 'utils/MyTheme';

interface IProps {
  titleDialog: string;
  titleGallery: string;
  titleCamera: string;
  titleCancel: string;

  linkImg?: string;
  isGone?: boolean;

  selectFromGallery?: () => void;
  onGetImage?: (image: any) => void;
  onGetListImage?: (image: any[]) => void;
}

interface IState {
  linkImg: string;
}

export default class MyPickImage extends PureComponent<IProps, IState> {
  state = {linkImg: this.props.linkImg || ''};

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

        if (this.props.onGetImage) {
          this.props.onGetImage(image);
        }
        this.setState({
          linkImg: image.path
        });
      })
      .catch(() => {
        this.cancleDialogImage();
      });
  };

  selectFromGallery = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: false,
      multiple: true
    })
      .then(images => {
        this.cancleDialogImage();

        if (this.props.onGetListImage) {
          this.props.onGetListImage(images);
        }
        this.setState({
          linkImg: images[0].path
        });
      })
      .catch(() => {
        this.cancleDialogImage();
      });
  };

  deleteImg = () => {
    this.setState({
      linkImg: ''
    });
  };

  showDialog = () => {
    this.dialogImageRef.current.onShow();
  };

  render() {
    const {linkImg} = this.state;
    const {
      isGone,
      titleDialog,
      titleGallery,
      titleCamera,
      titleCancel,
      selectFromGallery
    } = this.props;

    if (linkImg) {
      return (
        <MyView style={itemPickStyles.btnPlus}>
          <MyImage
            source={{uri: linkImg}}
            width={itemPickStyles.btnPlus.width}
            height={itemPickStyles.btnPlus.height}
            style={itemPickStyles.image}
          />
          <MyButtonIcon
            onPress={this.deleteImg}
            style={itemPickStyles.btnClose}
            iconFontType="AntDesign"
            iconProps={{name: 'closecircleo', size: 26, color: MyTheme.themes.TEXT.SECONDARY}}
          />
        </MyView>
      );
    } else {
      if (isGone) {
        return null;
      } else {
        return (
          <MyButton style={itemPickStyles.btnPlus} onPress={this.showDialog}>
            <MyIcon
              iconFontType="AntDesign"
              name="plussquareo"
              color={MyTheme.themes.TEXT.PRIMARY}
              size={26}
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
                  onPress: selectFromGallery ? selectFromGallery : this.selectFromGallery
                },
                {
                  label: titleCancel,
                  color: MyTheme.themes.TEXT.NEGATIVE_BTN,
                  onPress: this.cancleDialogImage
                }
              ]}
            />
          </MyButton>
        );
      }
    }
  }
}

const itemPickStyles = StyleSheet.create({
  btnPlus: {
    height: LAYOUT.l_60,
    width: LAYOUT.l_60,
    ...setMargin(MARGIN.m_0, MARGIN.m_0, MARGIN.m_0, MARGIN.m_16),
    justifyContent: 'center',
    alignItems: 'center',
    ...setRadius(RADIUS.r_6, RADIUS.r_6, RADIUS.r_6, RADIUS.r_6)
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
