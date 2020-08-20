import Events, { EventTypes } from './events';
import Api from './network/api';
import Session from './network/session';
import Observable from './utils/observable';
import { WSOptions } from './network/ws';
import { AxiosRequestConfig } from 'axios';
import { WSPayload, Message } from './types';

interface BotOptions {
  api?: string;
  ws?: string;
  axiosConfig?: Partial<AxiosRequestConfig>;
  wsOptions?: WSOptions;
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
    this._api = new Api(options?.api, options?.axiosConfig);
    this._session = new Session({ zlib: true, ws: options?.ws, wsOptions: options?.wsOptions }, this);
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

  on(event: 'NETWORK_CONNECTED', listener: () => void): void
  on(event: 'NETWORK_DISCONNECTED', listener: () => void): void
  on(event: 'NETWORK_RECONNECTING', listener: (e: { count: number }) => void): void
  on(event: 'READY', listener: (e: WSPayload<'READY'>) => void): void
  on(event: 'HELLO', listener: (e: WSPayload<'HELLO'>) => void): void
  on(event: 'DISPATCH', listener: (e: WSPayload<'DISPATCH'>) => void): void
  on(event: 'HEARTBEAT', listener: (e: WSPayload<'HEARTBEAT'>) => void): void
  on(event: 'HEARTBEAT_ACK', listener: (e: WSPayload<'HEARTBEAT_ACK'>) => void): void
  on(event: 'MESSAGE_CREATE', listener: (e: WSPayload<'MESSAGE_CREATE'>) => void): void
  on(event: 'MESSAGE_DELETE', listener: (e: WSPayload<'MESSAGE_DELETE'>) => void): void
  on(event: 'MESSAGE_UPDATE', listener: (e: WSPayload<'MESSAGE_UPDATE'>) => void): void
  on(event: 'GUILD_CREATE', listener: (e: WSPayload<'GUILD_CREATE'>) => void): void
  on(event: 'GUILD_DELETE', listener: (e: WSPayload<'GUILD_DELETE'>) => void): void
  on(event: 'GUILD_UPDATE', listener: (e: WSPayload<'GUILD_UPDATE'>) => void): void
  on(event: 'GUILD_POSITION', listener: (e: WSPayload<'GUILD_POSITION'>) => void): void
  on(event: 'GUILD_ROLE_CREATE', listener: (e: WSPayload<'GUILD_ROLE_CREATE'>) => void): void
  on(event: 'GUILD_ROLE_DELETE', listener: (e: WSPayload<'GUILD_ROLE_DELETE'>) => void): void
  on(event: 'GUILD_ROLE_UPDATE', listener: (e: WSPayload<'GUILD_ROLE_UPDATE'>) => void): void
  on(event: 'GUILD_ROLE_POSITION', listener: (e: WSPayload<'GUILD_ROLE_POSITION'>) => void): void
  on(event: 'CHANNEL_CREATE', listener: (e: WSPayload<'CHANNEL_CREATE'>) => void): void
  on(event: 'CHANNEL_DELETE', listener: (e: WSPayload<'CHANNEL_DELETE'>) => void): void
  on(event: 'CHANNEL_UPDATE', listener: (e: WSPayload<'CHANNEL_UPDATE'>) => void): void
  on(event: 'CHANNEL_POSITION', listener: (e: WSPayload<'CHANNEL_POSITION'>) => void): void
  on(event: 'EMOJI_CREATE', listener: (e: WSPayload<'EMOJI_CREATE'>) => void): void
  on(event: 'EMOJI_DELETE', listener: (e: WSPayload<'EMOJI_DELETE'>) => void): void
  on(event: 'EMOJI_UPDATE', listener: (e: WSPayload<'EMOJI_UPDATE'>) => void): void
  on(event: 'GUILD_MEMBER_ADD', listener: (e: WSPayload<'GUILD_MEMBER_ADD'>) => void): void
  on(event: 'GUILD_MEMBER_REMOVE', listener: (e: WSPayload<'GUILD_MEMBER_REMOVE'>) => void): void
  on(event: 'GUILD_MEMBER_UPDATE', listener: (e: WSPayload<'GUILD_MEMBER_UPDATE'>) => void): void
  on(event: 'MESSAGE_REACTION_ADD', listener: (e: WSPayload<'MESSAGE_REACTION_ADD'>) => void): void
  on(event: 'MESSAGE_REACTION_REMOVE', listener: (e: WSPayload<'MESSAGE_REACTION_REMOVE'>) => void): void
  on(event: 'MESSAGE_REACTION_REMOVE_ALL', listener: (e: WSPayload<'MESSAGE_REACTION_REMOVE_ALL'>) => void): void
  on(event: 'VOICE_STATE_UPDATE', listener: (e: WSPayload<'VOICE_STATE_UPDATE'>) => void): void
  on(event: 'USER_TYPING', listener: (e: WSPayload<'USER_TYPING'>) => void): void
  on(event: 'USER_PRESENCE_UPDATE', listener: (e: WSPayload<'USER_PRESENCE_UPDATE'>) => void): void
  on(event: Events, listener: (...args: any[]) => void) {
    super.on(event, listener);
  }

