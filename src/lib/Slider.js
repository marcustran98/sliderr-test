"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var swiper_1 = require("swiper");
function getDataAttributes(element) {
    if (!element)
        return {};
    var dataset = element.dataset;
    var data = {};
    for (var key in dataset) {
        if (dataset.hasOwnProperty(key)) {
            var value = dataset[key];
            if (['TRUE', 'True', 'true', true].includes(value)) {
                value = true;
            }
            if (['FALSE', 'False', 'false', false].includes(value)) {
                value = false;
            }
            if (!isNaN(value)) {
                value = Number(value);
            }
            data[key] = value;
        }
    }
    return data;
}
var Slider = /** @class */ (function () {
    function Slider(el) {
        if (!el || !(el instanceof HTMLElement)) {
            throw new Error('Wrong');
        }
        this.$element = el;
        this.init();
        this.addClasses();
    }
    Slider.prototype.init = function () {
        var options = {};
        var wrapper = this.$element.querySelector('.swiper-wrapper');
        var wrapperData = getDataAttributes(wrapper);
        if (wrapperData.pagination) {
            options = this.addPagination(options);
        }
        if (wrapperData.navigation) {
            options = this.addNavigation(options);
        }
        if (wrapperData.slideAutoplaySpeed &&
            !isNaN(Number(wrapperData.slideAutoplaySpeed))) {
            options = __assign({}, options);
        }
        options = this.addDirection(wrapperData, options);
        // overall
        options = __assign(__assign({}, options), { loop: wrapperData.loop, speed: Number(wrapperData.speed) || 100 });
        /**
         * Add icon size
         * @values small, medium
         */
        this.addNavigationIconSize(wrapperData.navigationButtonSize);
        this.$swiper = new swiper_1["default"](this.$element, options);
    };
    /**
     *
     */
    Slider.prototype.addClasses = function () {
        if (this.$element && this.$element instanceof HTMLElement) {
            this.$element.classList.add('sc-swiper-container');
            if (this.$element.className.includes('horizontal')) {
                this.$element.classList.add('sc-swiper-horizontal');
            }
            if (this.$element.className.includes('vertical')) {
                this.$element.classList.add('sc-swiper-vertical');
            }
            var allChildElements = document.querySelectorAll('[class^="swiper"]');
            allChildElements.forEach(function (element) {
                element.classList.add('sc-' + element.classList[0]);
            });
        }
    };
    Slider.prototype.addDirection = function (wrapperData, options) {
        var direction = typeof wrapperData.direction === 'string' &&
            (wrapperData.direction === 'horizontal' ||
                wrapperData.direction === 'vertical')
            ? wrapperData.direction
            : 'horizontal';
        options = __assign(__assign({}, options), { direction: direction });
        return options;
    };
    Slider.prototype.addNavigationIconSize = function (size) {
        if (typeof size !== 'string') {
            return;
        }
        var nextBtn = this.$element.querySelector('.swiper-button-next');
        var prevBtn = this.$element.querySelector('.swiper-button-prev');
        prevBtn && prevBtn.classList.add("sc-swiper-button-prev--size-".concat(size));
        nextBtn && nextBtn.classList.add("sc-swiper-button-next--size-".concat(size));
    };
    Slider.prototype.addNavigation = function (options) {
        options = __assign(__assign({}, options), {
            navigation: {
                enabled: true,
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev'
            }
        });
        if (!Array.isArray(options.modules)) {
            options.modules = [];
        }
        options.modules.push(swiper_1.Navigation);
        return options;
    };
    Slider.prototype.addPagination = function (options) {
        options = __assign(__assign({}, options), {
            pagination: {
                el: '.swiper-pagination',
                clickable: true
            }
        });
        if (!Array.isArray(options.modules)) {
            options.modules = [];
        }
        options.modules.push(swiper_1.Pagination);
        return options;
    };
    return Slider;
}());
exports["default"] = Slider;
