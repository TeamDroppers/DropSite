import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import Order from './Order/Order'

const Orders = ({user, getOrders}) => {

    const [orders, setOrders] = useState([]);

    useEffect(() => {
        if(user && user.success)
            getOrders(user.email).then((orders)=>{console.log(orders); setOrders(orders.data)})
    }, [user]);

    useEffect(()=>{
    }, [orders])

    function DisplayOrders(){
        return(
            <>{
            orders.map((order) => (
                <div className="order-container" xs={10} sm={8} md={5} lg={4} xl={3}>
                    <Order order={order}/>
                </div>
            ))}
            </>
        );
    }


  return (
    <div className='orders-container'>
        <DisplayOrders/>
    </div>
  );
}

export default Orders;