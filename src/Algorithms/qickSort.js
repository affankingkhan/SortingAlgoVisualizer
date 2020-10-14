export function QuickSortAnimations(array) {
	var animations = [];
	if (array.length <= 1) return array;
	QuickSort(array, 0, array.length - 1, animations);
	return animations;
}

function QuickSort(array, left, right, animations) {
	let index;
	if (array.length > 1) {
		let index = Partition(array, left, right, animations);
		if (left < index - 1) {
			QuickSort(array, left, index - 1, animations);
		}
		if (index < right) {
			QuickSort(array, index, right, animations);
		}
	}
}

function Partition(items, left, right, animations) {
	let pivIndex = Math.floor((right + left) / 2);
	let pivot = items[pivIndex];
	animations.push(["pivot_on", pivIndex]);
	let i = left;
	let j = right;
	while (i <= j) {
		animations.push(["ip_on", i]);
		while (items[i] < pivot) {
			animations.push(["ip_off", i]);
			i++;
			animations.push(["ip_on", i]);
		}
		animations.push(["ip_on", j]);
		while (items[j] > pivot) {
			animations.push(["ip_off", j]);
			j--;
			animations.push(["ip_on", j]);
		}
		let isSwapped = false;
		if (i <= j) {
			animations.push([i, items[j]]);
			animations.push([j, items[i]]);
			Swap(items, i, j);
			animations.push(["ip_off", i]);
			animations.push(["ip_off", j]);
			isSwapped = true;
			i++;
			j--;
		}
		if (!isSwapped) {
			animations.push(["ip_off", i]);
			animations.push(["ip_off", j]);
		}
	}
	animations.push(["pivot_off", pivIndex]);
	return i;
}

function Swap(items, leftIndex, rightIndex) {
	let temp = items[leftIndex];
	items[leftIndex] = items[rightIndex];
	items[rightIndex] = temp;
}
