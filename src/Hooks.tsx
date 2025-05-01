import { useState } from "react";
import { GenderData } from "./Types";

export function useGenderize() {
  const [name, setName] = useState<string>("");
  const [genderData, setGenderData] = useState<GenderData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchRequest = async (nameToRequest: string) => {
    if (!nameToRequest.trim()) {
      setError("Ошибка: пустое имя");
      return setName("");
    }
    setError(null);
    setLoading(true);

    try {
      const response = await fetch(
        `https://api.genderize.io?name=${nameToRequest}`
      );
      const data = await response.json();
      if (data.gender) {
        setGenderData(data);
      } else {
        setError("Error, not found");
        setGenderData(null);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ошибка");
    } finally {
      setLoading(false);
      setName("");
    }
  };
  return {
    name,
    setName,
    genderData,
    error,
    loading,
    fetchRequest,
  };
}
