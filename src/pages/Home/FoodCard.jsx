import { imageFetcher } from "../../services/food";
import { useState } from "react";
import {
	handleOrder,
	getQuantityFromLocalStorage as orderQuantity,
} from "../../services/localStorageCart";
import "./home.css";

const FoodCard = ({ food }) => {
	const { id, ...restFood } = food; // Destructure id from food, restFood contains the remaining properties

	const [quantity, setQuantity] = useState(
		orderQuantity(id) ? orderQuantity(id) : 0
	);

	const handleQuantityChange = (e) => {
		const value = e.target.value;
		if (value === "" || (value >= 0 && !isNaN(value))) {
			const newQuantity = value === "" ? 0 : parseInt(value);
			setQuantity(newQuantity);
			handleOrder({ food_id: id, ...restFood }, { quantity: newQuantity });
		}
	};

	const incrementQuantity = () => {
		const newQuantity = quantity + 1;
		setQuantity(newQuantity);
		handleOrder({ food_id: id, ...restFood }, { quantity: newQuantity });
	};

	const decrementQuantity = () => {
		if (quantity > 0) {
			const newQuantity = quantity - 1;
			setQuantity(newQuantity);
			handleOrder({ food_id: id, ...restFood }, { quantity: newQuantity });
		}
	};

	const handleBlur = () => {
		if (quantity === "") {
			setQuantity(0);
		}
	};

	const IMAGEURL = imageFetcher(food.image);
	return (
		<div className="product-card-container">
			<div>
				<div className="card product-card border-0 ">
					<img
						src={IMAGEURL}
						className="card-img-top "
						alt={food.name}
						style={{ objectFit: "cover", width: "100%", height: "210px" }}
					/>
					<div className="card-body product-card-details">
						<h5 className="card-title name fs-5">{food.name}</h5>
						<p className="card-text shop">{food.spicy_level}</p>
						<p className="card-text price">Rp. {food.price}</p>
					</div>
				</div>
				<div className="d-flex justify-content-center bg-success">
					<div className="">
						<button onClick={decrementQuantity} className="btn btn-primary">
							-
						</button>
						<input
							className="btn btn-primary"
							id="inputQuantity"
							type="num"
							value={quantity}
							onChange={handleQuantityChange}
							onBlur={handleBlur}
							style={{ maxWidth: "4rem" }}
						/>
						<button onClick={incrementQuantity} className="btn btn-primary">
							+
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default FoodCard;
