import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { loginApi } from "../sevices/UserService";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/useContext";

const Login = (props) => {
  const {loginContext} = useContext(UserContext);

    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isShowPasswords, setIsShowPasswords] = useState(false);

    const [loaddingApi, setLoaddingApi] = useState(false);



    const handleLogin = async () => {
        if (!email || !password) {
            toast.error("Email/Password is required");
            return;
        }
        setLoaddingApi(true)
        let res = await loginApi(email, password)
        if (res && res.token) {
            loginContext(email,res.token)
            navigate("/");
        } else {
            if (res && res.status === 400) {
                toast.error(res.data.error)
            }
        }
        setLoaddingApi(false)

    }

    // useEffect(()=>{
    //     let token = localStorage.getItem("item")
    //     if(token){
    //         navigate("/");
    //     }
    // },[])

    const handleGoback = () => {
        navigate('/');
    }

    return (
        <div className="login-container col-12 col-sm-4">
            <div className="login-title">Login (eve.holt@reqres.in)</div>
            <div className="login-text">Email or Username</div>
            <input
                type="text"
                className="login-emailOrName"
                placeholder="Enter Email or Name"
                value={email}
                onChange={(e) => setEmail(e.target.value)}

            />
            <div className="login-password">
                <input
                    type={isShowPasswords === true ? "text" : "password"}
                    className="login-emailOrName"
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <i
                    className={isShowPasswords === true ? "fa-solid fa-eye input-password" : "fa-solid fa-eye-slash input-password"}
                    onClick={() => setIsShowPasswords(!isShowPasswords)}
                ></i>
            </div>

            <button
                className={email && password ? "active login-confirm" : "login-confirm"}
                disabled={email && password ? false : true}
                onClick={() => handleLogin()}
            >
                {loaddingApi && <i className="fa-solid fa-spinner fa-spin-pulse"></i>}
                &nbsp;Login

            </button>
            <div className="login-goback">
                <i className="fa-solid fa-arrow-left "></i>
                <span onClick={()=>handleGoback()}> &nbsp; Go back</span>
            </div>
        </div>
    )
}
export default Login;