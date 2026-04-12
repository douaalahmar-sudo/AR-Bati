
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom'; // 1. Added missing import

export default function OAuth() {
    const dispatch = useDispatch(); // 2. MUST define dispatch here
    const navigate = useNavigate(); // 3. MUST define navigate here to redirect after login

    const handleGoogleClick = async () => { 
        try {
            const provider = new GoogleAuthProvider();
            provider.setCustomParameters({ prompt: 'select_account' });
            const auth = getAuth(app);

            const result = await signInWithPopup(auth, provider);
            
            const res = await fetch('/api/auth/google', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: result.user.displayName,
                    email: result.user.email,
                    photo: result.user.photoURL
                }),
            });
            const data = await res.json();
            
            // This now works because dispatch is defined!
            dispatch(signInSuccess(data)); 
            
            // Redirect the user to the home page after success
            navigate('/'); 
            
        } catch (error) {
            console.log("could not sign in with google", error);
        }
    };

    return (
        <button
            onClick={handleGoogleClick}
            type='button'
            className='w-full bg-white text-slate-800 border border-slate-300 p-3 rounded-lg uppercase font-bold mt-2
                       transition-all duration-300 ease-in-out
                       hover:opacity-95 hover:-translate-y-1 hover:shadow-xl hover:bg-slate-100'
        >
            CONTINUE WITH GOOGLE
        </button>
    );
}