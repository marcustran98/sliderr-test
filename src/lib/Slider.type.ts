import { SwiperOptions } from 'swiper';

export type NavigationButtonSize = 'small' | 'medium';

export type BreakPointsType = {
	[width: number]: SwiperOptions;
	[ratio: string]: SwiperOptions;
};
export interface SliderOptions {
	dir?: 'rtl' | 'ltr';
	hideArrows?: boolean;
	loadedModule?: number;
	loop?: boolean;
	navigation?: boolean;
	navigationButtonSize?: NavigationButtonSize;
	pagination?: boolean;
	slideAutoplaySpeed?: number;
	slideInfinite?: boolean;
	speed?: number;
	slidesPerView?: number;
	spaceBetween?: number;
	numberOfItemsDesktop?: number;
	numberOfItemsMobile?: number;
	observer?: boolean;
}

export enum BreakPoints {
	Desktop = 1024,
	Mobile = 0,
}
