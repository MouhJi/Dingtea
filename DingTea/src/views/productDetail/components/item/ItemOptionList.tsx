import React, {PureComponent} from 'react';
import {ICartModel, IProductModel} from 'models';
import {getListProduct} from 'services';
import {FlatList} from 'react-native';
import ItemOption from './ItemOption';
import {MyView} from 'bases/components';

interface IProps {
  valueDefault?: ICartModel[];

  variations?: string[];
  typeDaChon?: string;

  onChange: (child: IProductModel) => void;
  onDataInit: (data: IProductModel[]) => void;
}

interface IStates {
  data: {title: string; data: {type: string; product: IProductModel[]}[]}[];

  typeDaChon?: string;
}

export default class ItemOptionList extends PureComponent<IProps, IStates> {
  constructor(props: IProps) {
    super(props);
    this.state = {data: [], typeDaChon: this.props.typeDaChon};
  }

  onChoose = (item: IProductModel) => {
    this.props.onChange(item);
  };

  keyExtractor = (_item: {title: string; data: IProductModel[]}, index: number) => {
    return index.toString();
  };

  renderItem = ({item}: {item: {title: string; data: IProductModel[]}}) => {
    const {valueDefault} = this.props;
    let option_id_default = -1;
    let findItem;
    if (valueDefault) {
      for (let index = 0; index < valueDefault.length; index++) {
        const element1 = valueDefault[index];
        findItem = item.data.find((e) => e.parent_id === element1.id);
        if (findItem) {
          break;
        }
      }
    }
    if (findItem) {
      option_id_default = findItem.parent_id || -1;
    }

    return (
      <ItemOption
        key={item.title}
        title={item.title}
        onPress={this.onChoose}
        listProduct={item.data}
        tieuChiDaChonId={option_id_default}
      />
    );
  };

  convertData = (
    arrProduct: IProductModel[]
  ): {title: string; data: {type: string; product: IProductModel[]}[]}[] => {
    if (arrProduct.length > 0) {
      let arrTmp1: IProductModel[] = [];
      for (let i = 0; i < arrProduct.length; i++) {
        const parent = arrProduct[i];
        const skuTmp = parent.sku.split('_', 1)[0];

        if (parent.products) {
          for (let j = 0; j < parent.products.length; j++) {
            const child = parent.products[j];
            arrTmp1.push({...child, parent_name: parent.name, sku: skuTmp});
          }
        } else {
          continue;
        }
      }
      arrTmp1 = arrTmp1.sort(function (a, b) {
        const skuA = a.sku.toUpperCase();
        const skuB = b.sku.toUpperCase();
        if (skuA < skuB) {
          return -1;
        }
        if (skuA > skuB) {
          return 1;
        }
        return 0;
      });
      this.props.onDataInit(arrTmp1);
      const arrTmp2 = arrTmp1.reduce<IProductModel[][]>((r, v, i, a) => {
        if (a[i - 1] && v.sku === a[i - 1].sku) {
          r[r.length - 1].push(v);
        } else {
          r.push([v]);
        }
        return r;
      }, []);
      let arrTmp3: {title: string; data: IProductModel[]}[] = [];
      for (let k = 0; k < arrTmp2.length; k++) {
        const element = arrTmp2[k];
        arrTmp3.push({title: element[0].sku, data: element});
      }

      let arrTmp4: {title: string; data: {type: string; product: IProductModel[]}[]}[] = [];
      for (let h = 0; h < arrTmp3.length; h++) {
        const element1 = arrTmp3[h];
        let arrProTmp1 = element1.data;
        arrProTmp1 = arrProTmp1.sort(function (a, b) {
          const optionNameA = a.option_name.toUpperCase();
          const optionNameB = b.option_name.toUpperCase();
          if (optionNameA < optionNameB) {
            return -1;
          }
          if (optionNameA > optionNameB) {
            return 1;
          }
          return 0;
        });
        const arrProTmp2 = arrProTmp1.reduce<IProductModel[][]>((r, v, i, a) => {
          if (a[i - 1] && v.option_name === a[i - 1].option_name) {
            r[r.length - 1].push(v);
          } else {
            r.push([v]);
          }
          return r;
        }, []);

        let arrDataTmp = [];
        for (let p = 0; p < arrProTmp2.length; p++) {
          const element2 = arrProTmp2[p];
          if (element2) {
            element2.sort(function (a, b) {
              if (a.indexes && a.indexes.length > 0 && b.indexes && b.indexes.length > 0) {
                return a.indexes[0] - b.indexes[0];
              } else {
                return 1;
              }
            });
          }
          arrDataTmp.push({type: element2[0].option_name, product: element2});
        }
        arrTmp4.push({title: element1.title, data: arrDataTmp});
      }

      return arrTmp4;
    } else {
      return [];
    }
  };

  getDataByType = (
    data: {title: string; data: {type: string; product: IProductModel[]}[]}[],
    variations?: string[],
    typeDaChon?: string
  ): {title: string; data: IProductModel[]}[] => {
    let viTriMacDinh = 0;
    if (variations && typeDaChon) {
      viTriMacDinh = variations.indexOf(typeDaChon);
    }
    if (viTriMacDinh >= 0) {
      let arrTmp1 = [];
      for (let i = 0; i < data.length; i++) {
        const element = data[i];
        arrTmp1.push({title: element.title, data: element.data[viTriMacDinh].product});
      }
      return arrTmp1;
    } else {
      return [];
    }
  };

  setTypeData = (typeDaChon: string) => {
    this.setState({
      typeDaChon: typeDaChon
    });
  };

  componentDidMount() {
    getListProduct<IProductModel>({
      types: 'option',
      skip: 0,
      limit: 1000
    }).then((res) => {
      if (!res?.code) {
        let arrOptionParent = res?.data || [];
        if (arrOptionParent && arrOptionParent.length > 0) {
          this.setState({
            data: this.convertData(arrOptionParent)
          });
        }
      }
    });
  }

  render() {
    const {data, typeDaChon} = this.state;
    const {variations} = this.props;
    const dataTmp = this.getDataByType(data, variations, typeDaChon);
    return dataTmp.map((item) => this.renderItem({item}));
    // return (
    //   <FlatList
    //     scrollEnabled={false}
    //     data={dataTmp}
    //     extraData={dataTmp}
    //     keyExtractor={this.keyExtractor}
    //     showsVerticalScrollIndicator={false}
    //     showsHorizontalScrollIndicator={false}
    //     renderItem={this.renderItem}
    //   />
    // );
  }
}