  once(event: 'NETWORK_CONNECTED', listener: () => void): void
  once(event: 'NETWORK_DISCONNECTED', listener: () => void): void
  once(event: 'NETWORK_RECONNECTING', listener: (e: { count: number }) => void): void
  once(event: 'READY', listener: (e: WSPayload<'READY'>) => void): void
  once(event: 'HELLO', listener: (e: WSPayload<'HELLO'>) => void): void
  once(event: 'DISPATCH', listener: (e: WSPayload<'DISPATCH'>) => void): void
  once(event: 'HEARTBEAT', listener: (e: WSPayload<'HEARTBEAT'>) => void): void
  once(event: 'HEARTBEAT_ACK', listener: (e: WSPayload<'HEARTBEAT_ACK'>) => void): void
  once(event: 'MESSAGE_CREATE', listener: (e: WSPayload<'MESSAGE_CREATE'>) => void): void
  once(event: 'MESSAGE_DELETE', listener: (e: WSPayload<'MESSAGE_DELETE'>) => void): void
  once(event: 'MESSAGE_UPDATE', listener: (e: WSPayload<'MESSAGE_UPDATE'>) => void): void
  once(event: 'GUILD_CREATE', listener: (e: WSPayload<'GUILD_CREATE'>) => void): void
  once(event: 'GUILD_DELETE', listener: (e: WSPayload<'GUILD_DELETE'>) => void): void
  once(event: 'GUILD_UPDATE', listener: (e: WSPayload<'GUILD_UPDATE'>) => void): void
  once(event: 'GUILD_POSITION', listener: (e: WSPayload<'GUILD_POSITION'>) => void): void
  once(event: 'GUILD_ROLE_CREATE', listener: (e: WSPayload<'GUILD_ROLE_CREATE'>) => void): void
  once(event: 'GUILD_ROLE_DELETE', listener: (e: WSPayload<'GUILD_ROLE_DELETE'>) => void): void
  once(event: 'GUILD_ROLE_UPDATE', listener: (e: WSPayload<'GUILD_ROLE_UPDATE'>) => void): void
  once(event: 'GUILD_ROLE_POSITION', listener: (e: WSPayload<'GUILD_ROLE_POSITION'>) => void): void
  once(event: 'CHANNEL_CREATE', listener: (e: WSPayload<'CHANNEL_CREATE'>) => void): void
  once(event: 'CHANNEL_DELETE', listener: (e: WSPayload<'CHANNEL_DELETE'>) => void): void
  once(event: 'CHANNEL_UPDATE', listener: (e: WSPayload<'CHANNEL_UPDATE'>) => void): void
  once(event: 'CHANNEL_POSITION', listener: (e: WSPayload<'CHANNEL_POSITION'>) => void): void
  once(event: 'EMOJI_CREATE', listener: (e: WSPayload<'EMOJI_CREATE'>) => void): void
  once(event: 'EMOJI_DELETE', listener: (e: WSPayload<'EMOJI_DELETE'>) => void): void
  once(event: 'EMOJI_UPDATE', listener: (e: WSPayload<'EMOJI_UPDATE'>) => void): void
  once(event: 'GUILD_MEMBER_ADD', listener: (e: WSPayload<'GUILD_MEMBER_ADD'>) => void): void
  once(event: 'GUILD_MEMBER_REMOVE', listener: (e: WSPayload<'GUILD_MEMBER_REMOVE'>) => void): void
  once(event: 'GUILD_MEMBER_UPDATE', listener: (e: WSPayload<'GUILD_MEMBER_UPDATE'>) => void): void
  once(event: 'MESSAGE_REACTION_ADD', listener: (e: WSPayload<'MESSAGE_REACTION_ADD'>) => void): void
  once(event: 'MESSAGE_REACTION_REMOVE', listener: (e: WSPayload<'MESSAGE_REACTION_REMOVE'>) => void): void
  once(event: 'MESSAGE_REACTION_REMOVE_ALL', listener: (e: WSPayload<'MESSAGE_REACTION_REMOVE_ALL'>) => void): void
  once(event: 'VOICE_STATE_UPDATE', listener: (e: WSPayload<'VOICE_STATE_UPDATE'>) => void): void
  once(event: 'USER_TYPING', listener: (e: WSPayload<'USER_TYPING'>) => void): void
  once(event: 'USER_PRESENCE_UPDATE', listener: (e: WSPayload<'USER_PRESENCE_UPDATE'>) => void): void
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
