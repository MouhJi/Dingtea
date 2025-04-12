import {PAYMENT_METHOD_LIST, RESEND_CODE} from 'common/Constants';
import {CART_PAY_FORM, RESEND_CODE_DEVICE, RESEND_CODE_UPDATE_DEVICE} from 'common/KeyStorages';
import MyStorage from 'utils/MyStorage';

import {
  IAddressShopModel,
  IAddressUserModal,
  ICartModel,
  ICartPayModel,
  ITokenModel,
  IUserModel,
  IVoucherModel
} from 'models';

let userToken: ITokenModel = {
  access_token: '',
  refresh_token: '',
  access_expired_at: -1,
  refresh_expired_at: -1
};
let user: IUserModel | undefined;
let addressShop: IAddressShopModel | undefined;
let addressUser: IAddressUserModal | undefined;
let listProductCart: ICartModel[] | undefined = [];
let listVoucher: IVoucherModel[] | undefined = [];

let arrTimeCheck: number[] = [];
let arrTimeCheckUpdate: number[] = [];

let dataCartPayForm: ICartPayModel[] = PAYMENT_METHOD_LIST;
let cartPayForm: ICartPayModel | undefined = dataCartPayForm.find(x => x.id === 9);
let coordinate: {latitude: number; longitude: number} = {
  latitude: 0.0,
  longitude: 0.0
};

export default class MyStaticLocal {
  static version_of_codepush: string = '1';

  static getUserToken(): ITokenModel {
    return userToken;
  }

  static setUserToken(token?: ITokenModel) {
    userToken = token || {
      access_token: '',
      refresh_token: '',
      access_expired_at: -1,
      refresh_expired_at: -1
    };
  }

  static getUser(): IUserModel | undefined {
    return user;
  }

  static setUser(userNew?: IUserModel) {
    user = userNew;
  }

  static getAddressUser(): IAddressUserModal | undefined {
    return addressUser;
  }

  static setAddressUser(newAddressUser?: IAddressUserModal) {
    addressUser = newAddressUser;
  }

  static getAddressShop(): IAddressShopModel | undefined {
    return addressShop;
  }

  static setAddressShop(newAddressShop?: IAddressShopModel) {
    addressShop = newAddressShop;
  }

  static getListProductCart(): ICartModel[] | undefined {
    return listProductCart;
  }

  static setListProductCart(newListProductCart?: ICartModel[]) {
    listProductCart = newListProductCart;
  }

  static addListProductCart(newListProductCart: ICartModel) {
    listProductCart?.push(newListProductCart);
  }

  static removeItemListProductCart(productCart: ICartModel) {
    if (listProductCart) {
      let foundIndex = listProductCart.findIndex(x => x.random_id === productCart.random_id);
      if (foundIndex > -1) {
        listProductCart.splice(foundIndex, 1);
      }
    }
  }

  static changeItemListProductCart(newProductCart: ICartModel) {
    if (listProductCart) {
      let foundIndex = listProductCart.findIndex(
        (x: any) => x.random_id === newProductCart.random_id
      );
      if (foundIndex > -1) {
        listProductCart[foundIndex] = {
          ...newProductCart,
          random_id: Date.now()
        };
      }
    }
  }

  static getSumPriceCart(): number {
    let priceTotal = 0;
    if (listProductCart && listProductCart.length > 0) {
      for (let i = 0; i < listProductCart.length; i++) {
        let data = listProductCart[i];
        let product_options: ICartModel[] = data.product_options || [];
        let price_options_item = 0;
        for (let j = 0; j < product_options.length; j++) {
          const element = product_options[j];
          let priceOne = element.price || 0;
          let qty = element.total_quantity || 0;
          price_options_item = price_options_item + priceOne * qty;
        }
        let priceOneItem = data.price || 0;
        let qtyItem = data.total_quantity || 0;
        priceTotal = priceTotal + (priceOneItem + price_options_item) * qtyItem;
      }
    }
    return priceTotal;
  }

  static getListVoucher(): IVoucherModel[] | undefined {
    return listVoucher;
  }

