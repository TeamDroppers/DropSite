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
      data.isLoggedIn = true;
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

export{signInStatus, signUserOut, userInfo, updateFavorites};