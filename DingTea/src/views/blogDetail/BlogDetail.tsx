import React, {PureComponent} from 'react';
import {ScrollView, RefreshControl} from 'react-native';
import {connect} from 'react-redux';
import MyI18n from 'utils/MyI18n';
import {RootState} from 'views/app/redux/App.Reducer';
import {blogDetailStyles} from './style/BlogDetail.Style';

import {
  LoadingList,
  MyButtonText,
  MyIcon,
  MyImage,
  MyText,
  MyView,
  MyViewShadow
} from 'bases/components';
import {bindActionCreators} from 'redux';
import {showFirstLoading, reset, showRefresh, IBlogDetailState, getDetail} from './redux';
import {IBlogModel} from 'models';
import Utilities from 'utils/Utilities';
import MyTheme from 'utils/MyTheme';

interface defaultProps extends IBlogDetailState {
  showFirstLoading: typeof showFirstLoading;
  getDetail: typeof getDetail;
  reset: typeof reset;
  showRefresh: typeof showRefresh;

  route?: any;
}

class BlogDetail extends PureComponent<defaultProps> {
  blog: IBlogModel;

  constructor(props: defaultProps) {
    super(props);
    this.blog = this.props.route.params.blog;
  }
  componentDidMount() {
    this.props.getDetail(this.blog.id);
  }
  componentWillUnmount() {
    this.props.reset();
  }

  reload = () => {
    this.props.showFirstLoading(true);
    this.props.getDetail(this.blog.id);
  };

  refresh = () => {
    this.props.showRefresh(true);
    this.props.getDetail(this.blog.id);
  };
  render() {
    const {blogDetail, isFirstLoading, isRefresh} = this.props;
    let created_at = blogDetail?.created_at || 0;
    const time = Utilities.convertTimeByFormat(created_at, 'DD/MM/YYYY');
    if (isFirstLoading) {
      return <LoadingList />;
    } else {
      if (blogDetail) {
        return (
          <ScrollView
            style={blogDetailStyles.container}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl onRefresh={this.reload} refreshing={isRefresh || false} />
            }>
            <MyViewShadow style={blogDetailStyles.contentList}>
              <MyText fontStyle="SemiBold" numberOfLines={2}>
                {blogDetail?.title}
              </MyText>
              <MyImage
                width={blogDetailStyles.styleImage.width}
                height={blogDetailStyles.styleImage.height}
                style={blogDetailStyles.styleImage}
                source={Utilities.convertLinkImage(blogDetail.avatar)}
              />
              <MyView transparent style={blogDetailStyles.viewDate}>
                <MyIcon
                  name={'calendar-blank-outline'}
                  iconFontType="MaterialCommunityIcons"
                  size={12}
                  color={MyTheme.themes.TEXT.BROWN}
                />
                <MyText fontStyle="SemiBold" style={blogDetailStyles.txtDate} numberOfLines={2}>
                  {time}
                </MyText>
              </MyView>
              <MyView style={blogDetailStyles.itemSeparator} />
              <MyText fontStyle="Regular" style={blogDetailStyles.title}>
                {blogDetail.description}
              </MyText>
            </MyViewShadow>
          </ScrollView>
        );
      } else {
        return (
          <MyView style={blogDetailStyles.containerError}>
            <MyText style={blogDetailStyles.txtAgain}>{MyI18n.trans.error_message}</MyText>
            <MyButtonText
              onPress={this.reload}
              title={MyI18n.trans.try_again}
              style={blogDetailStyles.btnAgain}
            />
          </MyView>
        );
      }
    }
  }
}
const mapStateToProps = (state: RootState) => {
  const {iso, theme} = state.SettingReducer;
  const {isRefresh, blogDetail, isFirstLoading} = state.BlogDetailReducer;
  return {isRefresh, blogDetail, isFirstLoading, iso, theme};
};

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      showFirstLoading,
      getDetail,
      reset,
      showRefresh
    },
    dispatch
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(BlogDetail);
