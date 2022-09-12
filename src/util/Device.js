import React from 'react';
import {Config} from './Config';
/**
 * @param {{user:{email:string},device:{id:`${number}`}}} props 
 */
export function Device(props){
 const user = props?.user;
 const device = props?.device;
 return <button className='device' id={device?.id}>
		<button className='device info' id={device?.id}>
			<div className='user email'>{user?.email}</div>
			<div className='device id'>{device?.id}</div>
			<div className='device location'></div>
		</button>
		<button onClick={()=>(Config.auth.delete({user,device}))}>🗑️</button>
		<button className='device focus' onClick={()=>(
			window.subscriptions.focus = `${window.subscriptions.focus}` === `${device?.id}` ? -1 : device?.id,
			document.querySelectorAll(`[class="device"] > .focus`)
				.forEach((focus)=>{
					focus.textContent = (
						`${window.subscriptions.focus}` === `${focus.parentElement.id}` ?'👀':'😌'
					);
				})
		)}>{`${window.subscriptions.focus}` === `${device?.id}` ? '👀' : '😌'}</button>
		<button className='device place'>📍</button>
	</button>;
}
