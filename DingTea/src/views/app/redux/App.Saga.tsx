import {all, fork} from 'redux-saga/effects';

import {watchGetListVoucher} from 'views/voucher/redux';
import {watchGetListUserAddress} from 'views/addressUser/redux';
import {watchSearchListProduct} from 'views/search/redux';
import {watchGetListProductHome} from 'views/home/redux';
import {watchGetListProduct} from 'views/menuDetail/redux';
import {watchGetListCate} from 'views/menu/redux';
import {watchGetDetailEditProduct} from 'views/productDetail/reduxEdit';
import {watchGetDetailProduct} from 'views/productDetail/redux';
import {watchUpdateAvatar, watchUpdateBirthday, watchUpdateName} from 'views/accounts/person/redux';
import {watchGetListTabFinishOrder} from 'views/order/components/tabFinish/redux';
import {watchGetListTabWaittingOrder} from 'views/order/components/tabWaitting/redux';
import {watchGetListTabCancelOrder} from 'views/order/components/tabCancel/redux';
import {watchGetListTabShippingOrder} from 'views/order/components/tabShipping/redux';

import {watchGetDetailOrder} from 'views/orderDetail/redux';
import {watchGetListAddress} from 'views/addressShop/redux';
import {watchGetListHistoryGift} from 'views/historyGift/redux';
import {watchGetGiftDetail} from 'views/giftDetail/redux';
import {watchGetListNotify} from 'views/notify/redux';
import {watchGetListProComment} from 'views/productComment/redux';
import {watchgetListBlog} from 'views/blog/redux';
import {watchGetListCartPay} from 'views/cartPayFrom/redux';
import {watchGetDetailBlog} from 'views/blogDetail/redux';
import {watchGetDetailVoucher} from 'views/voucherDetail/redux';
import {watchGetListCartShip} from 'views/cartPayShip/redux';
import {watchGetListProductDoUong} from 'views/doUong/redux';

export function* allSagas() {
  yield all([
    fork(watchGetListVoucher),
    fork(watchGetListUserAddress),
    fork(watchSearchListProduct),
    fork(watchGetListProductHome),
    fork(watchGetListProduct),
    fork(watchGetListCate),
    fork(watchGetDetailEditProduct),
    fork(watchGetDetailProduct),
    fork(watchUpdateAvatar),
    fork(watchUpdateBirthday),
    fork(watchUpdateName),
    fork(watchGetListTabFinishOrder),
    fork(watchGetListTabWaittingOrder),
    fork(watchGetListTabCancelOrder),
    fork(watchGetListTabShippingOrder),
    fork(watchGetDetailOrder),
    fork(watchGetListAddress),
    fork(watchGetListHistoryGift),
    fork(watchGetGiftDetail),
    fork(watchGetListNotify),
    fork(watchGetListProComment),
    fork(watchgetListBlog),
    fork(watchGetListCartPay),
    fork(watchGetDetailBlog),
    fork(watchGetDetailVoucher),
    fork(watchGetListCartShip),
    fork(watchGetListProductDoUong)
  ]);
}
