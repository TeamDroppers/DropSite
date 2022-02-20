const tasksDOM = document.querySelector('.tasks')
const loadingDOM = document.querySelector('.loading-text')
const userForm = document.querySelector('.user-form')
const productsDOM = document.querySelector('.products')
const loginDOM = document.querySelector('.signin')
const loginBtn = document.getElementById('log-in')
const signupBtn = document.getElementById('sign-up')

CheckValidUser = async function(){
let token = localStorage.getItem('token')
  if(token){
    try {
      const {data:email} = await axios.get(`/api/v1/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      document.querySelector('.droppers').innerHTML = 'Hello ' + email
      document.getElementById('sign-out').hidden = false;
    } catch (error) {
      console.log(error)
    }
  }
  else{
    document.querySelector('.droppers').innerHTML = `Welcome to Droppers, Please Sign Up or Log In. ` 
  }
}

CheckValidUser()

userForm.addEventListener('submit', async (e) => {
  
  localStorage.removeItem('token')
  if(!localStorage.getItem('token'))
    ;//window.location = "/index.html";
})
