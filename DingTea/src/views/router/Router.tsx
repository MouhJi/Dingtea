import React, {PureComponent} from 'react';

import {connect} from 'react-redux';
import MyI18n from 'utils/MyI18n';
import {RootState} from 'views/app/redux/App.Reducer';

import {NavigationContainer} from '@react-navigation/native';
import {CardStyleInterpolators, createStackNavigator} from '@react-navigation/stack';

import MyNavigator from 'utils/MyNavigator';
import Utilities from 'utils/Utilities';

import {MyToolbar} from 'bases/components';

const RootStack = createStackNavigator();

import Splash from 'views/splash/Splash';
import Error from 'views/error/Error';
import RouterBottomTab from './RouterBottomTab';

import Search from 'views/search/Search';
import PreviewWeb from 'views/previewWeb/PreviewWeb';
import Menu from 'views/menu/Menu';
import MenuDetail from 'views/menuDetail/MenuDetail';

import ProductDetail from 'views/productDetail/ProductDetail';
import ProductDetailEdit from 'views/productDetail/ProductDetailEdit';

import PreviewImage from 'views/previewImage/PreviewImage';

import ProductComment from 'views/productComment/ProductComment';
import OrderDetail from 'views/orderDetail/OrderDetail';

import Cart from 'views/cart/Cart';
import CartPay from 'views/cartPay/CartPay';
import CartPayFrom from 'views/cartPayFrom/CartPayFrom';
import CartPaySuccess from 'views/cartPaySuccess/CartPaySuccess';
import AddressShop from 'views/addressShop/AddressShop';
import AddressUser from 'views/addressUser/AddressUser';
import AddressUserAdd from 'views/addressUserAdd/AddressUserAdd';

import Blog from 'views/blog/Blog';
import Voucher from 'views/voucher/Voucher';
import CmtShop from 'views/cmtShop/CmtShop';

import Notification from 'views/notify/Notification';
import HistoryGift from 'views/historyGift/HistoryGift';
import GiftDetail from 'views/giftDetail/GiftDetail';
import Gift from 'views/gift/Gift';

import BlogDetail from 'views/blogDetail/BlogDetail';
import VoucherDetail from 'views/voucherDetail/VoucherDetail';
import Login from 'views/accounts/login/Login';
import CartPayShip from 'views/cartPayShip/CartPayShip';
import Payment from 'views/payment/Payment';
import PaymentBank from 'views/paymentBank/PaymentBank';
import InforPerson from 'views/accounts/person/InforPerson';

import {ISettingState} from 'views/setting/redux';
import Order from 'views/order/Order';
import HomeHeader2 from 'views/home/components/header/HomeHeader';
import StoreDetails from 'views/store/components/StoreDetails';

interface defaultProps extends ISettingState {}

let navigator: any;
let routeNameRef: any;

