import {IAppState} from 'views/app/redux';
import {IProductModel} from 'models';

export interface ISearchState extends IAppState {
  data?: IProductModel[];
  message?: string;
  isLoadmore?: boolean;
  isStop?: boolean;
  isError?: boolean;
}
