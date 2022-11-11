import React from "react";
import { useRef, useState , useContext} from "react";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { ErrorMessage } from "@hookform/error-message";
import { Link , useNavigate, useLocation} from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";
import CircularProgress from '@material-ui/core/CircularProgress';
import AuthContext from "../context/AuthProvider";
import { signin } from "../apis";
import useAuth from '../hooks/useAuth';



function Signin(props) {
    const { setAuth } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const queryClient = useQueryClient();
    const [errMsg, setErrMsg] = useState('');
    // const [success, setSuccess] = useState(false);
    const errorRef = useRef();
    const { register, handleSubmit, watch, formState: { errors } } = useForm({
        criteriaMode: "all"
    });
    const password = useRef({});
    password.current = watch("password", "");

    const { mutate, isLoading } = useMutation(signin, {
        onSuccess: (responseData) => {
            // alert(JSON.stringify(responseData.data));
            const accessToken = responseData?.data?.accessToken;
            const resEmail = responseData?.data?.email;
            setAuth({ user: resEmail, accessToken: accessToken});
            navigate(from, { replace: true });
            // setSuccess(true);
        },
        onError: (message) => {
            // alert(message)
            if (message.toString().includes('401')) {
                setErrMsg('Wrong email or password');
            }
            else {
                setErrMsg('Login failed. Unknown error');
            }

        },
        onSettled: () => {
            queryClient.invalidateQueries('create');
        }
    });

    const onSubmit = (data) => {
        mutate(data);
    };

    return (
        // <>
        //     {success ? (
        //         <section>
        //             <h1>Login Success!</h1>
        //             <nav>
        //                 <Link to="/signin">Sign in</Link>
        //             </nav>
        //             <p>
        //                 <a href=".">Back</a>
        //             </p>
        //         </section>
        //     ) : (
                <div className="App">
                <section>
                    <p ref={errorRef} className={errMsg ? "errormsg" : "disable"} >{errMsg}</p>
                    <h1>Sign in</h1>
                    <form onSubmit={handleSubmit(onSubmit)}>
                    
                        <label htmlFor="email">Email:</label>
                        <input
                            {...register("email", {
                                required: "This input is required.",

                            })}
                            type="text"
                            id="email"
                        />

                        {errors.email && <p className="requirements">
                            <FontAwesomeIcon icon={faInfoCircle} />
                            {errors.email.message}<br />
                        </p>}

                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            {...register("password", {
                                required: "You must enter the password.",

                            })}
                        />

                        {errors.password && <p className="requirements">
                            <FontAwesomeIcon icon={faInfoCircle} />
                            {errors.password.message}<br />
                        </p>}

                        {isLoading && <span><CircularProgress color="secondary" /><div>Loading....</div></span>}
                        <button type="submit" disabled={isLoading}
                        >Sign in</button>
                    </form>
                    <p>
                        Do not have an account? <br />
                        <span className="line">
                            <nav>
                                <Link to="/register">Register</Link>
                            </nav>
                        </span>
                    </p>
                </section>
                </div>
        //     )}
        // </>
    )

}
export default Signin;