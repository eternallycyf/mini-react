(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global['mini-react'] = global['mini-react'] || {})));
}(this, (function (exports) { 'use strict';

function render(element, parentDom) {
  const { type, props } = element;

  const isTextElement = type === 'TEXT_ELEMENT';
  const dom = isTextElement
    ? document.createTextNode('')
    : document.createElement(type);

  const isListener = (name) => name.startsWith('on');
  Object.keys(props)
    .filter(isListener)
    .forEach((name) => {
      const eventType = name.toLowerCase().substring(2);
      dom.addEventListener(eventType, props[name]);
    });

  const isAttribute = (name) => !isListener(name) && name != 'children';
  Object.keys(props)
    .filter(isAttribute)
    .forEach((name) => {
      dom[name] = props[name];
    });

  const childElements = props.children || [];
  childElements.forEach((childElement) => render(childElement, dom));

  parentDom.appendChild(dom);
}

exports.render = render;

Object.defineProperty(exports, '__esModule', { value: true });

})));
