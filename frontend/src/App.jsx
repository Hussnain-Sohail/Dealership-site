import FrontPageDealership from "./FrontPageDealership";
import HondaFrontPage from "./HondaFrontPage";
import YamahaFrontPage from "./YamahaFrontPage";
import SuzukiFrontPage from "./SuzukiFrontPage";
import ApriliaFrontPage from "./ApriliaFrontPage";
import FilterBikes from "./FilterBikes";
import FindBike from "./FindBike";
import SignUp from "./SignUp";
import LogIn from "./LogIn";
import Protect from "./Protect";
import MyAccount from "./MyAccount";
import SeeMyOrders from "./SeeMyOrders";
import DeleteAccount from "./DeleteAccount";
import BikeDetails from "./BikeDetails";
import PurchaseBike from "./PurchaseBike";
import { Routes, Route } from "react-router-dom";
import AdminAddBike from "./AdminAddBike";
import RemoveBike from "./AdminRemoveBike";

function App() {
  return (
    <Routes>
      <Route path="/" element={<FrontPageDealership />} />
      <Route path="/ourbrands/honda" element={<HondaFrontPage />} />
      <Route path="/ourbrands/yamaha" element={<YamahaFrontPage />} />
      <Route path="/ourbrands/suzuki" element={<SuzukiFrontPage />} />
      <Route path="/ourbrands/aprilia" element={<ApriliaFrontPage />} />
      <Route path="/filterbikes" element={<FilterBikes />} />
      <Route path="/findbike" element={<FindBike />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<LogIn />} />
      <Route path="/bikedetails/:Company/:Name" element={<BikeDetails />} />
      <Route
        path="/myaccount"
        element={
          <Protect>
            <MyAccount />
          </Protect>
        }
      />
      <Route
        path="/myaccount/deleteaccount"
        element={
          <Protect>
            <DeleteAccount />
          </Protect>
        }
      />
      <Route path="/seemyorders" element={<Protect><SeeMyOrders /></Protect>} />
      <Route path="/purchasebike/:companyName/:bikeName" element={<Protect><PurchaseBike /></Protect>} />
      <Route path="/admin/addnewbike" element={<Protect><AdminAddBike /></Protect>} />
      <Route path="/admin/removebike" element={<Protect><RemoveBike /></Protect>} />
    </Routes>
  );
}

export default App;
