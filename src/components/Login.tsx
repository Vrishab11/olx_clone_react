import { signInWithPopup, signInWithEmailAndPassword } from 'firebase/auth';
import { auth, googleProvider } from '../firebase/setup';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [authing, setAuthing] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');


  const signInWithGoogle = async () => {
    setAuthing(true);
    try {
      const response = await signInWithPopup(auth, googleProvider);
      console.log(response.user.uid);
      navigate('/');
    } catch (err) {
      console.error(err);
      setAuthing(false);
    }
  };

  const signInWithEmail = async () => {
    setAuthing(true);
    setError('');
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      console.log(response.user.uid);
      navigate('/');
    } catch (err: any) {
      console.error(err);
      setError(err.message);
      setAuthing(false);
    }
  };

  return (
    <div className="w-full h-screen flex">
      <div className="w-1/2 h-full flex flex-col bg-[#282c34] items-center justify-center"></div>
      <div className="w-1/2 h-full bg-[#1a1a1a] flex flex-col p-20 justify-center">
        <div className="w-full flex flex-col max-w-[450px] mx-auto">
          <div className="w-full flex flex-col mb-10 text-white">
            <h3 className="text-4xl font-bold mb-2">Login</h3>
            <p className="text-lg mb-4">Welcome Back! Please enter your details.</p>
          </div>
          <div className="w-full flex flex-col mb-6">
            <input
              type="email"
              placeholder="Email"
              className="w-full text-white py-2 mb-4 bg-transparent border-b border-gray-500 focus:outline-none focus:border-white"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full text-white py-2 mb-4 bg-transparent border-b border-gray-500 focus:outline-none focus:border-white"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="w-full flex flex-col mb-4">
            <button
              className="w-full bg-transparent border border-white text-white my-2 font-semibold rounded-md p-4 text-center flex items-center justify-center cursor-pointer"
              onClick={signInWithEmail}
              disabled={authing}
            >
              Log In With Email and Password
            </button>
          </div>
          {error && <div className="text-red-500 mb-4">{error}</div>}
          <div className="w-full flex items-center justify-center relative py-4">
            <div className="w-full h-[1px] bg-gray-500"></div>
            <p className="text-lg absolute text-gray-500 bg-[#1a1a1a] px-2">OR</p>
          </div>
          <button
            className="w-full bg-white text-black font-semibold rounded-md p-4 text-center flex items-center justify-center cursor-pointer mt-7"
            onClick={signInWithGoogle}
            disabled={authing}
          >
            Log In With Google
          </button>
        </div>
        <div className="w-full flex items-center justify-center mt-10">
          <p className="text-sm font-normal text-gray-400">
            Don't have an account?{' '}
            <span className="font-semibold text-white cursor-pointer underline">
              <a href="/signup">Sign Up</a>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
