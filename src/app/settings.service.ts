import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  constructor() { }

  public setApiUrl(url: string) {
    localStorage.apiUrl = url;
  }

  public setApiKey(key: string) {
    localStorage.apiKey = key;
  }

  public getApiUrl(): string {
    return localStorage.apiUrl ? localStorage.apiUrl : '';
  }

  public getApiKey(): string {
    return localStorage.apiKey ? localStorage.apiKey : '';
  }

  public isSettingsDone(): boolean {
    return localStorage.apiKey && localStorage.apiUrl;
  }
}
