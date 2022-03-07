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
        console.log(data)
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
      const {data} = await axios.get(`https://droppers-node.herokuapp.com/api/v1/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      console.log(data)
      return data;
    } catch (error) {
      console.log(error);
    }

  }
  const data = {success:false};
  return data;
}

const signUserOut = async ()=>{
  let token = localStorage.getItem('token');
  if(token){
    let signedIn = await signInStatus();
    if(signedIn)
      localStorage.removeItem('token');
  }

}

export{signInStatus, signUserOut, userInfo};