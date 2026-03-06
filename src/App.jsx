import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./Homepage";
import Explore from "./Explore";
import BuildTrip from "./BuildTrip";
import TripResult from "./TripResult";
import Saved from "./Saved";
import Register from "./Register";
import Login from "./Login";
import ForgotPassword from "./ForgetPassword";
import ResetPassword from "./ResetPassword";
 
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/build-trip" element={<BuildTrip />} />
        <Route path="/trip-result" element={<TripResult />} />
        <Route path="/saved" element={<Saved />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
      </Routes>
    </BrowserRouter>
  );
}
