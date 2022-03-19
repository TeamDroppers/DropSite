import React from 'react';
import { Grid } from '@material-ui/core';

import FavoriteItem from './Favorite/Favorite';
import useStyles from './styles';

const Favorites = ({ favorites, onAddToCart, onAddToFavorites }) => {
    const classes = useStyles();
    console.log(favorites);
    return(
    <main className={classes.content}>
        <div className={classes.toolbar} />
        <Grid container justifyContent ="center" spacing={4}>
            {favorites.map((favorite) => (
                <Grid item key={favorite.id} xs={12} sm={6} md={4} lg={3}>
                    <FavoriteItem favorite={favorite} onAddToCart={onAddToCart} onAddToFavorites={onAddToFavorites} />
                </Grid>
            ))}
        </Grid>
    </main>
    )
}

export default Favorites;