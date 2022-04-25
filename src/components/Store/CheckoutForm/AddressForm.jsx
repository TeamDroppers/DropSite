import React, { useState, useEffect } from 'react';
import { InputLabel, Select, MenuItem, Button, Grid, Typography } from '@material-ui/core';
import { useForm, FormProvider } from 'react-hook-form';
import { Link } from 'react-router-dom';

import { commerce } from '../../lib/commerce';

import FormInput from './CustomTextField';

const AddressForm = ({ checkoutToken, setCheckoutToken, next }) => {
    const [shippingCountries, setShippingCountries] = useState([]);
    const [shippingCountry, setShippingCountry] = useState('');
    const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
    const [shippingSubdivision, setShippingSubdivision] = useState('');
    const [shippingOptions, setShippingOptions] = useState([]);
    const [shippingOption, setShippingOption] = useState('');
    const methods = useForm();

    const countries = Object.entries(shippingCountries).map(([code, name]) => ({ id: code, label: name}))
    const subdivisions = Object.entries(shippingSubdivisions).map(([code, name]) => ({ id: code, label: name}))
    const options = shippingOptions.map((sO) => ({ id: sO.id, label: `${sO.description} - (${sO.price.formatted_with_symbol})` }))

    const fetchShippingCountries = async (checkoutTokenId) => {
        const { countries } = await commerce.services.localeListShippingCountries(checkoutTokenId);

        setShippingCountries(countries);
        setShippingCountry(Object.keys(countries)[0]);
    }

    const fetchSubdivisions = async (countryCode) => {
        const { subdivisions} = await commerce.services.localeListSubdivisions(countryCode);

        setShippingSubdivisions(subdivisions);
        setShippingSubdivision(Object.keys(subdivisions)[0]);

    }

    const fetchShippingOptions = async (checkoutTokenId, country, region = null) => {
        const options = await commerce.checkout.getShippingOptions(checkoutTokenId, { country, region });
        console.log(options)
        setShippingOptions(options);
        setShippingOption(options[0].id);
    }

    useEffect(() => {
        fetchShippingCountries(checkoutToken.id)
    }, []);

     useEffect(() => {
        if(shippingCountry) fetchSubdivisions(shippingCountry);
    }, [shippingCountry]);

    useEffect(() => {
        if(shippingSubdivision) fetchShippingOptions(checkoutToken.id, shippingCountry, shippingSubdivision);

    }, [shippingSubdivision])
    
    const handleSubmit = (event)=>{
        event.preventDefault();
        const data = {
            firstname: event.target.elements[0].value, //firstname
            lastname: event.target.elements[1].value, //lastname
            email: event.target.elements[3].value, //email
            name: event.target.elements[0].value + " " + event.target.elements[1].value, //firstname concatinated with last name
            street: event.target.elements[2].value, //address
            town_city: event.target.elements[4].value, //city
            county_state: shippingSubdivision,
            postal_zip_code: event.target.elements[5].value, //zip code
            country: shippingCountry,
            shippingOption: shippingOption,
        }
        commerce.checkout.checkShippingOption(checkoutToken.id, {
            shipping_option_id: shippingOption,
            country: shippingCountry,
            region: shippingSubdivision,
        })
        .then((ship)=>{
            ship.id = checkoutToken.id
            setCheckoutToken(ship);
            console.log(ship)
            commerce.checkout.setTaxZone(checkoutToken.id, {
                country: shippingCountry,
                region: shippingSubdivision,
                postal_zip_code: event.target.elements[5].value,
            })
            .then((tax)=>{
                tax.shipping = ship.shipping;
                setCheckoutToken(tax);
                console.log(tax);
                next({...data})
                console.log(data);
            })
        })

    }
    
    return (
    <>  
        <Typography variant="h6" gutterBottom>Shipping Address</Typography>
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit}>
            {/* <form onSubmit={methods.handleSubmit((data) => { console.log(data); next({ ...data , shippingCountry, shippingSubdivision, shippingOption})} )}> */}
                <Grid container spacing={3}>
                    <FormInput name='firstName' label='First Name'/>
                    <FormInput name='lastName' label='Last Name'/>
                    <FormInput name='address1' label='Address'/>
                    <FormInput name='email' label='Email'/>
                    <FormInput name='City' label='City'/>
                    <FormInput name='zip' label='ZIP / Postal code'/>   
                    <Grid item xs={12} sm={6}>
                        <InputLabel>Shipping Country</InputLabel>
                        <Select value={shippingCountry} fullWidth onChange={(e) => setShippingCountry(e.target.value)}>  
                            {countries.map((country) => (
                            <MenuItem key={country.id} value={country.id}>{country.label}</MenuItem>
                            ))}
                        </Select>
                    </Grid>
                     <Grid item xs={12} sm={6}>
                        <InputLabel>Shipping Subdivision</InputLabel>
                        <Select value={shippingSubdivision} fullWidth onChange={(e) => setShippingSubdivision(e.target.value)}>  
                            {subdivisions.map((subdivision) => (
                            <MenuItem key={subdivision.id} value={subdivision.id}>{subdivision.label}</MenuItem>
                            ))}
                        </Select>
                    </Grid> 
                    <Grid item xs={12} sm={6}>
                        <InputLabel>Shipping Options</InputLabel>
                        <Select value={shippingOption} fullWidth onChange={(e) => setShippingOption(e.target.value)}>  
                            {options.map((option) => (
                            <MenuItem key={option.id} value={option.id}>{option.label}</MenuItem>
                            ))}
                        </Select>
                    </Grid>                 
                </Grid>
                <br />
                <div style={{ display: 'flex', justifyContent: 'space-between'}}>
                    <Button component={Link} to="/cart" variant="outlined">Back to Cart</Button>
                    <Button type="submit" variant="contained" color="primary"> Next</Button>
                </div>
            </form>
        </FormProvider>
    </>
  );
}

export default AddressForm;
