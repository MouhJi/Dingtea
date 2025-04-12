import React, {PureComponent} from 'react';

import MyButtonInDialog from './MyButtonInDialog';
import MyContainerInDialog from './MyContainerInDialog';
import MyDescriptionInDialog from './MyDescriptionInDialog';
import MyInputInDialog from './MyInputInDialog';
import MyTitleInDialog from './MyTitleInDialog';

interface IProps {
  onRequestClose?: () => void;
  title: string;
  titleStyle?: object;
  description?: string;
  descriptionStyle?: object;
  contentStyle?: object;
  footerStyle?: object;
  buttonSeparatorStyle?: object;
  actionInputs?: any[];
  actionButtons: any[];
}

interface IStates {
  show: boolean;
  loading: boolean;
}

export default class MyDialogInput extends PureComponent<IProps, IStates> {
  state = {show: false, loading: false};

  onShow = () => {
    this.setState({
      show: true
    });
  };

  onHide = () => {
    this.setState({
      show: false,
      loading: false
    });
  };

  showLoading = () => {
    this.setState({
      loading: true
    });
  };

  hideLoading = () => {
    this.setState({
      loading: false
    });
  };

  render() {
    const {
      onRequestClose,
      title,
      titleStyle,
      description,
      descriptionStyle,
      contentStyle,
      footerStyle,
      buttonSeparatorStyle,
      actionInputs,
      actionButtons
    } = this.props;

    const {show, loading} = this.state;

    return (
      <MyContainerInDialog
        onRequestClose={onRequestClose}
        visible={show}
        loading={loading}
        contentStyle={contentStyle}
        footerStyle={footerStyle}
        buttonSeparatorStyle={buttonSeparatorStyle}>
        <MyTitleInDialog style={titleStyle}>{title}</MyTitleInDialog>

        {description ? <MyDescriptionInDialog text={description} style={descriptionStyle} /> : null}

        {actionInputs && actionInputs.length > 0
          ? actionInputs.map((v, i) => {
              return (
                <MyInputInDialog
                  key={i.toString()}
                  label={v.label}
                  placeholder={v.placeholder}
                  defaultValue={v.defaultValue}
                  secureTextEntry={v.secureTextEntry}
                  numberOfLines={v.numberOfLines}
                  maxLength={v.maxLength}
                  keyboardType={v.keyboardType}
                  onChangeText={(text: string) => {
                    v.onChangeText(text);
                  }}
                  onSubmitEditing={(event: any) => {
                    v.onSubmitEditing(event);
                  }}
                  returnKeyType={v.returnKeyType}
                  textInputRef={v.inputRef}
                  autoFocus={v.autoFocus}
                  style={v.style}
                  wrapperStyle={v.wrapperStyle}
                />
              );
            })
          : null}

        {actionButtons.map((v, i) => {
          return (
            <MyButtonInDialog
              key={i.toString()}
              label={v.label}
              color={v.color}
              onPress={v.onPress}
            />
          );
        })}
      </MyContainerInDialog>
    );
  }
}
