import React, {useState, useEffect} from 'react';
import { Grid } from '@material-ui/core';

import Product from './Product/Product';
import useStyles from './styles';

const Products = ({ products,  user, favorites, onAddToCart, onAddToFavorites }) => {
    const classes = useStyles();


    function ProductDisplay (){
        return(
            products.map((product) => (
                <Grid className={classes.productContainer} item key={product.id} xs={10} sm={8} md={5} lg={4} xl={3}>
                    <Product className={classes.product} product={product} user={user} isFavorite={(favorites.filter(favorite => favorite['id'] === product.id)).length > 0} 
                    onAddToCart={onAddToCart} onAddToFavorites={onAddToFavorites}
                    />
                </Grid>
            ))
        )
    }

    return(
        <main className={classes.content}>
            <div className={classes.toolbar} />
            <Grid container flexGrow = '1' justifyContent ="space-evenly" spacing={4}>
                <ProductDisplay/>
            </Grid>
        </main>
    )
}

export default Products;


    // let adminView = false; const setAdminView = (newState)=>{adminView = newState};
    // let customerView = false; const setCustomerView = (newState)=>{customerView = newState};
    // let guestView = false; const setGuestView = (newState)=>{guestView = newState};

    // const setupView = ()=>{
    //     console.log("Admin view is: " + adminView + " | Customer view is: " + customerView + " | Guest view is: " + guestView);
    //     if(guestView){
    //         console.log('guest view!');
    //         document.querySelectorAll('#adminView').forEach(function(item) {item.classList.add("removed");});
    //         document.querySelectorAll('#customerView').forEach(function(item) {item.classList.add("removed");});
    //         document.querySelectorAll('#guestView').forEach(function(item) {item.classList.remove("removed");});
    //     }
    //     else if(customerView){
    //         console.log('customer view!');
    //         document.querySelectorAll('#adminView').forEach(function(item) {item.classList.add("removed");});
    //         document.querySelectorAll('#customerView').forEach(function(item) {item.classList.remove("removed");});
    //         document.querySelectorAll('#guestView').forEach(function(item) {item.classList.remove("removed");});
    //     }
    //     else if(adminView)
    //     {
    //         console.log('admin view!');
    //         document.querySelectorAll('#adminView').forEach(function(item) {item.classList.remove("removed");});
    //         document.querySelectorAll('#customerView').forEach(function(item) {item.classList.add("removed");});
    //         document.querySelectorAll('#guestView').forEach(function(item) {item.classList.add("removed");});
    //     }
    // }