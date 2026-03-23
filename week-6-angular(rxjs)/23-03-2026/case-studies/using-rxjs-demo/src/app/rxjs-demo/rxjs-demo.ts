import { CommonModule } from '@angular/common';
import { of, fromEvent, BehaviorSubject, observable, from } from 'rxjs';
import { map, filter, debounceTime, mergeMap, switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

import {
  Component,
  OnInit,
  AfterViewInit,
  ElementRef,
  ViewChild,
} from '@angular/core';



@Component({
  selector: 'app-rxjs-demo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rxjs-demo.html',
  styleUrl: './rxjs-demo.css',
})
export class RxjsDemo implements OnInit, AfterViewInit {

  @ViewChild('clickBtn') clickBtn!: ElementRef;
  @ViewChild('searchBox') searchBox!: ElementRef;

  observableOutput: any[] = [];
  mappedOutput: any[] = [];
  filteredOutput: any[] = []
  multiMapOutput: any[] = [];
  behaviorOutput: any[] = [];
  clickOutput: any[] = [];
  searchOutput: any[] = [];
  mergeMapOutput: any[] = [];

  loading = false;

  constructor(private http: HttpClient) {

  }

  //NON-DOM LOGIC
  ngOnInit(): void {
    const observable$ = of(1, 2, 3, 4, 5);

    //Observable Creation
    observable$.subscribe(val => this.observableOutput.push(val));

    //Map
    observable$.pipe(
      map(x => x * 10)
    ).subscribe(res => this.mappedOutput.push(res));

    //Filter+Map
    observable$.pipe(
      map(x => x * 2)
    ).subscribe(res => {
      if (res !== null) this.filteredOutput.push(res);
    });

    //MultiMap
    observable$.pipe(
      map(x => x + 1),
      map(x => x * 2),
      map(x => `final: ${x}`)
    ).subscribe(res => this.multiMapOutput.push(res));

    //mergeMap( parallel API calls)
    of(1, 2, 3).pipe(
      mergeMap(id => this.http.get(`https://jsonplaceholder.typicode.com/posts/${id}`))
    ).subscribe(res => this.mergeMapOutput.push(res));
  }

  ngAfterViewInit(): void {

    //search with filter + debounceTime + switchMap
    fromEvent(this.searchBox.nativeElement, 'input').pipe(

      //wait for typing to stop
      debounceTime(500),

      //get input value
      map((event: any) => event.target.value.trim()),

      //allow only if 3+ chars
      filter(text => text.length >= 3),

      //cancel previous API & call new one
      switchMap(text => {
        this.loading = true;
        return this.http.get<any[]>(`https://jsonplaceholder.typicode.com/posts?q=${text}`);
      })
    ).subscribe({
      next: res => {
        this.searchOutput = res;
        this.loading = false;
      },
      error: err => {
        this.searchOutput = [];
        this.loading = false;
      },
      complete: ()=>{
          console.log('Search stream completed');
      }
    });
  }
}
