import { Props } from '../core/component.js';

export interface Meta {
    tagName: string;
    className: string;
    props: Props;
}

export interface IComponent {
    init(): void;
    componentDidMount(): void;
    setProps(nextProps: Props): void;
    componentDidUpdate(oldProps: Props, newProps: Props): boolean;
    _render(): void;
    render(): string;
    show(): void;
    hide(): void;
    _destroy(): void;
    destroy(): void;
    element: HTMLElement | null;
}