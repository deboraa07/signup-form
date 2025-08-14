import "./style.css";
import { useEffect, useState, useRef } from "react";
import Trash from "../../assets/trash.png";
import api from '../../services/api';

function Home() {
  const [users,setUsers] = useState([]);

  const inputName = useRef();
  const inputEmail = useRef();
  const inputOccupation = useRef();

  async function getUsers(){
     const usersFromApi = await api.get('/usuarios');

     setUsers(usersFromApi.data);
  }

  async function createUsers(){
    await api.post('/usuarios', {
      name: inputName.current.value,
      email: inputEmail.current.value,
      occupation: inputOccupation.current.value
    });
    getUsers();
 }

 async function deleteUsers(id){
  await api.delete(`/usuarios/${id}`);
  getUsers();
}

  useEffect(() => {
    getUsers()
  }, [])

  return (
    <div className="container">
      <form>
        <h1>Cadastro de usuários</h1>
        <input  placeholder="Nome" type="text" name="Nome" ref={inputName} />
        <input placeholder="Email" type="text" name="Email" ref={inputEmail} />
        <input placeholder="Profissão" type="text" name="Profissão" ref={inputOccupation} />
        <button type="button" onClick={createUsers}>Cadastrar</button>
      </form>

      {users.map((user) => (
        <div key={user.id} className='card'>
          <div>
            <p>Nome: <span>{user.name}</span></p>
            <p>Email: <span>{user.email}</span> </p>
            <p>Profissão: <span>{user.occupation}</span></p>
          </div>
          <button onClick={() => deleteUsers(user.id)}>
            <img src={Trash} />
          </button>
        </div>
      ))}
      </div>
  );
}

export default Home;
