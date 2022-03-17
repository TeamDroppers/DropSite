import React, { useState, useEffect } from 'react';
import { Card, CardMedia, CardContent, CardActions, Typography, IconButton } from '@material-ui/core';
import { AddShoppingCart, Favorite } from '@material-ui/icons'
import {userInfo} from '../../../components-merge/utilites'
import useStyles from './styles';

const Product = ({ product, onAddToCart, onAddToFavorites }) => {
    const classes = useStyles();

    const [userFavorite, setUserFavorite] = useState(<Empty/>);

        useEffect(() => {
            fetchUser()
          }, [])

    const fetchUser = async()=>{
        await userInfo()              
        .then(user => {
            if(user.success)
                setUserFavorite(<FavoriteButton/>);
            else
                setUserFavorite(<Empty/>);
        })
    }

    function Empty(){
        return(
            <div className="removed"></div>
        );
    }

    function FavoriteButton()
    {
        return(
        <IconButton aria-label="Add to Favorites" onClick={() => onAddToFavorites(product.id, 1)}>
            <Favorite />
        </IconButton>
        )
    }

  return (
    < Card className={classes.root}>
        <CardMedia className={classes.media} image={product.image.url} title={product.name} />
        <CardContent>
            <div className={classes.cardContent}>
                <Typography variant = "h5" gutterBottom>
                    {product.name}
                </Typography>
                <Typography variant = "h5">
                    {product.price.formatted_with_symbol}
                </Typography> 
            </div>
            <Typography dangerouslySetInnerHTML = {{ __html: product.description}} pvariant="body2" color="textSecondary"/>
        </CardContent>
        <CardActions disableSpacing className={classes.cardActions}>
            <IconButton aria-label="Add to Cart" onClick={() => onAddToCart(product.id, 1)}>
                <AddShoppingCart />
            </IconButton>
            {userFavorite}
        </CardActions>
    </Card>
  );
}

export default Product;
