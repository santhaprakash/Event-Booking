import Nav from "./pages/Nav";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Registration from "./pages/Registration";

function App() {
  return (
    <div className="App">
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<Nav />} />
        </Routes>
        <Routes>
          <Route path="/:id" element={<Registration />} />
        </Routes>
      </div>
    </BrowserRouter>
    </div>
  );
}

export default App;



