import React, { useState, useEffect } from "react";
import { getOrders } from "../services/order.service";
import Loader from "../../../common/Loader";
import styles from "./OrdersPage.module.css";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const data = await getOrders();
      setOrders(data);
    } catch (err) {
      setError("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "DELIVERED":
        return styles.statusDelivered;
      case "SHIPPED":
        return styles.statusShipped;
      case "PROCESSING":
        return styles.statusProcessing;
      case "CANCELLED":
        return styles.statusCancelled;
      default:
        return styles.statusPending;
    }
  };

  if (loading) return <Loader />;
  if (error) return <div className={styles.errorBox}>{error}</div>;

  return (
    <div className={styles.page}>
      <h2 className={styles.pageTitle}>My Orders</h2>

      {orders.length === 0 ? (
        <div className={styles.emptyBox}>
          <p className={styles.emptyText}>You haven't placed any orders yet.</p>
        </div>
      ) : (
        <div className={styles.list}>
          {orders.map((order) => (
            <div key={order.id} className={styles.card}>
              {/* Header */}
              <div className={styles.cardHeader}>
                <span className={styles.orderId}>Order #{order.id}</span>
                <span className={getStatusClass(order.status)}>
                  {order.status}
                </span>
              </div>

              {/* Items */}
              <div className={styles.itemsList}>
                {order.items.map((item) => (
                  <div key={item.productId} className={styles.item}>
                    <span className={styles.itemName}>
                      {item.productName}
                      <span className="text-[#1A1209]/40">
                        {" "}
                        x{item.quantity}
                      </span>
                    </span>
                    <span className={styles.itemPrice}>
                      Rs. {(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className={styles.cardFooter}>
                <span className={styles.orderDate}>
                  Placed on {new Date(order.createdAt).toLocaleDateString()}
                </span>
                <span className={styles.orderTotal}>
                  Rs. {order.totalAmount.toFixed(2)}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
