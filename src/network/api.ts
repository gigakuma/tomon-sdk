import config from './config';
import Route from './route';

export default class Api {
  token?: string;
  api: string;

  constructor(api?: string) {
    this.api = api || config.apiHost;
  }
  route(path: string): Route {
    return new Route(path, this.api, this.token);
  }
}
