import React, {PureComponent} from 'react';
import {FlatList} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {connect} from 'react-redux';
import MyI18n from 'utils/MyI18n';
import {RootState} from 'views/app/redux/App.Reducer';
import ItemProductCart from './components/ItemProductCart';

import {cartStyles} from './style/Cart.Style';

import MyNavigator from 'utils/MyNavigator';
import {MyView, MyButtonText, MyText} from 'bases/components';
import {IChooseCartState} from 'views/app/reduxChooseCart';
import {ICartModel} from 'models';

interface IProps extends IChooseCartState {}

class Cart extends PureComponent<IProps> {
  onPressCartPay = () => {
    const {listProductCart} = this.props;
    if (listProductCart && listProductCart.length > 0) {
      MyNavigator.navigate('CartPay');
    } else {
      MyNavigator.popToTop();
    }
  };

  keyExtractor = (item: ICartModel, index: number) => {
    return item.random_id?.toString() || index.toString();
  };

  renderItem = ({item}: {item: ICartModel}) => {
    return <ItemProductCart item={item} />;
  };

  renderItemSeparatorComponent = () => {
    return <MyView style={cartStyles.itemSeparator} transparent />;
  };

  renderListEmptyComponent = () => {
    return <MyText style={cartStyles.txtAgain}>{MyI18n.trans.data_empty}</MyText>;
  };

  render() {
    const {listProductCart} = this.props;
    let titleBtnOrder = '';
    if (listProductCart && listProductCart.length > 0) {
      titleBtnOrder = MyI18n.trans.order;
    } else {
      titleBtnOrder = MyI18n.trans.go_home;
    }

    return (
      <MyView style={cartStyles.container}>
        <FlatList
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          style={cartStyles.list}
          contentContainerStyle={cartStyles.contentList}
          data={listProductCart}
          extraData={listProductCart}
          initialNumToRender={12}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderItem}
          ItemSeparatorComponent={this.renderItemSeparatorComponent}
          ListEmptyComponent={this.renderListEmptyComponent}
        />
        <SafeAreaView edges={['bottom']} style={cartStyles.safeView}>
          <MyButtonText
            title={titleBtnOrder}
            style={cartStyles.bottomButton}
            titleProps={{fontStyle: 'SemiBold'}}
            onPress={this.onPressCartPay}
          />
        </SafeAreaView>
      </MyView>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  const {iso} = state.SettingReducer;
  const {listProductCart} = state.ChooseCartReducer;
  return {iso, listProductCart};
};

export default connect(mapStateToProps, null)(Cart);
