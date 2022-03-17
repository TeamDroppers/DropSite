import React, {useEffect, useState}  from 'react';
import { Typography, Button, Card, CardActions, CardContent, CardMedia, IconButton } from '@material-ui/core';
import { Favorite } from '@material-ui/icons'
import { userInfo } from '../../../components-merge/utilites';
import useStyles from './styles';

const CartItem = ({ item, onUpdateCartQty, onRemoveFromCart, onAddToFavorites }) => {
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
    <IconButton aria-label="Add to Favorites" onClick={() => onAddToFavorites(item.product_id, 1)}>
        <Favorite />
    </IconButton>
    )
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
                {userFavorite}
        </CardActions> 
    </Card>
  )
}  

export default CartItem;
