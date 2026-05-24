import { useState, useContext } from "react";
import { AuthProvider } from "./AccessTokenProvider";
import { useNavigate } from "react-router-dom";
import './css/DeleteAccount.css';

function DeleteAccount() {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [data, setData] = useState('');
    const { AccessToken, setAccessToken } = useContext(AuthProvider);
    const navigate = useNavigate();

    const getName = (event) => {
        setName(event.target.value);
    }
    const getPassword = (event) => {
        setPassword(event.target.value);
    }
    const getConfirmPassword = (event) => {
        setConfirmPassword(event.target.value);
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
                body: JSON.stringify({ name, password, confirmPassword }),
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
            <div id="delete-account-form">
                <form onSubmit={Submit}>
                    <label className='delete-label'>Enter name</label><br />
                    <input type="text" required onChange={getName} className="delete-input" /><br />
                    <label className='delete-label'>Enter password</label><br />
                    <input type="password" required onChange={getPassword} className="delete-input" /><br />
                    <label className='delete-label'>Confirm Password</label><br />
                    <input type="password" required onChange={getConfirmPassword} className="delete-input" />
                    <button id="delete-button">Delete Account</button>
                </form>
            </div>
            {data.length > 0 && <p>{data}</p>}
            {data.length === 0 && <p id="message">Please not deleting account is permanent and cannot be undoned. Account cannot be deleted while there are orders pending</p>}
        </div>
    )
}
export default DeleteAccount