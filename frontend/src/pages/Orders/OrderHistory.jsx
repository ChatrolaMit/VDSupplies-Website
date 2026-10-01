import { useState, useEffect, useContext } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { fetchProducts } from '../../data/products';
import Button from '../../components/Button/Button';
import OrderDetailsModal from '../../components/OrderDetailsModal/OrderDetailsModal';
import './OrderHistory.css';

export default function OrderHistory() {
  const { user, token } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [productsMap, setProductsMap] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    if (!token) return;

    const loadData = async () => {
      try {
        const [ordersRes, allProducts] = await Promise.all([
          fetch('/api/orders', {
            headers: { 'Authorization': `Bearer ${token}` }
          }).then(res => res.json()),
          fetchProducts()
        ]);

        const pMap = {};
        allProducts.forEach(p => pMap[p.id] = p);
        setProductsMap(pMap);
        
        if (Array.isArray(ordersRes)) {
          setOrders(ordersRes);
        }
      } catch (err) {
        console.error("Failed to load orders", err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [token]);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <main className="orders-page">
      <div className="container orders-container">
        <h1 className="orders-title">Your Orders</h1>

        {loading ? (
          <p>Loading your order history...</p>
        ) : orders.length === 0 ? (
          <div className="no-orders">
            <h3>No orders yet</h3>
            <p>You haven't placed any orders with us.</p>
            <Button as={Link} to="/products" variant="primary">
              Browse Products
            </Button>
          </div>
        ) : (
          <div className="orders-table-wrapper">
            <table className="orders-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Date</th>
                  <th>Total</th>
                  <th>Payment Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(order => (
                  <tr key={order._id}>
                    <td className="ot-id">{order.orderId || `ORD-${order._id.slice(-8).toUpperCase()}`}</td>
                    <td className="ot-date">
                      {new Date(order.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric', month: 'long', day: 'numeric',
                        hour: '2-digit', minute: '2-digit'
                      })}
                    </td>
                    <td className="ot-total">${(order.totalAmount / 100).toFixed(2)}</td>
                    <td className="ot-status">
                      <span className={`status-badge ${order.paymentStatus}`}>
                        {order.paymentStatus === 'paid' ? 'PAID' : 'PENDING'}
                      </span>
                    </td>
                    <td className="ot-action">
                      <button className="ot-action-btn" onClick={() => setSelectedOrder(order)}>
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      
      <OrderDetailsModal 
        isOpen={!!selectedOrder} 
        order={selectedOrder} 
        productsMap={productsMap} 
        onClose={() => setSelectedOrder(null)} 
      />
    </main>
  );
}
