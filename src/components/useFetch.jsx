// src/components/useFetch.jsx
import { useEffect, useState } from 'react';

function useFetch(url, options = {}) {
  const [data, setData]     = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  useEffect(() => {
    const fetchResource = async () => {
      setLoading(true);
      try {
        const response = await fetch(url, options);
        if (!response.ok) throw new Error(`HTTP xatolik: ${response.status}`);
        const json = await response.json();
        setData(json);
      } catch (err) {
        console.error('Xatolik:', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchResource();
  }, [url, JSON.stringify(options)]); // agar options ham o‘zgarishi mumkin bo‘lsa

  return { data, loading, error };
}

export default useFetch;
