import Events from './events';
import Api from './network/api';
import Session from './network/session';
import Observable from './utils/observable';

interface BotOptions {
  api?: string;
  ws?: string;
}

export default class Bot extends Observable {
  private _api: Api;
  private _session: Session;
  private _id?: string;
  private _name?: string;
  private _username?: string;
  private _discriminator?: string;
  private _options?: BotOptions;

  constructor(options?: BotOptions) {
    super();
    this._options = options;
    this._api = new Api(options?.api);
    this._session = new Session({ zlib: true, ws: options?.ws }, this);
  }

  get api() {
    return this._api;
  }

  get session() {
    return this._session;
  }

  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }

  get username() {
    return this._username;
  }

  get discriminator() {
    return this._discriminator;
  }

  emit(event: Events, ...args: any[]) {
    super.emit(event, ...args);
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

  private async _start(params: { token?: string; full_name?: string; password?: string }) {
    const data =
      typeof params.token !== 'undefined'
        ? { token: params.token }
        : { full_name: params.full_name, password: params.password };
    console.log(`⏳ Start authenticating...`);
    try {
      const info = await this.api.route('/auth/login').post({
        data,
        auth: false,
      });
      this._id = info.id;
      this._name = info.name;
      this._username = info.username;
      this._discriminator = info.discriminator;
      console.log(`🎫 Bot ${info.name}(${info.username}#${info.discriminator}) is authenticated.`);
      this.api.token = info.token;
      this.session.token = info.token;
    } catch (e) {
      console.log(`❌ Authentication failed. Reason: ${e.response?.data?.message || 'unknown'}`);
      if (!e.response?.data) {
        console.log(e.syscall, e.errno, e.code, e.hostname);
      }
      return;
    }
    this.session.open();
    console.log(`🚢 Connecting...`);
    this.once('READY', () => {
      console.log(`🤖️ Bot ${this.name}(${this.username}#${this.discriminator}) is ready to work!`);
    });
  }

  async start(token: string) {
    return this._start({ token });
  }

  async startWithPassword(fullname: string, password: string) {
    return this._start({ full_name: fullname, password });
  }
}
