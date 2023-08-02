import { useState } from "react";

const Login = (props) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isShowPasswords, setIsShowPasswords] = useState(false);

    return (
        <div className="login-container col-12 col-sm-4">
            <div className="login-title">Login</div>
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
            >
                Login
            </button>
            <div className="login-goback">
                <i className="fa-solid fa-arrow-left "></i>
                <span>Go back</span>
            </div>
        </div>
    )
}
export default Login;