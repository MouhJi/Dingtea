import {IAppState} from 'views/app/redux';
import {IOrderModel} from 'models';

export interface ITabFinishState extends IAppState {
  data?: IOrderModel[];
  message?: string;
  isLoadmore?: boolean;
  isStop?: boolean;
  isError?: boolean;
  skip?: number;
}
