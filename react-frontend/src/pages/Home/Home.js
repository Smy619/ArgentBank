import React from "react";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import Feature from "../../components/feature/feature";
import "./Home.css"

function Home() {

  return (
     <>
      <Navbar />
      <main>
        <div className="main-content">
        <Feature />
        </div>
      </main>
      <Footer />
    </>
  );
}
export default Home;
