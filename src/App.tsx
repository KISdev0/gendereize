import React, { useState, useEffect } from 'react';


function App() {
  const [name, setName] = useState('')
  const [genderData, setGenderData] = useState(null);
  const [error, setError] = useState(null)
  


  const fetchRequest = async () => {

    try{
      const response = await fetch('https://api.genderize.io?name=peter'); 
      const data = await response.json()
      if(data.gender){
        setGenderData(data)
        
      }else{
        setGenderData(null);
      }
    } catch(err){
      setError('Ошибка')
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchRequest()
  }
  

  return (
    <div>
      <h1>Genderize</h1>

      <form onSubmit={handleSubmit}>
        <input 
        value={name}
        placeholder='Введите имя'
        type='text'
        onChange={(e) => setName(e.target.value)}
        />
        <button 
        type='submit'>
          Определить
        </button>
      </form>
    </div>
  
  )
}

export default App







