import { Injectable } from '@angular/core';
import { environment } from '@env/environment';

@Injectable()
export class StorageService {
  private _settings: any;
  private storage: Storage;

  constructor() {
    this.setDefault();
    this.init();
  }

  private init(): void {
    this._settings = JSON.parse(
      this.storage.getItem(environment.settings) || '{}'
    );
  }

  public setDefault(): void {
    this.setStorage(localStorage); // or sessionStorage
  }

  public setStorage(storage: Storage): void {
    this.storage = storage;
  }

  public setItem(key: string, value: any): void {
    this._settings[key] = value;
    this.storage.setItem(environment.settings, JSON.stringify(this._settings));
  }

  public getItem(key: string): any {
    if (key === environment.settings) {
      return this._settings;
    }
    return this._settings[key];
  }

  public removeItem(key: string): void {
    delete this._settings[key];
    this.storage.setItem(environment.settings, JSON.stringify(this._settings));
  }
}
