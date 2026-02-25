import React, { useState, useEffect } from 'react';
import { getAllProducts, createProduct, deleteProduct } from '../../products/services/product.service';
import { getOrders, updateOrderStatus } from '../../orders/services/order.service';
import Loader from '../../../core/components/common/Loader';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('products');
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    category: '',
    imageUrl: ''
  });

  useEffect(() => {
    if (activeTab === 'products') {
      fetchProducts();
    } else {
      fetchOrders();
    }
  }, [activeTab]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await getAllProducts();
      setProducts(data);
    } catch (err) {
      console.error('Failed to load products', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const data = await getOrders();
      setOrders(data);
    } catch (err) {
      console.error('Failed to load orders', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      await createProduct(newProduct);
      setShowAddProduct(false);
      setNewProduct({ name: '', description: '', price: '', stock: '', category: '', imageUrl: '' });
      fetchProducts();
    } catch (err) {
      console.error('Failed to add product', err);
    }
  };

  const handleDeleteProduct = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(id);
        fetchProducts();
      } catch (err) {
        console.error('Failed to delete product', err);
      }
    }
  };

  const handleUpdateOrderStatus = async (orderId, status) => {
    try {
      await updateOrderStatus(orderId, status);
      fetchOrders();
    } catch (err) {
      console.error('Failed to update order status', err);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>

      <div className="dashboard-tabs">
        <button
          className={activeTab === 'products' ? 'active' : ''}
          onClick={() => setActiveTab('products')}
        >
          Products
        </button>
        <button
          className={activeTab === 'orders' ? 'active' : ''}
          onClick={() => setActiveTab('orders')}
        >
          Orders
        </button>
      </div>

      {activeTab === 'products' && (
        <div className="products-management">
          <button className="add-btn" onClick={() => setShowAddProduct(true)}>
            Add New Product
          </button>

          {showAddProduct && (
            <form className="add-product-form" onSubmit={handleAddProduct}>
              <input
                type="text"
                placeholder="Product Name"
                value={newProduct.name}
                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                required
              />
              <textarea
                placeholder="Description"
                value={newProduct.description}
                onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                required
              />
              <input
                type="number"
                placeholder="Price"
                value={newProduct.price}
                onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                required
              />
              <input
                type="number"
                placeholder="Stock"
                value={newProduct.stock}
                onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                required
              />
              <input
                type="text"
                placeholder="Category"
                value={newProduct.category}
                onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                required
              />
              <input
                type="url"
                placeholder="Image URL"
                value={newProduct.imageUrl}
                onChange={(e) => setNewProduct({ ...newProduct, imageUrl: e.target.value })}
                required
              />
              <div className="form-actions">
                <button type="submit">Add Product</button>
                <button type="button" onClick={() => setShowAddProduct(false)}>Cancel</button>
              </div>
            </form>
          )}

          <table className="data-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Category</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product.id}>
                  <td>{product.name}</td>
                  <td>Rs. {product.price}</td>
                  <td>{product.stock}</td>
                  <td>{product.category}</td>
                  <td>
                    <button className="edit-btn">Edit</button>
                    <button className="delete-btn" onClick={() => handleDeleteProduct(product.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'orders' && (
        <div className="orders-management">
          <table className="data-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Total</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order.id}>
                  <td>#{order.id}</td>
                  <td>{order.customerName}</td>
                  <td>Rs. {order.totalAmount}</td>
                  <td>{order.status}</td>
                  <td>
                    <select
                      value={order.status}
                      onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value)}
                    >
                      <option value="PENDING">Pending</option>
                      <option value="PROCESSING">Processing</option>
                      <option value="SHIPPED">Shipped</option>
                      <option value="DELIVERED">Delivered</option>
                      <option value="CANCELLED">Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
