import { useState, useContext } from 'react';
import { AuthProvider } from './AccessTokenProvider';
import './css/AdminAddBike.css'
function AdminAddBike() {
    const [companyName, setCompanyName] = useState('');
    const [bikeName, setBikeName] = useState('');
    const [topSpeed, setTopSpeed] = useState('');
    const [price, setPrice] = useState('');
    const [horsePower, setHorsePower] = useState('');
    const [unitsAvailable, setunitsAvailable] = useState('');
    const [engine, setEngine] = useState('');
    const [imagePath, setImagePath] = useState(null);
    const [data, setData] = useState('');
    const { AccessToken, setAccessToken } = useContext(AuthProvider);

    const getValue = (setVariable) => {
        return (event) => {
            setVariable(event.target.value);
        }
    }
    const getIntegerValue = (setVariable) => {
        return (event) => {
            setVariable(Number(event.target.value));
        }
    }
    const getImage = (event) => {
        const image = event.target.files[0];
        const reader = new FileReader();
        reader.onload = () => {
            setImagePath(reader.result);
        }
        reader.readAsDataURL(image);
    }
    const Submit = async (event) => {
        try {
            event.preventDefault();
            const request = await fetch('http://localhost:3500/admin/addnewbike', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${AccessToken}`
                }, body: JSON.stringify({
                    companyName, bikeName, topSpeed, price, horsePower, engine, unitsAvailable, imagePath
                })
            });
            const response = await request.json();
            setData(response.message);
        }
        catch (error) {
            console.error(error);
            setData('Could not add new bike');
        }
    }
    return (
        <div id='container-addbike'>
            <form onSubmit={Submit} id='add-bike-form'>
                <label className='label'>Enter Company name</label><br />
                <input className='input' type='number' onChange={getValue(setCompanyName)} required /><br />
                <label className='label'>Enter Bike Name</label><br />
                <input className='input' type='text' onChange={getValue(setBikeName)} required /><br />
                <label className='label'>Enter TopSpeed</label><br />
                <input className='input' type='number' onChange={getIntegerValue(setTopSpeed)} min={0} required /><br />
                <label className='label'>Enter Price</label><br />
                <input className='input' type='number' onChange={getIntegerValue(setPrice)} min={0} required /><br />
                <label className='label'>Enter Horsepower</label><br />
                <input className='input' type='number' onChange={getIntegerValue(setHorsePower)} min={0} required /><br />
                <label className='label'>Enter Engine information</label><br />
                <input className='input' type='text' onChange={getValue(setEngine)} required /><br />
                <label className='label'>Enter Unitsavailable</label><br />
                <input className='input' type='number' onChange={getIntegerValue(setunitsAvailable)} min={0} required /><br />
                <label className='label'>Upload Bike Image</label><br />
                <input className='input' type='file' onChange={getImage} required /><br />
                <button id='button'>Add New Bike</button>
            </form>
            {data && <p>{data}</p>}
        </div>
    )
}
// 4-stroke, 2-cylinder, DOHC
export default AdminAddBike