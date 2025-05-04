import { useEffect, useState } from 'react';

function useFetch(url, options = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResource = async () => {
      setLoading(true);
      try {
        // URL’ni backend API’ga o‘zgartiring:
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
  }, [url]); // faqat URL o‘zgarganda qayta chaqiriladi

  return { data, loading, error };
}

export default useFetch;
