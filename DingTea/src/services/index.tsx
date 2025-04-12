export interface IResponse<T> {
  code?: number;
  data?: T;
  count?: number;
  message?: string;
}

export interface IRequest {
  skip: number;
  limit: number;
}

export * from './Comment.Api';
export * from './Voucher.Api';
export * from './Address.Api';
export * from './Banner.Api';
export * from './Account.Api';
export * from './User.Api';
export * from './Product.Api';
export * from './Category.Api';
export * from './Order.Api';
export * from './AddressShop.Api';
export * from './Gift.Api';
export * from './Notify.Api';
export * from './ProComment.Api';
export * from './Blog.Api';
export * from './CartPay.Api';
export * from './CartShip.Api';
