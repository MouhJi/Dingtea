import React, {PureComponent} from 'react';

import {itemTextStyles} from '../../style/ProductDetail.Style';
import {MyButton, MyIcon, MyText, MyView} from 'bases/components';
import {IProductModel} from 'models';
import MyTheme from 'utils/MyTheme';
import MyI18n from 'utils/MyI18n';

interface IProps {
  title: string;
  /**
   * listProduct: lấy danh sách sản phẩm con đã thêm trường parent_name
   */
  listProduct: IProductModel[];
  tieuChiDaChonId?: number;
  /**
   * child: sản phẩm con mà bạn chọn
   */
  onPress: (child: IProductModel) => void;
}

interface IStates {
  tieuChiDaChonId: number;
}

export default class ItemOption extends PureComponent<IProps, IStates> {
  constructor(props: IProps) {
    super(props);
    this.state = {tieuChiDaChonId: this.props.tieuChiDaChonId || -1};
  }

  onPressItem = (item: IProductModel) => {
    this.props.onPress(item);
    this.setState({
      tieuChiDaChonId: item.parent_id || -1
    });
  };

  keyExtractor = (item: IProductModel) => {
    return item.id.toString();
  };

  renderItem = ({item}: {item: IProductModel}) => {
    const tieuChiId = item.parent_id;
    let isChecked = false;
    isChecked = this.state.tieuChiDaChonId === tieuChiId;

    return (
      <MyButton
        key={item.id}
        style={itemTextStyles.viewItem}
        transparent
        onPress={() => this.onPressItem(item)}>
        <MyText fontStyle="Regular" numberOfLines={1}>
          {item.parent_name}
        </MyText>
        <MyIcon
          iconFontType="MaterialCommunityIcons"
          name={isChecked ? 'checkbox-marked-circle' : 'checkbox-blank-circle-outline'}
          size={20}
          color={MyTheme.themes.BG.PRIMARY_DARK}
          style={itemTextStyles.viewCheck}
        />
      </MyButton>
    );
  };

  renderHeader = () => {
    const {title} = this.props;
    let titleTmp = title;
    if (title.startsWith('ice')) {
      titleTmp = MyI18n.trans.choose_ice;
    }
    if (title.startsWith('sugar')) {
      titleTmp = MyI18n.trans.choose_sugar;
    }
    return (
      <MyView style={itemTextStyles.viewTitleItem}>
        <MyText fontStyle="Bold">{titleTmp}</MyText>
      </MyView>
    );
  };

  render() {
    const {listProduct} = this.props;
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
      <MyView transparent>
        {this.renderHeader()}
        {listProduct.map(item => this.renderItem({item}))}
      </MyView>
    );
  }
}
