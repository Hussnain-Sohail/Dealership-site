import { useState } from 'react';
import { AuthProvider } from 'react';
import './css/AdminRemoveBike.css'
function RemoveBike() {
    const [companyName, setCompanyName] = useState('');
    const [bikeName, setBikeName] = useState('');
    const [data, setData] = useState('');
    const { AccessToken, setAccessToken } = useState(AuthProvider);

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
                    companyName, bikeName
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
            <div id='container-remove-bike'>
                <h1>Remove Bike</h1>
                <form onSubmit={Submit} id='remove-bike-form'>
                    <label className='label'>Enter Company Name</label><br />
                    <input className='input' type='text' onChange={getCompanyName} required /><br />
                    <label className='label'>Enter Bike Name</label><br />
                    <input className='input' type='text' onChange={getBikeName} required /><br />
                    <button id='button'>Submit Request</button>
                </form>
                {data && <p>{data}</p>}
            </div><br />
            <p id='remove-warning'>Please note removing bike from database is permanent and cannot be undone !</p>
        </div>
    )
}
export default RemoveBike;