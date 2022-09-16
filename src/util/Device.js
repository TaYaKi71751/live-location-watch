import React, { useState } from 'react';
import styles from './Device.module.css';

/**
 * @param {{id:`${number}`}} props
 */
export function Device (props) {
	const [showChildren, setShowChildren] = useState(false);
	const onClick = (e) => { setShowChildren(!showChildren); };
	return <div className={styles.Device} id={props?.id} onClick={onClick}>
		<div className={styles.DeviceID}>{props?.id}</div>
		<span style={{ display: (showChildren ? 'contents' : 'none') }}>
			{props?.children || <></>}
		</span>
	</div>;
}
