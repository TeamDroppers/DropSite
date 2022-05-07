import React, { useState, useEffect } from 'react';
import SearchItem from './SearchItem';

function Searchbar({products}){

    const [userQuery, setUserQuery] = useState("");
    const [searchItems, setSearchItems] = useState(<></>);
    const [isActive, setIsActive] = useState(false);

    useEffect(()=>{
        setSearchItems(<SearchProducts/>)
    },[isActive])

    const handleUserQuery = (event)=>{
        setUserQuery(event.target.value);
        console.log(event.target.value)
        event.preventDefault();
        setSearchItems(<SearchProducts/>)
    }

    function SearchProducts()
    {
        return(
            <>
                {isActive &&
                products.map((product) => (
                    <>
                    { product.name.toLowerCase().includes(userQuery.toLowerCase()) &&
                    <SearchItem product={product}/>
                    }
                    </>
                ))
                }
            </>
        )
    }

    const searchbarFocused = ()=>{
        setIsActive(true);
    }

    const searchbarNotFocused = ()=>{
        setIsActive(false);
    }

    return(
    <>
        <div className = "searchbar-container" tabIndex={0} >
            <div onFocus={searchbarFocused} style={{minWidth:'80%', maxWidth:'80%'}}>
            <input class="searchbar" type="text" name="userQuery" value={userQuery} onChange={handleUserQuery}   onBlur={searchbarNotFocused} placeholder="Search.."/>
            {searchItems}
            </div>
        </div>
    </>
    );
}

export default Searchbar;
