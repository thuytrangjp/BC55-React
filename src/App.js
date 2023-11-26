import React from "react";
import Content from "./Components/Content";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
export default function App() {
  return (
    <div className="App">
        <Header />
        <Content className="container"/>
        <Footer />
    </div>
  );
}