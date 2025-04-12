import {ICartShipModel} from 'models/ICartShipModel';
import {IAppState} from 'views/app/redux';

export interface ICartShipState extends IAppState {
  listCartShip?: ICartShipModel[];
  message?: string;
  isLoadmore?: boolean;
  isStop?: boolean;
  isError?: boolean;
  cartShipChoose?: ICartShipModel;
}
