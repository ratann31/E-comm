import React, { useEffect } from "react";
import {useParams,useNavigate} from 'react-router-dom';


const UpdateComponent = () => {
  const [name, setName] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [company, setCompany] = React.useState("");
  const params=useParams();

  const navigate=useNavigate();

  useEffect(()=>{
    getProductDetails();
  },[])

  const getProductDetails=async()=>{
    console.warn(params);
    let result= await fetch(`http://localhost:5000/product/${params.id}`);
    result=await result.json();
    console.warn(result);
    setName(result.name);
    setPrice(result.price);
    setCategory(result.category);
    setCompany(result.company);
  }

  const UpdateProducts = async() => {
    console.warn(name, price, category, company);
    let result= await fetch(`http://localhost:5000/product/${params.id}`,{
      method:'put',
      body:JSON.stringify({name,price,category,company}),
      headers:{
        'Content-Type':'Application/json'
      }

    });
    result=await result.json();
    if(result){
      navigate('/');
    }
  };

  return (
    <div className="product">
      <h1>Update Product</h1>
      <div className="input-container">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter Product Name"
        />
      </div>
      <div className="input-container">
        <input
          type="text"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Enter Product Price"
        />
      </div>
      <div className="input-container">
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Enter Product Category"
        />
      </div>
      <div className="input-container">
        <input
          type="text"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          placeholder="Enter Product Company"
        />
      </div>
      <button onClick={UpdateProducts} className="productBtn">
        Update Product
      </button>
    </div>
  );
};

export default UpdateComponent;
