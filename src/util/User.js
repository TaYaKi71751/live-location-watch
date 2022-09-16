import React, { useState } from 'react';

export function User (props) {
	const { email, password } = props;
	return <div className="user">
		{email},{password}
	</div>;
}
