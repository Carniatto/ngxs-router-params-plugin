import { Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Add } from './app.state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @Select((app: any) => app) state$!: Observable<number>;
  
  constructor(private store: Store) {}

  onClick(value: string) {
    this.store.dispatch(new Add(value));
  }
}
