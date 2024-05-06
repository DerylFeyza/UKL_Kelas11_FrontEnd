import { useState } from "react";
import { LoginHandler } from "../../services/admin";
import { useNavigate } from "react-router-dom";
import "./login.css";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();

	const submitHandler = async (e) => {
		e.preventDefault();
		const values = { email, password };

		try {
			const res = await LoginHandler(values);
			if (res.success === true) {
				navigate("/home");
				window.location.reload();
			}
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div className="login-wrapper">
			<div className=" wrapper fadeInDown">
				<div id="formContent">
					<form onSubmit={submitHandler}>
						<h1 className="pb-5">Login</h1>
						<div>
							<input
								type="email"
								className="form-control"
								id="email"
								placeholder="Email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								required
							/>
						</div>
						<div className="pt-2">
							<input
								type="password"
								className="form-control"
								id="password"
								placeholder="Password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								required
							/>
						</div>
						<input type="submit" className="fadeIn fourth" value="Log In" />
					</form>
				</div>
			</div>
		</div>
	);
};

export default Login;
