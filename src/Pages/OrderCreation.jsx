import Reusablebutton from "../Components/Button";
import { useToast } from "../CustomHooks/useToast";
import { MdCurrencyRupee,MdCelebration } from "react-icons/md";
import { useOrderForm } from "../CustomHooks/useOrderForm";
import Dropdown from "../Components/Dropdown";
import Input from "../Components/Input";
import QTYButton from "../Components/QTYButton";

const OrderCreation = () => {
  const currentSKUs = [
    { SKUName: "Laptop", SKUCode: "LP001", Price: 55000 },
    { SKUName: "Mouse", SKUCode: "MS002", Price: 499 },
    { SKUName: "Keyboard", SKUCode: "KB003", Price: 899 },
    { SKUName: "Monitor", SKUCode: "MN004", Price: 7999 },
    { SKUName: "Webcam", SKUCode: "WC005", Price: 2499 },
  ];

  const {
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
  } = useOrderForm();
    const { Toast, triggerToast } = useToast();
    const handleonSubmit = (e) => {
        e.preventDefault();
        if (!Validationform()) return;
    
        const order = {
          customer,
          address,
          items: orderItems,
          total,
          status: "New",
          createdAt: new Date().toISOString()
          };
        triggerToast(<><MdCelebration className="me-2" /> Order submitted successfully!</>);
        resetDetails();
      };
    

  return (
    <>
      <Toast />
      <form onSubmit={handleonSubmit}>
        <div
          className="d-flex justify-content-center py-4"
          style={{ minHeight: "100vh", background: "#f4f6f9" }}
        >
          <div style={{ width: "100%", maxWidth: "900px", padding: "0 1rem" }}>
            <h2 className="text-center mb-5 fw-bold text-dark">Create Order</h2>
            <div className="card p-4 shadow-sm mb-4">
              <h4 className="mb-3">Customer Details</h4>
              <div className="row">
                <div className="col-md-4">
                  <Input
                    label="Full Name"
                    name="fullName"
                    value={customer.fullName}
                    onChange={handleCustomerChange}
                    error={errors.fullName}
                  />
                </div>
                <div className="col-md-4">
                  <Input
                    label="Email"
                    name="email"
                    value={customer.email}
                    onChange={handleCustomerChange}
                    error={errors.email}
                  />
                </div>
                <div className="col-md-4">
                  <Input
                    label="Phone"
                    name="phone"
                    value={customer.phone}
                    onChange={handleCustomerChange}
                    error={errors.phone}
                  />
                </div>
              </div>
            </div>
            <div className="card p-4 shadow-sm mb-4">
              <h4 className="mb-3">Address Details</h4>
              <div className="row">
                <div className="col-md-4">
                  <Input
                    label="Address Line"
                    name="line"
                    value={address.line}
                    onChange={handleAddressChange}
                    error={errors.line}
                  />
                </div>
                <div className="col-md-4">
                  <Input
                    label="City"
                    name="city"
                    value={address.city}
                    onChange={handleAddressChange}
                    error={errors.city}
                  />
                </div>
                <div className="col-md-4">
                  <Input
                    label="Country"
                    name="country"
                    value={address.country}
                    onChange={handleAddressChange}
                    error={errors.country}
                  />
                </div>
              </div>
            </div>
            <div className="card p-4 shadow-sm">
              <h4 className="mb-3">Order Items</h4>
              {orderItems.map((item, index) => (
                <div className="row mb-3" key={index}>
                  <div className="col-md-3">
                    <Dropdown
                      options={currentSKUs}
                      onSearch={() => {}}
                      onSelect={(SKU) => handleSelectedSKU(SKU, index)}
                    />
                  </div>
                  <div className="col-md-2">
                    <Input label="SKU Code" value={item.SKUCode} disabled />
                  </div>
                  <div className="col-md-2">
                    <Input label="Price" value={item.Price} disabled />
                  </div>
                  <div className="col-md-2">
                    <QTYButton
                      QTY={item.qty}
                      setQTY={(qty) => updateQTY(index, qty)}
                    />
                  </div>
                  <div className="col-md-3">
                    <Input label="Subtotal" value={item.subtotal} disabled />
                  </div>
                </div>
              ))}
              {errors.orderItems && (
                <div className="text-danger mb-3">{errors.orderItems}</div>
              )}
              <Reusablebutton
                variant="secondary"
                onClick={addOrderItem}
                className="mt-2"
              >
                + Add Item
              </Reusablebutton>
              <div className="mt-4 text-end fw-bold fs-5">
                Total: <MdCurrencyRupee />
                {total}
              </div>
              <div className="mt-4 text-end">
                <Reusablebutton type="submit">Submit Order</Reusablebutton>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default OrderCreation