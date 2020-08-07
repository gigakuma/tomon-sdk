import { EventEmitter } from 'events';

export default class Observable {
  private emitter: EventEmitter = new EventEmitter();

  on(event: string, listener: (...args: any[]) => void) {
    this.emitter.on(event, listener);
  }

  off(event: string, listener: (...args: any[]) => void) {
    this.emitter.off(event, listener);
  }

  once(event: string, listener: (...args: any[]) => void) {
    this.emitter.once(event, listener);
  }

  emit(event: string, ...args: any[]) {
    this.emitter.emit(event, ...args);
  }
}
