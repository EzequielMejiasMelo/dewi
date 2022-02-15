// Send the username and password to the API. 
// If successful, the user is logged into their account.
const loginFormHandler = async (event) => {
  event.preventDefault();
  console.log('Hi');
  const username = document.querySelector('#login-name').value.trim();
  const password = document.querySelector('#login-pass').value.trim();

  if (username && password) {
    const response = await fetch('/api/user/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/shelf');
    } else {
      alert(response.statusText);
    }
  }
};

document
  .querySelector('#login-form')
  .addEventListener('submit', loginFormHandler);
