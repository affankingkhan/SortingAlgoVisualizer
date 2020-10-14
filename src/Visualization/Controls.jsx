import React, { useState, useEffect } from "react";
import {
	Card,
	CardBody,
	CardTitle,
	Form,
	FormGroup,
	Label,
	Input,
} from "reactstrap";

import InputRange from "react-input-range";
import "react-input-range/lib/css/index.css";

import "./SortingVisuals.css";
import { MergeSortAnimations } from "../Algorithms/mergeSort";
import { BubbleSortAnimations } from "../Algorithms/bubbleSort";
import { QuickSortAnimations } from "../Algorithms/qickSort";
import { InsertionSortAnimations } from "../Algorithms/insertionSort";
import { HeapSortAnimations } from "../Algorithms/heapSort";

const PRIMARY_COLOR = "cyan";

const SECONDARY_COLOR = "red";

const FIXED_COLOR = "orange";

const PIVOT_COLOR = "purple";

const NOT_SORTED = "Not Sorted";
const CURRENTLY_SORTING = "Currently Sorting";
const SORTED = "Sorted";

export const Controls = (props) => {
	/**
	 * State Functions
	 */

	const [fixedState, setFixedState] = useState({
		barsRange: {
			min: 9,
			max: 200,
		},
		speedRange: {
			min: 1,
			max: 20,
		},
	});
	const [bars, setBars] = useState([]);
	const [barsCount, setBarsCount] = useState(195);
	const [sortingMethod, setSortingMethod] = useState("Quick Sort");
	const [sortingSpeed, setSortingSpeed] = useState(2);
	const [sortingState, setSortingState] = useState(NOT_SORTED);
	const [disabled, setDisabled] = useState(false);

	/**
	 * Change handlers
	 */

	const changeSortingAlgo = (e) => {
		setSortingMethod(e.target.value);
	};

	const changeNumberOfBars = (newBarCount) => {
		setBarsCount(newBarCount);
	};

	const changeSortingSpeed = (newSortingSpeed) => {
		setSortingSpeed(newSortingSpeed);
	};

	const resetArray = () => {
		const array = [];
		for (let i = 0; i < barsCount; i++) {
			array.push(randomIntFromInterval(5, 730));
		}
		setBars(array);
	};

	useEffect(() => {
		resetArray();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [barsCount]);

	/**
	 *
	 * Sorting Logic
	 */

	const sortBars = (e) => {
		e.preventDefault();
		// setDisabled(true);
		switch (sortingMethod) {
			case "Merge Sort":
				mergeSort();
				break;
			case "Bubble Sort":
				bubbleSort();
				break;
			case "Quick Sort":
				quickSort();
				break;
			case "Insertion Sort":
				insertionSort();
				break;
			case "Heap Sort":
				heapSort();
				break;
			default:
				console.log("CAN'T SORT NO VALID SORTING METHOD PICKED");
		}
	};

	const mergeSort = () => {
		let animations = MergeSortAnimations(bars);
		for (let i = 0; i < animations.length; i++) {
			const arrayBars = document.getElementsByClassName("array-bar");
			const isColorChange = i % 3 !== 2;
			if (isColorChange) {
				const [barOneIdx, barTwoIdx] = animations[i];
				const barOneStyle = arrayBars[barOneIdx].style;
				const barTwoStyle = arrayBars[barTwoIdx].style;
				const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
				setTimeout(() => {
					barOneStyle.backgroundColor = color;
					barTwoStyle.backgroundColor = color;
				}, i * sortingSpeed);
			} else {
				setTimeout(() => {
					const [barOneIdx, newHeight] = animations[i];
					const barOneStyle = arrayBars[barOneIdx].style;
					barOneStyle.height = `${newHeight}px`;
				}, i * sortingSpeed);
			}
		}
	};

	const bubbleSort = () => {
		let animations = BubbleSortAnimations(bars);
		for (let i = 0; i < animations.length; i++) {
			const arrayBars = document.getElementsByClassName("array-bar");
			const isColorChange = i % 4 === 0 || i % 4 === 1;
			if (isColorChange) {
				const [barOneIdx, barTwoIdx] = animations[i];
				const barOneStyle = arrayBars[barOneIdx].style;
				const barTwoStyle = arrayBars[barTwoIdx].style;
				const color = i % 4 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
				setTimeout(() => {
					barOneStyle.backgroundColor = color;
					barTwoStyle.backgroundColor = color;
				}, i * sortingSpeed);
			} else {
				setTimeout(() => {
					const [barOneIdx, newHeight] = animations[i];
					const barOneStyle = arrayBars[barOneIdx].style;
					barOneStyle.height = `${newHeight}px`;
				}, i * sortingSpeed);
			}
		}
	};

	const quickSort = () => {
		let animations = QuickSortAnimations(bars);
		// console.log(animations);
		for (let i = 0; i < animations.length; i++) {
			const arrayBars = document.getElementsByClassName("array-bar");
			let animation = animations[i];
			if (
				animation[0] === "pivot_on" ||
				animation[0] === "pivot_off" ||
				animation[0] === "ip_on" ||
				animation[0] === "ip_off"
			) {
				const barIndex = animation[1];
				const barToChangeColor = arrayBars[barIndex].style;
				let color = PRIMARY_COLOR;
				switch (animation[0]) {
					case "pivot_on":
						color = PIVOT_COLOR;
						break;
					case "pivot_off":
						color = PRIMARY_COLOR;
						break;
					case "ip_on":
						color = SECONDARY_COLOR;
						break;
					case "ip_off":
						color = PRIMARY_COLOR;
						break;
					default:
						color = PRIMARY_COLOR;
				}

				changeBarColor(barToChangeColor, color, i);
			} else {
				const [barOneIdx, newHeight] = animations[i];
				const barToChangeHeight = arrayBars[barOneIdx].style;
				changeBarHeight(barToChangeHeight, newHeight, i);
			}
		}
	};

	const insertionSort = () => {
		let animations = InsertionSortAnimations(bars);
		for (let i = 0; i < animations.length; i++) {
			const arrayBars = document.getElementsByClassName("array-bar");
			let animation = animations[i];
			if (animation[0] === "color_on" || animation[0] === "color_off") {
				const barIndex = animation[1];
				const barToChangeColor = arrayBars[barIndex].style;
				let color =
					animation[0] === "color_on"
						? SECONDARY_COLOR
						: PRIMARY_COLOR;
				changeBarColor(barToChangeColor, color, i);
			} else {
				const [barOneIdx, newHeight] = animations[i];
				const barToChangeHeight = arrayBars[barOneIdx].style;
				changeBarHeight(barToChangeHeight, newHeight, i);
			}
		}
	};

	const heapSort = () => {
		let animations = HeapSortAnimations(bars);
		// console.log(animations);
		for (let i = 0; i < animations.length; i++) {
			const arrayBars = document.getElementsByClassName("array-bar");
			let animation = animations[i];
			if (
				animation[0] === "max" ||
				animation[0] === "color_on" ||
				animation[0] === "color_off"
			) {
				const barIndex = animation[1];
				const barToChangeColor = arrayBars[barIndex].style;
				let color;
				switch (animation[0]) {
					case "max":
						color = PIVOT_COLOR;
						break;
					case "color_on":
						color = SECONDARY_COLOR;
						break;
					case "color_off":
						color = PRIMARY_COLOR;
						break;
					default:
						color = PRIMARY_COLOR;
				}
				changeBarColor(barToChangeColor, color, i);
			} else {
				const [barOneIdx, newHeight] = animations[i];
				const barToChangeHeight = arrayBars[barOneIdx].style;
				changeBarHeight(barToChangeHeight, newHeight, i);
			}
		}
	};

	const changeBarHeight = (barToChangeHeight, height, i) => {
		setTimeout(() => {
			barToChangeHeight.height = `${height}px`;
		}, i * sortingSpeed);
	};
	const changeBarColor = (barToChangeColor, color, i) => {
		setTimeout(() => {
			barToChangeColor.backgroundColor = color;
		}, i * sortingSpeed);
	};

	return (
		<div>
			<Card>
				<CardTitle>Controls</CardTitle>
				<CardBody>
					<Form onSubmit={sortBars}>
						<FormGroup>
							<div className='col-12'>
								<div className='row'>
									<div className='col-4'>
										<Label
											className='float-left'
											for='exampleSelect'
										>
											Sorting Algorithm
										</Label>
										<Input
											type='select'
											name='select'
											id='sorting-algo-select'
											onChange={changeSortingAlgo}
											value={sortingMethod}
											disabled={disabled}
										>
											<option>Merge Sort</option>
											<option>Bubble Sort</option>
											<option>Quick Sort</option>
											<option>Insertion Sort</option>
											<option>Heap Sort</option>
										</Input>
									</div>

									<div className='col-4'>
										<Label
											className='float-left'
											for='barRange'
										>
											Number of Bars
										</Label>
										<br />
										<br />
										<InputRange
											maxValue={fixedState.barsRange.max}
											minValue={fixedState.barsRange.min}
											value={barsCount}
											onChange={changeNumberOfBars}
											disabled={disabled}
										/>
									</div>

									<div className='col-4'>
										<Label
											className='float-left'
											for='speedRange'
										>
											Sort Speed (ms)
										</Label>
										<br />
										<br />
										<InputRange
											maxValue={fixedState.speedRange.max}
											minValue={fixedState.speedRange.min}
											value={sortingSpeed}
											onChange={changeSortingSpeed}
											disabled={disabled}
										/>
									</div>
								</div>
								<br />
								<br />
								<div>
									<input
										className='btn btn-primary float-right'
										type='submit'
										value='Sort'
										disabled={disabled}
									/>
									<input
										onClick={resetArray}
										className='btn btn-secondary float-right mr-1'
										type='button'
										value='Generate New Array'
										disabled={disabled}
									/>
								</div>
							</div>
						</FormGroup>
					</Form>
				</CardBody>
			</Card>
			<br />
			<BarGraphRender array={bars}></BarGraphRender>
		</div>
	);
};

const BarGraphRender = (props) => {
	let array = props.array;
	let bars = "";
	if (array) {
		bars = array.map((value, idx) => (
			<div
				id={idx}
				className='array-bar'
				key={idx}
				style={{
					backgroundColor: PRIMARY_COLOR,
					height: `${value}px`,
					width: "4px",
				}}
			></div>
		));
	}
	return <div className='array-container center'>{bars}</div>;
};

function randomIntFromInterval(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}
