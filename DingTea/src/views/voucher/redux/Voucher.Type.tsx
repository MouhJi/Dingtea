import {IAppState} from 'views/app/redux';
import {IVoucherModel} from 'models';

export interface IVoucherState extends IAppState {
  data?: IVoucherModel[];
  message?: string;
  isLoadmore?: boolean;
  isStop?: boolean;
  isError?: boolean;
}
