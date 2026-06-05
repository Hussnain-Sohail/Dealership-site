import { useEffect, useState, useContext } from "react";
import { AuthProvider } from "./AccessTokenProvider";
import { Link, useNavigate } from 'react-router-dom';
import './css/MyAccount.css'

function MyAccount() {
  const [name, setName] = useState("");
  const [orders, setOrders] = useState([]);
  const [date, setDate] = useState('');
  const { AccessToken, setAccessToken } = useContext(AuthProvider);
  const [isAdmin, setIsAdmin] = useState(false);
  const [data, setData] = useState('');
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const getStatus = async () => {
    try {
      const request = await fetch('http://localhost:3500/accountstatus', {
        method: 'GET',
        headers: {
          'authorization': `Bearer ${AccessToken}`
        }
      });
      const response = await request.json();
      setIsAdmin(response.isAdmin);
    }
    catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    const GetAccountInformation = async () => {
      try {
        const request = await fetch("http://localhost:3500/myaccount", {
          method: "POST",
          credentials: 'include',
          headers: {
            'authorization': `Bearer ${AccessToken}`
          }
        });
        if (!request.ok) {
          setTimeout(() => {
            navigate('/login');
          }, 2000);
        }
        const response = await request.json();
        setName(response.name);
        setOrders(response.orders);
        setDate(response.date);
      } catch (error) {
        console.error(error);
      }
    };
    GetAccountInformation();
    getStatus();
  }, []);

  const Submit = async () => {
    try {
      const request = await fetch('http://localhost:3500/myaccount/logout', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'authorization': `Bearer ${AccessToken}`
        }
      });
      if (!request.ok) {
        setError('Could not fetch Account information. Please Login first. Taking to Login page');
        return;
      }
      setData('Logging Out please wait ............');
      setAccessToken(null);
      setTimeout(() => {
        navigate('/'), 2000;
      })
    }
    catch (error) {
      setError('Could Not Logout. Please try again later');
      console.log(error);
    }
  }
  return (
    <div>
      <div id="myaccount-card">
        <h2>Account Information</h2>
        <p>Name: {name}</p>
        <p>
          Orders Placed: {orders.length}
        </p>
        <p>Account was created on: {date}</p>
        <button className="button" onClick={Submit}>Logout</button><br />
        <Link to='/myaccount/deleteaccount'>
          <button className="button">Delete my Account</button>
        </Link>
      </div>
      <div>
        {data.length > 0 && <p>{data}</p>}
        {error.length > 0 && <p>{error}</p>}
      </div><br />
      {isAdmin && <Link to='/admin/addnewbike'>
        <button>Add new bike</button>
      </Link>}
      <br />
      {isAdmin && <Link to='/admin/removebike'>
        <button>Remove Bike</button>
      </Link>}
    </div>
  );
}
export default MyAccount;
