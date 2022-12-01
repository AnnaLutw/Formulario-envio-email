import React, { useState } from 'react';
import './App.css';
import axios from 'axios';
export default function App() {
  const [campos, setCampo] = useState({
    nome: '',
    email: '',
    mensagem: '',
    anexo: ''
  });
  function handleInputChange(event) {
    if (event.target.name === "anexo")
      campos[event.target.name] = event.target.files[0];
    else
      campos[event.target.name] = event.target.value;
    setCampo(campos);
  }
  function handleFormSubmit(event) {
    event.preventDefault();
    console.log(campos);
    send(campos);
  }
  function send() {
    const formData = new FormData();
    Object.keys(campos).forEach(key => formData.append(key, campos[key]));
    //alert(campos.email);
    axios.post('http://localhost:3030/send',
      formData,
      {
        headers: {
          "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
        }
      })
      .then(response => { console.log(response.data); })
      
  }
  return (
    <main>
      <div className="container">
        <form onSubmit={handleFormSubmit}>
          <label htmlFor="nome">Nome</label>
          <input type="text" id="nome" name="nome" placeholder="Digite o nome" 
onChange={handleInputChange} />
          <label htmlFor="email">E-mail</label>
          <input type="text" id="email" name="email" placeholder="E-mail do 
destinatário" onChange={handleInputChange} />
          <label htmlFor="mensagem">Mensagem</label>
          <textarea id="mensagem" name="mensagem" placeholder="Mensagem..." 
className="textArea" onChange={handleInputChange}></textarea>
          <label htmlFor="anexo">Anexo</label>
          <input type="file" id="anexo" name="anexo" 
onChange={handleInputChange} />
          <input type="submit" value="Enviar" />
        </form>
      </div>
    </main>
  )
}