// Send the username and password to the API. 
// If successful, the user is logged in with the new information.
const signupFormHandler = async (event) => {
  event.preventDefault();
  console.log('Hello');
  const username = document.querySelector('#signup-name').value.trim();
  const password = document.querySelector('#signup-pass').value.trim();
  if (username && password) {
    const response = await fetch('/api/user/', {
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

console.log('on page');
document
  .querySelector('#signup-form')
  .addEventListener('submit', signupFormHandler);
