import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NewsResponseModel, UpdateStatusNewsResponse } from '../Models/News.model';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  apiUrl: string = environment.defaultUrl;

  constructor(private http: HttpClient) { 

  }

  getNewsList(): Observable<NewsResponseModel> {
    const apiPath = `${this.apiUrl}uapi/drt-ElectronicsDocument/ED-GetNews?EmployeeId=3`;
    return this.http.get<NewsResponseModel>(apiPath);
  }

  updateNewsStatus(employeeId: number, newsId: number, status: number): Observable<UpdateStatusNewsResponse> {
    const apiPath = `${this.apiUrl}uapi/drt-ElectronicsDocument/ED-UpdateStatusNews`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded'});
    const params = new HttpParams().set('EmployeeId', employeeId)
                                   .set('NewsId', newsId)
                                   .set('Status', status);
    console.log(params);
    return this.http.post<UpdateStatusNewsResponse>(apiPath, params, { headers: headers });
  }
}
