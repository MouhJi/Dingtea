import React, {PureComponent} from 'react';
import {FlatList} from 'react-native';

import {COLOR} from 'bases/styles/Core';

import {itemTextStyles} from '../../style/ProductDetail.Style';
import {MyButton, MyIcon, MyText, MyView} from 'bases/components';
import {IProductModel} from 'models';
import {getDetailProduct} from 'services';

interface IProps {
  title: string;
  /**
   * data: sản phẩm cha, lấy danh sách sản phẩm con nạp vào listProduct
   */
  data: IProductModel;
  tieuChiDaChonId?: number;
  /**
   * parent: sản phẩm cha, được truyền vào từ props
   * child: sản phẩm con mà bạn chọn
   */
  onChange: (parent: IProductModel, child: IProductModel) => void;
}

interface IStates {
  listProduct: IProductModel[];
  numberOfRefresh: number;
}

export default class ItemText extends PureComponent<IProps, IStates> {
  tieuChiDaChonId: number = this.props.tieuChiDaChonId || -1;
  
  constructor(props: IProps) {
    super(props);
    this.state = {numberOfRefresh: 0, listProduct: []};
  }

  onPressItem = (item: IProductModel) => {
    this.props.onChange(this.props.data, item);
    this.tieuChiDaChonId = item.id;
    this.setState({
      numberOfRefresh: this.state.numberOfRefresh + 1
    });
  };

  keyExtractor = (item: IProductModel) => {
    return item.id.toString();
  };

  renderItem = ({item}: {item: IProductModel}) => {
    const tieuChiId = item.id;
    let isChecked = false;
    isChecked = this.tieuChiDaChonId === tieuChiId;

    return (
      <MyButton style={itemTextStyles.viewItem} transparent onPress={() => this.onPressItem(item)}>
        <MyText fontStyle="Regular" numberOfLines={1}>
          {item.name}
        </MyText>
        <MyIcon
          iconFontType="MaterialCommunityIcons"
          name={isChecked ? 'checkbox-marked-circle' : 'checkbox-blank-circle-outline'}
          size={20}
          color={COLOR.TEXT.DA_CAM}
          style={itemTextStyles.viewCheck}
        />
      </MyButton>
    );
  };

  renderHeader = () => {
    const {listProduct} = this.state;
    if (listProduct.length === 0) {
      return null;
    }
    const {title} = this.props;
    return (
      <MyView style={itemTextStyles.viewTitleItem}>
        <MyText fontStyle="Bold">{title}</MyText>
      </MyView>
    );
  };

  componentDidMount() {
    const {data} = this.props;
    if (data) {
      getDetailProduct<IProductModel>(data.id).then((res) => {
        if (!res?.code) {
          this.setState({
            listProduct: res?.data?.products || [],
            numberOfRefresh: this.state.numberOfRefresh + 1
          });
        }
      });
    }
  }

  render() {
    const {listProduct} = this.state;
    if (listProduct) {
      listProduct.sort(function (a, b) {
        if (a.indexes && a.indexes.length > 0 && b.indexes && b.indexes.length > 0) {
          return a.indexes[0] - b.indexes[0];
        } else {
          return 1;
        }
      });
    }
    return (
      <FlatList
        scrollEnabled={false}
        data={listProduct}
        extraData={this.state.numberOfRefresh}
        keyExtractor={this.keyExtractor}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        renderItem={this.renderItem}
        ListHeaderComponent={this.renderHeader}
      />
    );
  }
}
