import {INotifyModel} from 'models';
import {IAppState} from 'views/app/redux';

export interface INotifyState extends IAppState {
  listNotify?: INotifyModel[];
  message?: string;
  isLoadmore?: boolean;
  isStop?: boolean;
  isError?: boolean;
}
