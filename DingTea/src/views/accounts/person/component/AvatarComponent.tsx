import React, {createRef, PureComponent} from 'react';

import {connect} from 'react-redux';
import MyI18n from 'utils/MyI18n';
import {RootState} from 'views/app/redux/App.Reducer';

import ImagePicker from 'react-native-image-crop-picker';

import Utilities from 'utils/Utilities';
import {IPersonState, updateAvatar} from '../redux';
import {avatarStyles} from '../style/Person.Style';
import {MyButton, MyDialogInput, MyIcon, MyImage, MyView} from 'bases/components';
import {COLOR} from 'bases/styles/Core';
import {inforPersonStyle} from '../style/Person.Style';
import {uploadImage} from 'services/UpLoadImage.Api';
import {bindActionCreators} from 'redux';
import {IResponseImageModel} from 'models';

interface IProps extends IPersonState {
  updateAvatar: typeof updateAvatar;
}
interface IAppState {}
class AvatarComponent extends PureComponent<IProps, IAppState> {
  dialogAvatarRef: any = createRef();
  cancleDialogAvatar = () => {
    this.dialogAvatarRef.current.onHide();
  };

  selectFromCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 300,
      cropping: true
    })
      .then(image => {
        this.cancleDialogAvatar();

        Utilities.showHideRootLoading(true, MyI18n.trans.please_wait);
        uploadImage<IResponseImageModel>(image)
          .then(res => {
            Utilities.showHideRootLoading(false);
            if (res?.url) {
              Utilities.showToast(MyI18n.trans.update_avatar_success, '', 'success');
              this.props.updateAvatar(res.url);
            } else {
              Utilities.showToast(MyI18n.trans.an_error_has_occurred, '', 'danger');
            }
          })
          .catch(() => {
            Utilities.showHideRootLoading(false);
            Utilities.showToast(MyI18n.trans.an_error_has_occurred, '', 'danger');
          });
      })
      .catch(() => {
        this.cancleDialogAvatar();
      });
  };

  selectFromGallery = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true
    })
      .then(image => {
        this.cancleDialogAvatar();

        Utilities.showHideRootLoading(true, MyI18n.trans.please_wait);
        uploadImage<{url: string}>(image)
          .then(res => {
            Utilities.showHideRootLoading(false);
            if (res?.url) {
              Utilities.showToast(MyI18n.trans.update_avatar_success, '', 'success');
              this.props.updateAvatar(res.url);
            } else {
              Utilities.showToast(MyI18n.trans.an_error_has_occurred, '', 'danger');
            }
          })
          .catch(() => {
            Utilities.showHideRootLoading(false);
            Utilities.showToast(MyI18n.trans.an_error_has_occurred, '', 'danger');
          });
      })
      .catch(() => {
        this.cancleDialogAvatar();
      });
  };

  showDialog = () => {
    this.dialogAvatarRef.current.onShow();
  };

  render() {
    const {avatar} = this.props;

    return (
      <MyButton transparent onPress={this.showDialog}>
        <MyImage
          resizeMode="contain"
          source={Utilities.convertLinkImage(avatar)}
          style={inforPersonStyle.imgAvatar}
          width={inforPersonStyle.imageAvatar.width}
          height={inforPersonStyle.imageAvatar.width}
        />
        <MyView style={inforPersonStyle.viewIcon}>
          <MyIcon
            iconFontType="MaterialCommunityIcons"
            name={'camera-outline'}
            size={12}
            color={inforPersonStyle.icon.color}
          />
        </MyView>
        <MyDialogInput
          ref={this.dialogAvatarRef}
          onRequestClose={this.cancleDialogAvatar}
          title={MyI18n.trans.edit_avatar}
          titleStyle={{color: COLOR.TEXT.BLACK}}
          contentStyle={{backgroundColor: COLOR.BG.WHITE}}
          footerStyle={avatarStyles.footerDialog}
          buttonSeparatorStyle={avatarStyles.buttonSeparatorHoz}
          actionButtons={[
            {
              label: MyI18n.trans.take_photo,
              color: COLOR.TEXT.POSITIVE_BTN,
              onPress: this.selectFromCamera
            },
            {
              label: MyI18n.trans.pick_image,
              color: COLOR.TEXT.POSITIVE_BTN,
              onPress: this.selectFromGallery
            },
            {
              label: MyI18n.trans.cancel,
              color: COLOR.TEXT.NEGATIVE_BTN,
              onPress: this.cancleDialogAvatar
            }
          ]}
        />
      </MyButton>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  const {avatar} = state.PersonReducer;
  return {avatar};
};
const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      updateAvatar
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(AvatarComponent);
