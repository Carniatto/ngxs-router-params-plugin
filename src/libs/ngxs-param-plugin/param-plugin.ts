import { Inject, Injectable } from "@angular/core";
import { actionMatcher, getStoreMetadata, getValue, InitState, NgxsNextPluginFn, NgxsPlugin, setValue, StateToken, UpdateState } from "@ngxs/store";
import { RouteParamsEngine, RouteParamsPluginOptions, ROUTE_PARAMS_ENGINE, ROUTING_PARAMS_PLUGIN_OPTIONS } from "./param-plugin.types";
import { tap } from "rxjs/operators";

@Injectable()
export class RouteParamsPlugin implements NgxsPlugin {
  constructor(
    @Inject(ROUTING_PARAMS_PLUGIN_OPTIONS)
    private _options: RouteParamsPluginOptions,
    @Inject(ROUTE_PARAMS_ENGINE) private _engine: RouteParamsEngine,
  ) {}
  handle(state: any, event: any, next: NgxsNextPluginFn) {
    const values = this._options;
    const matches = actionMatcher(event);
    const isInitAction = matches(InitState) || matches(UpdateState);

    if (isInitAction) {
      for (let value of values) {
        const shouldExecute = value.routeMathing(this._engine.getFullUrl())

        if (shouldExecute) {
          let stateName = value.state;
          if (value.state instanceof StateToken) {
            stateName = value.state.getName();
          } else if (typeof value.state !== 'string') {
            stateName = getStoreMetadata(value.state).path || ''
          }

          const queryVal = this._engine.getItem(value.query);
          const stateVal = getValue(state, `${stateName}.${value.prop}`)
          const currentVal = queryVal !== '' ? queryVal : stateVal;

          if (queryVal === '') {
            this._engine.setItem(value.query, value.transform?.serializer(stateVal));
          }

          state = setValue(state, `${stateName}.${value.prop}`, value.transform?.deserializer(currentVal));
        }
      }
      return next(state, event);
    }

    return next(state, event).pipe(
      tap((nextState) => {
        if (!isInitAction) {
          for (const value of values) {
            const shouldExecute = value.routeMathing(this._engine.getFullUrl())

            if (shouldExecute) {
              let stateName = value.state;
              if (value.state instanceof StateToken) {
                stateName = value.state.getName();
              } else if (typeof value.state !== 'string') {
                stateName = getStoreMetadata(value.state).path || '';
              }

              try {
                const stateVal = getValue(nextState, `${stateName}.${value.prop}`);

                this._engine.setItem(value.query, value.transform?.serializer(stateVal));

              } catch (e) {
                console.error(
                  'Error ocurred while serializing the store value, value not updated.'
                );
              }
            }
          }
        }
      })
    );
  }
}
function setState(state: any, arg1: any): any {
  throw new Error("Function not implemented.");
}

