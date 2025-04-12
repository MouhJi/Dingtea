import {IAddressShopModel} from 'models';
import {IAppState} from 'views/app/redux';

export interface IAddressShopState extends IAppState {
  listAddressShop?: IAddressShopModel[];
  message?: string;
  isLoadmore?: boolean;
  isStop?: boolean;
  isError?: boolean;
}
