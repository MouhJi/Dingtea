import {MyView, MyText, MyButtonIcon} from 'bases/components';
import {COLOR} from 'bases/styles/Core';
import {IBlogModel} from 'models';
import React, {PureComponent} from 'react';

import {styleNameBlog} from '../style/BlogDetail.Style';

interface IProps {
  itemBlog?: IBlogModel;
}

export default class NameBlogHide extends PureComponent<IProps> {
  render() {
    const {itemBlog} = this.props;
    let _viewHashtag: any[] = [];
    itemBlog?.hashtag?.map((element, index) => {
      _viewHashtag.push(
        <MyText
          key={index}
          style={[styleNameBlog.textPromotion, styleNameBlog.textHide]}
          fontStyle="Regular">
          {element}
        </MyText>
      );
    });
    return (
      <MyView style={styleNameBlog.containerHide} transparent>
        <MyView style={styleNameBlog.containerTextHide}>
          <MyText
            style={[styleNameBlog.title, styleNameBlog.textHide]}
            fontStyle="Bold"
            numberOfLines={2}>
            {itemBlog?.title}
          </MyText>
          {_viewHashtag.length > 0 ? (
            <MyView style={styleNameBlog.contentPromotion} transparent>
              {_viewHashtag}
            </MyView>
          ) : null}
        </MyView>
        <MyButtonIcon
          disabled
          style={styleNameBlog.btnHeart}
          iconFontType="AntDesign"
          iconProps={{
            name: 'hearto',
            color: COLOR.TEXT.WHITE,
            size: 18
          }}
        />
      </MyView>
    );
  }
}
