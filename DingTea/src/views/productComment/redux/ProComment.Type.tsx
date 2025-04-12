import {IProCommentModel} from 'models';
import {IAppState} from 'views/app/redux';

export interface IProCommentState extends IAppState {
  listProComment?: IProCommentModel[];
  message?: string;
  isLoadmore?: boolean;
  isStop?: boolean;
  isError?: boolean;
}
