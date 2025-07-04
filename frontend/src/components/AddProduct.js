import React from "react";

const AddProduct = () => {
  const [name, setName] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [comapany, setCompany] = React.useState("");
  const [error, setError] = React.useState("");

  const addProduct = async () => {
    if (!name || !price || !comapany || !category) {
      setError(true);
      return false;
    }

    console.warn(name, price, category, comapany);
    const userId = JSON.stringify(localStorage.getItem("user"))._id;
    console.warn(userId);
    let result = await fetch("http://localhost:5000/add-product", {
      method: "post",
      body: JSON.stringify({ name, price, category, comapany }),
      headers: {
        "Content-type": "application/json",
      },
    });
    result = await result.json();
    console.warn(result);
  };
  return (
    <div className="product">
      <h1>Add Products</h1>
      <div className="input-container"></div>
      <div className="input-container">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter Product Name"
        />
       { error && !name && <span className="invalid-input">Enter valid name</span> }
      </div>

      <div className="input-container">
        <input
          type="text"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Enter Product Price"
        />
        { error && !price && <span className="invalid-input">Enter valid price</span> }
      </div>

      <div className="input-container">
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Enter Product Category"
        />
        { error && !category && <span className="invalid-input">Enter valid category</span> }
      </div>

      <div className="input-container">
        <input
          type="text"
          value={comapany}
          onChange={(e) => setCompany(e.target.value)}
          placeholder="Enter Product Company"
        />
        { error && !comapany && <span className="invalid-input">Enter valid company</span> }
      </div>

      <button onClick={addProduct} className="productBtn">
        Add Product
      </button>
    </div>
  );
};
export default AddProduct;
