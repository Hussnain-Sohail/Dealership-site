import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import './css/BikeDetails.css'

function BikeDetails() {
    const { Company, Name } = useParams();
    const [data, setData] = useState('');
    const [bike, setBike] = useState({});

    console.log(`Company ${Company}`);
    console.log(`Name ${Name}`);
    useEffect(() => {
        const getBikeDetails = async () => {
            try {
                const request = await fetch('http://localhost:3500/bikedetails', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        Company, Name,
                    })
                });
                if (!request.ok) {
                    setData('Could not load bike details. Please try again later');
                    return;
                }
                const response = await request.json();
                setBike(response.bike);
            }
            catch (error) {
                console.log(error);
            }
        }
        getBikeDetails();
    }, [bike]);

    return (
        <div id="bike-card-container">
            {
                bike ? (
                    < div >
                        <p>Name: {bike.Name} </p>
                        <p>Company: {bike.Company}</p>
                        <p>Top Speed: {bike.Topspeed} Km/h</p>
                        <p>Horsepower: {bike.Horsepower}</p>
                        <p>Engine specs: {bike.Engine}</p>
                        <p>Price: {bike.Price} $USD</p>
                    </div>
                ) : (<p>Bike Not found. please try again later</p>)
            }
            <Link to={`/purchasebike/${bike.Company}/${bike.Name}`}>
                <button id="purchase-button">Purchase Bike</button>
            </Link>
        </div>
    )
}
export default BikeDetails