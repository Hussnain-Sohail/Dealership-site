import { useState, useContext } from "react";
import { AuthProvider } from "./AccessTokenProvider";
import "./css/LogIn.css";
import { Link } from "react-router";

function LogIn() {
  const [Name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [data, setData] = useState("");
  const { AccessToken, setAccessToken } = useContext(AuthProvider);

  const getName = (event) => {
    setName(event.target.value);
  };
  const getPassword = (event) => {
    setPassword(event.target.value);
  };

  const Submit = async (event) => {
    event.preventDefault();
    try {
      const request = await fetch("http://localhost:3500/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Name,
          password,
        }),
      });

      const response = await request.json();
      if (!request.ok) {
        setData(response.message)
        return;
      }
      setData(response.message);
      setAccessToken(response.AccessToken);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div id="container">
      <form onSubmit={Submit} id="login-form">
        <h1>Log In To Account</h1>
        <label className="label">Enter Name</label>
        <br />
        <input className="input" type="text" required onChange={getName} />
        <br />
        <br />
        <label className="label">Enter Password</label>
        <br />
        <input
          className="input"
          type="password"
          required
          onChange={getPassword}
        />
        <br />
        <button id="signup-button">Submit Information</button>
      </form>
      {data && <p id="data">{data}</p>}
      <Link to="/signup">
        <p id="login-link">
          Dont have an Account yet. Click to create Youre Account
        </p>
      </Link>
    </div>
  );
}
export default LogIn;
