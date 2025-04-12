import ClientAPI from './HTTPClient';
import {IRequest, IResponse} from '.';

const CARTSHIP_URL = '';

export interface ICartShipRequest extends IRequest {}

async function getCartShip<T>() {
  const result = await ClientAPI.GET<IResponse<T[]>>(CARTSHIP_URL);
  return result;
}

export {getCartShip};
