import { useState } from "react";
import { Link } from "react-router-dom";
import "./css/FilterBikes.css";
function FilterBikes() {
  const [Company, setCompany] = useState("");
  const [error, setError] = useState("");
  const [bikes, setBikes] = useState([]);
  const [print, setPrint] = useState(true);

  const Submit = async () => {
    try {
      const request = await fetch("http://localhost:3500/bikes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Company,
        }),
      });
      if (!request.ok) console.log("request was not ok filter bikes page");
      const response = await request.json();
      if (response.Bikes.length > 0) setBikes(response.Bikes);
      if (response.message.length > 0) setError(response.message);
      setPrint(true);
    } catch (error) {
      setPrint(false);
      console.log(error);
    }
  };
  console.log(`error ${error}`);
  return (
    <div>
      <div id="filter">
        <h1> Select Company Please</h1>
        <label className="label">Honda</label>
        <input
          type="radio"
          name="company"
          onChange={() => setCompany("Honda")}
        />
        <br />
        <label className="label">Yamaha</label>
        <input
          type="radio"
          name="company"
          onChange={() => setCompany("Yamaha")}
        />
        <br />
        <label className="label">Suzuki</label>
        <input
          type="radio"
          name="company"
          onChange={() => setCompany("Suzuki")}
        />
        <br />
        <label className="label">Aprilia</label>
        <input
          type="radio"
          name="company"
          onChange={() => setCompany("Aprilia")}
        />
        <br />
        <br />
        <button id="submit" onClick={Submit}>
          Submit request
        </button>
        <button id="submit" onClick={() => setPrint(false)}>
          Hide Bikes
        </button>
        <button id="submit" onClick={() => setPrint(true)}>
          Show Bikes
        </button>
      </div>
      <div className="data">
        {bikes.length > 0 &&
          print &&
          bikes.map((data, index) => {
            return (
              <div className="bike-card" key={data._id}>
                <Link to={`/bikedetails/${data.Company}/${data.Name}`}>
                  <img
                    src={`/images/${Company}images/${data.Name}`}
                    alt={`This is a picture of ${data.Name}`}
                  />
                  <p className="bike-card-name">{data.Name}</p>
                  <p className="bike-card-name">
                    Available Status:
                    {data.UnitsAvailable > 0 ? "In Stock" : "Out of Stock"}
                  </p>
                  <p>Click for bike details</p>
                </Link>
              </div>
            );
          })}
      </div>
      {error.length > 0 && <h2>{error}</h2>}
    </div>
  );
}
export default FilterBikes;
