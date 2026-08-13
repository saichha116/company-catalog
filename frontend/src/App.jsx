import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Navbar from "./components/Navbar";
import Services from "./pages/Services";
import Contact from "./components/Contact";
import ServiceDetails from "./pages/ServiceDetails";

import "./styles/service.css";

function App() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <BrowserRouter>

      <Navbar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      <Routes>

        <Route
          path="/"
          element={
            <Services
              searchTerm={searchTerm}
            />
          }
        />

        <Route
          path="/services"
          element={
            <Services
              searchTerm={searchTerm}
            />
          }
        />

        <Route
          path="/services/:id"
          element={<ServiceDetails />}
        />

        <Route
          path="/contact"
          element={<Contact />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;