import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import OrderHistory from "./components/OrderHistory";

function App() {
  return (
    <>
      <Navbar />
      <OrderHistory userID={11} />
      <Footer />
    </>
  );
}

export default App;
