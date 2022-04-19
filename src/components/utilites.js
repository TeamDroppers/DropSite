import axios from 'axios'

 const signInStatus = async ()=>{
    let token = localStorage.getItem('token');
    if(token){
      try {
        const {data} = await axios.get(`https://droppers-node.herokuapp.com/api/v1/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        //console.log(data)
        if(data.success === true){
            return true;
        }
        else{
            return false;
        }
      } catch (error) {
        console.log(error);
      }
    }
    return false;
}

const userInfo = async ()=>{
  let token = localStorage.getItem('token');
  if(token){
    try {
      let {data} = await axios.get(`https://droppers-node.herokuapp.com/api/v1/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      // console.log(data)
      data.token = token;
      (data.success) ? data.isLoggedIn = true : data.isLoggedIn = false;
      return data;
    } catch (error) {
      console.log(error);
    }

  }
  const data = {success:false, isLoggedIn:false};
  return data;
}

const updateFavorites = async (productId) =>{
      const user = await userInfo();
      try{
        const { data } = await axios.post('https://droppers-node.herokuapp.com/api/v1/auth/favorites',{
          item_id:productId,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        console.log(data);
      }
      catch(err){
        console.error(err);
      }
}

const signUserOut = async ()=>{
  let token = localStorage.getItem('token');
  if(token){
    let signedIn = await signInStatus();
    if(signedIn)
      localStorage.removeItem('token');
  }

}

const changeProductPrice = async(update)=>{
  const url = new URL(
      `https://api.chec.io/v1/products/${update.id}`
  );
  
  var data = JSON.stringify(update.info);

  var config = {
    method: 'put',
    url: url,
    headers: { 
      'X-Authorization': `${process.env.REACT_APP_CHEC_SECRET_KEY}`, 
      'Content-Type': 'application/json'
    },
    data : data
  };
  let updatedProduct = {};
  await axios(config)
  .then(function (response) {
    updatedProduct = response.data;
    updatedProduct.success = true;
    console.log(response.data);
  })
  .catch(function (error) {
    console.log(error);
    updatedProduct.success = false;
  });
  return updatedProduct;

}

export{signInStatus, signUserOut, userInfo, updateFavorites, changeProductPrice};