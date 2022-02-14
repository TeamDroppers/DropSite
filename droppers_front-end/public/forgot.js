
const emailDOM = document.querySelector('.email')
const userLoginForm = document.querySelector('.single-task-form')
const formAlertDOM = document.querySelector('.form-alert')
const params = window.location.search

const id = new URLSearchParams(params).get('id')
const url = window.location.protocol + '' + window.location.host + '' + '/reset.html'

userLoginForm.addEventListener('submit', async (e) => {
  e.preventDefault()
  try {
    const email = emailDOM.value.toLowerCase();
    const { data } = await axios.post(`/api/v1/auth/forgot`, {
      email,
      url,
    })

    if(!data.reset)
    {
      throw data
    }
    formAlertDOM.style.display = 'block'
    formAlertDOM.innerHTML = 'An email has been sent.'
    formAlertDOM.style.color = "green";
    document.getElementById('submit-button').hidden = true;
    
  } catch (error) {
    console.error(error)
    formAlertDOM.style.display = 'block'
    formAlertDOM.innerHTML = error
    messageTimeout()
  }
})


messageTimeout = function(){
  setTimeout(() => {
    formAlertDOM.style.display = 'none'
    formAlertDOM.classList.remove('text-success')
  }, 3000)
}