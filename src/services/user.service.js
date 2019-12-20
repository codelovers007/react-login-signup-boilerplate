import { authHeader } from '../helpers/auth-header';
import { configVariable } from '../lib/config';
export const userService = {
  login,
  register,
  logout,
  getAll
};

function login(user) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': configVariable.authToken },
    body: JSON.stringify(user)
  };

  return fetch(`${configVariable.apiUrl}/users/login`, requestOptions)
  .then(handleResponse)
  .then(user => {
    if (user) {
      user.authdata = window.btoa(user.email + ':' + user.password);
      localStorage.setItem('user', JSON.stringify(user));
    }

    return user;
  });
}

function register(user) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': configVariable.authToken },
    body: JSON.stringify(user)
  };

  return fetch(`${configVariable.apiUrl}/users`, requestOptions)
  .then(handleResponse)
  .then(res_user => {
    // login successful if there's a user in the response
    if (res_user) {
      // store user details and basic auth credentials in local storage 
      // to keep user logged in between page refreshes
      res_user.authdata = window.btoa(user.email + ':' + user.password);
      localStorage.setItem('user', JSON.stringify(res_user));
    }
    return res_user;
  });
}


function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem('user');
  localStorage.removeItem('users');
}

function getAll() {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  };

  return fetch(`${configVariable.apiUrl}/users`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
  return response.text().then(text => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401) {
          // auto logout if 401 response returned from api
          logout();
          window.location.reload(true);
      }

      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}