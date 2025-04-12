import {IAppState} from 'views/app/redux';
import {IAddressUserModal} from 'models';

export interface IAddressUserState extends IAppState {
  data?: IAddressUserModal[];
  message?: string;
  isLoadmore?: boolean;
  isStop?: boolean;
  isError?: boolean;
  keyword?: string;
}
