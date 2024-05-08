import { imageFetcher } from "../../services/food";
import {
	getQuantityFromLocalStorage as orderQuantity,
	handleOrder,
} from "../../services/localStorageCart";
import { useState } from "react";

const CartItem = ({ data, handleDelete, refreshCart }) => {
	const [quantity, setQuantity] = useState(
		orderQuantity(data.food_id) ? orderQuantity(data.food_id) : 0
	);

	const handleQuantityChange = (e) => {
		const value = e.target.value;
		if (value === "" || (value >= 0 && !isNaN(value))) {
			const newQuantity = value === "" ? 0 : parseInt(value);
			setQuantity(newQuantity);
			console.log(data);
			handleOrder(data, { quantity: newQuantity });
			refreshCart();
		}
	};

	return (
		<li className="cart_item clearfix">
			<div className="cart_item_image">
				<img src={imageFetcher(data.image)} alt="Placeholder" />
			</div>
			<div className="cart_item_info">
				<div className="cart_item_name cart_info_col">
					<div className="cart_item_text mt-1  fw-bolder fs-3">{data.name}</div>
					<div className="cart_item_text mt-2 fw-bold">
						Total Rp. {data.price * quantity}
					</div>
					<div className="cart_item_text mt-2 font-bold">Rp. {data.price}</div>
					<div className="button-container">
						<div className="mt-1">
							<input
								id="quantity"
								type="number"
								className="form-control quantity-input"
								value={quantity}
								onChange={(e) => handleQuantityChange(e)}
								placeholder="Quantity"
							/>
						</div>
						<div className="mx-2 py-3">
							<button
								className="btn btn-danger"
								onClick={() => handleDelete(data.food_id)}
							>
								Delete
							</button>
						</div>
					</div>
				</div>
			</div>
		</li>
	);
};

export default CartItem;
