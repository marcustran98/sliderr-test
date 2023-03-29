import Swiper, { Navigation, Pagination, SwiperOptions } from 'swiper';

function getDataAttributes(element: HTMLElement | undefined): any {
    if (!element) return {};
    const dataset = element.dataset;
    let data: any = {};

    for (var key in dataset) {
        if (dataset.hasOwnProperty(key)) {
            var value: any = dataset[key];

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

export default class Slider {
    $element!: HTMLElement;
    $swiper!: Swiper;

    constructor(el: HTMLElement) {
        if (!el || !(el instanceof HTMLElement)) {
            throw new Error('Wrong');
        }

        this.$element = el;
        this.init();
        this.addClasses();
    }

    private init(): void {
        let options: SwiperOptions = {};

        const wrapper = this.$element.querySelector('.swiper-wrapper');
        const wrapperData = getDataAttributes(wrapper as HTMLElement);

        if (wrapperData.pagination) {
            options = this.addPagination(options);
        }

        if (wrapperData.navigation) {
            options = this.addNavigation(options);
        }

        if (
            wrapperData.slideAutoplaySpeed &&
            !isNaN(Number(wrapperData.slideAutoplaySpeed))
        ) {
            options = {
                ...options,
            };
        }

        options = this.addDirection(wrapperData, options);

        // overall
        options = {
            ...options,
            loop: wrapperData.loop,
            speed: Number(wrapperData.speed) || 100,
        };

        /**
         * Add icon size
         * @values small, medium
         */
        this.addNavigationIconSize(wrapperData.navigationButtonSize);

        this.$swiper = new Swiper(this.$element, options);
    }

    /**
     *
     */
    private addClasses() {
        if (this.$element && this.$element instanceof HTMLElement) {
            this.$element.classList.add('sc-swiper-container');

            if (this.$element.className.includes('horizontal')) {
                this.$element.classList.add('sc-swiper-horizontal');
            }

            if (this.$element.className.includes('vertical')) {
                this.$element.classList.add('sc-swiper-vertical');
            }

            const allChildElements = document.querySelectorAll('[class^="swiper"]');

            allChildElements.forEach((element) => {
                element.classList.add('sc-' + element.classList[0]);
            });
        }
    }

    private addDirection(wrapperData: any, options: SwiperOptions) {
        const direction =
            typeof wrapperData.direction === 'string' &&
                (wrapperData.direction === 'horizontal' ||
                    wrapperData.direction === 'vertical')
                ? wrapperData.direction
                : 'horizontal';

        options = {
            ...options,
            direction,
        };

        return options;
    }

    private addNavigationIconSize(size: string) {
        if (typeof size !== 'string') {
            return;
        }

        const nextBtn = this.$element.querySelector('.swiper-button-next');
        const prevBtn = this.$element.querySelector('.swiper-button-prev');
        prevBtn && prevBtn.classList.add(`sc-swiper-button-prev--size-${size}`);
        nextBtn && nextBtn.classList.add(`sc-swiper-button-next--size-${size}`);
    }

    private addNavigation(options: SwiperOptions): SwiperOptions {
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

    private addPagination(options: SwiperOptions): SwiperOptions {
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
}
