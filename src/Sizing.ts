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
export type SizingHandler = (input: SizingInput) => SizingOutput;

/**
 * Built-in sizing handlers.
 */
export namespace Sizing {

    /**
     * Scale target to fill available space.
     * (scale: 1)
     */
    export const fill: SizingHandler = (input) => {
        const { paddingLeft, paddingTop } = input;
        const availableWidth = input.containerWidth - paddingLeft - input.paddingRight;
        const availableHeight = input.containerHeight - paddingTop - input.paddingBottom;
        return {
            width: availableWidth,
            height: availableHeight,
            left: paddingLeft,
            top: paddingTop,
            scale: 1,
        };
    };

    /**
     * Scale target to fill available space.
     * (scale: `availableWidth / targetWidth`)
     */
    export const fixedWidth: SizingHandler = (input) => {
        const { targetWidth, paddingLeft, paddingTop } = input;
        const availableWidth = input.containerWidth - paddingLeft - input.paddingRight;
        const availableHeight = input.containerHeight - paddingTop - input.paddingBottom;
        const scale = availableWidth / targetWidth;
        return {
            width: availableWidth,
            height: availableHeight,
            left: paddingLeft,
            top: paddingTop,
            scale,
        };
    };

    /**
     * Scale target to fill available space.
     * (scale: `availableHeight / targetHeight`)
     */
    export const fixedHeight: SizingHandler = (input) => {
        const { targetHeight, paddingLeft, paddingTop } = input;
        const availableWidth = input.containerWidth - paddingLeft - input.paddingRight;
        const availableHeight = input.containerHeight - paddingTop - input.paddingBottom;
        const scale = availableHeight / targetHeight;
        return {
            width: availableWidth,
            height: availableHeight,
            left: paddingLeft,
            top: paddingTop,
            scale,
        };
    };

    /**
     * Scale target to fill available space and align it in the center.
     * (scale: `min(availableWidth / targetWidth, availableHeight / targetHeight)`)
     */
    export const semifixed: SizingHandler = (input) => {
        const { targetWidth, targetHeight, paddingLeft, paddingTop } = input;
        const availableWidth = input.containerWidth - paddingLeft - input.paddingRight;
        const availableHeight = input.containerHeight - paddingTop - input.paddingBottom;
        const availableRatio = availableWidth / availableHeight;
        const targetRatio = targetWidth / targetHeight;
        if (availableRatio < targetRatio) {
            return fixedWidth(input);
        } else {
            return fixedHeight(input);
        }
    };

    /**
     * Scale target to fit available space and align it in the center.
     * (scale: `min(availableWidth / targetWidth, availableHeight / targetHeight)`)
     */
    export const contain: SizingHandler = (input) => {

        const { targetWidth, targetHeight, paddingLeft, paddingTop } = input;
        const availableWidth = input.containerWidth - paddingLeft - input.paddingRight;
        const availableHeight = input.containerHeight - paddingTop - input.paddingBottom;
        const availableRatio = availableWidth / availableHeight;
        const targetRatio = targetWidth / targetHeight;

        if (availableRatio < targetRatio) {

            const scale = availableWidth / targetWidth;
            const height = targetHeight * scale;

            return {
                width: availableWidth,
                height,
                left: paddingLeft,
                top: (availableHeight - height) / 2 + paddingTop,
                scale,
            };

        } else {

            const scale = availableHeight / targetHeight;
            const width = targetWidth * scale;

            return {
                width,
                height: availableHeight,
                left: (availableWidth - width) / 2 + paddingLeft,
                top: paddingTop,
                scale,
            };

        }

    };

    /**
     * Simply align the target in the center. (scale: 1)
     */
    export const center: SizingHandler = (input) => {
        const { targetWidth, targetHeight, paddingLeft, paddingTop } = input;
        const availableWidth = input.containerWidth - paddingLeft - input.paddingRight;
        const availableHeight = input.containerHeight - paddingTop - input.paddingBottom;
        return {
            width: targetWidth,
            height: targetHeight,
            left: (availableWidth - targetWidth) / 2 + paddingLeft,
            top: (availableHeight - targetHeight) / 2 + paddingTop,
            scale: 1,
        };
    };

}
