import { RouteParamsEngine } from "./param-plugin.types";

export class RouteParamEngine implements RouteParamsEngine {

    get length(): number {
      const params = new URLSearchParams(location.search)
      return params.entries.length;
    }

    getItem(key: string): any {
      const params = new URLSearchParams(location.search)
      return decodeURI(params.get(key) || '');
    }

    setItem(key: string, val: any): void {
      const params = new URLSearchParams(location.search)
      params.delete(key);
      params.set(key, encodeURI(val));
      window.history.pushState(null, '', location.origin+location.pathname+'?'+params.toString())
    }

    removeItem(key: string): void {
      const params = new URLSearchParams(location.search)
      params.delete(key);
      window.history.pushState(null, '', location.origin+location.pathname+'?'+params.toString())
    }

    clear(): void {
      window.history.pushState(null, '', location.origin+location.pathname)
    }

    getFullUrl() {
      const params = new URLSearchParams(location.search)
      return `${location.href}?${params.toString()}`;
    }
  }
