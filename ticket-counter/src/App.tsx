import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Manager, Customer, Home } from "./pages";
import { AuthProvider } from "./Auth";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route path="/manager" element={<Manager />} />
            <Route path="/customer" element={<Customer />} />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
