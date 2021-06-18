import { InjectionToken, ModuleWithProviders, NgModule } from "@angular/core";
import { NGXS_PLUGINS } from "@ngxs/store";
import { RouteParamsPlugin } from "./param-plugin";
import { RouteParamEngine } from "./param-plugin.engine";
import { RouteParamsPluginOptions, ROUTE_PARAMS_ENGINE, ROUTING_PARAMS_PLUGIN_OPTIONS } from "./param-plugin.types";

export const USER_OPTIONS = new InjectionToken("USER_OPTIONS");

@NgModule()
export class RouteParamsPluginModule {
  static forRoot(
    options?: RouteParamsPluginOptions
  ): ModuleWithProviders<RouteParamsPluginModule> {
    return {
      ngModule: RouteParamsPluginModule,
      providers: [
        {
          provide: NGXS_PLUGINS,
          useClass: RouteParamsPlugin,
          multi: true
        },
        {
          provide: USER_OPTIONS,
          useValue: options
        },
        {
          provide: ROUTING_PARAMS_PLUGIN_OPTIONS,
          useFactory: routeParamsOptionsFactory,
          deps: [USER_OPTIONS]
        },
        {
          provide: ROUTE_PARAMS_ENGINE,
          useClass: RouteParamEngine
        }
      ]
    };
  }
}

export function routeParamsOptionsFactory(
  options: RouteParamsPluginOptions | undefined
): RouteParamsPluginOptions {
  // if (options !== undefined && options.key) {
  //   options.key = transformKeyOption(options.key);
  // }

  return options || [];
}
