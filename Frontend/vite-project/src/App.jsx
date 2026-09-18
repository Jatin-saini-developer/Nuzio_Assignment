import { BrowserRouter, Routes, Route } from "react-router-dom";
import Splash from "./pages/Splash";
import Language from "./pages/Language";
import Login from "./pages/Login";
import Profession from "./pages/Profession";
import Voice from "./pages/Voice";
import Time from "./pages/Time";
import Notifications from "./pages/Notifications";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Splash />} />
        <Route path="/language" element={<Language/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/profession" element={<Profession />} />
        <Route path="/voice" element={<Voice />} />
        <Route path="/time" element={<Time />} />
        <Route path="/notifications" element={<Notifications />} />

      </Routes>
    </BrowserRouter>
  );
}