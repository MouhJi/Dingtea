import {IAppState} from 'views/app/redux';
import {IProductModel} from 'models';

export interface IProDetailEditState extends IAppState {
  data?: IProductModel;
  message?: string;
}
