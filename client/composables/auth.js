import { ref } from 'vue';

const isLoggedIn = ref(Boolean(localStorage.getItem('accessToken')));
const userName = ref( localStorage.getItem('userName'))
const login = () => {
//   isLoggedIn.value = localStorage.setItem('AccessToken', token);
  isLoggedIn.value = true
};

const logout = () => {
  isLoggedIn.value = false;
};

const setUserName = (name) =>{
    userName.value = name
}

export { isLoggedIn, login, logout, userName, setUserName};