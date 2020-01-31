import React, { useEffect, useRef, useState } from 'react';
import CameraFactory from './components/CameraFactory';

function App() {
	return (
		<div className="App">
			<h1>Cams</h1>
			<CameraFactory />
		</div>
	);
}

export default App;
