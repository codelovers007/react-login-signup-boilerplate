export function authHeader() {
  // return authorization header with basic auth credentials
  let user = JSON.parse(localStorage.getItem('user'));

  if (user && user.access_token) {
      return { 'Authorization': 'Basic ' + user.access_token };
  } else {
      return {};
  }
}