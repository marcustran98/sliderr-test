import Swiper, {
    Autoplay,
    Navigation,
    Pagination,
    SwiperOptions,
} from 'swiper';
import { getDataAttributes } from './Slider.helper';
import {
    BreakPoints,
    BreakPointsType,
    NavigationButtonSize,
    SliderOptions,
} from './Slider.type';


export default class Slider {
    private $element!: HTMLElement;
    $swiper!: Swiper;

    constructor(el: HTMLElement) {
        if (!el || !(el instanceof HTMLElement)) {
            throw new Error('Element not found');
        }

        this.$element = el;
        this.init();
        this.addDirectionClasses();
        this.handleEventListener();
    }

    private init(): void {
        let options: SwiperOptions = {};
        const dataAttributes = getDataAttributes(this.$element);

        if (dataAttributes.pagination) {
            options = this.addPaginationOptions(options);
            this.addPaginationElement();
            this.addPaginationBulletClasses();
        }

        if (dataAttributes.navigation) {
            options = this.addNavigationOptions(options);
            this.addNavigationElement();
        }

        if (dataAttributes.hideArrows) {
            this.handleHideArrowButtons();
        }

        options = this.addBreakPoint(dataAttributes, options);
        options = this.addSlideAutoplaySpeed(dataAttributes, options);

        // overall
        options = {
            ...options,
            direction: 'horizontal',
            loop: dataAttributes.loop || false,
            speed: Number(dataAttributes.speed) || 100,
            slidesPerView: Number(dataAttributes.slidesPerView) || 1,
            spaceBetween: Number(dataAttributes.spaceBetween) || 0,
            observer: !!dataAttributes.observer || false,
        };

        this.addNavigationIconSize(dataAttributes.navigationButtonSize || 'medium');
        this.addLayoutDir(dataAttributes);
        this.$swiper = new Swiper(this.$element, options);
    }

    private handleEventListener() {
        this.$swiper.on('slideChange', (e) => {
            const slideChangeEvent = new CustomEvent('slideChange', {
                detail: {
                    activeIndex: e.activeIndex,
                },
            });
            this.$element.dispatchEvent(slideChangeEvent);
        });

        this.$swiper.on('observerUpdate', (e) => {
            const observerUpdate = new CustomEvent('observerUpdate', {
                detail: e,
            });
            this.$element.dispatchEvent(observerUpdate);
        });
    }

    private addLayoutDir(dataAttributes: SliderOptions) {
        const dir =
            typeof dataAttributes.dir === 'string' &&
                ['ltr', 'rtl'].includes(dataAttributes.dir)
                ? dataAttributes.dir
                : 'ltf';
        this.$element.setAttribute('dir', dir);
    }

    private addDirectionClasses() {
        if (this.$element.className.includes('horizontal')) {
            this.$element.classList.add('sc-slider-horizontal');
        }

        // TODO: Add classes for vertical
    }

    private addPaginationElement() {
        const paginationEl = document.createElement('div');
        paginationEl.classList.add('sc-slider-pagination');
        paginationEl.classList.add('swiper-pagination');
        this.$element.appendChild(paginationEl);
    }

    private addPaginationBulletClasses() {
        const paginationEl = this.$element.querySelector('.sc-slider-pagination');
        if (paginationEl) {
            // to wait swiperjs create bullet elements
            setTimeout(() => {
                const bullets = paginationEl.querySelectorAll(
                    '.swiper-pagination-bullet'
                );

                bullets.forEach((bullet) => {
                    bullet.classList.add('sc-slider-pagination-bullet');
                });
            });
        }
    }

    private addBreakPoint(dataAttributes: SliderOptions, options: SwiperOptions) {
        const { numberOfItemsDesktop, numberOfItemsMobile } = dataAttributes;

        const breakpoints: BreakPointsType = {};

        if (typeof numberOfItemsDesktop === 'number' && !!numberOfItemsDesktop) {
            breakpoints[BreakPoints.Desktop] = {
                slidesPerView: numberOfItemsDesktop,
                spaceBetween: Number(dataAttributes.spaceBetween) || 0,
            };
        }
        if (typeof numberOfItemsMobile === 'number' && !!numberOfItemsMobile) {
            breakpoints[BreakPoints.Mobile] = {
                slidesPerView: numberOfItemsMobile,
                spaceBetween: Number(dataAttributes.spaceBetween) || 0,
            };
        }
        return { ...options, breakpoints };
    }

    private addNavigationElement() {
        const nextButton = document.createElement('div');
        nextButton.classList.add('sc-slider-button-next');
        nextButton.classList.add('swiper-button-next');

        const prevButton = document.createElement('div');
        prevButton.classList.add('sc-slider-button-prev');
        prevButton.classList.add('swiper-button-prev');

        this.$element.appendChild(nextButton);
        this.$element.appendChild(prevButton);
    }

    private addNavigationIconSize(size: NavigationButtonSize) {
        if (typeof size !== 'string') {
            return;
        }

        const nextBtn = this.$element.querySelector('.swiper-button-next');
        const prevBtn = this.$element.querySelector('.swiper-button-prev');
        prevBtn?.classList.add(`sc-slider-button--${size}`);
        nextBtn?.classList.add(`sc-slider-button--${size}`);
    }

    private addNavigationOptions(options: SwiperOptions): SwiperOptions {
        options = {
            ...options,
            navigation: {
                enabled: true,
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
        };

        if (!Array.isArray(options.modules)) {
            options.modules = [];
        }
        options.modules.push(Navigation);

        return options;
    }

    private addPaginationOptions(options: SwiperOptions): SwiperOptions {
        options = {
            ...options,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
        };

        if (!Array.isArray(options.modules)) {
            options.modules = [];
        }
        options.modules.push(Pagination);

        return options;
    }

    private addSlideAutoplaySpeed(
        dataAttributes: SliderOptions,
        options: SwiperOptions
    ): SwiperOptions {
        if (
            typeof dataAttributes === 'object' &&
            !Array.isArray(dataAttributes) &&
            (dataAttributes.slideAutoplaySpeed || dataAttributes.slideInfinite)
        ) {
            const DELAY_TIME = 3000;
            options = {
                ...options,
                autoplay: {
                    delay:
                        typeof dataAttributes.slideAutoplaySpeed === 'number' &&
                            !!dataAttributes.slideAutoplaySpeed
                            ? dataAttributes.slideAutoplaySpeed
                            : DELAY_TIME,
                },
            };

            if (!Array.isArray(options.modules)) {
                options.modules = [];
            }
            options.modules.push(Autoplay);
        }

        return options;
    }

    private handleHideArrowButtons(): void {
        const nextBtn = this.$element.querySelector('.swiper-button-next');
        const prevBtn = this.$element.querySelector('.swiper-button-prev');
        prevBtn?.classList.add(`sc-slider-button-prev--hidden`);
        nextBtn?.classList.add(`sc-slider-button-next--hidden`);
    }
}
