import React from 'react';
import {Config} from './Config';

const js = JSON.stringify;
/**
 * @param {{user:{email:string},device:{id:`${number}`}}} props 
 */
export function Device(props){
 const user = props?.user;
 const device = props?.device;
 return <button style={{position:'relative',transform:'translateX(-50%)',left:'50%'}} className='device' id={device?.id}>
		<button style={{display:'table'}} className='device info' id={device?.id}>
			<div className='user email'>{user?.email}</div>
			<div className='device id'>{device?.id}</div>
			<div className='device location'></div>
		</button>
		<button onClick={(e)=>{
			Config.auth.delete({user,device});
			window.subscriptions.sockets.forEach((socket)=>{
				if(
					js(socket.auth) === js({user,device})
				){ socket.disconnect(); e.target.parentElement.remove(); }
			})
	 }}>🗑️</button>
		<button className='device focus' onClick={()=>{
			window.subscriptions.focus = `${window.subscriptions.focus}` === `${device?.id}` ? -1 : device?.id;
			document.querySelectorAll(`[class="device"] > .focus`)
				.forEach((focus)=>{
					focus.textContent = (
						`${window.subscriptions.focus}` === `${focus.parentElement.id}` ?'👀':'😌'
					);
				});
		}}>{`${window.subscriptions.focus}` === `${device?.id}` ? '👀' : '😌'}</button>
		<button className='device place'>📍</button>
	</button>;
}
