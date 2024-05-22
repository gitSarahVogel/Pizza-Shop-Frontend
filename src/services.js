const loginService = async(user) => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: JSON.stringify(user),
    redirect: 'follow'
  };
  var res1;
  var a;
  
    try {
      const response = await fetch("http://localhost:7000/api/auth/login", requestOptions)
      a = response
      const data = await response.json();
      console.log(data.token);
      res1 = data
  }
  catch (error) {
      console.log("failed to fetch");
  }

  return new Promise((resolve, reject) => {
    resolve({
      loginStatus: a.status === 200? "ok"  :"unknown",
      data: { firstName: user.firstName, lastName: user.lastName, password: user.password, userToken: res1.token },
    });
  });
};
const RegisterService = async (user) => {
 
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: JSON.stringify(user),
    redirect: 'follow'
  };

  await fetch("http://localhost:7000/api/auth/register", requestOptions)
    .then(response => response.text())
    .then(result => {
      console.log(result)
    })
    .catch(error => console.log('error', error));
    
 
  console.log("registered!");
};

export { loginService, RegisterService };
