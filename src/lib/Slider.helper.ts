import { SliderOptions } from './Slider.type';

export function getDataAttributes(element: HTMLElement | null): SliderOptions {
	if (!element) return {};
	const dataset = element.dataset;
	let data: any = {};

	for (var key in dataset) {
		if (dataset.hasOwnProperty(key)) {
			var value: any = dataset[key];
			if (['TRUE', 'True', 'true', true].includes(value)) {
				value = true;
			} else if (['FALSE', 'False', 'false', false].includes(value)) {
				value = false;
			} else if (!isNaN(value)) {
				value = Number(value);
			}
			if (value !== 'undefined' && value !== null) {
				data[key] = value;
			}
		}
	}

	return data;
}
