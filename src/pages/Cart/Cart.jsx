import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "./cart.css";
import {
	getAllCartItems,
	deleteCartItem,
	updateCustomerDetails,
	getOrderList,
} from "../../services/localStorageCart";
import { checkoutOrder } from "../../services/order";
import CartItem from "./CartItem";
const Cart = () => {
	const [cartData, setCartData] = useState();
	const [customer, setCustomer] = useState(
		getOrderList().customer_name ? getOrderList().customer_name : ""
	);
	const [orderDate] = useState(new Date().toISOString().split("T")[0]);
	const [table, setTable] = useState(
		getOrderList().table_number ? getOrderList().table_number : ""
	);
	let total;

	useEffect(() => {
		retrieveCart();
	}, []);

	useEffect(() => {
		updateCustomerDetails(customer, table, orderDate);
	}, [customer, table, orderDate]);

	const retrieveCart = async () => {
		try {
			const res = await getAllCartItems();
			console.log(res);
			setCartData(res);
		} catch (err) {
			console.log(err);
		}
	};

	const handleCheckout = async (e) => {
		e.preventDefault();
		try {
			const res = await checkoutOrder();
			if (res.status === true) {
				localStorage.removeItem("cartItems");
				retrieveCart();
			}
		} catch (error) {
			console.log(error);
		}
	};

	const handleDelete = (id) => {
		deleteCartItem(id);
		retrieveCart();
	};

	if (!cartData) {
		return null;
	}

	if (cartData) {
		total = cartData.reduce((acc, item) => acc + item.quantity * item.price, 0);
	}

	return (
		<form onSubmit={handleCheckout}>
			<div className="cart_section">
				{console.log(cartData)}
				<div className="container-fluid pt-10">
					<div className="col-lg-10 offset-lg-1">
						<div className="cart_container">
							<div className="cart_items">
								<ul className="cart_list rounded-l-lg">
									<div className="keranjangmu">
										<h3 className="font-bold">Keranjangmu</h3>
									</div>
									{cartData.map((data, index) => (
										<CartItem
											key={index}
											data={data}
											handleDelete={handleDelete}
											refreshCart={retrieveCart}
										/>
									))}
								</ul>
								<div className="total px-20 rounded-r-lg">
									<h3 className="mb-10 mt-12">Customer Information</h3>
									<div className="food-form-input">
										<label htmlFor="customer">Customer:</label>
										<input
											type="text"
											id="customer"
											value={customer}
											onChange={(e) => setCustomer(e.target.value)}
											required
										/>
									</div>
									<div className="food-form-input">
										<label htmlFor="table">Table Number:</label>
										<input
											type="number"
											id="table"
											value={table}
											onChange={(e) => setTable(e.target.value)}
											required
										/>
									</div>
									<div className="order_total_content text-md-right">
										<div className="order_total_title fw-bold">
											Items ({cartData.length}):
										</div>
										<div className="order_total_amount">Rp. {total}</div>
									</div>
									<div className="order_total_content text-md-right">
										<div className="order_total_title fw-bold">
											Tax Charges:
										</div>
										<div className="order_total_amount">
											Rp. {(0.1 * total).toFixed(0).toLocaleString()}
										</div>
									</div>
									<div className="order_total_content text-md-right">
										<div className="order_total_title fs-2 fw-bolder">
											Grand Total:
										</div>
										<div className="order_total_amount  fs-2 fw-bolder">
											Rp. {(total + 0.1 * total).toFixed(0).toLocaleString()}
										</div>
									</div>
									<button
										className="button cart_button_checkout mt-5"
										type="submit"
									>
										Checkout
									</button>
									<div className="cart_buttons">
										<Link to="/home" className="button cart_button_clear">
											Back to Menu
										</Link>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</form>
	);
};
export default Cart;
