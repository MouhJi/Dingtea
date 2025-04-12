import {IAppState} from 'views/app/redux';
import {IOrderModel} from 'models';

export interface IOrderDetailState extends IAppState {
  orderDetail?: IOrderModel;
  message?: string;
}
