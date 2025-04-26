'use client';
//app/login/page.tsx
import { signIn } from 'next-auth/react';
import {useState}  from "react";
import Link from "next/link";
import {useRouter } from 'next/navigation';



export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
 
  const router = useRouter();
  const [loading, setLoading] = useState(false);

   const handleCredentialsLogin = async (e: React.FormEvent) => {
     e.preventDefault();
     setLoading(true);

      // const res = await signIn('credentials', {
      //   email,
      //   password,
      //   redirect: true,
      //   callbackUrl: '/dashboard',
      // });

     const res = await signIn('credentials', {
       email,
       password,
       redirect: false,
     });
     console.log("Logging the response from Callback", res)
     if (res?.error) {
       setError('Invalid email or password');
       setLoading(false);
     } else {
       router.push('/');
       
     }
   };

   const handleGithubLogin = async (e: React.FormEvent) => {
     e.preventDefault();
     setLoading(true);
    //  const res = await signIn('github');
      await signIn('github', { callbackUrl: '/' });

    //  if (res?.error) {
    //    setError('Githun error: '+ res?.error);
    //    setLoading(false);
    //  } else {
    //    //router.push('/');   
    //  }
   };
   
    const handleGoogleLogin = async (e: React.FormEvent) => {
      e.preventDefault();
      setLoading(true);
      // const res = await signIn('google');
      await signIn('google', { callbackUrl: '/dashboard' });   

      // if (res?.error) {
      //   setError('Google error: ' + res?.error);
      //   setLoading(false);
      // } else {
      //   router.push('/');
      // }
    };
  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="w-full max-w-md px-4">
          <div className="shadow-lg rounded-lg bg-white border-0">
            <div className="rounded-t px-6 py-6">
              <div className="text-center mb-3">
                <h6 className="text-blueGray-500 text-sm font-bold">
                  Sign in with
                </h6>
              </div>
              <div className="btn-wrapper text-center">
                <button
                  onClick={handleGithubLogin}
                  className=" cursor-pointer bg-white active:bg-blueGray-50 text-blueGray-700 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-2 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"
                  type="button"
                >
                  <img alt="..." className="w-5 mr-1" src="/img/github.svg" />
                  Github
                </button>

                <button
                  onClick={handleGoogleLogin}
                  className=" cursor-pointer bg-white active:bg-blueGray-50 text-blueGray-700 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"
                  type="button"
                >
                  <img alt="..." className="w-5 mr-1" src="/img/google.svg" />
                  Google
                </button>
              </div>
              <hr className="mt-6 border-b-1 border-blueGray-300" />
            </div>
            <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
              <div className="text-blueGray-400 text-center mb-3 font-bold">
                {error && <p className="text-red-500">{error}</p>}
                <small>Or sign in with credentials</small>
              </div>
              <form onSubmit={handleCredentialsLogin} className="space-y-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    name="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    name="password"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="inline-flex items-center cursor-pointer">
                    <input
                      id="customCheckLogin"
                      type="checkbox"
                      className="form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
                    />
                    <span className="ml-2 text-sm font-semibold text-blueGray-600">
                      Remember me
                    </span>
                  </label>
                </div>

                <div className="text-center mt-6">
                  <button
                    className=" cursor-pointer bg-blue-800 text-white active:bg-blue-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                    type="submit"
                  >
                    {loading ? 'Logging in...' : 'Sign In'}
                  </button>
                </div>
              </form>
              <div className="flex flex-wrap mt-6 relative">
                <div className="w-1/2">
                  <Link
                    href="/auth/forgot-password"
                    className="text-blueGray-200"
                  >
                    <small>Forgot password?</small>
                  </Link>
                </div>
                <div className="w-1/2 text-right">
                  <Link href="/auth/register" className="text-blueGray-200">
                    <small>Create new account</small>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
