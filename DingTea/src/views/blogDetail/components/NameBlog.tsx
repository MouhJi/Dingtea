import React, {PureComponent} from 'react';
import {styleNameBlog} from '../style/BlogDetail.Style';
import {MyView, MyText, MyButtonIcon} from 'bases/components';
import {IBlogModel} from 'models';
import {COLOR} from 'bases/styles/Core';

interface IProps {
  itemBlog?: IBlogModel;
}
export default class NameBlog extends PureComponent<IProps> {
  render() {
    const {itemBlog} = this.props;
    let _viewHashtag: any[] = [];
    itemBlog?.hashtag?.map((element, index) => {
      _viewHashtag.push(
        <MyText key={index} style={styleNameBlog.textPromotion} fontStyle="Regular">
          {element}
        </MyText>
      );
    });
    return (
      <MyView style={styleNameBlog.container} transparent>
        <MyView style={styleNameBlog.containerText}>
          <MyText style={styleNameBlog.title} fontStyle="Bold" numberOfLines={2}>
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
