import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Layout from "./layout";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Layout>
      <div className="wrapper-2">
        {" "}
        <div className="holder-active"></div>
      </div>
    </Layout>
  );
}

export default App;
