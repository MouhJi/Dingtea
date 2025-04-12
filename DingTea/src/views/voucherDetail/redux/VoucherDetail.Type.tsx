import {IAppState} from 'views/app/redux';
import {IVoucherModel} from 'models';

export interface IVoucherDetailState extends IAppState {
  voucherDetail?: IVoucherModel;
  message?: string;
}
