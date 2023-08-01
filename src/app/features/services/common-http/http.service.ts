import { Injectable } from '@angular/core';

import { environment as Env } from "@HayvnEnv/environment";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  get(apiRoute: string) {
    return this.http.get(`${Env.apiUrl}/${apiRoute}`);
  }

  post(apiRoute: string, payload: any) {
    return this.http.post(`${Env.apiUrl}/${apiRoute}`, payload);
  }
}
