import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RxjsHttpService {

  constructor(
    private http: HttpClient,
  ) {
  }

  private endpoint = 'https://jsonplaceholder.typicode.com';

  getUserList() {
    return this.http.get<any>(`${this.endpoint}/users`);
  }

  getPostDetail(id) {
    return this.http.get<any>(`${this.endpoint}/posts/${id}`);
  }
}
