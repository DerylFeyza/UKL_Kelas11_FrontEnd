import { getHistory } from "../../services/order";
import { getAllFood } from "../../services/food";
import { useEffect, useState } from "react";
import "./history.css";

const History = () => {
	const [history, setHistory] = useState();
	const [food, setFood] = useState();

	useEffect(() => {
		retrieveHistory();
		retrieveAllFood();
	}, []);

	const retrieveHistory = async () => {
		try {
			const res = await getHistory();
			setHistory(res.data);
		} catch (err) {
			console.log(err);
		}
	};

	const retrieveAllFood = async () => {
		try {
			const res = await getAllFood();
			setFood(res.data);
		} catch (err) {
			console.log(err);
		}
	};

	const findMenuItem = (foodId) => {
		return food.find((item) => item.id === foodId);
	};

	const calculateTotalPrice = (order) => {
		let totalPrice = 0;
		order.order_detail.forEach((detail) => {
			totalPrice += detail.price;
		});
		return totalPrice;
	};

	if (!history) {
		return null;
	}

	return (
		<>
			<div className="history-container">
				{console.log(history)}
				<h1 className="mt-5">Transaction History</h1>
				<div className="history-table mt-5">
					<table className="table table-striped container-fluid">
						<thead>
							<tr>
								<th className="bg-success text-white" scope="col">
									No
								</th>
								<th className="bg-success text-white" scope="col">
									Date
								</th>
								<th className="bg-success text-white" scope="col">
									Customer Name
								</th>
								<th className="bg-success text-white" scope="col">
									Table Number
								</th>
								<th className="bg-success text-white" scope="col">
									Order Details
								</th>
								<th className="bg-success text-white" scope="col">
									Total
								</th>
							</tr>
						</thead>
						<tbody>
							<>
								{history.map((order, index) => (
									<tr key={index}>
										{console.log(order)}
										<td>{index}</td>
										<td>{order.order_date}</td>
										<td>{order.customer_name}</td>
										<td>{order.table_number}</td>
										<td>
											{order.order_detail?.map((detail) => (
												<span key={detail.id}>
													{findMenuItem(detail.food_id)
														? findMenuItem(detail.food_id).name
														: "Deleted Menu"}{" "}
													({detail.quantity})
													<br />
												</span>
											))}
										</td>
										<td>{calculateTotalPrice(order)}</td>
									</tr>
								))}
							</>
						</tbody>
						<tfoot></tfoot>
					</table>{" "}
				</div>
			</div>
		</>
	);
};

export default History;
