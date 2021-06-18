import { Injectable } from "@angular/core";
import { Action, NgxsOnInit, State, StateContext } from "@ngxs/store";
import { patch } from '@ngxs/store/operators';

export class Add {
  static readonly type = 'Add';
  constructor(public name: string) {}
}

@State({
  name: 'app',
  defaults: {
    count: 0,
    name: ''
  }
})
@Injectable()
export class AppState {
  @Action(Add)
  add({ getState, setState }: StateContext<{count: number, name: string}>, {name}: Add) {
    const state = getState();
    setState(patch({count: state.count + 1, name}));
  }
}
