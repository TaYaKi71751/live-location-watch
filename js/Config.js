const Auth = {
 /**
  * 
  * @returns {Array<{user:{email:string,password:string},device:{id:`${number}`}}>}
  */
 getAll(){
  let a = localStorage.getItem('auth') ||'[]';
  a = JSON.parse(a);
  return a;
 },
 /**
  * 
  * @param {{Arrray<{user:{email:string,password:string,device:{id:`${number}`}}}>}} value 
  */
 setAll(value){
  localStorage.setItem('auth', JSON.stringify(value));
 },
 /**
  * 
  * @param {{user:{email:string,password:string},device:{id:`${number}`}}} auth 
  */
 add(auth){
  const a = this.getAll();
  if(a?.filter((_)=>(
   _?.user?.email === auth?.user?.email &&
   _?.user?.password === auth?.user?.password &&
   `${_?.device?.id}` === `${auth?.device?.id}`
  ))?.length){ throw new ReferenceError(`auth was already exists`); }
  const i = a.push(auth);
  this.setAll(a);
  return i;
 },
 /**
  * 
  * @param {{user?:{email?:string,password?:string},device?:{id?:`${number}`}}} auth 
  */
 delete(auth){
  const a = this.getAll();
  a = a?.filter((_)=>!(
   (typeof auth?.user?.email == 'undefined' || `${_?.user?.email}` === `${auth?.user?.email}`) &&
   (typeof auth?.user?.password == 'undefined' || `${_?.user?.password}` === `${auth?.user?.password}`) &&
   (typeof auth?.device?.id == 'undefined' || `${_?.device?.id}` === `${auth?.device?.id}`)
  ))
 }
}
const Config = {
 auth:Auth,
}
