// src/components/useFetch.jsx
import { useEffect, useState } from 'react';

// URL orqali ma'lumot olib keluvchi maxsus hook
function useFetch(url, options = {}) {
  const [data, setData] = useState(null);        // kelgan ma'lumot
  const [error, setError] = useState(null);      // xatolik bo'lsa, shu yerda saqlanadi

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(url, options);     // ma'lumot olib kelamiz
        if (!res.ok) throw new Error(`Xatolik: ${res.status}`);
        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error('Xatolik:', err.message);
        setError(err);
      }
    };

    fetchData();
  }, [url, JSON.stringify(options)]); // url yoki options o'zgarsa, qaytadan chaqiriladi

  return { data, error }; // foydalanuvchi shu 2 narsani oladi
}

export default useFetch;
