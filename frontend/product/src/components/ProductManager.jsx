import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style.css';
import config from './config.js';

const ProductManager = () => {
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState({
    id: '',
    name: '',
    category: '',
    price: '',
    quantity: '',
    description: ''
  });
  const [idToFetch, setIdToFetch] = useState('');
  const [fetchedProduct, setFetchedProduct] = useState(null);
  const [message, setMessage] = useState('');
  const [editMode, setEditMode] = useState(false);

  const baseUrl = `${config.url}/productapi`;

  useEffect(() => {
    fetchAllProducts();
  }, []);

 const fetchAllProducts = async () => {
  try {
    const res = await axios.get(`${baseUrl}/all`);
    console.log("API response:", res.data);

    if (Array.isArray(res.data)) {
      setProducts(res.data);
    } else if (res.data) {
      setProducts([res.data]); 
    } else {
      setProducts([]); 
    }
  } catch (error) {
    console.error("Fetch error:", error);
    setMessage("Failed to fetch products.");
    setProducts([]); 
  }
};


  // Handle form input change
  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  // Validate form fields
  const validateForm = () => {
    for (let key in product) {
      if (!product[key] || product[key].toString().trim() === '') {
        setMessage(`Please fill out the ${key} field.`);
        return false;
      }
    }
    return true;
  };

  // Add new product
  const addProduct = async () => {
    if (!validateForm()) return;
    try {
      await axios.post(`${baseUrl}/add`, product);
      setMessage('Product added successfully.');
      fetchAllProducts();
      resetForm();
    } catch (error) {
      setMessage('Error adding product.');
    }
  };

  // Update existing product
  const updateProduct = async () => {
    if (!validateForm()) return;
    try {
      await axios.put(`${baseUrl}/update`, product);
      setMessage('Product updated successfully.');
      fetchAllProducts();
      resetForm();
    } catch (error) {
      setMessage('Error updating product.');
    }
  };

  // Delete product by ID
  const deleteProduct = async (id) => {
    try {
      const res = await axios.delete(`${baseUrl}/delete/${id}`);
      setMessage(res.data);
      fetchAllProducts();
    } catch (error) {
      setMessage('Error deleting product.');
    }
  };

  // Fetch single product by ID
  const getProductById = async () => {
    try {
      const res = await axios.get(`${baseUrl}/get/${idToFetch}`);
      setFetchedProduct(res.data);
      setMessage('');
    } catch (error) {
      setFetchedProduct(null);
      setMessage('Product not found.');
    }
  };

  // Edit product
  const handleEdit = (prod) => {
    setProduct(prod);
    setEditMode(true);
    setMessage(`Editing product with ID ${prod.id}`);
  };

  // Reset form
  const resetForm = () => {
    setProduct({
      id: '',
      name: '',
      category: '',
      price: '',
      quantity: '',
      description: ''
    });
    setEditMode(false);
  };

  return (
    <div className="product-container">

      {/* Message Banner */}
      {message && (
        <div className={`message-banner ${message.toLowerCase().includes('error') ? 'error' : 'success'}`}>
          {message}
        </div>
      )}

      <h2>Product Management</h2>

      {/* Add / Edit Product Form */}
      <div>
        <h3>{editMode ? 'Edit Product' : 'Add Product'}</h3>
        <div className="form-grid">
          <input type="number" name="id" placeholder="ID" value={product.id} onChange={handleChange} />
          <input type="text" name="name" placeholder="Name" value={product.name} onChange={handleChange} />
          <input type="text" name="category" placeholder="Category" value={product.category} onChange={handleChange} />
          <input type="number" name="price" placeholder="Price" value={product.price} onChange={handleChange} />
          <input type="number" name="quantity" placeholder="Quantity" value={product.quantity} onChange={handleChange} />
          <textarea name="description" placeholder="Description" value={product.description} onChange={handleChange} />
        </div>

        <div className="btn-group">
          {!editMode ? (
            <button className="btn-blue" onClick={addProduct}>Add Product</button>
          ) : (
            <>
              <button className="btn-green" onClick={updateProduct}>Update Product</button>
              <button className="btn-gray" onClick={resetForm}>Cancel</button>
            </>
          )}
        </div>
      </div>

      {/* Fetch by ID */}
      <div>
        <h3>Get Product By ID</h3>
        <input
          type="number"
          value={idToFetch}
          onChange={(e) => setIdToFetch(e.target.value)}
          placeholder="Enter ID"
        />
        <button className="btn-blue" onClick={getProductById}>Fetch</button>

        {fetchedProduct && (
          <div>
            <h4>Product Found:</h4>
            <pre>{JSON.stringify(fetchedProduct, null, 2)}</pre>
          </div>
        )}
      </div>

      {/* All Products Table */}
      <div>
        <h3>All Products</h3>
        {products.length === 0 ? (
          <p>No products found.</p>
        ) : (
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  {Object.keys(product).map((key) => (
                    <th key={key}>{key}</th>
                  ))}
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((prod) => (
                  <tr key={prod.id}>
                    {Object.keys(product).map((key) => (
                      <td key={key}>{prod[key]}</td>
                    ))}
                    <td>
                      <div className="action-buttons">
                        <button className="btn-green" onClick={() => handleEdit(prod)}>Edit</button>
                        <button className="btn-red" onClick={() => deleteProduct(prod.id)}>Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
};

export default ProductManager;
