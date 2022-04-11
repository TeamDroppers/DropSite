import React from 'react';
import { Grid } from '@material-ui/core';

import Product from './Product/Product';
import useStyles from './styles';

const Products = ({ products,  isLoggedIn, favorites, onAddToCart, onAddToFavorites }) => {
    const classes = useStyles();
    //console.log(products);
    function ProductDisplay (){
        return(
            products.map((product) => (
                <Grid className={classes.productContainer} item key={product.id} xs={10} sm={8} md={5} lg={4} xl={3}>
                    <Product className={classes.product} product={product} isLoggedIn={isLoggedIn} isFavorite={(favorites.filter(favorite => favorite['id'] === product.id)).length > 0} onAddToCart={onAddToCart} onAddToFavorites={onAddToFavorites} />
                </Grid>
            ))
        )
    }

    return(
    <main className={classes.content}>
        <div className={classes.toolbar} />
        <Grid container flexGrow = '1' justifyContent ="space-evenly" spacing={4}>
            <ProductDisplay/>
            <ProductDisplay/>
            <ProductDisplay/>
            <ProductDisplay/>

        </Grid>
    </main>
    )
}

export default Products;