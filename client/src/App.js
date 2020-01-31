import React, { useEffect, useRef, useState } from 'react';
import CameraFactory from './components/CameraFactory';

function App() {
	const config = {
		ratio: {
			width: '400',
			height: '300'
		}
	};
	return (
		<div className="App">
			<h1>Cams</h1>
			<CameraFactory config={config} />
		</div>
	);
}

export default App;
