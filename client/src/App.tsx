import Header from "./components/header/header.js"

import { Outlet } from "react-router-dom";

const App = () => {

  return (
    <div>
      <Header />
      <Outlet />
      
    </div>
  )
}

export default App
