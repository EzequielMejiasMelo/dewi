const logoutButton = $('#logoutButton');

const logoutHandler = async (event) => {
      const response = await fetch('/api/user/logout', {
        method: 'POST',
      });
  
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert(response.statusText);
      }
    };

logoutButton.on('click', logoutHandler);