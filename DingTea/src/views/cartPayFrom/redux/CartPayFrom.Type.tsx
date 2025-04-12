import {ICartPayModel} from 'models/ICartPayModel';
import {IAppState} from 'views/app/redux';

export interface ICartPayState extends IAppState {
  listCartPay?: ICartPayModel[];
  message?: string;
  isLoadmore?: boolean;
  isStop?: boolean;
  isError?: boolean;
  cartPayMemmentChoose?: ICartPayModel;
}
