import { createContext, useEffect, useState } from "react";
import ApiClient from "../ApiClient";

export const BankListContext = createContext([]);

export const BanksProvider = ({ children }) => {
  const [banksList, setBanksList] = useState([]);

  useEffect(() => {
    const fetchBanks = async () => {
      const list = await ApiClient.fetchBanksList();

      setBanksList(list);
    };

    fetchBanks();
  }, []);

  return (
    <BankListContext.Provider value={{ banksList }}>
      {children}
    </BankListContext.Provider>
  );
};
