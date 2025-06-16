import { useState } from "react";
import Reusablebutton from "../Components/Button";
import Input from "../Components/Input";
import Table from "../Components/Table";

function ManageSKU() {
  const [SKUName, setSKUName] = useState("");
  const [SKUCode, setSKUCode] = useState("");
  const [SKUPrice, setSKUPrice] = useState("");
  const [Errors, setErrors] = useState({});
  const [SKUList, setSKUList] = useState([]);
  const [CurrPage, setCurrPage] = useState(1);

  const valueinPage = 10;
  const LastItemIndex = CurrPage * valueinPage;
  const FirstItemIndex = LastItemIndex - valueinPage;
  const currentSKUList = SKUList.slice(FirstItemIndex, LastItemIndex);
  const totalPage = Math.ceil(SKUList.length / valueinPage);

  const header = ["SKUName", "SKUCode", "SKUPrice"]
  const ValidationForm = () => {
    const Errors = {}
    if (!SKUName) Errors.SKUName = "SKU Name is required"
    if(!SKUCode) Errors.SKUCode= "SKU Code is required"

    if (!SKUPrice)
    {
       Errors.SKUPrice= "SKU Price is required"
    }
    else if (isNaN(SKUPrice) || SKUPrice < 0)
    {
      Errors.SKUPrice= "SKU Price should be positive number"
    }
    return Errors
  }

  const rowData = (SKU) => {
    return (
      <tr key={SKU.id}>
      <td>{SKU.SKUName}</td>
      <td>{SKU.SKUCode}</td>
      <td>{SKU.SKUPrice}</td>
    </tr>
  )
  };

  const handleonSubmit = (e) => {
    e.preventDefault();
    const ErrorsValidation = ValidationForm();
    if (Object.keys(ErrorsValidation).length > 0) {
      setErrors(ErrorsValidation);
      return;
    }

    setErrors({});
    const newSKUList = {
      id: Date.now(),
      SKUName,
      SKUCode,
      SKUPrice: Number(SKUPrice),
    };
    // console.log(newSKUList)
    setSKUList([...SKUList, newSKUList]);
    setSKUName("");
    setSKUCode("");
    setSKUPrice("");
  };

  return (
    <div className="container py-4">
      <div className="centered-wrapper">
        <h2 className="text-center mb-5">SKU Management</h2>

        <div className="card p-4 shadow-sm mb-5">
          <h4 className="mb-3 fw-semibold">Add || Update SKU</h4>
          <form onSubmit={handleonSubmit}>
            <div className="row">
              <div className="col-md-4">
                <Input
                  label="SKUName"
                  name="skuname"
                  value={SKUName}
                  onChange={(e) => setSKUName(e.target.value)}
                  error={Errors.SKUName}
                />
              </div>
              <div className="col-md-4">
                <Input
                  label="SKUCode"
                  
                  name="skucode"
                  value={SKUCode}
                  onChange={(e) => setSKUCode(e.target.value)}
                  error={Errors.SKUCode}
                />
              </div>
              <div className="col-md-4">
                <Input
                  label="SKUPrice"
                  name="skuprice"
                  type="number"
                  min="0"
                  value={SKUPrice}
                  onChange={(e) => setSKUPrice(e.target.value)}
                  error={Errors.SKUPrice}
                />
              </div>
            </div>
            <Reusablebutton type="submit" className="mt-3">
              Add SKU
            </Reusablebutton>
          </form>
        </div>
        <div className="card p-4 shadow-sm">
          <h4 className="mb-3 fw-semibold">List of All SKU</h4>
          <Table
            tableHeader={header}
            tableData={currentSKUList}
            row={rowData}
          ></Table>
          {totalPage > 1 && (
            <div className="d-flex justify-content-between align-items-center mt-3">
              <Reusablebutton
                onClick={() => setCurrPage((prev) => Math.max(prev - 1, 1))}
                variant="secondary"
              >
                Previous
              </Reusablebutton>
              <span>
                Page {CurrPage} of {totalPage}
              </span>
              <Reusablebutton
                onClick={() =>
                  setCurrPage((prev) => Math.min(prev + 1, totalPage))
                }
                variant="secondary"
              >
                Next
              </Reusablebutton>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ManageSKU;
