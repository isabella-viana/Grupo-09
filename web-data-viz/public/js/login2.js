const container = document.querySelector('.container')
const registerBtn = document.querySelector('.cadastre-btn')
const loginBtn = document.querySelector('.login-btn')


registerBtn.addEventListener('click', () => {
    container.classList.add('active');
})

loginBtn.addEventListener('click', () => {
    container.classList.remove('active');
})