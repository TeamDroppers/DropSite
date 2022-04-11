import React from 'react';
import { Typography, Button, Card, CardContent, CardMedia, IconButton } from '@material-ui/core';
import { Favorite } from '@material-ui/icons'
import useStyles from './styles';

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
        <CardMedia image={item.image.url} alt={item.name} className={classes.media} onClick={()=>{window.location = `/product/?productID=${item.product_id}`}}/>
        <CardContent className={classes.cardContent}>
            <Typography  variant="h4"> {item.name}</Typography>
            <Typography className={classes.productPrice} variant="h5" onClick={()=>{window.location = `/product/?productID=${item.product_id}`}}> {item.line_total.formatted_with_symbol} </Typography>    
        </CardContent>
        <div className={classes.cartActions}>
            <div className={classes.buttons}>
                <Button type="button" size="small" onClick={() => onUpdateCartQty(item.id, item.quantity - 1)}>-</Button>
                <Typography className={classes.itemQuantity}>  {item.quantity}</Typography>
                <Button type="button" size="small" onClick={() => onUpdateCartQty(item.id, item.quantity + 1)}>+</Button>    
            </div>
                <Button  className={classes.removeButton} variant="contained" type="button" color="secondary" onClick={() => onRemoveFromCart(item.id)}>Remove</Button> 
                             
                    {isLoggedIn &&
                    <div className={classes.favoriteButton}>  
                        <IconButton aria-label="Add to Favorites" onClick={() => internalOnAddToFavorites(item.product_id)}>
                            <Favorite id={fav_id} className={favoriteClass}/>
                        </IconButton>
                    </div>
                    }
        </div> 
    </Card>
  )
}  

export default CartItem;
