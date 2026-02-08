import React from "react";
import Portfolio from "./components/Portfolio/Portfolio.jsx";
import { Analytics } from "@vercel/analytics/react";

export default function App() {
  return (
    <>
      <Portfolio />
      <Analytics />
    </>
  );
}
