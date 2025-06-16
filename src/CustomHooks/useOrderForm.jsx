import { useState } from "react";
export const useOrderForm = () => {
  const [customer, setCustomer] = useState({
    fullName: "",
    email: "",
    phone: "",
  });
  const [address, setAddress] = useState({ line: "", city: "", country: "" });
  const [orderItems, setOrderItems] = useState([]);
  const [errors, setErrors] = useState({});

  const total = orderItems.reduce((sum, item) => sum + item.subtotal, 0);
  const handleCustomerChange = (e) =>
    setCustomer({ ...customer, [e.target.name]: e.target.value });

  const handleAddressChange = (e) =>
    setAddress({ ...address, [e.target.name]: e.target.value });

    const addOrderItem = () => {
      console.log(orderItems)
    setOrderItems([
      ...orderItems,
      { SKU: null, qty: 1, Price: 0, SKUName: "", SKUCode: "", subtotal: 0 },
    ]);
  };
  const updateQTY = (index, qty) => {
    const updated = [...orderItems];
    updated[index].qty = qty;
    updated[index].subtotal = qty * updated[index].Price;
    setOrderItems(updated);
  };
  const handleSelectedSKU = (SKU, index) => {
    const updated = [...orderItems];
    updated[index] = {
      ...updated[index],
      SKU,
      SKUName: SKU.SKUName,
      SKUCode: SKU.SKUCode,
      Price: SKU.Price,
      qty: 1,
      subtotal: SKU.Price,
    };
    setOrderItems(updated);
  };
  const resetDetails = () => {
    setCustomer({ fullName: "", email: "", phone: "" });
    setAddress({ line: "", city: "", country: "" });
    setOrderItems([]);
    setErrors({});
  };
  const Validationform = () => {
    const newErrors = {};
    if (!customer.fullName) newErrors.fullName = "Full Name is required";
    if (!customer.email || !/\S+@\S+\.\S+/.test(customer.email))
      newErrors.email = "Valid Email is required";
    if (!customer.phone || !/^\d{10}$/.test(customer.phone))
      newErrors.phone = "10-digit Phone is required";

    if (!address.line) newErrors.line = "Address Line is required";
    if (!address.city) newErrors.city = "City is required";
    if (!address.country) newErrors.country = "Country is required";

    if (orderItems.length === 0)
      newErrors.orderItems = "At least 1 order item is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  return {
    customer,
    address,
    orderItems,
    total,
    errors,
    handleCustomerChange,
    handleAddressChange,
    updateQTY,
    addOrderItem,
    handleSelectedSKU,
    Validationform,
    resetDetails,
  };
};
