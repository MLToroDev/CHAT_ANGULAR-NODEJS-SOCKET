import { isDevMode } from '@angular/core';

const host = isDevMode() ? 'http://localhost:3000' : 'otherdomain.com';
const apiVersion = '/api/v1';
const basePath = host + apiVersion;
export class UriConstants {
  public static readonly HOST = host;
  public static readonly MESSAGES = basePath + '/messages';
  public static readonly USER = basePath + '/users';


}
