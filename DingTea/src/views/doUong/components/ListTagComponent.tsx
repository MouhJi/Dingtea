import React, {PureComponent} from 'react';
import {FlatList} from 'react-native';

import {MyView, MyText, MyButtonText} from 'bases/components';
import {getListCategories} from 'services';
import {ICategoryModel} from 'models';
import {listTag} from '../style/DoUong.Style';
import MyNavigator from 'utils/MyNavigator';

interface IStates {
  arrCate: ICategoryModel[];
}

export default class ListTagComponent extends PureComponent<{}, IStates> {
  state = {arrCate: []};

  onPress = (data?: ICategoryModel) => {
    MyNavigator.navigate('MenuDetail', {id: data?.id});
  };

  componentDidMount() {
    getListCategories<ICategoryModel>({is_home_visible: true, skip: 0, limit: 5})
      .then((res) => {
        if (!res?.code) {
          this.setState({
            arrCate: res?.data || []
          });
        }
      })
      .catch(() => {});
  }

  keyExtractor = (item: ICategoryModel) => {
    return item.id.toString();
  };

  renderItem = ({item}: {index: number; item: ICategoryModel}) => {
    return (
      <MyButtonText
        title={item.name}
        style={listTag.btn}
        titleStyle={listTag.text}
        onPress={() => this.onPress(item)}
      />
    );
  };

  renderItemSeparatorComponent = () => {
    return <MyView style={listTag.itemSeparator} transparent />;
  };

  renderListEmptyComponent = () => {
    return <MyView />;
  };

  render() {
    const {arrCate} = this.state;
    if (arrCate && arrCate.length > 0) {
      return (
        <MyView style={listTag.container}>
          <MyText style={listTag.title} fontStyle="Bold">
            {'#toptrending'}
          </MyText>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            style={listTag.content}
            contentContainerStyle={listTag.content2}
            data={arrCate}
            extraData={arrCate}
            keyExtractor={this.keyExtractor}
            renderItem={this.renderItem}
            ItemSeparatorComponent={this.renderItemSeparatorComponent}
            ListEmptyComponent={this.renderListEmptyComponent}
          />
        </MyView>
      );
    } else {
      return <MyView />;
    }
  }
}
