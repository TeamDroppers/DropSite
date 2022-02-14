
const emailDOM = document.querySelector('.email')
const passwordDOM = document.querySelector('.password')
const userResetForm = document.querySelector('.single-task-form')
//const editBtnDOM = document.querySelector('.task-edit-btn')
const formAlertDOM = document.querySelector('.form-alert')
const params = window.location.search

const id = new URLSearchParams(params).get('id')

userResetForm.addEventListener('submit', async (e) => {
  e.preventDefault()
  clearTimeout()
  formAlertDOM.style.display = 'none'
  formAlertDOM.classList.remove('text-success')

  try {
    const email = emailDOM.value.toLowerCase();
    const password = passwordDOM.value;
   
    const { data } = await axios.patch(`/api/v1/auth/reset/${id}`, {
      email,
      password,
    })
    if(!data.reset)
    {
      throw data
    }
    formAlertDOM.style.display = 'block'
    formAlertDOM.innerHTML = 'Password reset!'
    formAlertDOM.style.color = "green";
    document.getElementById('submit-button').hidden = true;
    successTimeout()
    
  } catch (error) {
    console.error(error)
    formAlertDOM.style.display = 'block'
    formAlertDOM.innerHTML = error  
    errorTimeout()
  }

})

errorTimeout = function(){
  setTimeout(() => {
    formAlertDOM.style.display = 'none'
    formAlertDOM.classList.remove('text-success')
  }, 3000)
}

successTimeout = function(){
  setTimeout(() => {
    formAlertDOM.style.display = 'none'
    formAlertDOM.classList.remove('text-success')
    window.location = '/login.html'
  }, 3000)
}