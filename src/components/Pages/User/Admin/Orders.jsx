import React, {useState, useEffect} from 'react';
import Order from './Order/Order'
import Select from 'react-select'
import '../Orders/orders.css'


const Orders = ({user, getOrders}) => {

    const [orders, setOrders] = useState([]);
    const [limit, setLimit] = useState(2);
    const [selectLimit, setSelectLimit] = useState([]);
    const [page, setPage] = useState(1);
    const [totalOrders, setTotalOrders] = useState(0);
    
    useEffect(() => {
        if(user && user.success && user.role >= 2){
            getOrders(limit, page).then((orders)=>{setTotalOrders(orders.meta.pagination.total); if(orders.meta.pagination.total == 0) return; console.log(orders.data); setOrders(orders.data); })
        }
        else
        setOrders([]);
    }, [user]);

    useEffect(()=>{
        console.log(page)
        updatePageOptions();
        updateLimitOptions();
        getOrders(limit, page).then((orders)=>{setTotalOrders(orders.meta.pagination.total); if(orders.meta.pagination.total == 0) return; console.log(orders.data); setOrders(orders.data);})
    }, [limit, page, totalOrders])

    useEffect(()=>{
            console.log('hello')
    },[orders])

    const updatePageOptions = ()=>{
        if(totalOrders < page + limit)
            document.getElementById('next').classList.add('hidden');
        else
            document.getElementById('next').classList.remove('hidden');
        if(page <= 1)
            document.getElementById('prev').classList.add('hidden');
        else
            document.getElementById('prev').classList.remove('hidden');
    }

    const updateLimitOptions = ()=>{
        let limitOptions = [];
        for(let i = 1; i <= 5 && i <= totalOrders; i++){
            const data = {'value':i, "label":''+i};
            limitOptions.push(data);
        }
        setSelectLimit(limitOptions);
    }

    const handleSelectLimit = (option) =>{
        console.log(option.value)
        setLimit(option.value);
    }

    function DisplayOrders(){
        return(
            <>{
            orders.map((order) => (
                <div className="order-container" key={order.id} xs={10} sm={8} md={5} lg={4} xl={3}>
                    <Order order={order} />
                </div>
            ))}
            </>
        );
    }

  return (
   <>
    <div className='orders-container'>
        <div className= 'title-area'>
            <h1>Order History</h1>
        </div>
        {orders.length > 0 &&
        <>
            <DisplayOrders orders={orders}/>
        </>
        }
        {orders.length === 0 &&
            <h4>No orders to view</h4>        
        }
    </div>
    <div className= 'select-area'>
        <button id="prev" onClick={()=>{if(page > 1)setPage(prev => prev-1)}}>Prev Page</button>
        <Select defaultValue={{ value: '2', label: '2' }} className="select" id="emp-select" options={selectLimit} onChange={handleSelectLimit}/>
        <button id="next" onClick={()=>{setPage(prev => prev+1)}}>Next Page</button>
    </div>
    </>
  );
}

export default Orders;