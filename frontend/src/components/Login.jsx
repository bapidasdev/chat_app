import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom"
import { setAuthUser } from '../redux/userSlice'

const Login = () => {

  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const dispatch = useDispatch()
  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8080/api/v1/user/login', user, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });
      toast.success(res.data.message)
      navigate('/')
      dispatch(setAuthUser(res.data))

    } catch (error) {
      toast.error(error.response.data.message)
      console.log(error);
    }

    setUser({
      username: "",
      password: "",
    })
  }

  return (
    <div className="login_page min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md">

        <h1 className="text-3xl font-bold text-center ">Login</h1>
        <form onSubmit={onSubmitHandler} action="">

          <div>
            <label className="label p-2">
              <span className="text-base label-text">User Name</span>
            </label>
            <input
              className="w-full input-bordered h-10"
              type="text"
              placeholder=" Enter your username"
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
            />
          </div>

          <div>
            <label className="label p-2">
              <span className="text-base label-text">Password</span>
            </label>
            <input
              className="w-full input-bordered h-10"
              type="password"
              placeholder=" Enter your password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
          </div>


          <p className="text-center my-2">Don't have an account? <Link to="/register"><span className="font-extrabold">Signup</span></Link></p>

          <div>
            <button type="submit" className="btn btn-block btn-warning btn-md mt-2 border border-slate-700">Login</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
