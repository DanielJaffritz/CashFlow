import { getAuth, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router';
import { getFriendlyErrorMessage } from '~/constants/translator';

const SignUp = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  const db = getFirestore();
  const provider = new GoogleAuthProvider();
  const [statusText, setStatusText] = useState('');
  const handleRegister = async ({ Email, password, username }: { Email: string, password: string, username: string }) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, Email, password);
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        username: username,
        email: user.email,
        createdAt: new Date(),
        balance: 0,
        expense: 0,
        role: "user"
      });
      setStatusText("Succesful Registration");
      navigate('/dashboard')
    } catch (error: any) {
      const errorMessage = getFriendlyErrorMessage(error.code);
      setStatusText(errorMessage);
    }
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget.closest('form');
    if (!form) return;
    const formData = new FormData(form);
    const Email = formData.get('email') as string;
    const username = formData.get('username') as string;
    const password = formData.get('password') as string;
    const confirmPassword = formData.get('confirm-password') as string;
    if (password !== confirmPassword) return setStatusText('passwords must match');
    handleRegister({ Email, password, username });
  }
  const HandleRegisterPopUp = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;


      await setDoc(doc(db, "users", user.uid), {
        username: user.displayName,
        email: user.email,
        createdAt: new Date(),
        balance: 0,
        role: "user"
      });
      setStatusText('succesful Registration');
      navigate('/dashboard');
    } catch (error: any) {
      const errorMessage = getFriendlyErrorMessage(error.code);
      setStatusText(errorMessage)
    }

  }
  return (
    <section className='bg-white dark:bg-zinc-900 flex justify-center items-center w-screen h-screen p-20'>
      <div className='bg-white dark:bg-zinc-800 flex flex-col justify-center items-center rounded-2xl shadow-2xl p-3'>
        <div className='flex flex-row items-center'>
          <img src='/favicon.png' width={50} height={5} />
          <p className='dark:text-white text-2xl font-bold'>CashFlow</p>
        </div>
        <h1 className='dark:text-white text-6xl font-bold'>Welcome!</h1>
        <form id='upload-form' onSubmit={handleSubmit} className='flex flex-col justify-center items-center gap-3 w-full p-5 md:px-20' >
          <input type='text' name='email' id='email' placeholder='Email' className='w-full p-3 rounded-md dark:text-zinc-300 border-2 border-gray-300 dark:border-transparent dark:bg-zinc-700'></input>
          <input type='text' name='username' id='username' placeholder='username' className='w-full p-3 rounded-md dark:text-zinc-300 border-2 border-gray-300 dark:border-transparent dark:bg-zinc-700'></input>
          <input type='text' name='password' id='password' placeholder='Password' className='w-full p-3 rounded-md dark:text-zinc-300 border-2 border-gray-300 dark:border-transparent dark:bg-zinc-700'></input>
          <input type='text' name='confirm-password' id='confirm-password' placeholder='Confirm Password' className='w-full p-3 rounded-md dark:text-zinc-300 border-2 border-gray-300 dark:border-transparent dark:bg-zinc-700'></input>
          <h2 className='text-red-400'>{statusText}</h2>
          <Link to='/SignIn' className='dark:text-white'>
            already have an account?
          </Link>
          <button className=' text-white bg-amber-400 p-5 rounded-4xl hover:bg-amber-500 cursor-pointer w-full ' type='submit'>Register</button>
        </form>
        <button onClick={HandleRegisterPopUp} >
          <img src='assets/google.svg' width={50} className='cursor-pointer' />
        </button>
      </div>
    </section>
  )
}

export default SignUp
