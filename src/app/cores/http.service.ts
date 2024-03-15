import { environment } from './../../environments/envireonment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) {}

  getRequest<T>(
    endpoint: string,
    baseUrl: string = environment.apiUrl
  ): Observable<T> | any {
    return this.http.get(baseUrl + endpoint);
  }

  getRequestWithParams<T>(
    endpoint: string,
    params = {},
    baseUrl = environment.apiUrl
  ): Observable<T> | any {
    return this.http.get(baseUrl + endpoint, {
      params,
    });
  }

  makeRequestWithData<T>(
    method: 'post' | 'put' | 'patch' | 'get',
    endpoint: string,
    params: any,
    body?: any,
    headers: HttpHeaders = new HttpHeaders({}),
    baseUrl: string = environment.apiUrl
  ): Observable<T> | any {
    return this.http.request(method, baseUrl + endpoint, {
      params,
      body,
      headers,
    });
  }
}
