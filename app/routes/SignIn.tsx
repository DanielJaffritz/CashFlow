import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router';
import { getFriendlyErrorMessage } from '~/constants/translator';

const SignIn = () => {

  const navigate = useNavigate();
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  const [statusText, setStatusText] = useState('');

  const handleLogin = async ({ Email, password }: { Email: string, password: string }) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, Email, password);
      const user = userCredential.user;
      setStatusText("Succesful Login");
      navigate('/dashboard');
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
    const password = formData.get('password') as string;
    handleLogin({ Email, password });
  }

  const HandleLoginPopUp = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      setStatusText('succesful Login');
      navigate('/dashboard');
    } catch (error: any) {
      const errorMessage = getFriendlyErrorMessage(error.code);
      setStatusText(errorMessage);
    }
  }
  return (
    <section className='dark:bg-zinc-900 w-screen h-screen flex justify-center items-center'>
      <div className='dark:bg-zinc-800 shadow-2xl rounded-2xl flex flex-col items-center justify-center p-6'>
        <div className='flex flex-row items-center'>
          <img src='/favicon.png' width={50} height={5} />
          <p className='dark:text-white text-2xl font-bold'>CashFlow</p>
        </div>
        <h1 className='dark:text-white text-6xl font-bold gap-2 mt-5'>Welcome!</h1>
        <form id='upload-form' onSubmit={handleSubmit} className='flex flex-col items-center gap-5 w-full p-5 md:p-15 mt-5' >
          <input type='text' name='email' id='email' placeholder='Email' className='w-full p-3 rounded-md dark:text-zinc-300 border-2 border-gray-300 dark:border-transparent dark:bg-zinc-700'></input>
          <input type='text' name='password' id='password' placeholder='Password' className='w-full p-3 rounded-md dark:text-zinc-300 border-2 border-gray-300 dark:border-transparent dark:bg-zinc-700'></input>
          <h2 className='text-red-400'>{statusText}</h2>
          <div className='flex flex-row justify-between gap-20'>

          </div>
          <button className=' text-white bg-amber-400 p-5 rounded-4xl hover:bg-amber-500 cursor-pointer w-full ' type='submit'>Login</button>
        </form>
        <div className='flex flex-row items-center justify-between'>
          <button onClick={HandleLoginPopUp}>
            <img src='assets/google.svg' width={50} className='cursor-pointer' />
          </button>

        </div>

      </div>
    </section>
  )
}

export default SignIn
