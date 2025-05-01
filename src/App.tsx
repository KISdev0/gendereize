import React from "react";
import { useGenderize } from "./Hooks";

function App() {
  const { name, setName, genderData, error, loading, fetchRequest } =
    useGenderize();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetchRequest(name);
    setName("");
  };

  return (
    <div>
      <h1>Genderize</h1>

      <form onSubmit={handleSubmit}>
        <input
          value={name}
          placeholder="Введите имя"
          type="text"
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit">
          {loading ? "Определяем пол..." : "Определить пол"}
        </button>
      </form>

      {error && <p>{error}</p>}

      {genderData && (
        <div>
          <h2>Результаты</h2>
          <p>Имя: {genderData.name}</p>
          <p>Пол: {genderData.gender === "male" ? "мужской" : "женский"}</p>
        </div>
      )}
    </div>
  );
}

export default App;
