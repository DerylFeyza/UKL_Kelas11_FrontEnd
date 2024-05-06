import "./dashboard.css";
import {
	getAllFood,
	searchFood,
	deleteFood,
	updateFood,
	addFood,
} from "../../services/food";
import { useEffect, useState } from "react";
import { imageFetcher } from "../../services/food";
import FoodForm from "./FoodForm";

const Dashboard = () => {
	const [food, setFood] = useState([]);
	const [search, setSearch] = useState("");
	const [onSearch, setOnSearch] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const [updateData, setUpdateData] = useState(null);

	useEffect(() => {
		retrieveAllFood();
	}, []);

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

	const retrieveAllFood = async () => {
		try {
			const res = await getAllFood();
			setFood(res.data);
		} catch (err) {
			console.log(err);
		}
	};

	const handleDelete = async (idProduct) => {
		try {
			await deleteFood(idProduct);
			retrieveAllFood();
		} catch (error) {
			console.log(error);
		}
	};

	const handleUpdate = async (id, values) => {
		const res = await updateFood(id, values);
		if (res.status === true) {
			retrieveAllFood();
			setShowModal(false);
		}
	};

	const handleAdd = async (values) => {
		const res = await addFood(values);
		console.log(res);
		if (res.status === true) {
			retrieveAllFood();
			setShowModal(false);
		}
	};

	const openUpdateModal = (data) => {
		setShowModal(true);
		setUpdateData(data);
	};

	const openAddModal = async () => {
		setUpdateData(null);
		setShowModal(true);
	};

	return (
		<div className="dashboard-container">
			<div className="dashboard">
				<div className="dashboard-top">
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
				<button
					className="btn btn-success mt-3 add-button"
					onClick={() => openAddModal()}
				>
					+ Add New Menu
				</button>
				<div className="table-container mt-2">
					<table className="table table-striped container-fluid">
						<thead>
							<tr>
								<th className="bg-success text-white" scope="col">
									Name
								</th>
								<th className="bg-success text-white" scope="col">
									Image
								</th>
								<th className="bg-success text-white" scope="col">
									Spicy Level
								</th>
								<th className="bg-success text-white" scope="col">
									Price
								</th>
								<th className="bg-success text-white" scope="col">
									Action
								</th>
							</tr>
						</thead>
						<tbody>
							{food !== undefined && (
								<>
									{food.map((foodItem, index) => (
										<tr key={index}>
											<td>{foodItem.name}</td>
											<td>
												<img
													className="food-image-container"
													src={imageFetcher(foodItem.image)}
													alt={foodItem.name}
												/>
											</td>
											<td>{foodItem.spicy_level}</td>
											<td>{foodItem.price}</td>
											<td className="button-row">
												<button
													className="btn btn-primary"
													onClick={() => openUpdateModal(foodItem)}
												>
													Update
												</button>
												<button
													className="btn btn-danger"
													onClick={() => handleDelete(foodItem.id)}
												>
													Delete
												</button>
											</td>
										</tr>
									))}
								</>
							)}
						</tbody>
						<tfoot></tfoot>
					</table>
				</div>
			</div>
			<FoodForm
				food={updateData}
				showModal={showModal}
				setShowModal={setShowModal}
				handleUpdate={handleUpdate}
				handleAdd={handleAdd}
			/>
		</div>
	);
};

export default Dashboard;
