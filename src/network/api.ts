import config from './config';
import Route from './route';
import { AxiosRequestConfig } from 'axios';

export default class Api {
  token?: string;
  api: string;
  partialAxiosConfig?: Partial<AxiosRequestConfig>;

  constructor(api?: string, partialAxiosConfig?: Partial<AxiosRequestConfig>) {
    this.api = api || config.apiHost;
    this.partialAxiosConfig = partialAxiosConfig;
  }

  route(path: string): Route {
    return new Route(path, this.api, this.token, this.partialAxiosConfig);
  }
}
