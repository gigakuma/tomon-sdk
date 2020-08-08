import Route from './route';

export default class Api {
  token?: string;
  route(path: string): Route {
    return new Route(path, this.token);
  }
}
