import { SizingHandler, Sizing, SizingOutput } from './Sizing';
import { debounce, DebounceWrapper } from "3h-utils";

export type ResizeCallback = (result: SizingOutput) => void;

export type ResizerOptions = Partial<{
    /**
     * Whether the resizer is active.
     * (If this is `true`, `update` will be
     * automatically invoked in constructor.)
     * @default true
     */
    active: boolean;
    /**
     * The target element.
     * @default null
     */
    target: HTMLElement | null;
    /**
     * The container element.
     * @default target && target.parentElement
     */
    container: HTMLElement | null;
    /**
     * The desired width of the target.
     * @default 0
     */
    width: number;
    /**
     * The desired height of the target.
     * @default 0
     */
    height: number;
    /**
     * The sizing handler.
     * @default Sizing.center
     */
    sizing: SizingHandler;
    /**
     * The top padding of the container.
     * @default options.padding
     */
    paddingTop: number;
    /**
     * The right padding of the container.
     * @default options.padding
     */
    paddingRight: number;
    /**
     * The bottom padding of the container.
     * @default options.padding
     */
    paddingBottom: number;
    /**
     * The left padding of the container.
     * @default options.padding
     */
    paddingLeft: number;
    /**
     * The default value of `padding*`.
     * @default 0
     */
    padding: number;
    /**
     * The callback that should be invoked on resize.
     * @default null
     */
    callback: ResizeCallback | null;
    /**
     * Whether to invoke `update` on resize events.
     * (Refers to `resize` and `orientationchange` events on `window`.)
     * @default true
     */
    autoResize: boolean;
}>;

export class Resizer {

    /**
     * Constructor of {@link Resizer}.
     */
    constructor(options?: ResizerOptions) {

        const target = options?.target || null;
        this.target = target;

        this.container = options?.container ?? (target && target.parentElement);

        const defaultPadding = options?.padding ?? 0;
        this.paddingTop = options?.paddingTop ?? defaultPadding;
        this.paddingRight = options?.paddingRight ?? defaultPadding;
        this.paddingBottom = options?.paddingBottom ?? defaultPadding;
        this.paddingLeft = options?.paddingLeft ?? defaultPadding;

        this.active = options?.active ?? true;
        this.width = options?.width ?? 0;
        this.height = options?.height ?? 0;
        this.sizing = options?.sizing ?? Sizing.center;
        this.callback = options?.callback || null;

        this.updateSync = this.updateSync.bind(this);
        this.onResize = this.onResize.bind(this);

        this.update = debounce(100, this.updateSync);

        if (options?.autoResize !== false) {
            window.addEventListener('resize', this.onResize);
            window.addEventListener('orientationchange', this.onResize);
        }

        if (this.active) {
            this.update();
        }

    }

    /**
     * Whether the resizer is active.
     * (If this is `true`, `update` will be
     * automatically invoked in constructor.)
     * @default true
     */
    active: boolean;

    /**
     * The target element.
     * @default null
     */
    target: HTMLElement | null;

    /**
     * The container element.
     * @default target && target.parentElement
     */
    container: HTMLElement | null;

    /**
     * The desired width of the target.
     * @default 0
     */
    width: number;

    /**
     * The desired height of the target.
     * @default 0
     */
    height: number;

    /**
     * The sizing handler.
     * @default Sizing.center
     */
    sizing: SizingHandler;

    /**
     * The top padding of the container.
     * @default options.padding
     */
    paddingTop: number;

    /**
     * The right padding of the container.
     * @default options.padding
     */
    paddingRight: number;

    /**
     * The bottom padding of the container.
     * @default options.padding
     */
    paddingBottom: number;

    /**
     * The left padding of the container.
     * @default options.padding
     */
    paddingLeft: number;

    /**
     * The callback that should be invoked on resize.
     * @default null
     */
    callback: ResizeCallback | null;

    /**
     * Resize the target synchronously.
     */
    updateSync(callback?: ResizeCallback) {

        const { target, container } = this;

        if (!this.active || !target || !container) {
            return;
        }

        const { style: targetStyle } = target;
        const containerBounds = container.getBoundingClientRect();

        const result = this.sizing({
            containerWidth: containerBounds.width,
            containerHeight: containerBounds.height,
            paddingTop: this.paddingTop,
            paddingRight: this.paddingRight,
            paddingBottom: this.paddingBottom,
            paddingLeft: this.paddingLeft,
            targetWidth: this.width,
            targetHeight: this.height,
        });

        targetStyle.width = `${result.width}px`;
        targetStyle.height = `${result.height}px`;
        targetStyle.marginLeft = `${result.left}px`;
        targetStyle.marginTop = `${result.top}px`;

        this.callback?.(result);
        callback?.(result);

    }

    /**
     * Update the target asynchronously.
     * (Debounced; Default timeout: 100ms.)
     */
    update: DebounceWrapper<(callback?: ResizeCallback) => void>;

    /**
     * The event listener that invokes `update`.
     * (bound to this)
     */
    onResize() {
        this.update();
    }

}
