import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/cores/http.service';

@Injectable({
  providedIn: 'root',
})
export class LoanService {
  constructor(private http: HttpService, private _http: HttpClient) {}

  public getLoans(
    payload: any
  ): Observable<any> {
    const endpoint = 'loan/list/active/interview';
    return this.http.makeRequestWithData('post', endpoint, {},  payload);
  }

}
