import React, {PureComponent} from 'react';

import {connect} from 'react-redux';
import {RootState} from 'views/app/redux/App.Reducer';

import {personStyles} from '../style/Person.Style';
import {MyViewShadow, MyImage, MyText} from 'bases/components';
import Utilities from 'utils/Utilities';
import {IPersonState} from '../redux';

interface IProps extends IPersonState {
  titlePoint: string;
  styleContainer?: any;
}

class TotalPointComponent extends PureComponent<IProps, any> {
  render() {
    const {titlePoint, styleContainer, total_point} = this.props;

    return (
      <MyViewShadow style={[personStyles.viewPoint, styleContainer]}>
        <MyImage
          source={Utilities.convertLinkImage(
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmuDDFzz9Q6lWULZQGsFVm7pLwKszszf-UPg&usqp=CA'
          )}
          style={personStyles.imgAvatar}
          width={personStyles.image.width}
          height={personStyles.image.width}
        />
        <MyText fontStyle="Bold">
          {total_point} {titlePoint}
        </MyText>
      </MyViewShadow>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  const {total_point} = state.PersonReducer;
  return {total_point};
};

export default connect(mapStateToProps, null)(TotalPointComponent);
