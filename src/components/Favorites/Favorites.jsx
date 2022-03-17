import React from 'react';
import { Grid } from '@material-ui/core';

import FavoriteItem from './Favorite/Favorite';
import useStyles from './styles';

const Favorites = ({ products, onAddToCart, onAddToFavorites }) => {
    const classes = useStyles();
    console.log(products);
    return(
    <main className={classes.content}>
        <div className={classes.toolbar} />
        <Grid container justifyContent ="center" spacing={4}>
            {products.map((product) => (
                <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
                    <FavoriteItem product={product} onAddToCart={onAddToCart} onAddToFavorites={onAddToFavorites} />

                </Grid>
            ))}
        </Grid>
    </main>
    )
}

export default Favorites;