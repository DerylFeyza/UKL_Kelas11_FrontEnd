import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login/Login";
import Dashboard from "./pages/Admin/Dashboard";
import AdminNav from "./components/AdminNav";
import "./App.css";

const App = () => {
	return (
		<Router>
			<AdminNav />
			<Routes>
				<Route path="/login" element={<Login />} />
				<Route path="/dashboard" element={<Dashboard />} />
			</Routes>
		</Router>
	);
};

export default App;
