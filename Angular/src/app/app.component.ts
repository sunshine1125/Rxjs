import { Component, Injector, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHandler, HttpXhrBackend } from '@angular/common/http';

// https://stackoverflow.com/questions/49507928/how-to-inject-httpclient-in-static-method-or-custom-class
export function httpManual() {
  const injector = Injector.create({
    providers: [
      { provide: HttpClient, deps: [HttpHandler] },
      { provide: HttpHandler, useValue: new HttpXhrBackend({ build: () => new XMLHttpRequest }) },
    ],
  });
  const http = injector.get(HttpClient);
  return http.get(`https://jsonplaceholder.typicode.com/todos`);
}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.styl']
})
export class AppComponent implements OnInit {
  title = 'my-app';

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.url
    .subscribe(url => console.log('The URL changed to: ' + url));

    httpManual().subscribe(response => {
      console.log(response);
    })
  }
}
