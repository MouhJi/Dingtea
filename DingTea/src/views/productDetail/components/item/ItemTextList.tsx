import React, {PureComponent} from 'react';
import {ICartModel, ICategoryModel, IProductModel} from 'models';
import ItemText from './ItemText';
import {getListProduct} from 'services';
import {FlatList} from 'react-native';

interface IProps {
  categories?: ICategoryModel[];
  valueDefault?: ICartModel[];
  onChange: (parent: IProductModel, child: IProductModel) => void;
}

interface IStates {
  data: IProductModel[];
}

export default class ItemTextList extends PureComponent<IProps, IStates> {
  state = {data: []};

  onChoose = (parent: IProductModel, item: IProductModel) => {
    this.props.onChange(parent, item);
  };

  keyExtractor = (item: IProductModel) => {
    return item.id.toString();
  };

  renderItem = ({item}: {item: IProductModel}) => {
    let option_id_default = -1;
    const {valueDefault} = this.props;
    if (valueDefault) {
      for (let index = 0; index < valueDefault.length; index++) {
        const element = valueDefault[index];
        if (element.id === item.id) {
          option_id_default = element.option_id || -1;
          break;
        }
      }
    }
    return (
      <ItemText
        title={item.name || ''}
        onChange={this.onChoose}
        data={item}
        tieuChiDaChonId={option_id_default}
      />
    );
  };

  componentDidMount() {
    const {categories} = this.props;
    if (categories) {
      getListProduct<IProductModel>({
        types: 'option',
        categories: categories[0]?.id,
        skip: 0,
        limit: 100
      }).then((res) => {
        if (!res?.code) {
          this.setState({
            data: res?.data || []
          });
        }
      });
    }
  }

  render() {
    const {data} = this.state;

    return (
      <FlatList
        scrollEnabled={false}
        data={data}
        extraData={data}
        keyExtractor={this.keyExtractor}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        renderItem={this.renderItem}
      />
    );
  }
}
