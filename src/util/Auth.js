import React,{useState} from 'react';
import {Config} from "./Config";

const fe = Object.fromEntries;
const oa = Object.assign;

const initAuthValue = {user:{email:'',password:''},device:{id:''}};
export function AddAuth(){
	const [auth,setAuth] = useState(initAuthValue);
	const subscriptions = window.subscriptions;

	const [showInput,setShowInput] = useState(false);
	const [disableSubmit,setDisableSubmit] = useState(true);

	return showInput?<div>
		<>{[['user',[
				['email','text'],
				['password','text']]],
			['device',[
				['id','number']]]]
			.map(([k,names])=>(
				<>
				{names.map(([name,type])=>(
				<input
					style={{display:'block'}}
					type={type}
					onChange={(e)=>{
						setAuth(oa(
							auth,fe([[k,oa(auth[k],fe([[name,e?.target?.value]]))]])
						));
						setDisableSubmit(!(
							`${auth?.user?.email}` != '' &&
							`${auth?.user?.password}` != '' &&
							`${auth?.device?.id}` != ''
						));
					}}/>
				))}
				</>
		))}</>
			<button
				class="submit"
				disabled={disableSubmit}
				onClick={(e)=>{
					Config.auth.add(auth);
					window.location.reload();
				}}>➕</button>
			<button
				class="cancel"
				onClick={(e)=>{
					setShowInput(false);
				}}>❌</button>
		</div>:
		<button onClick={()=>(setShowInput(true))}>➕</button>
}
