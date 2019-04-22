import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

export interface User {
  id: number;
  username: string;
  email: string;
  status?: number;
  comment: string;
}


const fakeData = {
  id: 1,
  username: 'testman',
  email: 'testman@test.com',
  comment: 'Web Developer'
};

@Injectable({
  providedIn: 'root'
})
export class RxjsHttpService {

  constructor(
    private http: HttpClient,
  ) {
  }

  private endpoint = 'https://jsonplaceholder.typicode.com';

  // 模拟加载数据
  loadUser() {
    return of<User>(fakeData).pipe(
      delay(2000)
    );
  }

  getUserList() {
    return this.http.get<any>(`${this.endpoint}/users`);
  }

  getPostDetail(id) {
    return this.http.get<any>(`${this.endpoint}/posts/${id}`);
  }
}
