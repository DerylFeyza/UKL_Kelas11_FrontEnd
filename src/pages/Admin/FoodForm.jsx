import { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { imageFetcher } from "../../services/food";
const FoodForm = ({
	food,
	showModal,
	setShowModal,
	handleUpdate,
	handleAdd,
}) => {
	const [name, setName] = useState("");
	const [spicyLevel, setSpicyLevel] = useState("");
	const [price, setPrice] = useState();
	const [image, setImage] = useState(null);
	const [imagePreview, setImagePreview] = useState("");

	const handleClose = () => {
		setShowModal(false);
	};

	useEffect(() => {
		if (showModal && food) {
			setName(food.name);
			setSpicyLevel(food.spicy_level);
			setPrice(food.price);
			setImagePreview(imageFetcher(food.image));
		} else if (!food) {
			setName("");
			setSpicyLevel("");
			setPrice("");
			setImagePreview(null);
		}
	}, [showModal, food]);

	const handleImageChange = (e) => {
		const file = e.target.files[0];
		setImage(file);
		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setImagePreview(reader.result);
			};
			reader.readAsDataURL(file);
		}
	};

	const handleSave = async (e) => {
		e.preventDefault();
		const formData = new FormData();
		formData.append("name", name);
		formData.append("spicy_level", spicyLevel);
		formData.append("price", price);
		formData.append("image", image);
		try {
			if (food) {
				await handleUpdate(food.id, formData);
			} else if (!food) {
				await handleAdd(formData);
			}
		} catch (error) {
			console.log("failed to add product", error);
		}
	};

	return (
		<>
			<Modal
				show={showModal}
				className="food-form"
				onHide={handleClose}
				centered
			>
				<Modal.Header>
					<Modal.Title>Update Food</Modal.Title>
				</Modal.Header>
				<Form onSubmit={(e) => handleSave(e)}>
					<Modal.Body>
						<div className="food-image-wrapper">
							{imagePreview ? (
								<img className="food-image" src={imagePreview} alt="Preview" />
							) : (
								<img className="food-image" src="./blankimg.jpg" alt="Blank" />
							)}
							<input
								type="file"
								className=" border mt-2 rounded w-full bg-gray-50 form-control"
								id="gambar_barang"
								onChange={handleImageChange}
							/>
						</div>
						<div className="food-form-input">
							<label htmlFor="food_name">Food Name</label>

							<input
								type="text"
								id="food_name"
								value={name}
								onChange={(e) => setName(e.target.value)}
							/>
						</div>

						<div className="food-form-input">
							<label htmlFor="spice">Spice Level</label>
							<input
								type="text"
								id="spice"
								value={spicyLevel}
								onChange={(e) => setSpicyLevel(e.target.value)}
							/>
						</div>

						<div className="food-form-input">
							<label htmlFor="price">Price</label>
							<input
								type="text"
								id="price"
								value={price}
								onChange={(e) => setPrice(e.target.value)}
							/>
						</div>
					</Modal.Body>
					<Modal.Footer>
						<Button variant="success" type="submit">
							Update
						</Button>
					</Modal.Footer>
				</Form>
			</Modal>
		</>
	);
};

export default FoodForm;
