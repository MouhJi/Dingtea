import {IBlogModel} from 'models';
import {IAppState} from 'views/app/redux';

export interface IBlogDetailState extends IAppState {
  blogDetail?: IBlogModel;
  message?: string;
}
