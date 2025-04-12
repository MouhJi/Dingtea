import {IBlogModel} from 'models';
import {IAppState} from 'views/app/redux';

export interface IBlogState extends IAppState {
  listBlog?: IBlogModel[];
  message?: string;
  isLoadmore?: boolean;
  isStop?: boolean;
  isError?: boolean;
}
