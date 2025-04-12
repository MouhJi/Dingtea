import React, {PureComponent} from 'react';
import {FlatList} from 'react-native';
import {connect} from 'react-redux';
import MyI18n from 'utils/MyI18n';
import {RootState} from 'views/app/redux';
import {MyText, MyTextPriceMask, MyView} from 'bases/components';
import {IOrderModel} from 'models';
import {payStyles} from './style/Payment.Style';
import {IBankModel} from 'models/IBankModel';
import MyNavigator from 'utils/MyNavigator';
import ItemBank from './components/ItemBank';

interface IProps {
  route: any;
}

class Payment extends PureComponent<IProps> {
  orderSucess: IOrderModel;
  data: IBankModel[] = require('../../assets/jsons/bank.json');
  constructor(props: IProps) {
    super(props);
    this.orderSucess = this.props.route.params.orderDetail;
  }
  pressItem = (item: IBankModel) => {
    MyNavigator.navigate('PaymentBank', {orderDetail: this.orderSucess, bank: item});
  };

  keyExtractor = (item: IBankModel) => {
    return item.id.toString();
  };

  renderItem = ({item}: {item: IBankModel}) => {
    return <ItemBank item={item} onPress={() => this.pressItem(item)} />;
  };

  renderItemSeparatorComponent = () => {
    return <MyView style={payStyles.itemSeparator} transparent />;
  };

  renderListHeaderComponent = () => {
    return (
      <MyView transparent>
        <MyView transparent style={payStyles.viewRowHeader}>
          <MyText style={payStyles.textTitle} fontStyle="SemiBold">
            {MyI18n.trans.payment_value}
            {': '}
          </MyText>
          <MyTextPriceMask
            text={this.orderSucess.total_price || 0}
            fontStyle="Bold"
            style={payStyles.textPrice}
          />
        </MyView>
        <MyView transparent style={payStyles.viewRowHeader}>
          <MyText style={payStyles.textTitle} fontStyle="SemiBold">
            {MyI18n.trans.code_order}
            {': '}
          </MyText>
          <MyText>{this.orderSucess.code}</MyText>
        </MyView>
        <MyText style={payStyles.titleChooseBank} fontStyle="Bold">
          {MyI18n.trans.choose_bank}
        </MyText>
      </MyView>
    );
  };

  render() {
    return (
      <MyView style={payStyles.container}>
        <FlatList
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          style={payStyles.list}
          contentContainerStyle={payStyles.contentList}
          data={this.data}
          extraData={this.data}
          initialNumToRender={12}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderItem}
          ItemSeparatorComponent={this.renderItemSeparatorComponent}
          ListHeaderComponent={this.renderListHeaderComponent}
        />
      </MyView>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  const {iso, theme} = state.SettingReducer;
  return {iso, theme};
};

export default connect(mapStateToProps, null)(Payment);
