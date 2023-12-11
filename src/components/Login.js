import React, { useRef, useState } from "react";
import Header from "./Header";
import { checkValidateData } from "../utils/validate";
import {
   createUserWithEmailAndPassword,
   signInWithEmailAndPassword,
   updateProfile,
} from "firebase/auth";
import { auth } from "../utils/fireBase";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const Login = () => {
   //useState for form
   const [isSignInForm, setIsSignInForm] = useState(true);
   //useState for validation error
   const [errorMessage, setErrorMessage] = useState(null);
   const navigate = useNavigate();
   const dispatch = useDispatch();

   const name = useRef(null);
   const email = useRef(null);
   const password = useRef(null);

   const toggleSignInForm = () => {
      setIsSignInForm(!isSignInForm);
   };
   const handleButtonClick = () => {
      //validate the form data

      //console.log(email.current.value);
      //console.log(password.current.value);

      const message = checkValidateData(
         email.current.value,
         password.current.value
      );
      //console.log(message);
      setErrorMessage(message);
      //error filling singin/signup below line for
      if (message) return;

      //sign in/sign up logic
      if (!isSignInForm) {
         //signUp logic
         createUserWithEmailAndPassword(
            auth,
            email.current.value,
            password.current.value
         )
            .then((userCredential) => {
               // Signed up
               const user = userCredential.user;
               updateProfile(user, {
                  displayName: name.current.value,
                  photoURL:
                     "https://images.ctfassets.net/4cd45et68cgf/Rx83JoRDMkYNlMC9MKzcB/2b14d5a59fc3937afd3f03191e19502d/Netflix-Symbol.png?w=700&h=456",
               })
                  .then(() => {
                     // Profile updated!
                     const { uid, email, displayName, photoURL } =
                        auth.currentUser;
                     dispatch(
                        addUser({
                           uid: uid,
                           email: email,
                           displayName: displayName,
                           photoURL: photoURL,
                        })
                     );
                     navigate("/browse");
                  })
                  .catch((error) => {
                     // An error occurred
                     setErrorMessage(error.message);
                  });
               console.log(user);
            })
            .catch((error) => {
               const errorCode = error.code;
               const errorMessage = error.message;

               setErrorMessage(errorCode + "-" + errorMessage);
            });
      } else {
         //signIn logic
         signInWithEmailAndPassword(
            auth,
            email.current.value,
            password.current.value
         )
            .then((userCredential) => {
               // Signed in
               const user = userCredential.user;
               console.log(user);
               navigate("/browse");
            })
            .catch((error) => {
               const errorCode = error.code;
               const errorMessage = error.message;
               setErrorMessage(errorCode + "-" + errorMessage);
            });
      }
   };

   return (
      <div>
         <Header />
         <div className="absolute">
            <img
               src="https://assets.nflxext.com/ffe/siteui/vlv3/a73c4363-1dcd-4719-b3b1-3725418fd91d/fe1147dd-78be-44aa-a0e5-2d2994305a13/IN-en-20231016-popsignuptwoweeks-perspective_alpha_website_large.jpg"
               alt="Background"
            />
         </div>
         <form
            onSubmit={(e) => e.preventDefault()}
            className="absolute p-12 bg-black w-4/12 my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80"
         >
            <h1 className="font-bold text-3xl py-4">
               {isSignInForm ? "Sign In" : "Sign Up"}
            </h1>
            {!isSignInForm && (
               <input
                  type="text"
                  placeholder="Full Name"
                  className="p-3 my-3 w-full bg-gray-700"
               />
            )}
            <input
               ref={email}
               type="text"
               placeholder="Email Address"
               className="p-3 my-3 w-full bg-gray-700"
            />
            <input
               ref={password}
               type="password"
               placeholder="Password"
               className="p-3 my-3 w-full bg-gray-700"
            />
            <p className="text-red-500 font-bold py-2 text-lg">
               {errorMessage}
            </p>
            <button
               className="p-3 my-3 bg-red-600 w-full rounded-lg"
               onClick={handleButtonClick}
            >
               {isSignInForm ? "Sign In" : "Sign Up"}
            </button>
            <p className="py-4 cursor-pointer" onClick={toggleSignInForm}>
               {isSignInForm
                  ? "New to Netflix Sign Up Now"
                  : "Already Registered Sign In Now"}
            </p>
         </form>
      </div>
   );
};

export default Login;
