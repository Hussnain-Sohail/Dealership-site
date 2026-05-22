import { useState, useContext } from "react";
import { AuthProvider } from "./AccessTokenProvider";
import { useNavigate } from "react-router-dom";

function DeleteAccount() {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [data, setData] = useState('');
    const { AccessToken, setAccessToken } = useContext(AuthProvider);
    const navigate = useNavigate();

    const getName = (event) => {
        setName(event.target.value);
    }
    const getPassword = (event) => {
        setPassword(event.target.value);
    }

    const Submit = async (event) => {
        event.preventDefault();
        try {
            const request = await fetch("http://localhost:3500/myaccount/deleteaccount", {
                method: 'DELETE',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${AccessToken}`,
                },
                body: JSON.stringify({ name, password }),
            });
            if (!request.ok) {
                setData('Could not delete Account');
                return;
            }
            const response = await request.json();
            setAccessToken(null);
            setData(response.message);
            setTimeout(() => {
                navigate('/');
            }, 2000);
        }
        catch (error) {
            console.log(error);
        }
    }
    console.log(`name ${name}`)
    return (
        <div>
            <form onSubmit={Submit}>
                <label>Enter name</label><br />
                <input type="text" required onChange={getName} /><br />
                <label>Enter password</label><br />
                <input type="password" required onChange={getPassword} /><br />
                <button id="button">Delete Account</button>
            </form>
            {data.length > 0 && <p>{data}</p>}
        </div>
    )
}
export default DeleteAccount