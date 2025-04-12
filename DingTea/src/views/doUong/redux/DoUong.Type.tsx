import {ICartShipModel, ICategoryModel} from 'models';
import {IAppState} from 'views/app/redux';
import {IProductModel} from 'models';

export interface IDoUongState extends IAppState {
  shipping?: ICartShipModel;

  data?: {title: ICategoryModel; data: IProductModel[]}[];
  message?: string;
  isLoadmore?: boolean;
  isStop?: boolean;
  isError?: boolean;
}
