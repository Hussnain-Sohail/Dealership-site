import { useState, useContext } from "react";
import { AuthProvider } from './AccessTokenProvider';
import { useParams } from 'react-router-dom';
import './css/PurchaseBike.css';

function PurchaseBike() {
    const { companyName, bikeName } = useParams();
    const [password, setPassword] = useState('');
    const [city, setCity] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [data, setData] = useState('');
    const { AccessToken } = useContext(AuthProvider);

    const getPassword = (event) => {
        setPassword(event.target.value);
    }
    const getCity = (event) => {
        setCity(event.target.value);
    }
    const getContactNumber = (event) => {
        setContactNumber(event.target.value);
    }

    const Submit = async (event) => {
        event.preventDefault();
        try {
            const request = await fetch('http://localhost:3500/purchasebike', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${AccessToken}`
                },
                body: JSON.stringify({
                    companyName, bikeName, password, city, contactNumber
                })
            });
            if (!request.ok) {
                setData('Could not place order');
                return;
            }
            const response = await request.json();
            setData(response.message);
        }
        catch (error) {
            setData('Could not place order');
            console.error(error);
        }
    }
    console.log(companyName)
    return (
        <div>
            <form onSubmit={Submit} id="purchase-form">
                <h2>Bike {companyName} {bikeName}</h2>
                <label className="purchase-label">Enter Password</label><br />
                <input className="purchase-input" type="password" required onChange={getPassword} /><br />
                <label className="purchase-label">Enter City</label><br />
                <input className="purchase-input" type="text" required onChange={getCity} /><br />
                <label className="purchase-label">Contact Number</label><br />
                <input className="purchase-input" type="text" required onChange={getContactNumber} /><br />
                <button id="purchase-button">Place Order</button>
            </form>
            {data && <p>{data}</p>}
        </div>
    )
}
export default PurchaseBike