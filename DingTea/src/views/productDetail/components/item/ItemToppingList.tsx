import React, {PureComponent} from 'react';

import {itemTextStyles} from '../../style/ProductDetail.Style';
import {MyText, MyView} from 'bases/components';
import ItemTopping from './ItemTopping';
import {ICartModel, ICategoryModel, IProductModel} from 'models';
import {getListProduct} from 'services';

export interface ITopping {
  topping: IProductModel;
  soLuong: number;
}

interface ITypeTopping {
  type: string;
  arrTopping: IProductModel[];
}

interface IProps {
  title: string;
  categories?: ICategoryModel[];
  valueDefault?: ICartModel[];
  variations?: string[];
  typeDaChon?: string;

  onChange?: (item: ITopping) => void;
  onDataInit?: (data: IProductModel[]) => void;
}

interface IStates {
  data: IProductModel[];
  valueDefault?: ICartModel[];
}

export class ItemToppingList extends PureComponent<IProps, IStates> {
  arrAllTopping: IProductModel[] = [];
  arrTypeTopping: ITypeTopping[] = [];

  constructor(props: IProps) {
    super(props);
    this.state = {data: [], valueDefault: this.props.valueDefault};
  }

  onChoose = (item: IProductModel, soLuong: number) => {
    if (this.props.onChange) this.props.onChange({topping: item, soLuong: soLuong});
  };

  keyExtractor = (item: IProductModel) => {
    return item.id.toString();
  };

  renderItem = ({item}: {item: IProductModel}) => {
    let soLuong_default = 0;
    const {valueDefault} = this.state;
    if (valueDefault) {
      for (let index = 0; index < valueDefault.length; index++) {
        const element = valueDefault[index];
        if (element.id === item.parent_id) {
          soLuong_default = element.total_quantity || 0;
          break;
        }
      }
    }

    return (
      <ItemTopping
        key={item.id}
        onChange={(soLuong: number) => this.onChoose(item, soLuong)}
        item={item}
        soLuong={soLuong_default}
      />
    );
  };

  renderHeader = () => {
    const {data} = this.state;
    if (data.length === 0) {
      return null;
    }
    const {title} = this.props;
    return (
      <MyView style={itemTextStyles.viewTitleItem}>
        <MyText fontStyle="Bold">{title}</MyText>
      </MyView>
    );
  };

  setDataInType = (type: string, value: ICartModel[]) => {
    const {variations} = this.props;
    let viTriDaChon = 0;
    if (variations) {
      viTriDaChon = variations.indexOf(type);
    }
    this.setState({
      data: this.arrTypeTopping[viTriDaChon]?.arrTopping || [],
      valueDefault: value
    });
  };

  componentDidMount() {
    const {categories, variations, typeDaChon} = this.props;
    let viTriMacDinh = 0;
    if (variations && typeDaChon) {
      viTriMacDinh = variations?.indexOf(typeDaChon);
    }

    if (categories) {
      getListProduct<IProductModel>({
        types: 'topping',
        categories: categories[0]?.id,
        skip: 0,
        limit: 1000
      }).then(res => {
        if (!res?.code) {
          let arrTopParent = res?.data || [];
          if (arrTopParent && arrTopParent.length > 0) {
            for (let i = 0; i < arrTopParent.length; i++) {
              const parent = arrTopParent[i];
              if (parent.products) {
                for (let j = 0; j < parent.products.length; j++) {
                  let child = parent.products[j];
                  child = {...child, parent_name: parent.name};
                  this.arrAllTopping.push(child);
                }
              }
            }
            if (this.props.onDataInit) this.props.onDataInit(this.arrAllTopping);

            if (variations) {
              for (let h = 0; h < variations.length; h++) {
                const element = variations[h];
                let itemArrTop = this.arrAllTopping.filter(topping => {
                  return topping.option_name === element;
                });
                let itemTypeTop: ITypeTopping = {
                  type: element,
                  arrTopping: itemArrTop
                };
                this.arrTypeTopping.push(itemTypeTop);
              }
            }
            this.setState({
              data: this.arrTypeTopping[viTriMacDinh].arrTopping || []
            });
          }
        }
      });
    }
  }

  render() {
    const {data} = this.state;
    return (
      <MyView transparent>
        {this.renderHeader()}
        {data.map(item => this.renderItem({item}))}
      </MyView>
    );
  }
}
