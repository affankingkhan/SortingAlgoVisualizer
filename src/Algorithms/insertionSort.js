export function InsertionSortAnimations(array) {
	const animations = [];
	if (array.length <= 1) return array;
	InsertionSort(array, animations);
	return animations;
}

function InsertionSort(array, animations) {
	for (let i = 0; i < array.length; i++) {
		let j = i;
		while (j > 0 && array[j - 1] > array[j]) {
			animations.push(["color_on", j]);
			animations.push(["color_on", j - 1]);
			animations.push(["color_off", j]);
			animations.push(["color_off", j - 1]);
			animations.push([j, array[j - 1]]);
			animations.push([j - 1, array[j]]);
			Swap(array, j, j - 1);
			j--;
		}
	}
}

function Swap(items, leftIndex, rightIndex) {
	let temp = items[leftIndex];
	items[leftIndex] = items[rightIndex];
	items[rightIndex] = temp;
}
