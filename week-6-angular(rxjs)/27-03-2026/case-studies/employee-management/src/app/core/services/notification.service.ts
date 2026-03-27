import { Injectable } from '@angular/core';

@Injectable()
export class NotificationService {
  private notifications: string[] = [];
  private instanceId: string;

  constructor() {
    this.instanceId = Math.random().toString(36).substring(7);
    console.log(`NotificationService instance created: ${this.instanceId}`);
  }

  addNotification(message: string) {
    this.notifications.push(message);
    console.log(`[${this.instanceId}] Notification added: ${message}`);
  }

  getNotifications(): string[] {
    return this.notifications;
  }

  clearNotifications() {
    this.notifications = [];
  }

  getInstanceId(): string {
    return this.instanceId;
  }
}
