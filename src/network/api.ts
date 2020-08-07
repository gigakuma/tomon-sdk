import axios from 'axios';
import urljoin from 'url-join';
import Config from './config';

type RequestMethod = 'get' | 'post' | 'put' | 'delete' | 'patch';
const DEFAULT_TIMEOUT = 30000;

export interface RequestOptions {
  query?: { [key: string]: any };
  data?: any;
  files?: File[];
  auth?: boolean;
  userAgent?: string;
  headers?: { [key: string]: any };
  timeout?: number;
}

class Route {
  path: string;
  token?: string;

  constructor(path: string, token?: string) {
    this.path = path;
    this.token = token;
  }

  queryString(options?: RequestOptions): string | undefined {
    if (options?.query) {
      const query = Object.entries(options.query).filter(([, value]) => value !== null && typeof value !== 'undefined');
      return new URLSearchParams(query).toString();
    }
    return undefined;
  }

  url(options?: RequestOptions): string {
    const query = this.queryString(options);
    return `${urljoin(Config.apiHost, this.path)}${query ? `?${query}` : ''}`;
  }

  get auth(): string | undefined {
    return this.token ? `Bearer ${this.token}` : undefined;
  }

  async request(method: RequestMethod, options?: RequestOptions): Promise<any> {
    const url = this.url(options);
    let headers: { [key: string]: any } = {};
    if (options?.headers) {
      headers = Object.assign(headers, options.headers);
    }
    if (options?.auth !== false) {
      const auth = this.auth;
      if (auth) {
        headers.Authorization = auth;
      }
    }
    let body;
    if (options?.files) {
      body = new FormData();
      for (const file of options.files) {
        body.append(file.name, file);
      }
      if (typeof options.data !== 'undefined') {
        body.append('payload_json', JSON.stringify(options.data));
      }
    } else if (options?.data) {
      body = JSON.stringify(options.data);
      headers['Content-Type'] = 'application/json';
    }
    const response = await axios({
      method,
      url,
      headers,
      data: body,
      timeout: options?.timeout || DEFAULT_TIMEOUT,
    });
    return response.data;
  }

  async get(options?: RequestOptions): Promise<any> {
    return this.request('get', options);
  }

  async post(options?: RequestOptions): Promise<any> {
    return this.request('post', options);
  }

  async patch(options?: RequestOptions): Promise<any> {
    return this.request('patch', options);
  }

  async put(options?: RequestOptions): Promise<any> {
    return this.request('put', options);
  }

  async delete(options?: RequestOptions): Promise<any> {
    return this.request('delete', options);
  }
}

export default class Api {
  token?: string;
  route(path: string): Route {
    return new Route(path, this.token);
  }
}
