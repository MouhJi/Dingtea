import React, {createRef, PureComponent} from 'react';
import {StyleSheet, Animated, TouchableOpacity} from 'react-native';

import {connect} from 'react-redux';
import {RootState} from 'views/app/redux/App.Reducer';

import {MyView} from 'bases/components';

import {FONT_FAMILY, FONT_SIZE, LAYOUT, PADDING, setPadding} from 'bases/styles/Core';
import Utilities from 'utils/Utilities';
import MyTheme from 'utils/MyTheme';
import {ICategoryModel, IProductModel} from 'models';
import {CATEGORY_DEFAULT} from 'common/Constants';

interface IProps {
  backgroundColor: any;
  textColor: any;
  textSecondColor: any;
  indicatorColor: any;
  heightView: any;

  data?: {title: ICategoryModel; data: IProductModel[]}[];

  onChooseItem: (index: number, itemChoose: {title: ICategoryModel; data: IProductModel[]}) => void;
}

interface IStates {
  itemChoose: {title: ICategoryModel; data: IProductModel[]};
}

class CategoryHeader extends PureComponent<IProps, IStates> {
  flatListRef: any = createRef();

  state = {itemChoose: {title: CATEGORY_DEFAULT, data: []}};

  chooseItem = (itemChoose: {title: ICategoryModel; data: IProductModel[]}) => {
    this.flatListRef.current.scrollToItem(itemChoose);
    setTimeout(() => {
      this.setState({
        itemChoose
      });
    }, 100);
  };

  onPress = (index: number, itemChoose: {title: ICategoryModel; data: IProductModel[]}) => {
    this.setState(
      {
        itemChoose
      },
      () => {
        this.props.onChooseItem(index, itemChoose);
      }
    );
  };

  keyExtractor = (item: {title: ICategoryModel; data: IProductModel[]}) => {
    return item.title.id.toString();
  };

  renderItem = ({
    index,
    item
  }: {
    index: number;
    item: {title: ICategoryModel; data: IProductModel[]};
  }) => {
    const {textColor, textSecondColor, indicatorColor} = this.props;
    const {itemChoose} = this.state;

    const textColorTmp = itemChoose.title.id === item.title.id ? textColor : textSecondColor;
    const bgIndicator = itemChoose.title.id === item.title.id ? indicatorColor : 'transparent';
    return (
      <TouchableOpacity activeOpacity={0.9} onPress={() => this.onPress(index, item)}>
        <MyView style={styles.viewText} transparent>
          <Animated.Text
            style={[
              styles.text,
              {
                color: textColorTmp
              }
            ]}>
            {item.title.name}
          </Animated.Text>
        </MyView>
        <Animated.View
          style={[
            styles.indicator,
            {
              backgroundColor: bgIndicator
            }
          ]}
        />
      </TouchableOpacity>
    );
  };

  render() {
    const {heightView, backgroundColor, data} = this.props;

    return (
      <MyView style={styles.container}>
        <Animated.FlatList
          ref={this.flatListRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          style={[styles.content, {height: heightView, backgroundColor: backgroundColor}]}
          data={data}
          extraData={data}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderItem}
        />
      </MyView>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  const {theme} = state.SettingReducer;
  return {theme};
};

export default connect(mapStateToProps, null, null, {forwardRef: true})(CategoryHeader);

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 1000,
    backgroundColor: 'transparent'
  },
  safeView: {
    backgroundColor: MyTheme.themes.BG.WHITE
  },
  content: {
    width: Utilities.getWidthScreen()
  },

  viewText: {
    height: LAYOUT.l_44,
    justifyContent: 'center',
    alignItems: 'center',
    ...setPadding(PADDING.p_0, PADDING.p_0, PADDING.p_16, PADDING.p_16)
  },
  text: {
    fontFamily: FONT_FAMILY.Bold,
    fontSize: FONT_SIZE.s_14
  },
  indicator: {
    height: LAYOUT.l_4,
    width: '100%'
  }
});
