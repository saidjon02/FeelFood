// src/components/useFetch.jsx
import { useEffect, useState } from 'react';

// URL orqali ma'lumot olib keluvchi maxsus hook
function useFetch(url, options = {}) {
  const [data, setData] = useState(null);        // kelgan ma'lumot
  const [loading, setLoading] = useState(true);  // yuklanayotganini bildiradi
  const [error, setError] = useState(null);      // xatolik bo‘lsa, shu yerda saqlanadi

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(url, options);     // ma'lumot olib kelamiz
        if (!res.ok) throw new Error(`Xatolik: ${res.status}`);
        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error('Xatolik:', err.message);
        setError(err);
      } finally {
        setLoading(false); // doim oxirida: yuklanish tugadi
      }
    };

    fetchData();
  }, [url, JSON.stringify(options)]); // url yoki options o‘zgarsa, qaytadan chaqiriladi

  return { data, loading, error }; // foydalanuvchi shu 3 narsani oladi
}

export default useFetch;
