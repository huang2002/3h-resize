# 3h-resize

> A front-end resizing lib.

## API Reference

```typescript
// Supports both UMD and ECMAScripts imports.
export as namespace HR;

// Using `debounce` helper from `3h-utils`.
import { DebounceWrapper } from "3h-utils";

/**
 * Type of input data of sizing handlers.
 */
export interface SizingInput {
    paddingTop: number;
    paddingRight: number;
    paddingBottom: number;
    paddingLeft: number;
    containerWidth: number;
    containerHeight: number;
    targetWidth: number;
    targetHeight: number;
}

/**
 * Type of output results of sizing handlers.
 */
export interface SizingOutput {
    width: number;
    height: number;
    left: number;
    top: number;
    scale: number;
}

/**
 * Type of sizing handlers.
 */
export declare type SizingHandler = (input: SizingInput) => SizingOutput;

/**
 * Built-in sizing handlers.
 */
export declare namespace Sizing {
    /**
     * Scale target to fill available space.
     * (scale: 1)
     */
    const fill: SizingHandler;
    /**
     * Scale target to fill available space.
     * (scale: `availableWidth / targetWidth`)
     */
    const fixedWidth: SizingHandler;
    /**
     * Scale target to fill available space.
     * (scale: `availableHeight / targetHeight`)
     */
    const fixedHeight: SizingHandler;
    /**
     * Scale target to fill available space and align it in the center.
     * (scale: `min(availableWidth / targetWidth, availableHeight / targetHeight)`)
     */
    const semifixed: SizingHandler;
    /**
     * Scale target to fit available space and align it in the center.
     * (scale: `min(availableWidth / targetWidth, availableHeight / targetHeight)`)
     */
    const contain: SizingHandler;
    /**
     * Simply align the target in the center. (scale: 1)
     */
    const center: SizingHandler;
}

export declare type ResizeCallback = (result: SizingOutput) => void;

export declare type ResizerOptions = Partial<{
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

export declare class Resizer {
    /**
     * Constructor of {@link Resizer}.
     */
    constructor(options?: ResizerOptions);
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
    updateSync(callback?: ResizeCallback): void;
    /**
     * Update the target asynchronously.
     * (Debounced; Default timeout: 100ms.)
     */
    update: DebounceWrapper<(callback?: ResizeCallback) => void>;
    /**
     * The event listener that invokes `update`.
     * (bound to this)
     */
    onResize(): void;
}
```
