import { InjectionToken } from "@angular/core";
import { StateToken } from "@ngxs/store";
import { StateClass } from "@ngxs/store/internals";

export type RouteParamsPluginOptions = RouteParamsPluginOption[];

export interface RouteParamsPluginOption {
      state: string | StateClass | StateToken;
      prop: string;
      query: string;
      transform: RouteParamsTransform;
      routeMathing: (url: string) => boolean;
  };

export const ROUTING_PARAMS_PLUGIN_OPTIONS = new InjectionToken(
    "ROUTING_PARAM_PLUGIN_OPTIONS"
  );

export const ROUTE_PARAMS_ENGINE = new InjectionToken('ROUTE_PARAMS_ENGINE');

  export interface RouteParamsEngine {
    getItem(key: string): any;
    setItem(key: string, val: any): void;
    removeItem(key: string): void;
    clear(): void;
    getFullUrl(): string;
  }

export interface RouteParamsTransform {
  serializer: (value: any) => string; //state ==> URL
  deserializer: (value: string) => any; //URL ==> state
}

export type RouteParamOperator = (...args: any[]) => RouteParamsTransform
