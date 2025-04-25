import   { React , useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const Login = () => {

  const[email, setEmail]= useState("");
  const [password, setPassword] = useState("");
  const[name, setName]= useState("");
  const[isLoginForm, setIsLoginForm] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async ()=>{
    try{
      const res = await axios.post("http://localhost:3000/login",{
        email,
        password,
      },
    {withCredentials:true}
  );
  dispatch(addUser(res.data));
  console.log(res.data.user.role);
  if(res.data.user.role == "Admin"){
    return navigate("/admin");
  }
  return navigate("/user");
    }catch(err){
      console.error(err);
      
    }
  }

  const handleSignUp = async ()=>{
    try{
      const res = await axios.post("http://localhost:3000/register",{name,email,password},{withCredentials:true});
      dispatch(addUser(res.data));
      return navigate("/user");

    }
    catch(err){
      setError(err?.response?.data || "something went wrong");

    }}
  return (
    <div className="card card-border bg-base-300 w-96 mx-100  my-10 ">
  <div className="card-body">

    <h2 className="card-title justify-center">{isLoginForm ? "Login" :"SignUp" }</h2>
    <div>


    {!isLoginForm && (<div>

      <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text"> Name</span>
                  </div>
                  <input
                    type="text"
                    value={name}
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => setName(e.target.value)}
                  />
                </label>
    </div>)}

  
    <label className="form-control w-full max-w-xs my-2">
              <div className="label">
                <span className="label-text">Email ID:</span>
              </div>
              <input
                type="text"
                value={email}
                className="input input-bordered w-full max-w-xs"
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>

            <label className="form-control w-full max-w-xs my-2">
              <div className="label">
                <span className="label-text">Password</span>
              </div>
              <input
                type="password"
                value={password}
                className="input input-bordered w-full max-w-xs"
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            </div>



    <div className="card-actions justify-center">
      <button className="btn btn-primary mt-5" onClick={isLoginForm ? handleLogin :handleSignUp}>{isLoginForm ? "Login" : "SignUp"} </button>
    </div>

    <p
            className="m-auto cursor-pointer py-2"
            onClick={() => setIsLoginForm((value) => !value)}
          >
            {isLoginForm
              ? "New User? Signup Here"
              : "Existing User? Login Here"}
          </p>
  </div>
</div>
  )
}

export default Login