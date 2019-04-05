(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Direction;
(function (Direction) {
    Direction["Left"] = "left";
    Direction["Right"] = "right";
})(Direction = exports.Direction || (exports.Direction = {}));
class Timeline {
    constructor(element, checkpoints) {
        this._lineWidth = 2;
        this._circleRadius = 10;
        this._circlePadding = 5;
        this._connectionWidth = 30;
        this._heights = [];
        this._textWidth = 280;
        this._direction = Direction.Left;
        this.element = element;
        this._renderVerticalLine(this._connectionWidth);
        for (let i = 0; i < checkpoints.length; i++) {
            this._renderCheckpoint(checkpoints[i]);
            this._renderVerticalLine(this.element.lastElementChild.offsetHeight);
            this._direction = this._direction == Direction.Right
                ? Direction.Left
                : Direction.Right;
        }
        this.element.style.position = 'relative';
        this.element.style.height = `${this._heights.reduce((total, current) => total += current, 0)}px`;
    }
    _renderText(checkpoint) {
        let container = document.createElement('div');
        let titleElement = document.createElement('h3');
        titleElement.classList.add('title');
        titleElement.innerHTML = checkpoint.title;
        container.appendChild(titleElement);
        if (checkpoint.subtitle) {
            let subTitleElement = document.createElement('h5');
            subTitleElement.classList.add('sub-title');
            subTitleElement.innerHTML = checkpoint.subtitle;
            container.appendChild(subTitleElement);
        }
        let textElement = document.createElement('p');
        textElement.classList.add('text');
        textElement.innerHTML = checkpoint.body;
        container.appendChild(textElement);
        this.element.appendChild(container);
        let top = this._heights.reduce((total, current) => total += current, 0)
            + this._circlePadding
            + this._circleRadius / 2
            - this._lineWidth / 2
            - titleElement.offsetHeight / 2
            - parseFloat(getComputedStyle(titleElement).marginTop);
        container.style.position = 'absolute';
        container.style.top = `${top}px`;
        container.style.width = `${this._textWidth}px`;
        if (this._direction == Direction.Right) {
            container.style.left = `calc(50% + ${this._circleRadius / 2}px + ${this._circlePadding * 2}px + ${this._connectionWidth}px)`;
        }
        else {
            container.style.textAlign = 'right';
            container.style.left = `calc(50% - ${this._circleRadius / 2}px - ${this._circlePadding * 2}px - ${this._connectionWidth}px - ${container.offsetWidth}px)`;
        }
    }
    _renderCheckpoint(checkpoint) {
        this._renderCheckpoinCircle();
        this._renderCheckpointCircleLine();
        this._renderText(checkpoint);
        this._heights.push(this._circleRadius);
        this._heights.push(this._circlePadding);
        this._heights.push(this._circlePadding);
    }
    _renderCheckpoinCircle() {
        let circle = document.createElement('div');
        let top = this._heights.reduce((total, current) => total += current, 0) + this._circlePadding;
        circle.classList.add('circle');
        circle.style.position = 'absolute';
        circle.style.top = `${top}px`;
        circle.style.left = `calc(50% - ${this._circleRadius / 2}px)`;
        circle.style.width = `${this._circleRadius}px`;
        circle.style.height = `${this._circleRadius}px`;
        circle.style.borderRadius = `${this._circleRadius / 2}px`;
        this.element.appendChild(circle);
    }
    _renderCheckpointCircleLine() {
        let line = document.createElement('div');
        let top = this._heights.reduce((total, current) => total += current, 0)
            + this._circlePadding + this._circleRadius / 2
            - this._lineWidth / 2;
        line.classList.add('circle-line');
        line.style.position = 'absolute';
        line.style.top = `${top}px`;
        line.style.width = `${this._connectionWidth}px`;
        line.style.height = `${this._lineWidth}px`;
        line.style.borderRadius = `${this._lineWidth / 2}px`;
        if (this._direction == Direction.Right) {
            line.style.left = `calc(50% + ${this._circleRadius / 2}px + ${this._circlePadding}px)`;
        }
        else if (this._direction == Direction.Left) {
            line.style.left = `calc(50% - ${this._circleRadius / 2}px - ${this._circlePadding}px - ${this._connectionWidth}px)`;
        }
        this.element.appendChild(line);
    }
    _renderVerticalLine(height) {
        let line = document.createElement('div');
        let top = this._heights.reduce((total, current) => total += current, 0);
        line.classList.add('line');
        line.style.position = 'absolute';
        line.style.top = `${top}px`;
        line.style.left = `calc(50% - ${this._lineWidth / 2}px)`;
        line.style.width = `${this._lineWidth}px`;
        line.style.height = `${height}px`;
        line.style.borderRadius = `${this._lineWidth / 2}px`;
        this._heights.push(height);
        this.element.appendChild(line);
    }
}
exports.Timeline = Timeline;

},{}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Timeline_1 = require("./Timeline");
Object.defineProperty(window, 'timeline', {
    get: () => (element, checkpoints) => new Timeline_1.Timeline(element, checkpoints)
});

},{"./Timeline":1}]},{},[2]);
