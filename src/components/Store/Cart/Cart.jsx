import React from 'react';
import { Container, Typography, Button, Grid } from '@material-ui/core'
import { Link } from 'react-router-dom'
import useStyles from './styles';
import CartItem from './CartItem/CartItem';

const Cart = ({ cart, user, favorites, handleUpdateCartQty, handleRemoveFromCart, handleEmptyCart, handleAddToFavorites }) => {
    const classes= useStyles();
    const EmptyCart = () =>(
        <Typography variant="subtitle1"> You have no items in your shopping cart!
        <Link to="/"className={classes.link}> Add some!</Link>
        </Typography>
    ) 
    
        const handleCheckout = ()=>{
            window.location = '/checkout';
        }

    const FilledCart = () => (
        <>
            <Grid container spacing={3} justifyContent = 'space-evenly'>
                {cart.line_items.map((item) =>(
                    <Grid className={classes.product} item xs={10} sm={6} md={5} lg={4} xl={3} key={item.id}>
                        <CartItem item={item} user={user} isFavorite={(favorites.filter(favorite => favorite['id'] === item.product_id)).length > 0} onUpdateCartQty={handleUpdateCartQty} onRemoveFromCart={handleRemoveFromCart} onEmptyCart={handleEmptyCart} onAddToFavorites={handleAddToFavorites}/>
                    </Grid>
                ))}
            </Grid>
            <div className={classes.cardDetails}>
                <Typography className={classes.subtotal} variant="h4">Subtotal: {cart.subtotal.formatted_with_symbol} </Typography>
                <div className={classes.cartOptions}>
                    <button className={classes.optionButton} size="large" type="button" variant="contained" color="secondary" onClick={handleEmptyCart}>Empty Cart</button>
                    <button className={classes.checkoutButton} component={Link} to="/checkout" size="large" type="button" variant="contained" color="primary" onClick={handleCheckout}>Checkout</button>                
                </div>
            </div>
        </>
    );

    if(!cart.line_items) return 'Loading... ';

  return (
    <>
    <h1 className={classes.title}>Your Shopping Cart</h1>
    <Container className = {classes.mainContainer}>
        <div />
        { !cart.line_items.length ? <EmptyCart /> : <FilledCart />} 
    </Container>
    </>
  );
}

export default Cart;
