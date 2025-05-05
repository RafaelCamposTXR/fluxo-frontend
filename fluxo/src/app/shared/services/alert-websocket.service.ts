import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertWebsocketService {
  private socket!: WebSocket;
  private alertSubject = new Subject<string>();
  private isConnected = false;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectInterval = 5000; // 5 segundos

  constructor() {
    this.initializeWebSocket();
  }

  private initializeWebSocket() {
    try {
      this.socket = new WebSocket("ws://192.168.15.5:8000/api/ws/alerta");

      this.socket.onopen = () => {
        console.log('WebSocket connection established');
        this.isConnected = true;
        this.reconnectAttempts = 0; // Reset reconnect attempts on successful connection
      };

      this.socket.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          console.log('Alert received:', data);
          this.alertSubject.next(data.message || data);
        } catch (e) {
          console.error('Error parsing WebSocket message:', e);
          this.alertSubject.next(event.data);
        }
      };

      this.socket.onerror = (error) => {
        console.error('WebSocket error:', error);
        this.isConnected = false;
      };

      this.socket.onclose = () => {
        console.log('WebSocket connection closed');
        this.isConnected = false;
        
        // Attempt to reconnect if we haven't exceeded max attempts
        if (this.reconnectAttempts < this.maxReconnectAttempts) {
          this.reconnectAttempts++;
          console.log(`Attempting to reconnect (${this.reconnectAttempts}/${this.maxReconnectAttempts})...`);
          setTimeout(() => this.initializeWebSocket(), this.reconnectInterval);
        } else {
          console.error('Max reconnection attempts reached. Please refresh the page.');
          this.alertSubject.error(new Error('WebSocket connection failed'));
        }
      };
    } catch (error) {
      console.error('Error initializing WebSocket:', error);
      this.isConnected = false;
    }
  }

  getAlerts() {
    return this.alertSubject.asObservable();
  }

  sendAlert(message: string) {
    if (this.isConnected && this.socket.readyState === WebSocket.OPEN) {
      try {
        this.socket.send(JSON.stringify({ message }));
      } catch (error) {
        console.error('Error sending alert:', error);
        throw error;
      }
    } else {
      const error = new Error('WebSocket is not connected. Cannot send alert.');
      console.warn(error.message);
      throw error;
    }
  }

  // Call this method when component is destroyed
  disconnect() {
    if (this.socket) {
      this.socket.close();
    }
    this.alertSubject.complete();
  }
}
