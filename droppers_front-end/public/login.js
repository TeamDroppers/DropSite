
const emailDOM = document.querySelector('.email')
const passwordDOM = document.querySelector('.password')
const userLoginForm = document.querySelector('.single-task-form')
//const editBtnDOM = document.querySelector('.task-edit-btn')
const formAlertDOM = document.querySelector('.form-alert')
const params = window.location.search

const id = new URLSearchParams(params).get('id')


userLoginForm.addEventListener('submit', async (e) => {
  e.preventDefault()
  clearTimeout();
  formAlertDOM.style.display = 'none'
  formAlertDOM.classList.remove('text-success')

  try {
    const email = emailDOM.value.toLowerCase();
    const password = passwordDOM.value;
    const { data } = await axios.post(`/api/v1/auth/login`, {
      email,
      password,
    })
    console.log(data.email)
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
  messageTimeout()
})

userLoginForm.addEventListener('reset', async (e) => {
  window.location = "./forgot.html";
})


messageTimeout = function(){
  setTimeout(() => {
    formAlertDOM.style.display = 'none'
    formAlertDOM.classList.remove('text-success')
  }, 3000)
}