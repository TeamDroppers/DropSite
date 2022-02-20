
const emailDOM = document.querySelector('.email')
const passwordDOM = document.querySelector('.password')
const userLoginForm = document.querySelector('.single-task-form')
//const editBtnDOM = document.querySelector('.task-edit-btn')
const formAlertDOM = document.querySelector('.form-alert')
const params = window.location.search

const id = new URLSearchParams(params).get('id')
let tempName

userLoginForm.addEventListener('submit', async (e) => {
  e.preventDefault()
  try {
    const userName = emailDOM.value.toLowerCase();
    const userPassword = passwordDOM.value;
    const { data } = await axios.post(`/api/v1/auth/register`, {
      email: userName,
      password: userPassword,
    })
    console.log(data)
    if(!data.token)
    {
      throw data
    }
    localStorage.setItem('token', data.token)
    let token = localStorage.getItem('token')
    if(token != 'undefined'){
      window.location = "/index.html";
    }
    else{
      localStorage.removeItem('token')
    }

  } catch (error) {
    console.error(error)
    formAlertDOM.style.display = 'block'
    formAlertDOM.innerHTML = error
  }
  setTimeout(() => {
    formAlertDOM.style.display = 'none'
    formAlertDOM.classList.remove('text-success')
  }, 3000)
})
