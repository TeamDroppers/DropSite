import React from 'react';
import { Typography, Button, Card, CardActions, CardContent, CardMedia, IconButton } from '@material-ui/core';
import { Favorite } from '@material-ui/icons'
import useStyles from './styles';
import '../../item.css'

const CartItem = ({ item, isLoggedIn, isFavorite, onUpdateCartQty, onRemoveFromCart, onAddToFavorites }) => {
    const classes = useStyles();

    let favoriteClass = ""
    if(isFavorite)
        favoriteClass = "favorite"; 
    
    let fav_id = item.product_id + "_favorite"

    function internalOnAddToFavorites(productId)
    {
        document.querySelector(`#${fav_id}`).classList.toggle('favorite');
        onAddToFavorites(productId);
    }

  return (
    <Card className={classes.itemContainer}>
        <CardMedia image={item.image.url} alt={item.name} className={classes.media} />
        <CardContent className={classes.cardContent}>
            <Typography variant="h4">{item.name}</Typography>
            <Typography variant="h5">{item.line_total.formatted_with_symbol}</Typography>    
        </CardContent>
        <CardActions className={classes.cardActions}>
            <div className={classes.buttons}>
                <Button type="button" size="small" onClick={() => onUpdateCartQty(item.id, item.quantity - 1)}>-</Button>
                <Typography>{item.quantity}</Typography>
                <Button type="button" size="small" onClick={() => onUpdateCartQty(item.id, item.quantity + 1)}>+</Button>    
            </div>
                <Button variant="contained" type="button" color="secondary" onClick={() => onRemoveFromCart(item.id)}>Remove</Button> 
                {isLoggedIn &&
                <IconButton  className={classes.favoriteButton} aria-label="Add to Favorites" onClick={() => internalOnAddToFavorites(item.product_id)}>
                    <Favorite id={fav_id} className={favoriteClass}/>
                </IconButton>
                }

        </CardActions> 
    </Card>
  )
}  

export default CartItem;
