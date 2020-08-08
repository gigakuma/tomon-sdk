import Events from './events';
import Api from './network/api';
import Session from './network/session';
import Observable from './utils/observable';

export default class Bot extends Observable {
  private _api: Api = new Api();
  private _session: Session = new Session({ zlib: true }, this);

  get api() {
    return this._api;
  }

  get session() {
    return this._session;
  }

  emit(event: Events, ...args: any[]) {
    super.emit(event, args);
  }

  on(event: Events, listener: (...args: any[]) => void) {
    super.on(event, listener);
  }

  once(event: Events, listener: (...args: any[]) => void) {
    super.once(event, listener);
  }

  off(event: Events, listener: (...args: any[]) => void) {
    super.off(event, listener);
  }

  async start(token: string) {
    const info = await this.api.route('/auth/login').post({
      data: {
        token,
      },
      auth: false,
    });
    this.session.token = info.token;
    this.session.open();
    return info;
  }

  async startWithPassword(params: { full_name: string; password: string }) {
    const info = await this.api.route('/auth/login').post({
      data: params,
      auth: false,
    });
    this.session.token = info.token;
    this.session.open();
    return info;
  }
}
