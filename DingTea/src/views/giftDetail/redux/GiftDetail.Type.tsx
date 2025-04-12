import {IAppState} from 'views/app/redux';
import {IGiftModel} from 'models';

export interface IGiftDetailState extends IAppState {
  data?: IGiftModel;
  message?: string;
}
