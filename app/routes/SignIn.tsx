import {getAuth, signInWithEmailAndPassword,signInWithPopup, GoogleAuthProvider, sendPasswordResetEmail} from 'firebase/auth';
import {getFirestore, doc, setDoc} from 'firebase/firestore';
import { useState, type FormEvent} from 'react';
import { Link, useNavigate } from 'react-router';
import { getFriendlyErrorMessage } from '~/constants/translator';

const SignIn = () => {

  const navigate = useNavigate();
  const auth = getAuth();
  const db = getFirestore();
  const provider = new GoogleAuthProvider();
  const[statusText, setStatusText] = useState('');

  const handleLogin = async ({Email, password} : {Email:string, password:string}) => {
    try{
      const userCredential = await signInWithEmailAndPassword(auth, Email, password);
      const user = userCredential.user; 
      setStatusText("Succesful Login");
      navigate('/dashboard');
    }catch (error: any) {
      const errorMessage = getFriendlyErrorMessage(error.code);
      setStatusText(errorMessage);
    }}

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget.closest('form');
    if(!form) return;
    const formData = new FormData(form);
    const Email = formData.get('email') as string;
    const password = formData.get('password') as string;
    handleLogin({Email, password});
  }    

  const HandleLoginPopUp = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      setStatusText('succesful Login');
      navigate('/dashboard');
    }catch (error: any){
      const errorMessage = getFriendlyErrorMessage(error.code); 
      setStatusText(errorMessage);
    }   
  }
  const handlePasswordChange = () => {
    //on working
  }
  return (
    <section className='flex flex-row justify-center'>
        <div className='bg-black'>
            <img src='assets/Sign.jpg' className='w-600 h-full opacity-50'/>
        </div>
        <div className='flex bg-black w-full justify-center items-center'>
            <div className='bg-white flex flex-col justify-center items-center rounded-md m-10 p-5 w-full h-250'>
                <div className='flex flex-row items-center'>
                    <img src='/favicon.png' width={50} height={5}/>
                    <p className='text-2xl font-bold'>CashFlow</p>
                </div>
                <h1 className='text-6xl font-bold gap-2 mt-5'>Welcome!</h1>
                <form id='upload-form' onSubmit={handleSubmit} className='flex flex-col items-center gap-5 w-full p-15' >
                       <input type='text' name='email' id='email' placeholder='Email' className='w-full p-3 rounded-md border-2 border-gray-300'></input>
                       <input type='text' name='password' id='password' placeholder='Password' className='w-full p-3 rounded-md border-2 border-gray-300'></input>
                       <h2 className='text-red-400'>{statusText}</h2>
                       <div className='flex flex-row justify-between gap-20'>
                          
                       </div>
                       <button className=' text-white bg-amber-400 p-5 rounded-4xl hover:text-black cursor-pointer w-full ' type='submit'>Login</button>                 
                </form>
                <div className='flex flex-row items-center justify-between gap-10'>
                  <button onClick={HandleLoginPopUp}>
                    <img src='assets/google.svg' width={50} className='cursor-pointer'/>
                  </button>
                  <button onClick={handlePasswordChange} className='cursor-pointer hover:text-zinc-500'>
                    forgot password?
                  </button>
                  

                </div>
                
            </div>
        </div>
    </section>
  )
}

export default SignIn