import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllProducts, createProduct, deleteProduct, updateProduct } from '../api/productApi';
import { getOrders, updateOrderStatus } from '../api/orderApi';
import Loader from '../components/Loader';
import { useAuth } from '../context/AuthContext';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [activeTab, setActiveTab] = useState('products');
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [editingProductId, setEditingProductId] = useState(null);
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    category: '',
    imageUrl: '',
    cardImage: null,
    detailImages: [],
    detailImageUrls: []
  });

  const cardImageInputRef = useRef(null);
  const detailImagesInputRef = useRef([]);

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

  const handleEditProductClick = (product) => {
    setEditingProductId(product.id);
    setNewProduct({
      name: product.name || '',
      description: product.description || '',
      price: product.price || '',
      stock: product.stock || '',
      category: product.category || '',
      imageUrl: product.imageUrl || '',
      cardImage: null,
      detailImages: [],
      detailImageUrls: product.detailImageUrls || []
    });
    setShowAddProduct(true);
  };

  const handleCancelForm = () => {
    setShowAddProduct(false);
    setEditingProductId(null);
    setNewProduct({ name: '', description: '', price: '', stock: '', category: '', imageUrl: '', cardImage: null, detailImages: [], detailImageUrls: [] });
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      if (editingProductId) {
        await updateProduct(editingProductId, newProduct);
      } else {
        await createProduct(newProduct);
      }
      setShowAddProduct(false);
      setEditingProductId(null);
      setNewProduct({ name: '', description: '', price: '', stock: '', category: '', imageUrl: '', cardImage: null, detailImages: [], detailImageUrls: [] });
      fetchProducts();
    } catch (err) {
      console.error('Failed to save product', err);
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
    <div className="admin-overlay">
      <aside className="admin-sidebar">
        <div className="sidebar-brand" onClick={() => navigate('/')}>Ceylonica Admin</div>
        <ul className="sidebar-menu">
          <li className={activeTab === 'products' ? 'active' : ''} onClick={() => setActiveTab('products')}>Products</li>
          <li className={activeTab === 'orders' ? 'active' : ''} onClick={() => setActiveTab('orders')}>Orders</li>
          <li>Users</li>
          <li>Settings</li>
          <div className="sidebar-divider"></div>
          <li onClick={() => navigate('/')}>Back to Store</li>
        </ul>
      </aside>

      <main className="admin-main-content">
        <header className="admin-header">
          <h1>Product Management</h1>
          <div className="admin-profile">
            <span>{user?.name || 'Admin User'}</span>
            <div className="profile-avatar">
              {user?.name ? user.name.charAt(0).toUpperCase() : 'A'}
            </div>
          </div>
        </header>

        <div className="admin-card">
          {activeTab === 'products' && (
            <>
              {!showAddProduct ? (
                <>
                  <div className="card-header">
                    <h2>Products</h2>
                    <button className="add-btn-primary" onClick={() => {
                      setEditingProductId(null);
                      setNewProduct({ name: '', description: '', price: '', stock: '', category: '', imageUrl: '', cardImage: null, detailImages: [], detailImageUrls: [] });
                      setShowAddProduct(true);
                    }}>
                      + Add Product
                    </button>
                  </div>
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>PRODUCT NAME</th>
                        <th>PRICE</th>
                        <th>CATEGORY ID</th>
                        <th>IMAGES</th>
                        <th>ACTIONS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map(product => (
                        <tr key={product.id}>
                          <td className="product-name-col">
                            <span className="product-name">{product.name}</span>
                            <span className="product-id">{product.id}</span>
                          </td>
                          <td>${parseFloat(product.price || 0).toFixed(2)}</td>
                          <td>{product.category}</td>
                          <td>
                            {product.imageUrl && <img src={product.imageUrl} alt={product.name} className="thumbnail-img" />}
                          </td>
                          <td>
                            <div className="action-btns">
                              <button className="btn-edit" onClick={() => handleEditProductClick(product)}>Edit</button>
                              <button className="btn-delete" onClick={() => handleDeleteProduct(product.id)}>
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                      {products.length === 0 && !loading && (
                        <tr>
                          <td colSpan="5" style={{ textAlign: 'center', color: '#9ca3af' }}>No products found</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </>
              ) : (
                <>
                  <div className="modal-header">
                    <h2>{editingProductId ? 'Edit Product' : 'Add New Product'}</h2>
                    <button className="close-btn" onClick={handleCancelForm}>&times;</button>
                  </div>
                  <form onSubmit={handleAddProduct} className="modal-form">
                    <div className="form-group">
                      <label>Product Name</label>
                      <input
                        type="text"
                        placeholder="Enter product name"
                        value={newProduct.name}
                        onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label>Description</label>
                      <textarea
                        placeholder="Enter product description"
                        value={newProduct.description}
                        onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                        required
                      />
                    </div>

                    <div className="form-row">
                      <div className="form-group half">
                        <label>Price</label>
                        <input
                          type="number"
                          placeholder="0.00"
                          value={newProduct.price}
                          onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                          required
                          step="0.01"
                        />
                      </div>
                      <div className="form-group half">
                        <label>Category ID</label>
                        <input
                          type="text"
                          placeholder="Enter category ID"
                          value={newProduct.category}
                          onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                          required
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label>Card Image (Select 1)</label>
                      <input
                        type="file"
                        accept="image/*"
                        ref={cardImageInputRef}
                        style={{ display: 'none' }}
                        onChange={(e) => setNewProduct({ ...newProduct, cardImage: e.target.files[0] })}
                      />
                      <div
                        className="image-upload-box"
                        onClick={() => cardImageInputRef.current && cardImageInputRef.current.click()}
                        style={{ overflow: 'hidden', position: 'relative' }}
                      >
                        {newProduct.cardImage ? (
                          <img src={URL.createObjectURL(newProduct.cardImage)} alt="Card preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        ) : newProduct.imageUrl ? (
                          <img src={newProduct.imageUrl} alt="Current card image" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        ) : (
                          <span className="plus-icon">+</span>
                        )}
                      </div>
                    </div>

                    <div className="form-group">
                      <label>Detail Images (Select up to 3)</label>
                      <div className="image-upload-row">
                        {[0, 1, 2].map((index) => {
                          const file = newProduct.detailImages[index];
                          const url = newProduct.detailImageUrls[index];
                          return (
                            <div key={index}>
                              <input
                                type="file"
                                accept="image/*"
                                ref={(el) => detailImagesInputRef.current[index] = el}
                                style={{ display: 'none' }}
                                onChange={(e) => {
                                  if (e.target.files[0]) {
                                    const newDetails = [...newProduct.detailImages];
                                    newDetails[index] = e.target.files[0];
                                    setNewProduct({ ...newProduct, detailImages: newDetails });
                                  }
                                }}
                              />
                              <div
                                className="image-upload-box"
                                onClick={() => detailImagesInputRef.current[index] && detailImagesInputRef.current[index].click()}
                                style={{ overflow: 'hidden', position: 'relative' }}
                              >
                                {file ? (
                                  <img src={URL.createObjectURL(file)} alt={`Detail preview ${index}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                ) : url ? (
                                  <img src={url} alt={`Detail image ${index}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                ) : (
                                  <span className="plus-icon">+</span>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Hidden stock field to keep things working without visual clutter if unneeded */}
                    <input
                      type="hidden"
                      value={newProduct.stock}
                      onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                    />

                    <div className="modal-actions">
                      <button type="button" className="btn-cancel" onClick={handleCancelForm}>Cancel</button>
                      <button type="submit" className="btn-submit">
                        {editingProductId ? 'Update Product' : 'Create Product'}
                      </button>
                    </div>
                  </form>
                </>
              )}
            </>
          )}

          {activeTab === 'orders' && (
            <>
              <div className="card-header">
                <h2>Orders</h2>
              </div>
              <table className="admin-table">
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
                      <td className="product-name-col">
                        <span className="product-id">#{order.id}</span>
                      </td>
                      <td>{order.customerName}</td>
                      <td>Rs. {order.totalAmount}</td>
                      <td>{order.status}</td>
                      <td>
                        <select
                          value={order.status}
                          onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value)}
                          className="select-status"
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
                  {orders.length === 0 && !loading && (
                    <tr>
                      <td colSpan="5" style={{ textAlign: 'center', color: '#9ca3af' }}>No orders found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
