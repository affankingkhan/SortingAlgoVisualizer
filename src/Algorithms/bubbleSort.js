export function BubbleSortAnimations(array) {
	const animations = [];
	if (array.length <= 1) return array;
	BubbleSort(array, animations);
	return animations;
}

function BubbleSort(array, animations) {
	for (let i = 1; i < array.length; i++) {
		for (let j = 0; j < array.length - 1; j++) {
			animations.push([i, j]);
			animations.push([i, j]);
			if (array[j] > array[j + 1]) {
				let temp = array[j];
				array[j] = array[j + 1];
				array[j + 1] = temp;
			}
			animations.push([j, array[j]]);
			animations.push([j + 1, array[j + 1]]);
		}
	}
}
