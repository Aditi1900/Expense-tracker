import { auth, provider } from '../../config/firebase-config';
import { signInWithPopup } from 'firebase/auth';
import { useNavigate, Navigate } from 'react-router-dom';
import { useGetUserInfo } from "../../hooks/useGetUserInfo";
import"./styles.css";


export const Auth = () => {

    const navigate = useNavigate();
    // useNavigate is a hook

    const { isAuth } = useGetUserInfo();

    const signInWithGoogle = async () => {
        const results = await signInWithPopup(auth, provider);
        const authInfo = {
            // auth is like an object with all of the user's information, here we 
            userID: results.user.uid,
            name: results.user.displayName,
            profilePhoto: results.user.photoURL,
            isAuth: true,
        };
        localStorage.setItem("auth", JSON.stringify(authInfo));
        //you cannot store an object inside a local storage
        //need to turn the object into a string.
        // console.log(results);
        navigate("/expense-tracker");
    };

    if (isAuth) {
        return <Navigate to="/expense-tracker" />;
    }

    return (
    <div className="login-page"> 
    <p>Welcome to Expense Tracker</p>
    <button className="login-with-google-btn" onClick={signInWithGoogle}> 
    {" "}
    Sign In With Google to Continue
    </button>
    </div>
    );
};

