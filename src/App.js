import React from "react";
import { Main } from "./Visualization/Main";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
	return (
		<div className='App custom-header'>
			<br/>
			<h2 className='white-font'>Sorting Visualizer</h2>
			<br/>
			<Main></Main>
		</div>
	);
}

export default App;
