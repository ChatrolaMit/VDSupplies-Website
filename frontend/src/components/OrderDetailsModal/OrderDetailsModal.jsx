import { X } from 'lucide-react';
import './OrderDetailsModal.css';

export default function OrderDetailsModal({ isOpen, order, productsMap, onClose }) {
  if (!isOpen || !order) return null;

  return (
    <div className="odm-overlay" onClick={onClose}>
      <div className="odm-content" onClick={e => e.stopPropagation()}>
        <button className="odm-close" onClick={onClose}>
          <X size={20} color="var(--ink-soft)" />
        </button>
        
        <h2 className="odm-title">Order Details - {order.orderId || `ORD-${order._id.slice(-8).toUpperCase()}`}</h2>
        
        <div className="odm-items">
          {order.items && order.items.map((item, idx) => {
            const productInfo = productsMap[item.productId] || { name: 'Unknown Product', image: '' };
            const itemPrice = productInfo.price ? (productInfo.price * item.quantity).toFixed(2) : ((order.totalAmount / 100) / order.items.length).toFixed(2);
            const unitPrice = productInfo.price ? productInfo.price.toFixed(2) : ((order.totalAmount / 100) / order.items.length).toFixed(2);
            
            return (
              <div key={idx} className="odm-item">
                <div className="odm-item-img-wrapper">
                  {productInfo.image ? (
                    <img src={productInfo.image} alt={productInfo.name} />
                  ) : (
                    <div className="odm-item-placeholder">No Image</div>
                  )}
                </div>
                <div className="odm-item-info">
                  <div className="odm-item-name">{productInfo.name || `Product ID: ${item.productId}`}</div>
                  <div className="odm-item-price">
                    ${itemPrice} ({item.quantity} x ${unitPrice})
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="odm-instructions">
          <em>Instructions: testing</em>
        </div>
        
        <div className="odm-total">
          Total: ${(order.totalAmount / 100).toFixed(2)}
        </div>
      </div>
    </div>
  );
}
