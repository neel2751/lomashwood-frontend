"use client";

import { useEffect, useState } from "react";

export default function TestPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log("Test page - Starting API test...");
    
    // Test with fetch
    fetch('/api/products?category=kitchen&featured=true&limit=8')
      .then(response => {
        console.log("Test page - Fetch response:", response);
        return response.json();
      })
      .then(data => {
        console.log("Test page - Fetch data:", data);
        setData(data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Test page - Fetch error:", error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>API Test Page</h1>
      
      {loading && <p>Loading...</p>}
      
      {error && (
        <div style={{ color: 'red' }}>
          <h2>Error:</h2>
          <pre>{error}</pre>
        </div>
      )}
      
      {data && (
        <div>
          <h2>API Response:</h2>
          <pre style={{ backgroundColor: '#f5f5f5', padding: '10px', overflow: 'auto' }}>
            {JSON.stringify(data, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