  static setListVoucher(newListVoucher?: IVoucherModel[]) {
    listVoucher = newListVoucher;
  }

  static addListVoucher(newVoucher: IVoucherModel) {
    if (listVoucher) {
      let foundIndex = listVoucher.findIndex(x => x.id === newVoucher.id);
      if (foundIndex <= -1) {
        listVoucher.push(newVoucher);
      }
    }
  }

  static removeItemListVoucher(voucher: IVoucherModel) {
    if (listVoucher) {
      let foundIndex = listVoucher.findIndex(x => x.id === voucher.id);
      if (foundIndex > -1) {
        listVoucher.splice(foundIndex, 1);
      }
    }
  }

  static changeItemListVoucher(newVoucher: IVoucherModel) {
    if (listVoucher) {
      let foundIndex = listVoucher.findIndex(x => x.id === newVoucher.id);
      if (foundIndex > -1) {
        listVoucher[foundIndex] = newVoucher;
      }
    }
  }

  static getSumPriceDiscount(): number {
    // Tính tổng số tiền có trong giỏ hàng
    let priceTotal = 0;
    if (listProductCart && listProductCart.length > 0) {
      for (let i = 0; i < listProductCart.length; i++) {
        let data = listProductCart[i];
        let product_options: ICartModel[] = data.product_options || [];
        let price_options_item = 0;
        for (let j = 0; j < product_options.length; j++) {
          const element = product_options[j];
          let priceOne = element.price || 0;
          let qty = element.total_quantity || 0;
          price_options_item = price_options_item + priceOne * qty;
        }
        let priceOneItem = data.price || 0;
        let qtyItem = data.total_quantity || 0;
        priceTotal = priceTotal + (priceOneItem + price_options_item) * qtyItem;
      }
    }

    // Tính tổng số tiền được giảm trong giỏ hàng
    let soTienBanDau = priceTotal;
    let tongSoTienDuocGiam = 0;
    if (listVoucher) {
      for (let i = 0; i < listVoucher.length; i++) {
        const item = listVoucher[i];
        let soTienDuocGiam = 0;
        let giaTriGiam1 = item.discount_value || 0;
        if (item.discount_type === 1) {
          soTienDuocGiam = (soTienBanDau * giaTriGiam1) / 100;
          if (item.max_discount_value && soTienDuocGiam > item.max_discount_value) {
            soTienDuocGiam = item.max_discount_value;
          }
        }
        let giaTriGiam2 = item.discount_value || 0;
        if (item.discount_type === 2) {
          soTienDuocGiam = soTienDuocGiam + giaTriGiam2;
        }
        tongSoTienDuocGiam = tongSoTienDuocGiam + soTienDuocGiam;

        // Số tiền giảm giá cộng dồn vào số tiền ban đầu
        if (soTienBanDau > tongSoTienDuocGiam) {
          soTienBanDau = soTienBanDau - tongSoTienDuocGiam;
        } else {
          soTienBanDau = 0;
        }
      }
    }
    return tongSoTienDuocGiam;
  }

