import { Injectable } from '@angular/core';

@Injectable()
export class LoggerService {
  private instanceId: string;
  private logCounter = 0;

  constructor() {
    this.instanceId = Math.random().toString(36).substring(7);
    console.log(`LoggerService instance created: ${this.instanceId}`);
  }

  log(component: string, message: string) {
    this.logCounter++;
    console.log(`[${this.instanceId}][${this.logCounter}] ${component}: ${message}`);
  }

  getInstanceId(): string {
    return this.instanceId;
  }

  getLogCount(): number {
    return this.logCounter;
  }
}
