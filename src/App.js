import "./App.css";
import { createUserWithEmailAndPassword, FacebookAuthProvider, getAuth, GithubAuthProvider, GoogleAuthProvider, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import app from "./firebase.init";
import { Button, Form } from "react-bootstrap";
import { useState } from "react";

const auth = getAuth(app);

function App() {

// All Provider :
const Googleprovider = new GoogleAuthProvider()
const Gitprovider = new GithubAuthProvider();
const Fbprovider = new FacebookAuthProvider();


// All State Set ::
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [resisterd, setResisterd] = useState(false)
const [error, setError] = useState("")

// validation
const [validated, setValidated] = useState(false);



const handelEmailBlur = (e) => {
  setEmail(e.target.value)
}

const handelPasswordBlur = (e) => {
  setPassword(e.target.value)
}

const handelSubmit = (e) => {
  e.preventDefault();
  const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
      return;
    }

    if(!/(?=.*?[#?!@$%^&*-])/.test(password)){
      setError("Please Provied Special Creacter")
      return;
    }

    setValidated(true);



 if(resisterd){
  signInWithEmailAndPassword(auth, email, password)
  .then(result => {
    const user = result.user;
    console.log(user)
  })
  .catch((error) => {
    setError(error.message)
  })
 }
 else{
  createUserWithEmailAndPassword(auth, email, password)
  .then(result => {
    const user = result.user;
    verifyEmail()
    console.log(user)
  })
  .catch((error) => {
    setError(error.message)
  })
 }
  e.preventDefault();
}

const handelForgetPassword = () => {
  sendPasswordResetEmail(auth, email)
  .then(() => {
    alert("Password reset email sent!")
  })
  .catch((error) => {
    setError(error.message)
  })
}
const verifyEmail = () => {
  sendEmailVerification(auth.currentUser)
  .then(() => {
    console.log("Email verification sent!")
  })
}

const handelRegisterd = (e) => {
  setResisterd(e.target.checked)
}


// All Login Methoad :::
const handelGoogle = () => {
  signInWithPopup(auth, Googleprovider)
  .then(result => {
    const user = result.user;
    console.log(user)
  })
  .catch((error) => {
    setError(error.message)
  })
}

const handelGithub = () => {
  signInWithPopup(auth, Gitprovider)
  .then((result) => {
    const user = result.user
    console.log(user)
  })
  .catch(error => {
    setError(error.message)
  })
}

const handelFacebook = () => {
  signInWithPopup(auth, Fbprovider)
  .then(result => {
    const user = result.user;
    console.log(user)
  })
  .then(error => {
    setError(error.message)
  })
}



  return (
    <div>
      <div className="form-container container">
        {/* image */}
        <div>
          <img className="rounded" src="https://media.istockphoto.com/id/1312423107/vector/stealing-data-concept-flat-vector-illustration-online-registration-form-login-to-social.jpg?s=612x612&w=0&k=20&c=7Trftif8xV9FCDO5B4M7JiBpZUFlXo51m5lfI6hYCog=" alt="" />
        </div>

        <div className="form-feild">
          <h2>Please {resisterd ? "Login" : "Registerd"}</h2>
          <Form noValidate validated={validated} onSubmit={handelSubmit}>


            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control onBlur={handelEmailBlur} type="email" placeholder="Enter email" required/>
              <Form.Control.Feedback type="invalid">
               Please provide a valid Email.
               </Form.Control.Feedback>
            </Form.Group>


            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control onBlur={handelPasswordBlur} type="password" placeholder="Password" required/>
              <Form.Control.Feedback type="invalid">
                Please provide a valid Password.
              </Form.Control.Feedback>
            </Form.Group>


            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check onChange={handelRegisterd} type="checkbox" label="Already Registerd" />
            </Form.Group>
            <Button onClick={handelForgetPassword} variant="link">Forget Password</Button>
            <p className="text-danger">{error}</p>


            <div className="social-login ml-5">
              <span onClick={handelGoogle}><img src="https://upload.wikimedia.org/wikipedia/commons/2/2d/Google-favicon-2015.png" alt="" /></span>
              <span onClick={handelGithub}><img src="https://cdn-icons-png.flaticon.com/512/25/25231.png" alt="" /></span>
              <span onClick={handelFacebook}><img src="https://logodownload.org/wp-content/uploads/2014/09/facebook-logo-3-1.png" alt="" /></span>
            </div>



            <Button onSubmit={handelSubmit} variant="primary" type="submit">
              {resisterd ? "Login" : "Registerd"}
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default App;
