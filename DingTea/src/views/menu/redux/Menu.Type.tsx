import {IAppState} from 'views/app/redux';
import {ICategoryModel} from 'models';

export interface IMenuState extends IAppState {
  data?: ICategoryModel[];
  message?: string;
  isLoadmore?: boolean;
  isStop?: boolean;
  isError?: boolean;
}
