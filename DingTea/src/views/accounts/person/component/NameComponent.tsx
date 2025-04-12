import {MyButton, MyText} from 'bases/components';
import React, {PureComponent} from 'react';

import {connect} from 'react-redux';
import {RootState} from 'views/app/redux/App.Reducer';
import {IPersonState} from '../redux';
import {personStyles} from '../style/Person.Style';

interface IProps extends IPersonState {
  onPress: () => void;
}

class NameComponent extends PureComponent<IProps> {
  render() {
    const {name, onPress} = this.props;
    return (
      <MyButton onPress={onPress} style={personStyles.nameUser} transparent>
        <MyText fontStyle="Bold">{name}</MyText>
      </MyButton>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  const {name} = state.PersonReducer;
  return {name};
};

export default connect(mapStateToProps, null)(NameComponent);
