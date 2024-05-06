import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";

const AdminNav = () => {
	const [activeParam, setActiveParam] = useState("");
	const location = useLocation();

	useEffect(() => {
		const urlParts = location.pathname.split("/");
		const param = urlParts[urlParts.length - 1];
		setActiveParam(param);
	}, [location]);

	return (
		<nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
			<div className="container-fluid">
				<span className="navbar-brand mb-0 h1">Resto Amba</span>
				<button
					className="navbar-toggler"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarNavDropdown"
					aria-controls="navbarNavDropdown"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="navbarNavDropdown">
					<ul className="navbar-nav">
						<li
							className={`nav-item ${
								activeParam === "dashboard" ? "fw-bolder" : "fw-semibold"
							}`}
						>
							<Link className="nav-link" to="/dashboard">
								Menu
							</Link>
						</li>
						<li
							className={`nav-item ${
								activeParam === "transaksi" ? "fw-bolder" : "fw-semibold"
							}`}
						>
							<Link className="nav-link" to="/transaksi">
								Transaksi
							</Link>
						</li>
					</ul>
					<ul className="navbar-nav ms-auto">
						<li className="nav-item">
							<a className="nav-link fw-semibold" href="#">
								Log Out
							</a>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
};

export default AdminNav;
