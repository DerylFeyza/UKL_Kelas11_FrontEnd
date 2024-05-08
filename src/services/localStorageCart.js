export const handleOrder = (values, { quantity }) => {
	const orderDetail = {
		food_id: values.food_id,
		name: values.name,
		spicy_level: values.spicy_level,
		price: values.price,
		image: values.image,
		quantity: parseInt(quantity),
	};

	let existingItems =
		JSON.parse(localStorage.getItem("cartItems"))?.order_details || [];
	const existingIndex = existingItems.findIndex(
		(cartItem) => cartItem.food_id === orderDetail.food_id
	);

	if (orderDetail.quantity === 0) {
		if (existingIndex !== -1) {
			existingItems.splice(existingIndex, 1);
		}
	} else if (existingIndex !== -1) {
		existingItems[existingIndex].quantity = orderDetail.quantity;
	} else {
		existingItems.push(orderDetail);
	}

	const orderData = {
		order_details: existingItems,
		customer_name: "",
		table_number: "",
		order_date: "",
	};

	localStorage.setItem("cartItems", JSON.stringify(orderData));
};

export const updateCustomerDetails = (customerName, tableNumber, orderDate) => {
	const orderData = {
		order_details:
			JSON.parse(localStorage.getItem("cartItems"))?.order_details || [],
		customer_name: customerName,
		table_number: tableNumber,
		order_date: orderDate,
	};

	localStorage.setItem("cartItems", JSON.stringify(orderData));
};

export const getQuantityFromLocalStorage = (foodId) => {
	const cartItems =
		JSON.parse(localStorage.getItem("cartItems"))?.order_details || [];
	const item = cartItems.find((item) => item.food_id === foodId);
	return item ? item.quantity : 0;
};

export const getAllCartItems = () => {
	const cartItems =
		JSON.parse(localStorage.getItem("cartItems"))?.order_details || [];
	return cartItems;
};

export const getOrderList = () => {
	const order = JSON.parse(localStorage.getItem("cartItems")) || [];
	return order;
};

export const deleteCartItem = (foodId) => {
	let cartItems =
		JSON.parse(localStorage.getItem("cartItems"))?.order_details || [];
	const index = cartItems.findIndex((item) => item.food_id === foodId);
	if (index !== -1) {
		cartItems.splice(index, 1);
		const updatedOrder = {
			...JSON.parse(localStorage.getItem("cartItems")),
			order_details: cartItems,
		};
		localStorage.setItem("cartItems", JSON.stringify(updatedOrder));
		return true;
	}
	return false;
};

export const getFormDataFromLocalStorage = () => {
	const storedData = JSON.parse(localStorage.getItem("cartItems")) || {};
	const { customer_name, table_number, order_date, order_details } = storedData;

	const formattedOrderDetails = order_details.map(({ food_id, quantity }) => ({
		food_id,
		quantity,
	}));

	return {
		customer_name: customer_name || "",
		table_number: table_number || "",
		order_date: order_date || "",
		order_detail: formattedOrderDetails || [],
	};
};