  static getSumPriceDiscountBefore(voucher: IVoucherModel): number {
    // Tính tổng số tiền có trong giỏ hàng
    let priceTotal = 0;
    if (listProductCart && listProductCart.length > 0) {
      for (let i = 0; i < listProductCart.length; i++) {
        let data = listProductCart[i];
        let product_options: ICartModel[] = data.product_options || [];
        let price_options_item = 0;
        for (let j = 0; j < product_options.length; j++) {
          const element = product_options[j];
          let priceOne = element.price || 0;
          let qty = element.total_quantity || 0;
          price_options_item = price_options_item + priceOne * qty;
        }
        let priceOneItem = data.price || 0;
        let qtyItem = data.total_quantity || 0;
        priceTotal = priceTotal + (priceOneItem + price_options_item) * qtyItem;
      }
    }

    // Tính tổng số tiền được giảm trong giỏ hàng
    let soTienBanDau = priceTotal;
    let tongSoTienDuocGiam = 0;
    if (listVoucher) {
      for (let i = 0; i < listVoucher.length; i++) {
        const item = listVoucher[i];

        // Gặp voucher được truyền vào thì không tính nữa
        if (item.id === voucher.id) {
          break;
        }
        let soTienDuocGiam = 0;
        let giaTriGiam1 = item.discount_value || 0;
        if (item.discount_type === 1) {
          soTienDuocGiam = (soTienBanDau * giaTriGiam1) / 100;
          if (item.max_discount_value && soTienDuocGiam > item.max_discount_value) {
            soTienDuocGiam = item.max_discount_value;
          }
        }
        let giaTriGiam2 = item.discount_value || 0;
        if (item.discount_type === 2) {
          soTienDuocGiam = soTienDuocGiam + giaTriGiam2;
        }
        tongSoTienDuocGiam = tongSoTienDuocGiam + soTienDuocGiam;

        // Số tiền giảm giá cộng dồn vào số tiền ban đầu
        if (soTienBanDau > tongSoTienDuocGiam) {
          soTienBanDau = soTienBanDau - tongSoTienDuocGiam;
        } else {
          soTienBanDau = 0;
        }
      }
    }
    return tongSoTienDuocGiam;
  }

  static getArrTimeCheck(): number[] {
    return arrTimeCheck;
  }

  static getLastArrTimeCheck(): number {
    return arrTimeCheck[arrTimeCheck.length - 1];
  }

  static setArrTimeCheck(newArr: number[]) {
    arrTimeCheck = newArr;
  }
  static getArrTimeCheckUpdate(): number[] {
    return arrTimeCheckUpdate;
  }

  static getLastArrTimeCheckUpdate(): number {
    return arrTimeCheckUpdate[arrTimeCheckUpdate.length - 1];
  }

  static setArrTimeCheckUpdate(newArr: number[]) {
    arrTimeCheckUpdate = newArr;
  }

  static checkTimeArrTimeCheck(time: number): boolean {
    const lengthArr = arrTimeCheck.length;
    if (lengthArr < RESEND_CODE.SO_LAN_GUI_MAX) {
      arrTimeCheck.push(time);
      MyStorage.create(RESEND_CODE_DEVICE, arrTimeCheck);
      return true;
    } else {
      const lanGanNhat = arrTimeCheck[lengthArr - 1];
      if (time - lanGanNhat > RESEND_CODE.THOI_GIAN_MIN) {
        arrTimeCheck = [];
        arrTimeCheck.push(time);
        MyStorage.create(RESEND_CODE_DEVICE, arrTimeCheck);
        return true;
      } else {
        return false;
      }
    }
  }
  static checkTimeArrTimeCheckUpdate(time: number): boolean {
    const lengthArr = arrTimeCheckUpdate.length;
    if (lengthArr < RESEND_CODE.SO_LAN_GUI_MAX) {
      arrTimeCheckUpdate.push(time);
      MyStorage.create(RESEND_CODE_UPDATE_DEVICE, arrTimeCheckUpdate);
      return true;
    } else {
      const lanGanNhat = arrTimeCheckUpdate[lengthArr - 1];
      if (time - lanGanNhat > RESEND_CODE.THOI_GIAN_MIN) {
        arrTimeCheckUpdate = [];
        arrTimeCheckUpdate.push(time);
        MyStorage.create(RESEND_CODE_UPDATE_DEVICE, arrTimeCheckUpdate);
        return true;
      } else {
        return false;
      }
    }
  }

  static getCartPayForm(): ICartPayModel | undefined {
    return cartPayForm;
  }

  static setCartPayForm(newCartPayForm: ICartPayModel | undefined) {
    MyStorage.create(CART_PAY_FORM, newCartPayForm);
    cartPayForm = newCartPayForm;
  }

  static setCoordinate(lat: number, long: number) {
    coordinate = {
      latitude: lat,
      longitude: long
    };
  }
  static getCoordinate(): typeof coordinate {
    return coordinate;
  }
}
