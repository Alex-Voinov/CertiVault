

export const postDataSend = (e, path, data) => {
    e.preventDefault();
    fetch(`http://localhost:3000/api/${path}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => {
      console.log(response)
    })
    .catch(error => {
      console.log(error)
    });
  };