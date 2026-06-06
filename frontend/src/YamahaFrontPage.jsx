import "./css/YamahaFrontPage.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
function YamahaFrontPage() {
  const Company = "Yamaha";
  const [bikes, setBikes] = useState([]);

  useEffect(() => {
    const FetchBikes = async () => {
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
        if (!request.ok) console.log("request was not ok in honda front page");
        const response = await request.json();
        setBikes(response.Bikes);
      } catch (error) {
        console.log(error);
      }
    };
    FetchBikes();
  }, []);
  return (
    <>
      <h1>Yamaha Motorsports</h1>
      <h1>Where design meets Perfection</h1>
      <div id="yamahaimage1"></div>
      <main>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit,
          distinctio veritatis. Ea temporibus totam reprehenderit suscipit
          repellendus, labore delectus ducimus adipisci tempore odit deserunt
          blanditiis aperiam maiores error modi. Atque.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit,
          distinctio veritatis. Ea temporibus totam reprehenderit suscipit
          repellendus, labore delectus ducimus adipisci tempore odit deserunt
          blanditiis aperiam maiores error modi. Atque.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit,
          distinctio veritatis. Ea temporibus totam reprehenderit suscipit
          repellendus, labore delectus ducimus adipisci tempore odit deserunt
          blanditiis aperiam maiores error modi. Atque.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit,
          distinctio veritatis. Ea temporibus totam reprehenderit suscipit
          repellendus, labore delectus ducimus adipisci tempore odit deserunt
          blanditiis aperiam maiores error modi. Atque.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit,
          distinctio veritatis. Ea temporibus totam reprehenderit suscipit
          repellendus, labore delectus ducimus adipisci tempore odit deserunt
          blanditiis aperiam maiores error modi. Atque.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit,
          distinctio veritatis. Ea temporibus totam reprehenderit suscipit
          repellendus, labore delectus ducimus adipisci tempore odit deserunt
          blanditiis aperiam maiores error modi. Atque.
        </p>
      </main>

      <div id="yamahaimage2"></div>

      <h1>Our Product Lineup for Yamaha</h1>
      {bikes.length > 0 &&
        bikes.map((data, index) => {
          return (
            <Link key={index} to={`/bikedetails/${Company}/${data.Name}`}>
              <div className="bike-card">
                <p className="bike-name">Name: {data.Name}</p>
                <img src={data.Image_Secure_URL} width='300px' height='300px' objectFit='cover' />
              </div>
            </Link>
          );
        })}
    </>
  );
}
export default YamahaFrontPage;
