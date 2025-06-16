import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import ManageSKU from "./Pages/ManageSKU";
import OrderCreation from "./Pages/OrderCreation";
import OrderManagement from "./Pages/OrderManagement";

function App() {
  const [active, setActive] = useState("SKU");

  const PagetobeRender = () => {
    if (active === "SKU") return <ManageSKU />;
    if (active === "OrderCreation") return <OrderCreation />;
    if (active === "OrderManagement") return <OrderManagement />;
  };
  return (
    <div className="container mt-4 ">
      <div className="mb-4 d-flex gap-3  ">
        <button
          className={`btn btn-outline-primary ${
            active === "SKU" ? "active" : ""
          }`}
          onClick={() => {
            setActive("SKU");
          }}
        >
          Manage SKU
        </button>
        <button
          className={`btn btn-outline-primary ${
            active === "OrderCreation" ? "active" : ""
          }`}
          onClick={() => {
            setActive("OrderCreation");
          }}
        >
          ADD Order
        </button>
        <button
          className={`btn btn-outline-primary ${
            active === "OrderManagement" ? "active" : ""
          }`}
          onClick={() => {
            setActive("OrderManagement");
          }}
        >
          Manage Order
        </button>
      </div>
      {PagetobeRender()}
    </div>
  );
}

export default App;
