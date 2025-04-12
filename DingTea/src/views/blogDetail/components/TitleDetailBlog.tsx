import {MyView, MyText} from 'bases/components';
import React, {PureComponent} from 'react';

import {titleDetailBlog} from '../style/BlogDetail.Style';

interface IProps {
  titleDetail: string;
  description?: string;
}

export default class TitleDetailBlog extends PureComponent<IProps, {}> {
  render() {
    const {titleDetail, description} = this.props;
    return (
      <MyView style={titleDetailBlog.container} transparent>
        <MyText fontStyle="Bold" style={titleDetailBlog.title}>
          {titleDetail}
        </MyText>
        <MyText fontStyle="Regular">{description}</MyText>
      </MyView>
    );
  }
}
