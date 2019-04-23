import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { filter, map, startWith, mergeMap, debounceTime, tap } from 'rxjs/internal/operators';
import { Observable, Subject, combineLatest } from 'rxjs';
import { RxjsHttpService, User } from '../rxjs-http/rxjs-http.service';

@Component({
  selector: 'app-rxjs-form',
  templateUrl: './rxjs-form.component.html',
  styleUrls: ['./rxjs-form.component.styl']
})
export class RxjsFormComponent implements OnInit {
  @Output() $emitQuery = new EventEmitter<any>();
  // 接收input的值
  searchChange$ = new Subject<string>();
  user$: Observable<User>;
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    public service: RxjsHttpService,
  ) {
  }

  ngOnInit() {
    this.buildForm();
    this.initSearch();
  }

  initSearch() {
    this.searchChange$
    .pipe(
      // 延迟一会
      debounceTime(800),
      // filter(x => x.includes('m')),
    )
    .subscribe(val => {
      console.log(val);
    });
  }

  buildForm() {
    this.form = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      status: [''],
      comment: [''],
    });

    this.user$ = this.service.loadUser().pipe(
      // tap 返回的还是 Observable 这里我们不订阅，我们在模板中使用 async pipe 和 if else 语句实现按条件显示表单
      tap(user => {
        this.form.patchValue(user);
        console.log(user)
      })
      // .subscribe();
    );

    this.form.valueChanges
    .pipe(
      // 都验证通过才会继续
      filter(() => this.form.valid),
      // 处理属性
      map(data => {
        // 过滤 <> 危险标签
        data.comment = data.comment.replace(/<(?:.|\n)*?>/gm, '');
        // 追加
        data.lastTime = new Date();
        return data;
      })
    )
    .subscribe(res => console.log(res));

    const username$ = this.form.get('username').valueChanges
    .pipe(
      startWith(this.form.get('username').value)
    );

    const status$ = this.form.get('status').valueChanges
    .pipe(
      startWith(this.form.get('status').value)
    );

    //  combineLatest，它会取得各个 observable 最后送出的值，再输出成一个值
    //  这个有个问题是只有合并的元素都产生值才会输出内容，所以在上面使用startWith赋初始化值
    combineLatest(username$, status$)
      .pipe(
        map(([username, status]) => ({username, status})),
      )
      .subscribe(res => console.log(res));

  }

}
