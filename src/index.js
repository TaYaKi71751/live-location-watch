import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';

import {Subscriptions} from './util/Subscriptions';
import {Config} from './util/Config';
import {Device} from './util/Device';

window.subscriptions = new Subscriptions();
Config.auth.getAll().forEach((auth)=>{
	window.subscriptions.connect(auth);
})

const overlay = document.querySelector('.ol-overlaycontainer-stopevent');
overlay.style.width = 'fit-content';
overlay.style.height = 'fit-content';
overlay.style['pointer-events'] = 'unset';
const root = ReactDOM.createRoot(overlay);
root.render(
	<>
	{window.subscriptions.sockets.map((socket)=>(
		<Device user={socket?.auth?.user} device={socket?.auth?.device}/>
	))}
	</>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
