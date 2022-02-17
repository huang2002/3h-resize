// @ts-check
/// <reference types=".." />

const target = document.getElementById('target');
/**
 * @type {HTMLSelectElement}
 */
const sizingControl = document.querySelector('#sizing-control');
/**
 * @type {HTMLOptionElement}
 */
const defaultOption = document.querySelector('.sizing-option[selected]');
/**
 * @type {HTMLInputElement}
 */
const paddingTop = document.querySelector('#padding-top');
/**
 * @type {HTMLInputElement}
 */
const paddingRight = document.querySelector('#padding-right');
/**
 * @type {HTMLInputElement}
 */
const paddingBottom = document.querySelector('#padding-bottom');
/**
 * @type {HTMLInputElement}
 */
const paddingLeft = document.querySelector('#padding-left');
const infoWidth = document.getElementById('info-width');
const infoHeight = document.getElementById('info-height');
const infoLeft = document.getElementById('info-left');
const infoTop = document.getElementById('info-top');
const infoScale = document.getElementById('info-scale');

const resizer = new HR.Resizer({
    target,
    padding: 10,
    width: 480,
    height: 320,
    sizing: HR.Sizing[defaultOption.value],
    callback(result) {
        infoWidth.innerText = result.width.toFixed(2);
        infoHeight.innerText = result.height.toFixed(2);
        infoLeft.innerText = result.left.toFixed(2);
        infoTop.innerText = result.top.toFixed(2);
        infoScale.innerText = result.scale.toFixed(2);
    },
});

const updateResizer = () => {
    resizer.update(result => {
        console.log('resized', result);
    });
};

sizingControl.addEventListener('change', () => {
    resizer.sizing = HR.Sizing[sizingControl.value];
    updateResizer();
});

paddingTop.value = resizer.paddingTop + '';
paddingTop.addEventListener('input', () => {
    resizer.paddingTop = +paddingTop.value;
    updateResizer();
});

paddingRight.value = resizer.paddingRight + '';
paddingRight.addEventListener('input', () => {
    resizer.paddingRight = +paddingRight.value;
    updateResizer();
});

paddingBottom.value = resizer.paddingBottom + '';
paddingBottom.addEventListener('input', () => {
    resizer.paddingBottom = +paddingBottom.value;
    updateResizer();
});

paddingLeft.value = resizer.paddingLeft + '';
paddingLeft.addEventListener('input', () => {
    resizer.paddingLeft = +paddingLeft.value;
    updateResizer();
});
