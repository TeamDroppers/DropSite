import React, {useState, useEffect} from 'react';
import { Card, CardMedia, CardContent, CardActions, Typography, IconButton } from '@material-ui/core';
import { AddShoppingCart, Favorite } from '@material-ui/icons'
import useStyles from './styles';
import '../../../item.css'
import { CookieSharp } from '@mui/icons-material';

const Product = ({ product, user, isFavorite, onAddToCart, onAddToFavorites, adminView, guestView, customerView}) => {
    const classes = useStyles();
    const [adminRender, setAdminRender] = useState(<></>);
    const [customerRender, setCustomerRender] = useState(<></>);
    const [guestRender, setGuestRender] = useState(<></>);

    //console.log(product.categories[0].slug); //view available category slugs on console.log
    

    useEffect(() => {
        setupView();//window.requestAnimationFrame(()=>setTimeout(setupView, 0));
    }, [adminView, guestView, customerView]);

    let favoriteClass = ""
    if(isFavorite)
        favoriteClass = "favorite"; 

    let fav_id = product.id + "_favorite"
    let prod_id = product.id + "_add-cart"

    const setupView = ()=>{
        (customerView || guestView) ? setAdminRender(<></>) : setAdminRender(<AdminView/>);
        (guestView) ? setGuestRender(<GuestView/>) : setGuestRender(<></>);
        if(customerView){
            setCustomerRender(<CustomerView/>)  ;
            setGuestRender(<GuestView/>) ;
        } 
        else setCustomerRender(<></>);
    }

    function internalOnAddToFavorites(productId)
    {
        document.querySelector(`#${fav_id}`).classList.toggle('favorite');
        onAddToFavorites(productId);
    }

    function UserView(){
        return(
            <>
                {adminRender}
                {guestRender}
                {customerRender} 
            </>
        );
    }

    function GuestView(){
        return(
            <div id="guestView" className={classes.customerActions}>     
            {product.inventory.available > 0 &&       
                <IconButton aria-label="Add to Cart" onClick={() => onAddToCart(product.id, 1)}>
                    <AddShoppingCart id={prod_id}/>
                </IconButton>
            }  
            </div>
        )
    }

    function CustomerView(){
        return(
            <>
            {user.isLoggedIn &&
                <section id="customerView" className="customerView">
                    <IconButton  className={classes.favoriteButton} aria-label="Add to Favorites" onClick={() => internalOnAddToFavorites(product.id)}>
                        <Favorite id={fav_id} className={favoriteClass}/>
                    </IconButton>
                </section>
            }
            </>
        )
    }

    function AdminView(){
        return(
            <>
            {user.role >=2 && 
            <button id="adminView" className = {classes.modifyButton} onClick={()=>{window.location = `/modify-product/?productID=${product.id}`}}>Modify</button>
            }
            </>
        );
    }

  return (
    < Card className={classes.root}>
        <CardMedia className={classes.media} image={product.image.url} title={product.name} onClick={()=>{window.location = `/product/?productID=${product.id}`}}>
            { product.inventory.available === 0 && <div className={classes.noQuantity}>
                <h1 className={classes.noQuantityText}>
                    Out of Stock
                </h1>
            </div>}
        </CardMedia>
        <CardContent className={classes.cardContent}>
            <div className={classes.itemLink} onClick={()=>{window.location = `/product/?productID=${product.id}`}}>
                <Typography className={classes.productName} variant = "h5" gutterBottom>
                    {product.name}
                </Typography>
                <Typography variant = "h5">
                    {product.price.formatted_with_symbol}
                </Typography> 
            </div>
            <Typography className={classes.description} dangerouslySetInnerHTML = {{ __html: product.description}} pvariant="body2" color="textSecondary"/>
        </CardContent>
        <CardActions disableSpacing className={classes.cardActions}>
            <UserView/>
        </CardActions>
    </Card>
  );
}

export default Product;
