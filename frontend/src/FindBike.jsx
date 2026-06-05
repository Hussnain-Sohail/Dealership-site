import { useState } from "react";
import { Link } from "react-router-dom";
import "./css/FindBike.css";
function FindBike() {
  const [companyName, setCompanyName] = useState("");
  const [bikeName, setBikeName] = useState("");
  const [error, setError] = useState("");
  const [print, setPrint] = useState(false);
  const [bike, setBike] = useState({});

  const getBikeName = (event) => {
    setBikeName(event.target.value);
  };
  const Submit = async () => {
    try {
      setPrint(true);
      const request = await fetch("http://localhost:3500/findbike", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          companyName,
          bikeName,
        }),
      });
      if (!request.ok) console.log("request was not ok find bikes page");
      const response = await request.json();
      if (response.FindBike) {
        console.log(`bike ${response.FindBike.Name}`);
        setBike(response.FindBike);
      }
      if (response.message) {
        setPrint(false);
        setError(response.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div id="find-bike">
        <h2>Select Company Please</h2>
        <label className="find-label">Honda</label>
        <input
          type="radio"
          name="company"
          onChange={() => setCompanyName("Honda")}
        />
        <br />
        <label className="find-label">Yamaha</label>
        <input
          type="radio"
          name="company"
          onChange={() => setCompanyName("Yamaha")}
        />
        <br />
        <label className="find-label">Suzuki</label>
        <input
          type="radio"
          name="company"
          onChange={() => setCompanyName("Suzuki")}
        />
        <br />
        <label className="find-label">Aprilia</label>
        <input
          type="radio"
          name="company"
          onChange={() => setCompanyName("Aprilia")}
        />
        <br />
        <label className="find-label">Enter Bike Name</label>
        <br />
        <input type="text" required onChange={getBikeName} id="find-input" />
        <br />
        <button id="find-submit" onClick={Submit}>
          Submit request
        </button>
        <button id="find-submit" onClick={() => setPrint(false)}>
          Hide Bike
        </button>
        <button id="find-submit" onClick={() => setPrint(true)}>
          Show Bike
        </button>
      </div>
      {bike !== {} && print && (
        <div>
          <p>Company: {bike.Company}</p>
          <p>Name: {bike.Name}</p>
          {bike.UnitsAvailable > 0 ? (
            <Link to={`/purchasebike/${companyName}/${bikeName}`}>
              <p>Bike is in Stock. Click to Purchase</p>
            </Link>
          ) : (
            <p>Bike is out of Stock</p>
          )}
        </div>
      )}
      {error.length > 0 && <p>{error}</p>}
    </div>
  );
}
export default FindBike;
