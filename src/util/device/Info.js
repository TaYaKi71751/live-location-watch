import React, { useState } from 'react';
import styles from './Info.module.css';

/**
 * @param {{id:`${number}`}} props
 */
export function Info (props) {
	const [showChildren, setShowChildren] = useState(false);
	const onClick = (e) => { setShowChildren(!showChildren); };
	return <div
		className={styles.Info}
		id={props?.id}
		onClick={onClick}>
		<div
			className={styles.ID}>{props?.id}</div>
		<span
			style={{ display: (showChildren ? 'contents' : 'none') }}>
			{props?.children || <></>}
		</span>
	</div>;
}
