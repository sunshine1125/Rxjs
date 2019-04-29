import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { of } from 'rxjs';
import { catchError, delay } from 'rxjs/operators';

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
      delay(1500)
    );
  }

  getUserList() {
    return this.http.get<any>(`${this.endpoint}/users`);
  }

  getPostDetail(id) {
    return this.http
    //  故意写错地址
    .get<any>(`${this.endpoint}/posts2/${id}`)
      .pipe(
        // catchError 可以 returning a new observable or throwing an error.
        catchError(err => {
          // 如果发生错误，用缺省值，尝试修改一个错误地址
          return of({
            userId: 1,
            id: 1,
            title: '-occaecati excepturi optio reprehenderit-',
            body: '-eveniet architecto-'
          });
        })

        // catchError(err => {
        //   throw err;
        // })
      )
  }
}
