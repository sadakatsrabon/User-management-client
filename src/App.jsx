import { useEffect, useState } from 'react'
import './App.css'

function App() {

  const [user, setUser] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5100/user')
      .then(res => res.json())
      .then(data => setUser(data))
    // console.log(user);


  }, [])

  const handleAddUser = event => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const newUser = { name, email }
    console.log(user);
    fetch('http://localhost:5100/user', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(newUser)
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        const newUsers = [...user, data]
        setUser(newUsers);

        form.reset();
      })
  }

  return (
    <>
      <h1>Users management system</h1>
      <h3>numbers of users = {user.length}</h3>
      <form onSubmit={handleAddUser}>
        <input type="text" name="name" id="" /> <br />
        <input type="email" name="email" id="" /> <br />
        <input type="submit" value="Add User" />
      </form>
      <div>
        {
          user.map(sUser => <p key={sUser.id}>{sUser.id}: {sUser.name} : {sUser.email}</p>)
        }
      </div>
    </>
  )
}

export default App
