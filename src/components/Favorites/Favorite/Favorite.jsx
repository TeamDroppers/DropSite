import React from 'react';
import { Card, CardMedia, CardContent, CardActions, Typography, IconButton } from '@material-ui/core';
import { AddShoppingCart, Favorite } from '@material-ui/icons'

import useStyles from './styles';

const FavoriteItem = ({ favorite, onAddToCart, onAddToFavorites }) => {
    const classes = useStyles();
  return (
    < Card className={classes.root}>
        <CardMedia className={classes.media} image={favorite.image.url} title={favorite.name} />
        <CardContent>
            <div className={classes.cardContent}>
                <Typography variant = "h5" gutterBottom>
                    {favorite.name}
                </Typography>
                <Typography variant = "h5">
                    {favorite.price.formatted_with_symbol}
                </Typography> 
            </div>
            <Typography dangerouslySetInnerHTML = {{ __html: favorite.description}} pvariant="body2" color="textSecondary"/>
        </CardContent>
        <CardActions disableSpacing className={classes.cardActions}>
            <IconButton aria-label="Add to Cart" onClick={() => onAddToCart(favorite.id, 1)}>
                <AddShoppingCart />
            </IconButton>
            <IconButton className={classes.favorite} aria-label="Add to Favorites" onClick={() => onAddToFavorites(favorite.id)}>
                <Favorite />
            </IconButton>
        </CardActions>
    </Card>
  );
}

export default FavoriteItem;
