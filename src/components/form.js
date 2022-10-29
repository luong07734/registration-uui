import React from "react";
import { useRef, useState, useEffect } from "react";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from 'axios'

const USER_REGEX = /^.{4,24}$/;
const PWD_REGEX = /^.{8,24}$/;
const EMAIL_REGEX = /@/;

function Form(props) {
    // hooks
    const [fullname, setFullname] = useState('');
    const [validFullname, setValidFullname] = useState(false);
    const [fullnameInputFocus, setFullnameInputFocus] = useState(false);

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [emailInputFocus, setEmailInputFocus] = useState(false);

    const [password, setPassword] = useState('');
    const [validPassword, setValidPassword] = useState(false);
    const [passwordInputFocus, setPasswordInputFocus] = useState(false);

    const [matchPassword, setMatchPassword] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    const fullnameRef = useRef();
    const errorRef = useRef();

    useEffect(() => {
        fullnameRef.current.focus();
    }, [])

    useEffect(() => {
        const result = USER_REGEX.test(fullname);
        console.log(result);
        console.log(fullname);
        setValidFullname(result);
    }, [fullname])

    useEffect(() => {
        const result = EMAIL_REGEX.test(email);
        console.log(result);
        console.log(email);
        setValidEmail(result);
    }, [email])

    useEffect(() => {
        const result = PWD_REGEX.test(password);
        console.log(result);
        console.log(password);
        setValidPassword(result);
        const match = (password === matchPassword);
        setValidMatch(match);
    }, [password, matchPassword])

    useEffect(() => {
        setErrMsg('')
    }, [fullname, email, password, matchPassword])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // post api
            axios.post('https://registration-api-ia2.herokuapp.com/users/register', {
                fullname: fullname, email: email, password: password
            }).then((response) => {
                console.log(response.data);
                console.log(response.status);
                console.log(response.statusText);
                console.log(response.headers);
                console.log(response.config);
                setSuccess(true);
                //clear state and controlled inputs
                //need value attrib on inputs for this
                setFullname('');
                setPassword('');
                setMatchPassword('');
            }, (error) => {
                console.log(error);
                setErrMsg('Email has already been taken');
                errorRef.current.focus();
            });

        } catch (err) {
            setErrMsg('Register failed');
            errorRef.current.focus();
        }
    }
    return (
        <>
            {success ? (
                <section>
                    <h1>Register Success!</h1>
                    <p>
                        <a href=".">Back</a>
                    </p>
                </section>
            ) : (
                <section>
                    <p ref={errorRef} className={errMsg ? "errormsg" : "disable"} >{errMsg}</p>
                    <h1>Registration Form</h1>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="fullname">Fullname:</label>
                        <input
                            type="text"
                            id="fullname"
                            ref={fullnameRef}
                            autoComplete="off"
                            onChange={(e) => setFullname(e.target.value)}
                            value={fullname}
                            required
                            onFocus={() => setFullnameInputFocus(true)}
                            onBlur={() => setFullnameInputFocus(false)}

                        />
                        <p className={fullnameInputFocus && fullname && !validFullname ? "requirements" : "disable"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            4 to 24 characters.<br />
                        </p>
                        <label htmlFor="email">Email:</label>
                        <input
                            type="text"
                            id="email"
                            autoComplete="off"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            onFocus={() => setEmailInputFocus(true)}
                            onBlur={() => setEmailInputFocus(false)}

                        />
                        <p className={emailInputFocus && !validEmail ? "requirements" : "disable"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Must include @<br />
                        </p>

                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            onFocus={() => setPasswordInputFocus(true)}
                            onBlur={() => setPasswordInputFocus(false)}

                        />
                        <p className={passwordInputFocus && !validPassword ? "requirements" : "disable"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            8 to 24 characters.<br />
                        </p>

                        <label htmlFor="confirm_password">Confirm Password:</label>
                        <input
                            type="password"
                            id="confirm_password"
                            value={matchPassword}
                            onChange={(e) => setMatchPassword(e.target.value)}
                            required
                            onFocus={() => setMatchFocus(true)}
                            onBlur={() => setMatchFocus(false)}

                        />
                        <p id="confirmnote" className={matchFocus && !validMatch ? "requirements" : "disable"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Must match the above password.
                        </p>

                        <button disabled={!validFullname || !validPassword || !validMatch ? true : false}>Sign Up</button>
                    </form>
                </section>
            )}
        </>
    )

}

export default Form;