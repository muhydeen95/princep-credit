import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/cores/http.service';

@Injectable({
  providedIn: 'root',
})
export class LoanService {
  constructor(private http: HttpService, private _http: HttpClient) {}

  public getLoans(
    queryParam: any
  ): Observable<any> {
    const params = new HttpParams()
    .set('search_text', queryParam.search_text)
    .set('page_size', queryParam.page_size)
    .set('page', queryParam.page);
    const endpoint = 'loan/list/active/interview';
    return this.http.makeRequestWithData('post', endpoint, {params});
  }

}
