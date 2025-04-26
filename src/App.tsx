import React, { useState } from 'react';


function App() {
  const [name, setName] = useState('')
  const [genderData, setGenderData] = useState<GenderData | null>(null);
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  
  interface GenderData{
    name: string;
    gender: string;
  }


  const fetchRequest = async () => {

    setError(null)
    setLoading(true)

    try{
      const response = await fetch(`https://api.genderize.io?name=${encodeURIComponent(name)}`); 
      const data = await response.json()
      if(data.gender){
        setGenderData(data)
        
      }else{
        setError('Error, not found')
        setGenderData(null);
      }
    } catch(err){
      setError(err instanceof Error? err.message:'Ошибка')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
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
          {loading? 'Определяем пол...': 'Определить пол'}
        </button>
      </form>

      {error&& <p>{error}</p>}

      {genderData&&(
        <div>
        <h2>Результаты</h2>
        <p>Name: {genderData.name}</p>
        <p>Gender: {genderData.gender}</p>
        </div>
      )}
      

    </div>
   
   
  )
}

export default App







