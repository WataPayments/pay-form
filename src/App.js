import React, { useState, useEffect, createContext } from "react";
import { Outlet } from "react-router-dom";
import ApiClient from "./ApiClient";
import { useParams, useNavigate } from "react-router-dom";

import "./index.css";

export const ThemeContext = createContext(null);
export const DataContext = createContext(null);

export default function App() {
  const [theme, setTheme] = useState("dark");
  const [transactionData, setTransactionData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [redirectUrl, setRedirectUrl] = useState("");
  const { uuid } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        const { transactionData, redirectUrl } =
          await ApiClient.fetchTransactionData(uuid);
        setTransactionData(transactionData);
        setRedirectUrl(redirectUrl);
        setLoading(false);

        if (transactionData.status !== "Created") {
          navigate(`/result-pay/${uuid}`);
        }
      } catch (error) {
        console.error("Error fetching transaction data:", error);
        if (error.response) {
          if (error.response.status === 404) {
            navigate("/404");
          } else if (error.response.status === 500) {
            navigate("/500");
          }
        }
      }
    };

    fetchTransaction();
  }, [uuid, navigate]);

  useEffect(() => {
    const osTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
    // setTheme("light");
    document.body.classList.add(osTheme);
    setTheme(osTheme);
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleThemeChange = (event) => {
      setTheme(event.matches ? "dark" : "light");
    };

    mediaQuery.addEventListener("change", handleThemeChange);

    return () => {
      mediaQuery.removeEventListener("change", handleThemeChange);
    };
  }, []);

  return (
    <ThemeContext.Provider value={theme}>
      <DataContext.Provider
        value={{
          transactionData,
          loading,
          setRedirectUrl,
          redirectUrl,
          setTransactionData,
        }}
      >
        <div className={`wrapper ${theme}`}>
          <Outlet />
        </div>
      </DataContext.Provider>
    </ThemeContext.Provider>
  );
}
