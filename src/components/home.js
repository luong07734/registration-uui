import { useContext } from "react";
import AuthContext from "../context/AuthProvider";

function Home(props) {
    const {auth, setAuth } = useContext(AuthContext);

    const logout = async () => {
        // alert(JSON.stringify(auth))
        setAuth({});
        localStorage.clear()
        // navigate('/signin');
    }
    
    return (
        <section>
            <h1>This is Home Page</h1>
            <br />
            <p>You are logged in!</p>
            <p>{auth.user}</p>
            <div className="flexGrow">
                <button onClick={logout}>Sign Out</button>
            </div>
        </section>
    )
}

export default Home;