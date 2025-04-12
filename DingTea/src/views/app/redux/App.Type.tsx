export interface IAppState {
  isFirstLoading?: boolean;
  isRefresh?: boolean;
}

export interface IPropsNavigate<T> {
  route?: {
    key: string;
    name: string;
    params?: T;
  };
}

export interface IAppAction<T> {
  type: string;
  payload?: T;
}
