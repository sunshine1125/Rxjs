import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { filter, map, startWith  } from 'rxjs/internal/operators';

@Component({
  selector: 'app-rxjs-form',
  templateUrl: './rxjs-form.component.html',
  styleUrls: ['./rxjs-form.component.styl']
})
export class RxjsFormComponent implements OnInit {
  loginForm: FormGroup;
  @Output() $emitQuery = new EventEmitter<any>();

  form: FormGroup;
  constructor(
    private fb: FormBuilder,
  ) {
  }

  originFormData = {
    username: 'admin',
    password: '123'
  };

  ngOnInit() {
    this.buildForm();

    this.loginForm = this.fb.group({
      username: [this.originFormData.username, Validators.required],
      password: [this.originFormData.password, Validators.required],
    });
  }

  buildForm() {
    this.form = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      status: [''],
      comment: [''],
    });

    this.form.valueChanges
    .pipe(
      filter(() => this.form.valid),
      // clear dangerous content, like <script>
      map(data => {
        data.comment = data.comment.replace(/<(?:.|\n)*?>/gm, '');
        // append last update time to result
        data.lastTime = new Date();
        return data;
      })
    )
    .subscribe(res => console.log(res));

    /*
    const username$ = this.form.get('username').valueChanges.pipe(startWith(this.form.get('username').value))
    const status$ = this.form.get('status').valueChanges.pipe(startWith(this.form.get('status').value))

    //  combineLatest，它会取得各个 observable 最后送出的值，再输出成一个值
    //  这个有个问题是只有合并的元素都产生值才会输出内容，所以在上面使用startWith赋初始化值
    combineLatest(username$, status$)
      .pipe(
        map(([username, status]) => ({username, status}))
      )
      .subscribe(res => console.log(res));
    */
  }

  onReset2(form) {
    console.log(form);
    form.reset(this.originFormData);
    // this.loginForm.markAsPristine();
    // this.loginForm.markAsUntouched();
  }

  onSubmit(value) {
    console.log(value);
  }

  onTest(value) {
    console.log(value);
  }
}
