import { Component, OnInit } from '@angular/core';
import { delay, share, debounceTime, take, map } from 'rxjs/operators';
import { Observable, Subject, concat, merge, zip, combineLatest, race, interval } from 'rxjs';
import { RxjsHttpService } from './rxjs-http.service';

@Component({
  selector: 'app-rxjs-http',
  templateUrl: './rxjs-http.component.html',
  styleUrls: ['./rxjs-http.component.styl']
})
export class RxjsHttpComponent implements OnInit {
  observable: Observable<number>;
  promise: Promise<object>;
  postDetail$: Observable<any>;
  constructor(
    public service: RxjsHttpService) {
  }

  ngOnInit() {
    this.getPostDetail();
    this.observable = this.getObservable();
    this.promise = this.getPromise();
  }


  getObservable() {
    return interval(1000)
    .pipe(
      map((v) => v * v),
      take(10),
    );
  }

  getPromise() {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve('Promise complete!'), 3000);
    });
  }

  getPostDetail() {
    this.postDetail$ = this.service.getPostDetail(1)
    .pipe(
      map(res => res),
      // 防止重复使用 async 多次时请求多次的情况
      share()
    )
    // .toPromise()
  }

}
