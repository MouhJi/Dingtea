import {IAppState} from 'views/app/redux';
import {IProductModel} from 'models';

export interface IProDetailState extends IAppState {
  data?: IProductModel;
  message?: string;
}
