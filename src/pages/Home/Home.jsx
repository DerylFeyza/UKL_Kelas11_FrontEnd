import { useEffect, useState } from "react";
import { getAllFood, searchFood } from "../../services/food";
import FoodCard from "./FoodCard";
import "./home.css";

const Home = () => {
	const [food, setFood] = useState([]);
	const [search, setSearch] = useState("");
	const [onSearch, setOnSearch] = useState(false);

	useEffect(() => {
		retrieveAllFood();
	}, []);

	const retrieveAllFood = async () => {
		try {
			const res = await getAllFood();
			setFood(res.data);
		} catch (err) {
			console.log(err);
		}
	};

	const handleSearch = async (e) => {
		setSearch(e);
		try {
			if (e == "") {
				retrieveAllFood();
				setOnSearch(false);
			} else {
				const res = await searchFood(e);
				setOnSearch(true);
				setFood(res.data);
			}
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<>
			<div className="dashboard-top home-container">
				<h1 className="fw-bolder">Resto Amba</h1>
				<form className="mt-3" action="">
					<input
						type="text"
						placeholder="Search"
						required
						value={search}
						onChange={(e) => handleSearch(e.target.value)}
					/>
					{onSearch === true && (
						<div className="fw-bold">Searching For: {search}</div>
					)}
				</form>
			</div>

			{food !== undefined && (
				<>
					<div className="custom-row mt-5 container food-card-container">
						{food.map((food, index) => (
							<div key={index} className="mt-4">
								<div className="">
									<FoodCard food={food} />
								</div>
							</div>
						))}
					</div>
				</>
			)}
		</>
	);
};
export default Home;
