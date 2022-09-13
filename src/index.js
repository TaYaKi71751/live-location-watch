import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';

import {Subscriptions} from './util/Subscriptions';
import {Config} from './util/Config';
import {Device} from './util/Device';
import {AddAuth} from './util/Auth';


window.subscriptions = new Subscriptions();
Config.auth.getAll().forEach((auth)=>{
	window.subscriptions.connect(auth);
});

const overlay = document.querySelector('.ol-overlaycontainer-stopevent');
overlay.style.display = 'contents';
overlay.style.width = 'fit-content';
overlay.style.height = 'fit-content';
overlay.style['pointer-events'] = undefined;


const top_left_overlay = document.querySelector('.ol-zoom.ol-unselectable.ol-control');
top_left_overlay.className = '';
top_left_overlay.style.position = 'absolute';
top_left_overlay.style.width = 'fit-content';
top_left_overlay.style.height = 'fit-content';
top_left_overlay.style['pointer-events'] = undefined;


const App = () => {
	return <><AddAuth/>
	<div style={{'overflow-x':'scroll',width:'min-content',height:'17vh'}} class="devices">{window.subscriptions.sockets.map((socket)=>(
		<Device user={socket?.auth?.user} device={socket?.auth?.device}/>
	))}</div>
		</>
}
const root = ReactDOM.createRoot(top_left_overlay);
root.render(
	<App />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
