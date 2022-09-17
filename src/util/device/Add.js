import React, { useState } from 'react';
import styles from './Add.module.css';

import { Config } from '../Config';

const oa = Object.assign;
const fe = Object.fromEntries;

export function Add () {
	const initInput = { user: { email: '', password: '' }, device: { id: '' } };
	const [buttonDisabled, setButtonDisabled] = useState(true);
	const [input, setInput] = useState(initInput);
	return <div className={styles.Add}>
		{[['user', [
			['Email', 'text'],
			['Password', 'text']]],
		['device', [
			['ID', 'number']]]].map(([k, classNames]) => (
			<>{classNames.map((className) => (
				<input
					className={styles[className]}
					key=""
					onChange={(e) => {
						const si = setInput;
						const sbd = setButtonDisabled;
						if (
							!input?.user?.email ||
							!input?.user?.password ||
							!input?.device?.id ||
							Config.auth.getAll()
								.filter((auth) => (
									`${auth.user.email}` === `${input?.user?.email}` &&
									`${auth.user.password}` === `${input?.user?.password}` &&
									`${auth.device.id}` === `${input?.device?.id}`
								)).length
						) { sbd(true); } else { si(oa(input, oa(input[className.toLowerCase()], fe([[className.toLowerCase(), e.target.value]])))); sbd(false); }
					}}/>
			))}</>
		))}
		<div
			onClick={() => (Config.auth.add(input))}
			className={styles.Button}
			disabled={buttonDisabled}>➕</div>
	</div>;
}
