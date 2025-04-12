import {combineReducers} from 'redux';

import VoucherReducer from 'views/voucher/redux';
import ChooseVoucherReducer from 'views/app/reduxChooseVoucher';
import ChooseCartReducer from 'views/app/reduxChooseCart';
import ChooseAddressUserReducer from 'views/app/reduxChooseAddressUser/ChooseAddressUser.Reducer';
import ChooseAddressShopReducer from 'views/app/reduxChooseAddressShop/ChooseAddressShop.Reducer';
import AddressUserReducer from 'views/addressUser/redux';
import SearchReducer from 'views/search/redux';
import HomeReducer from 'views/home/redux';
import MenuDetailReducer from 'views/menuDetail/redux';
import MenuReducer from 'views/menu/redux';
import ProDetailEditReducer from 'views/productDetail/reduxEdit';
import ProDetailReducer from 'views/productDetail/redux';
import PersonReducer from 'views/accounts/person/redux';
import SettingReducer from 'views/setting/redux';
import OrderFinishReducer from 'views/order/components/tabFinish/redux';
import OrderWaittingReducer from 'views/order/components/tabWaitting/redux';
import OrderCancelReducer from 'views/order/components/tabCancel/redux';
import OrderShippingReducer from 'views/order/components/tabShipping/redux';

import OrderDetailReducer from 'views/orderDetail/redux';
import AddressShopReducer from 'views/addressShop/redux';
import HistoryGiftReducer from 'views/historyGift/redux';
import GiftDetailReducer from 'views/giftDetail/redux';
import NotifyReducer from 'views/notify/redux';
import ProCommentReducer from 'views/productComment/redux';
import BlogReducer from 'views/blog/redux';
import CartPayFromReducer from 'views/cartPayFrom/redux';
import BlogDetailReducer from 'views/blogDetail/redux';
import VoucherDetailReducer from 'views/voucherDetail/redux';
import CartPayShipReducer from 'views/cartPayShip/redux';
import DoUongReducer from 'views/doUong/redux';

const allReducers = combineReducers({
  VoucherReducer,
  ChooseVoucherReducer,
  ChooseCartReducer,
  ChooseAddressUserReducer,
  ChooseAddressShopReducer,
  AddressUserReducer,
  SearchReducer,
  HomeReducer,
  MenuDetailReducer,
  MenuReducer,
  ProDetailEditReducer,
  ProDetailReducer,
  PersonReducer,
  SettingReducer,
  OrderFinishReducer,
  OrderWaittingReducer,
  OrderCancelReducer,
  OrderShippingReducer,
  OrderDetailReducer,
  AddressShopReducer,
  HistoryGiftReducer,
  GiftDetailReducer,
  NotifyReducer,
  ProCommentReducer,
  BlogReducer,
  CartPayFromReducer,
  BlogDetailReducer,
  VoucherDetailReducer,
  CartPayShipReducer,
  DoUongReducer
});

export type RootState = ReturnType<typeof allReducers>;

export {allReducers};