class Router extends PureComponent<defaultProps> {
  render() {
    return (
      <NavigationContainer
        ref={nav => {
          if (nav) {
            navigator = nav;
            MyNavigator.setNavigator(nav);
          }
        }}
        onReady={() => {
          routeNameRef = navigator.getCurrentRoute().name;
        }}
        onStateChange={() => {
          const previousRouteName = routeNameRef;
          const currentRouteName = navigator.getCurrentRoute().name;

          if (previousRouteName !== currentRouteName) {
            Utilities.logAnalytics(`Screen_Of_${currentRouteName}`);
          }

          routeNameRef = currentRouteName;
          console.log(routeNameRef);
        }}>
        <RootStack.Navigator 
          screenOptions={{headerMode: "screen"}}
          initialRouteName="Splash">
          <RootStack.Screen name="Splash" component={Splash} options={{headerShown: false}} />
          <RootStack.Screen name="Error" component={Error} options={{headerShown: false}} />
          <RootStack.Screen
            name="HomeRouter"
            component={RouterBottomTab}
            options={{headerShown: true, header: () => <HomeHeader2 />}}
          />
          <RootStack.Screen name="Login" component={Login} options={{headerShown: false}} />
          <RootStack.Screen
            name="PreviewWeb"
            component={PreviewWeb}
            options={{
              header: () => {
                return <MyToolbar title={'Ding Tea'} isShowBtnLeft />;
              }
            }}
          />
          <RootStack.Screen name="Search" component={Search} options={{headerShown: false}} />
          <RootStack.Screen
            name="Menu"
            component={Menu}
            options={{
              header: () => {
                return <MyToolbar title={MyI18n.trans.menu} isShowBtnLeft />;
              }
            }}
          />
          <RootStack.Screen
            name="MenuDetail"
            component={MenuDetail}
            options={{
              header: props => {
                return (
                  <MyToolbar title={props.options.title || ''} isShowBtnLeft />
                );
              }
            }}
          />
          <RootStack.Screen
            name="ProductDetail"
            component={ProductDetail}
            options={{
              header: props => {
                return (
                  <MyToolbar title={props.options.title || ''} isShowBtnLeft />
                );
              }
            }}
          />
          <RootStack.Screen
            name="ProductDetailEdit"
            component={ProductDetailEdit}
            options={{
              header: props => {
                return (
                  <MyToolbar title={props.options.title || ''} isShowBtnLeft />
                );
              }
            }}
          />
          <RootStack.Screen
            name="PreviewImage"
            component={PreviewImage}
            options={{
              headerShown: false,
              cardStyleInterpolator: CardStyleInterpolators.forScaleFromCenterAndroid,
              cardStyle: {backgroundColor: 'transparent'}
            }}
          />
          <RootStack.Screen
            name="ProductComment"
            component={ProductComment}
            options={{headerShown: false}}
          />
          <RootStack.Screen
            name="Cart"
            component={Cart}
            options={{
              header: () => {
                return <MyToolbar title={MyI18n.trans.cart} isShowBtnLeft />;
              }
            }}
          />
          <RootStack.Screen
            name="CartPay"
            component={CartPay}
            options={{
              header: () => {
                return <MyToolbar title={MyI18n.trans.cart_detail} isShowBtnLeft />;
              }
            }}
          />
          <RootStack.Screen
            name="CartPayFrom"
            component={CartPayFrom}
            options={{
              header: () => {
                return <MyToolbar title={MyI18n.trans.forms_of_payment} isShowBtnLeft />;
              }
            }}
          />
          <RootStack.Screen
            name="CartPaySuccess"
            component={CartPaySuccess}
            options={{
              gestureEnabled: false,
              header: () => {
                return <MyToolbar title={MyI18n.trans.success} isShowIconTitle />;
              }
            }}
          />
          <RootStack.Screen
            name="AddressShop"
            component={AddressShop}
            options={{
              header: () => {
                return <MyToolbar title={MyI18n.trans.choose_a_store} isShowBtnLeft />;
              }
            }}
          />
          <RootStack.Screen
            name="AddressUser"
            component={AddressUser}
            options={{
              header: () => {
                return <MyToolbar title={MyI18n.trans.choose_your_address} isShowBtnLeft />;
              }
            }}
          />
          <RootStack.Screen
            name="AddressUserAdd"
            component={AddressUserAdd}
            options={{
              header: props => {
                const {params} = props.route;
                return (
                  <MyToolbar
                    title={params ? MyI18n.trans.edit_address : MyI18n.trans.add_a_new_address}
                    isShowBtnLeft
                  />
                );
              }
            }}
          />
          <RootStack.Screen
            name="OrderDetail"
            component={OrderDetail}
            options={{
              header: props => {
                return (
                  <MyToolbar title={props.options.title || ''} isShowBtnLeft />
                );
              }
            }}
          />
          <RootStack.Screen
            name="Blog"
            component={Blog}
            options={{
              header: () => {
                return <MyToolbar title={MyI18n.trans.promotion_news} isShowBtnLeft />;
              }
            }}
          />
          <RootStack.Screen
            name="BlogDetail"
            component={BlogDetail}
            options={{
              header: () => {
                return <MyToolbar title={MyI18n.trans.promotion_news} isShowBtnLeft />;
              }
            }}
          />
          <RootStack.Screen
            name="Voucher"
            component={Voucher}
            options={{
              header: () => {
                return <MyToolbar title={MyI18n.trans.voucher} isShowBtnLeft />;
              }
            }}
          />
          <RootStack.Screen
            name="VoucherDetail"
            component={VoucherDetail}
            options={{
              header: () => {
                return <MyToolbar title={MyI18n.trans.detail} isShowBtnLeft />;
              }
            }}
          />
          <RootStack.Screen
            name="CmtShop"
            component={CmtShop}
            options={{
              header: () => {
                return <MyToolbar title={MyI18n.trans.evaluate} isShowBtnLeft />;
              }
            }}
          />
          <RootStack.Screen
            name="GiftDetail"
            component={GiftDetail}
            options={{
              header: () => {
                return <MyToolbar title={MyI18n.trans.detail} isShowBtnLeft />;
              }
            }}
          />
          <RootStack.Screen
            name="Gift"
            component={Gift}
            options={{
              header: () => {
                return <MyToolbar title={MyI18n.trans.detail} isShowBtnLeft />;
              }
            }}
          />

          <RootStack.Screen
            name="Notify"
            component={Notification}
            options={{
              header: () => {
                return <MyToolbar title={MyI18n.trans.notify} isShowBtnLeft />;
              }
            }}
          />
          <RootStack.Screen
            name="HistoryGift"
            component={HistoryGift}
            options={{
              header: () => {
                return <MyToolbar title={MyI18n.trans.redemption_history} isShowBtnLeft />;
              }
            }}
          />
          <RootStack.Screen
            name="CartPayShip"
            component={CartPayShip}
            options={{
              header: () => {
                return <MyToolbar title={MyI18n.trans.form_of_transportation} isShowBtnLeft />;
              }
            }}
          />
          <RootStack.Screen
            name="Payment"
            component={Payment}
            options={{
              header: () => {
                return <MyToolbar title={MyI18n.trans.payment} isShowBtnLeft />;
              }
            }}
          />
          <RootStack.Screen
            name="PaymentBank"
            component={PaymentBank}
            options={{
              header: () => {
                return <MyToolbar title={MyI18n.trans.transfer_information} isShowBtnLeft />;
              }
            }}
          />
          <RootStack.Screen
            name="InforPerson"
            component={InforPerson}
            options={{
              header: () => {
                return <MyToolbar title={MyI18n.trans.personal_information} isShowBtnLeft />;
              }
            }}
          />
          <RootStack.Screen
            name="Order"
            component={Order}
            options={{
              header: () => {
                return <MyToolbar title={MyI18n.trans.order_history} isShowBtnLeft />;
              }
            }}
          />
          <RootStack.Screen
            name="StoreDetails"
            component={StoreDetails}
            options={{
              header: () => {
                return <MyToolbar title={MyI18n.trans.details_store} isShowBtnLeft />;
              }
            }}
          />
        </RootStack.Navigator>
      </NavigationContainer>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  const {iso} = state.SettingReducer;
  return {iso};
};

export default connect(mapStateToProps, null)(Router);
