import { useState, useEffect } from "react";

interface UseFetchProps {
  method?: string; // Made optional with default value
  url: string;
  body?: Record<string, any>; // More flexible body type
  headers?: Record<string, string>; // Added headers option
}

export const useFetch = (props: UseFetchProps) => {
  const { method = "GET", url, body, headers = {} } = props;
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null); // Added error state

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const defaultHeaders = {
          "Content-Type": "application/json",
          ...headers, // Allow custom headers to override defaults
        };

        const options: RequestInit = {
          method,
          headers: defaultHeaders,
        };

        if (body && method !== "GET") {
          options.body = JSON.stringify(body);
        }

        const res = await fetch(
          `http://localhost:8000/quizgenai/${url}`,
          options
        );

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        setData(data);
      } catch (err) {
        setError(err as Error);
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, method, body, headers]); // Added dependencies

  return { data, loading, error }; // Return error state as well
};
