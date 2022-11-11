import React from "react";
import { useRef, useState } from "react";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { ErrorMessage } from "@hookform/error-message";
import { Link } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";
import CircularProgress from '@material-ui/core/CircularProgress';
import { signup } from "../apis";
// const BASE_URL = 'http://localhost:3000/users/register'

// const addUser = async (data) => {
//     return await axios.post(BASE_URL, {
//         fullname: data.fullname, email: data.email, password: data.password
//     })
// }


function Form(props) {
    const queryClient = useQueryClient();
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);
    const errorRef = useRef();
    const { register, handleSubmit, watch, formState: { errors } } = useForm({
        criteriaMode: "all"
    });
    const password = useRef({});
    password.current = watch("password", "");

    const { mutate, isLoading } = useMutation(signup, {
        onSuccess:  (responseData) => {
            console.log(responseData.data);
            //   const message = "success"
            //   alert(message)
            setSuccess(true);
        },
        onError: (message) => {
            // console.log(message);
            // alert(message)
            if (message.toString().includes('409')) {
                setErrMsg('Email has already been taken');
            }
            else {
                setErrMsg('Register failed. Unknown error');
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
        <>
            {success ? (
                <section>
                    <h1>Register Success!</h1>
                    <nav>
                        <Link to="/signin">Sign in</Link>
                    </nav>
                    <p>
                        <a href=".">Back</a>
                    </p>
                </section>
            ) : (
                <section>
                    <p ref={errorRef} className={errMsg ? "errormsg" : "disable"} >{errMsg}</p>
                    <h1>Registration Form</h1>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <label htmlFor="fullname">Fullname:</label>
                        <input
                            {...register("fullname", {
                                required: "This input is required.",
                                minLength: {
                                    value: 4,
                                    message: "This input must have at least 4 characters."
                                },
                                maxLength: {
                                    value: 24,
                                    message: "This input must not exceed 24 characters"
                                }

                            })}
                            type="text"
                            id="fullname"
                        />

                        {errors.fullname && <p className="requirements">
                            <FontAwesomeIcon icon={faInfoCircle} />
                            {errors.fullname.message}<br />
                        </p>}

                        <label htmlFor="email">Email:</label>
                        <input
                            {...register("email", {
                                required: "This input is required.",
                                pattern: {
                                    value: /@/,
                                    message: "This input must include @."
                                },

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
                                required: "You must specify a password.",
                                minLength: {
                                    value: 8,
                                    message: "Password must have at least 8 characters."
                                },
                                maxLength: {
                                    value: 24,
                                    message: "Password must not exceed 24 characters."
                                }

                            })}
                        />

                        {errors.password && <p className="requirements">
                            <FontAwesomeIcon icon={faInfoCircle} />
                            {errors.password.message}<br />
                        </p>}

                        <label htmlFor="confirm_password">Confirm Password:</label>
                        <input
                            type="password"
                            id="confirm_password"
                            name="confirm_password"
                            {...register("confirm_password", {
                                validate: value =>
                                    value === password.current || "The password do not match"
                            })}
                        />
                        {errors.confirm_password && <p className="requirements">
                            <FontAwesomeIcon icon={faInfoCircle} />
                            {errors.confirm_password.message}<br />
                        </p>}
                        {isLoading && <span><CircularProgress color="secondary" /><div>Loading....</div></span>}
                        <button type="submit" disabled={isLoading}
                        >Sign Up</button>
                    </form>
                    <p>
                        Already registered?<br />
                        <span className="line">
                            <nav>
                                <Link to="/signin">Sign in</Link>
                            </nav>
                        </span>
                    </p>
                </section>
            )}
        </>
    )

}

export default Form;