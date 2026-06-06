import { useState } from 'react';
import { AuthProvider } from 'react';
function RemoveBike() {
    const [companyName, setCompanyName] = useState('');
    const [bikeName, setBikeName] = useState('');
    const [userName, setUserName] = useState('');
    const [data, setData] = useState('');
    const { AccessToken, setAccessToken } = useState(AuthProvider);

    const getUserName = (event) => {
        setUserName(event.target.value);
    }
    const getCompanyName = (event) => {
        setCompanyName(event.target.value);
    }
    const getBikeName = (event) => {
        setBikeName(event.target.value);
    }

    const Submit = async (event) => {
        try {
            event.preventDefault();
            const request = await fetch('http://localhost:3500/admin/removebike', {
                method: 'DELETE',
                headers: {
                    'authorization': `Bearer ${AccessToken}`,
                    'Content-Type': 'application/json'
                }, body: JSON.stringify({
                    userName, companyName, bikeName
                })
            });
            const response = await request.json();
            setData(response.message);
        }
        catch (error) {
            console.error(error);
            setData('could not delete bike');
        }
    }

    return (
        <div>
            <form onSubmit={Submit}>
                <label>Enter Username</label><br />
                <input type='text' onChange={getUserName} required /><br />
                <label>Enter Company Name</label><br />
                <input type='text' onChange={getCompanyName} required /><br />
                <label>Enter Bike Name</label><br />
                <input type='text' onChange={getBikeName} required /><br />
                <button>Submit Request</button>
            </form>
            {data && <p>{data}</p>}
        </div>
    )
}
export default RemoveBike;