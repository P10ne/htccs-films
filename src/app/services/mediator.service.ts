import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MediatorService {
  events: object;
  constructor() {
    this.events = {};
  }

  subscribe(name, handler) {
    if (this.events.hasOwnProperty(name)) {
      this.events[name].push(handler);
    } else {
      this.events[name] = [handler];
    }
  }

  unSubscribe(name, handler) {
    if (!this.events.hasOwnProperty(name)) {
      return;
    }

    const index = this.events[name].indexOf(handler);
    if (index !== -1) {
      this.events[name].splice(index, 1);
    }
  }

  call(name, args) {
    if (!this.events.hasOwnProperty(name)) {
      return;
    }

    if (!args || !args.length) {
      args = [];
    }

    const evs = this.events[name];
    evs.forEach((item) => {
      item.apply(null, args);
    });
  }

}
