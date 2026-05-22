import "./css/FrontPageDealership.css";
import { Link } from "react-router-dom";
function FrontPageDealership() {
  return (
    <>
      <h1 id="header">Welcome to ----Dealership----</h1>
      <br />
      <div id="main-pic"></div>
      <br />
      <h1 id="header">What we sell</h1>
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Facilis
        sapiente quos dolorum in, labore quisquam voluptatum asperiores dolores,
        laudantium facere ut esse unde vel aliquid incidunt modi laboriosam
        architecto hic.
      </p>
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Facilis
        sapiente quos dolorum in, labore quisquam voluptatum asperiores dolores,
        laudantium facere ut esse unde vel aliquid incidunt modi laboriosam
        architecto hic.
      </p>
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Facilis
        sapiente quos dolorum in, labore quisquam voluptatum asperiores dolores,
        laudantium facere ut esse unde vel aliquid incidunt modi laboriosam
        architecto hic.
      </p>
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Facilis
        sapiente quos dolorum in, labore quisquam voluptatum asperiores dolores,
        laudantium facere ut esse unde vel aliquid incidunt modi laboriosam
        architecto hic.
      </p>
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Facilis
        sapiente quos dolorum in, labore quisquam voluptatum asperiores dolores,
        laudantium facere ut esse unde vel aliquid incidunt modi laboriosam
        architecto hic.
      </p>
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Facilis
        sapiente quos dolorum in, labore quisquam voluptatum asperiores dolores,
        laudantium facere ut esse unde vel aliquid incidunt modi laboriosam
        architecto hic.
      </p>
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Facilis
        sapiente quos dolorum in, labore quisquam voluptatum asperiores dolores,
        laudantium facere ut esse unde vel aliquid incidunt modi laboriosam
        architecto hic.
      </p>
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Facilis
        sapiente quos dolorum in, labore quisquam voluptatum asperiores dolores,
        laudantium facere ut esse unde vel aliquid incidunt modi laboriosam
        architecto hic.
      </p>
      <br />
      <div id="image1"></div>
      <main>
        <h1 id="header">More About Us</h1>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Facilis
          sapiente quos dolorum in, labore quisquam voluptatum asperiores
          dolores, laudantium facere ut esse unde vel aliquid incidunt modi
          laboriosam architecto hic.
        </p>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Facilis
          sapiente quos dolorum in, labore quisquam voluptatum asperiores
          dolores, laudantium facere ut esse unde vel aliquid incidunt modi
          laboriosam architecto hic.
        </p>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Facilis
          sapiente quos dolorum in, labore quisquam voluptatum asperiores
          dolores, laudantium facere ut esse unde vel aliquid incidunt modi
          laboriosam architecto hic.
        </p>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Facilis
          sapiente quos dolorum in, labore quisquam voluptatum asperiores
          dolores, laudantium facere ut esse unde vel aliquid incidunt modi
          laboriosam architecto hic.
        </p>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Facilis
          sapiente quos dolorum in, labore quisquam voluptatum asperiores
          dolores, laudantium facere ut esse unde vel aliquid incidunt modi
          laboriosam architecto hic.
        </p>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Facilis
          sapiente quos dolorum in, labore quisquam voluptatum asperiores
          dolores, laudantium facere ut esse unde vel aliquid incidunt modi
          laboriosam architecto hic.
        </p>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Facilis
          sapiente quos dolorum in, labore quisquam voluptatum asperiores
          dolores, laudantium facere ut esse unde vel aliquid incidunt modi
          laboriosam architecto hic.
        </p>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Facilis
          sapiente quos dolorum in, labore quisquam voluptatum asperiores
          dolores, laudantium facere ut esse unde vel aliquid incidunt modi
          laboriosam architecto hic.
        </p>

        <div id="image2"></div>

        <h1 id="header">See our services</h1>

        <footer>
          <div id="parent">
            <div id="brands">
              <h2>Our Brands</h2>
              <Link to="/ourbrands/honda">
                <p>Honda</p>
              </Link>
              <Link to="/ourbrands/yamaha">
                <p>Yamaha</p>
              </Link>
              <Link to="/ourbrands/suzuki">
                <p>Suzuki</p>
              </Link>
              <Link to="/ourbrands/aprilia">
                <p>Aprilia</p>
              </Link>
            </div>

            <div id="secondry">
              <h2 id="secondry-header">Filter Bikes</h2>
              <Link to="/filterbikes">
                <p>Search based on Brand</p>
              </Link>
              <Link to="/findbike">
                <p>Search Bike for me</p>
              </Link>
              <Link to="/seemyorders">
                <p>See my Orders</p>
              </Link>
            </div>

            <div id="third">
              <h2>My Account</h2>
              <Link to="/signup">
                <p>Create My Account</p>
              </Link>
              <Link to="/login">
                <p>Login to Account</p>
              </Link>
              <Link to="/myaccount">
                <p>My Account</p>
              </Link>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
export default FrontPageDealership;
