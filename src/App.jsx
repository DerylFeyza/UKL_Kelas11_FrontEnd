import {
	BrowserRouter as Router,
	Route,
	Routes,
	Outlet,
} from "react-router-dom";
import Login from "./pages/Login/Login";
import Dashboard from "./pages/Admin/Dashboard";
import AdminNav from "./components/AdminNav";
import CustomerNav from "./components/CustomerNav";
import ProtectedRoutes from "./ProtectedRoutes";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import History from "./pages/History/History";
import "./App.css";

const CustomerLayout = () => (
	<>
		<CustomerNav />
		<main>
			<Outlet />
		</main>
	</>
);

const AdminLayout = () => (
	<>
		<AdminNav />
		<main>
			<Outlet />
		</main>
	</>
);

const App = () => {
	return (
		<Router>
			<Routes>
				<Route element={<ProtectedRoutes />}>
					<Route element={<AdminLayout />}>
						<Route path="/dashboard" element={<Dashboard />} />
						<Route path="/history" element={<History />} />
					</Route>
				</Route>

				<Route element={<CustomerLayout />}>
					<Route path="/home" element={<Home />} />
					<Route path="/cart" element={<Cart />} />
				</Route>

				<Route path="/login" element={<Login />} />
			</Routes>
		</Router>
	);
};

export default App;
