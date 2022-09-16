const Auth = {
	/**
  *
  * @returns {Array<{user:{email:string,password:string},device:{id:`${number}`}}>}
  */
	getAll () {
		let a = localStorage.getItem('auth') || '[]';
		a = JSON.parse(a);
		return a;
	},
	/**
  *
  * @param {{Arrray<{user:{email:string,password:string,device:{id:`${number}`}}}>}} value
  */
	setAll (value) {
		localStorage.setItem('auth', JSON.stringify(value));
	},
	/**
  *
  * @param {{user:{email:string,password:string},device:{id:`${number}`}}} auth
  */
	add (auth) {
		const a = this.getAll();
		if (a?.filter((_) => (
			_?.user?.email === auth?.user?.email &&
   _?.user?.password === auth?.user?.password &&
   `${_?.device?.id}` === `${auth?.device?.id}`
		))?.length) { throw new ReferenceError('auth was already exists'); }
		const i = a.push(auth);
		this.setAll(a);
		return i;
	},
	/**
  *
  * @param {{user?:{email?:string,password?:string},device?:{id?:`${number}`}}} auth
  */
	delete (auth) {
		let a = this.getAll();
		a = a?.filter((_) => !(
			(typeof auth?.user?.email == 'undefined' || `${_?.user?.email}` === `${auth?.user?.email}`) &&
   (typeof auth?.user?.password == 'undefined' || `${_?.user?.password}` === `${auth?.user?.password}`) &&
   (typeof auth?.device?.id == 'undefined' || `${_?.device?.id}` === `${auth?.device?.id}`)
		));
		this.setAll(a);
	}
};
const url = new URL(window.location);
url.protocol = 'ws:';
const __prefix = 'io.user.Subscriptions.';
const io = {
	user: {
		Subscriptions: {
			get protocol () {
				url.protocol = localStorage.getItem(`${__prefix}protocol`) || 'ws:';
				localStorage.setItem(`${__prefix}protocol`, url.protocol);
				return url.protocol;
			},
			get hostname () {
				url.hostname = localStorage.getItem(`${__prefix}hostname`) || url.hostname;
				localStorage.setItem(`${__prefix}hostname`, url.hostname);
				return url.hostname;
			},
			get port () {
				url.port = localStorage.getItem(`${__prefix}port`) || '4000';
				localStorage.setItem(`${__prefix}port`, url.port);
				return url.port;
			},
			get pathname () {
				url.pathname = localStorage.getItem(`${__prefix}pathname`) || '/user/subscriptions';
				localStorage.setItem(`${__prefix}pathname`, url.pathname);
				return url.pathname;
			},
			get href () {
				return `${this.protocol}//${this.hostname}:${this.port}${this.pathname}`;
			}
		}
	}
};
export const Config = {
	auth: Auth,
	io
};
