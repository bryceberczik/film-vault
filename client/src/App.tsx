import Header from "./components/header/header.js"
import Footer from "./components/footer/footer.js";

import { Outlet } from "react-router-dom";

const App = () => {

  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  )
}

export default App
