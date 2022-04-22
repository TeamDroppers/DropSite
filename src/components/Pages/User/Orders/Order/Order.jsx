import React from 'react';
import '../orders.css'

const Order = ({ order }) => {
  return (
    <div className='order'>
        <div className="shipping-details">
            <a className="order-link" href={`/order?ref=${order.customer_reference}`} >
                <div class="pair-container">
                    <div className="field-formatter">
                        <label>Order Reference:</label>
                        <h5>{order.customer_reference}</h5>
                    </div>
                    <div className="field-formatter">
                        <label>Status:</label>
                        <h5>{order.status_fulfillment}</h5>
                    </div>
                </div>
            </a>
            
            <div className='shipping-details-grid'>
                <h2>Shipping Details</h2>
                <div class="pair-container">
                    <div className="field-formatter">
                        <label>Name:</label>
                        <h5>{order.shipping.name}</h5>
                    </div>
                    <div className="field-formatter">
                        <label>Address:</label>
                        <h5>{order.shipping.street}</h5>
                    </div>
                </div>
                <div class="pair-container">
                    <div className="field-formatter">
                        <label>City:</label>
                        <h5>{order.shipping.town_city}</h5>
                    </div>
                    <div className="field-formatter">
                        <label>Country:</label>
                        <h5>{order.shipping.country}</h5>
                    </div>
                </div>
                <div class="pair-container">
                    <div className="field-formatter">
                        <label>State:</label>
                        <h5>{order.shipping.county_state}</h5>
                    </div>
                    <div className="field-formatter">
                        <label>ZIP:</label>
                        <h5>{order.shipping.postal_zip_code}</h5>
                    </div>
                </div>
            </div>
            
            <div className='shipping-details-grid'>
                <h2>Payment Details</h2>
                <div class="pair-container">
                    <div className="field-formatter">
                        <label>Total:</label>
                        <h5>{order.order.total_with_tax.formatted_with_symbol}</h5>
                    </div>
                    <div className="field-formatter">
                        <label>Status:</label>
                        <h5>{order.status_payment}</h5>
                    </div>
                </div>
                <div class="pair-container">
                    <div className="field-formatter">
                        <label>Method:</label>
                        <h5>{order.transactions[0].gateway_name}</h5>
                    </div>
                    <div className="field-formatter">
                        <label>Card:</label>
                        <h5>{order.transactions[0].gateway_reference}</h5>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}

export default Order;