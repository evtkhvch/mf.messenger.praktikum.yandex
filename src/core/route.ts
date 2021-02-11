import { Component } from './component.js';
import { render } from './render.js';

export class Route {
    private _component: Component | null = null;

    constructor(private pathname: string, public component: Component, private props: { rootQuery: string }) {
    }

    public navigate(pathname: string): void {
        if (this.match(pathname)) {
            this.pathname = pathname;
            this.render();
        }
    }

    public leave(): void {
        if (this._component) {
            this._component.remove();
        }
    }

    public match(pathname: string): boolean {
        return isEqual(pathname, this.pathname);
    }

    public render(): void {
        if (!this._component) {
            this._component = this.component;
        }
        this._component.init();
        render(this.props.rootQuery, this._component);
    }
}

const isEqual = (lhs: string, rhs: string) => lhs === rhs;