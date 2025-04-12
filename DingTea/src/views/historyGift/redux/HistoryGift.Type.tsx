import {IAppState} from 'views/app/redux';
import {IGiftModel} from 'models';

export interface IHistoryGiftState extends IAppState {
  historyGift?: IGiftModel[];
  message?: string;
  isLoadmore?: boolean;
  isStop?: boolean;
  isError?: boolean;
}
