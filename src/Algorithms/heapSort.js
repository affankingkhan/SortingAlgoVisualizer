export function HeapSortAnimations(array) {
	const animations = [];
	if (array.length <= 1) return array;
	HeapSort(array, animations);
	return animations;
}

function HeapSort(input, animations) {
	var arrLength = input.length;

	for (let i = Math.floor(arrLength / 2); i >= 0; i -= 1) {
		Heapify(input, arrLength, i, animations);
	}

	for (let i = input.length - 1; i > 0; i--) {
		animations.push([i, input[0]]);
		animations.push([0, input[i]]);
		Swap(input, 0, i);
		arrLength--;

		Heapify(input, arrLength, 0, animations);
	}
}

function Heapify(input, length, i, animations) {
	const left = 2 * i + 1;
	const right = 2 * i + 2;
	let max = i;
	animations.push(["max", max]);

	if (left < length && input[left] > input[max]) {
		animations.push(["color_on", left]);
		animations.push(["color_off", left]);
		animations.push(["color_off", max]);
		max = left;
		animations.push(["max", max]);
	}

	if (right < length && input[right] > input[max]) {
		animations.push(["color_on", right]);
		animations.push(["color_off", right]);
		animations.push(["color_off", max]);
		max = right;
		animations.push(["max", max]);
	}
	animations.push(["color_off", max]);

	if (max !== i) {
		animations.push([i, input[max]]);
		animations.push([max, input[i]]);
		Swap(input, i, max);
		Heapify(input, length, max, animations);
	}
}

function Swap(input, indexA, indexB) {
	const temp = input[indexA];

	input[indexA] = input[indexB];
	input[indexB] = temp;
}
