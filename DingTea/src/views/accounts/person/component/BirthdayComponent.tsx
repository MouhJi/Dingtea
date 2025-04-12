import {MyButton, MyIcon, MyText} from 'bases/components';
import {COLOR} from 'bases/styles/Core';
import React, {PureComponent} from 'react';

import {connect} from 'react-redux';
import Utilities from 'utils/Utilities';
import {RootState} from 'views/app/redux/App.Reducer';
import {IPersonState} from '../redux';
import {personStyles} from '../style/Person.Style';

interface IProps extends IPersonState {
  titleBirthday: string;
  titleNotYet: string;
  onPress: () => void;
}

class BirthdayComponent extends PureComponent<IProps> {
  render() {
    const {birthday, onPress, titleBirthday, titleNotYet} = this.props;
    let time = '(' + titleNotYet + ')';
    if (birthday) {
      time = Utilities.convertTimeByFormat(birthday, 'DD/MM/YYYY');
    }
    return (
      <MyButton transparent onPress={onPress} style={personStyles.viewTxtRow}>
        <MyText fontStyle="Bold">{titleBirthday} : </MyText>
        <MyText fontStyle="Regular">{' ' + time + ' '}</MyText>
        <MyIcon name="edit" iconFontType="AntDesign" size={14} color={COLOR.TEXT.SECONDARY} />
      </MyButton>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  const {birthday} = state.PersonReducer;
  return {birthday};
};

export default connect(mapStateToProps, null)(BirthdayComponent);
