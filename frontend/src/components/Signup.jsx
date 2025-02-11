import axios from "axios";
import { useState } from "react"
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom"



const Signup = () => {

    const [user, setUser] = useState({
        fullName: "",
        username: "",
        password: "",
        confirmPassword: "",
        gender: "",
    });

    const navigate = useNavigate();

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:8080/api/v1/user/register', user, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
            if (res.data.success) {
                toast.success(res.data.message)
                navigate('/login')
            }

        } catch (error) {
            toast.error(error.response.data.message)
            console.log(error);
        }

        setUser({
            fullName: "",
            username: "",
            password: "",
            confirmPassword: "",
            gender: "",
        })
    }

    const handleCheckbox = (gender) => {
        setUser({ ...user, gender })
    }

    return (
        <div className="sign_up_page min-w-96 mx-auto">
            <div className="w-full p-6 rounded-lg shadow-md">
                {/* bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100  */}

                <h1 className="text-3xl font-bold text-center ">Signup</h1>
                <form onSubmit={onSubmitHandler} action="">
                    <div>
                        <label className="label p-2">
                            <span className="text-base label-text">Full Name</span>
                        </label>
                        <input className="w-full input-bordered h-10"
                            type="text"
                            placeholder=" Enter your name"
                            value={user.fullName}
                            onChange={(e) => setUser({ ...user, fullName: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="label p-2">
                            <span className="text-base label-text">User Name</span>
                        </label>
                        <input className="w-full input-bordered h-10"
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
                        <input className="w-full input-bordered h-10"
                            type="password"
                            placeholder=" Enter your password"
                            value={user.password}
                            onChange={(e) => setUser({ ...user, password: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="label p-2">
                            <span className="text-base label-text">Confirm password</span>
                        </label>
                        <input className="w-full input-bordered h-10"
                            type="password"
                            placeholder=" Enter your password again"
                            onChange={(e) => setUser({ ...user, confirmPassword: e.target.value })}
                        />
                    </div>

                    <div className="flex items-center my-4">

                        <div className="flex items-center">
                            <p>Male :</p>
                            <input
                                type="checkbox"
                                defaultChecked
                                className="checkbox mx-2"
                                checked={user.gender == 'male'}
                                onChange={() => handleCheckbox('male')}
                            />
                        </div>

                        <div className="flex items-center">
                            <p>Female :</p>
                            <input
                                type="checkbox"
                                defaultChecked
                                className="checkbox mx-2"
                                checked={user.gender == 'female'}
                                onChange={() => handleCheckbox('female')}
                            />
                        </div>

                    </div>

                    <p className="text-center my-2">Already have account? <Link to="/login"><span className="font-extrabold ">Login</span></Link></p>

                    <div>
                        <button type="submit" className="btn btn-block btn-warning btn-md mt-2 border border-slate-700">Signup</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Signup
