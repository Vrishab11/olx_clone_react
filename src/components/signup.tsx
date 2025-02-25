import { useState } from "react"
import { getAuth, GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword } from "firebase/auth"
import { useNavigate } from "react-router-dom"
import { getFirestore, doc, setDoc } from 'firebase/firestore';

const SignUp=() => {

    const auth = getAuth()
    const firestore = getFirestore();
    const navigate = useNavigate()

    const [authing, setAuthing] = useState(false)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState('')


    const signUpWithGoogle = ()=>{
        setAuthing(true)

        signInWithPopup(auth, new GoogleAuthProvider())
        .then(async (response) => {
            const user = response.user;

            await setDoc(doc(firestore, 'users', user.uid), {
                uid: user.uid,
                name: user.displayName,
                email: user.email,
                photoURL: user.photoURL,
                createdAt: new Date(),
            });

            navigate('/');
        })

            .catch(error=>{
                console.log(error);
                setAuthing(false)
            })
    }

    const signUpWithEmail = () => {

        if(password != confirmPassword){
            setError('Passwords do not match')
            return
        }

        setAuthing(true)
        setError('')


        createUserWithEmailAndPassword(auth, email, password)
                .then(async (response) => {
                    const user = response.user;

                    await setDoc(doc(firestore, 'users', user.uid), {
                        uid: user.uid,
                        name: name,
                        email: user.email,
                        createdAt: new Date(),
                    });

                    navigate('/login');
                })
                .catch(error=>{
                    console.log(error);
                    setError(error.message);
                    setAuthing(false);
                })
    }


  return (
    <div className="w-full h-screen flex">
        <div className="w-1/2 h-full flex flex-col bg-[#282c34] items-center justify-center">
        </div>

        <div className="w-1/2 h-full flex flex-col bg-[#1a1a1a] p-20 justify-center">
            <div className="w-full flex flex-col max-w-[450px] mx-auto">
                <div className="w-full flex flex-col mb-10 text-white">
                    <h3 className="text-4xl font-bold mb-2"> SignUp </h3>
                    <p className="text-lg mb-4">Welcome. Please enter your information below to begin.</p>
                </div>

                <div className="w-full flex flex-col mb-6">
                    
                    <input type="name"
                            placeholder="Name"
                            value={name}
                            onChange={(e)=>setName(e.target.value)}
                            className="w-full text-white py-2 mb-4 bg-transparent border-b border-gray-500 focus:outline-none focus:border-white"
                    />


                    <input type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                        className="w-full text-white py-2 mb-4 bg-transparent border-b border-gray-500 focus:outline-none focus:border-white"
                    />

                    <input 
                        type="password"
                        placeholder="password"
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                        className="w-full text-white py-2 mb-4 bg-transparent border-b border-gray-500 focus:outline-none focus:border-white"
                    />

                    <input
                        type='password'
                        placeholder='Re-Enter Password'
                        className='w-full text-white py-2 mb-4 bg-transparent border-b border-gray-500 focus:outline-none focus:border-white'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>
                
                {error && <div className="text-red-500 mb-4">{error}</div> }

                <div>
                    <button 
                    onClick={ signUpWithEmail}
                    disabled={authing}
                    className="w-full bg-transparent border border-white text-white my-2 font-semibold rounded-md">
                    Sign Up With Email and Password 
                    </button>
                </div>
                <div className="w-full flex items-center justify-center relative py-4">
                    <div className="w-full h-[1px] bg-gray-500"></div>
                    <p className="text-lg absolute text-gray-500 bg-[#1a1a1a] px-2">OR</p>
                </div>
                <button
                onClick={signUpWithGoogle}
                disabled={authing}
                className="w-full bg-white text-black font-semibold rounded-md p-4 text-center flex items-center">
                Sign Up With Google</button>
            </div>

            <div className="w-full flex items-center justify-center mt-10">
                <p className="text-sm font-normal text-gray-400">Already have an Account? <span className='font-semibold text-white cursor-pointer underline'><a href='/login'>Log In</a></span></p>
            </div>
        </div>
    </div>
  )
}

export default SignUp
