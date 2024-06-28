import { BottomSheet } from "../bottom-sheet/BottomSheet";
import "./styles.css";
import SbpLogoDark from "../../Images/sbp-logo-inline-dark.svg";
import SbpLogoLight from "../../Images/sbp-logo-inline-light.svg";

import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { BankListContext } from "../../hooks/banksListProvider";
import { DataContext, ThemeContext } from "../../App";

import SearchIconDark from "../../Images/search-icon-dark.svg";
import SearchIconLight from "../../Images/search-icon-light.svg";

export const BanksList = ({ isOpen, onClose }) => {
  const [searchFilter, setSearchFilter] = useState("");
  const [showDivider, setShowDivider] = useState(false);
  const list = useRef(null);
  const { banksList } = useContext(BankListContext);
  const { transactionData } = useContext(DataContext);

  const theme = useContext(ThemeContext);

  const filteredBanks = useMemo(() => {
    return banksList.filter((item) =>
      item.bankName.toLowerCase().includes(searchFilter.toLowerCase())
    );
  }, [banksList, searchFilter]);

  const onBankClick = (bank) => {
    let url = "";
    if (bank.isWebClientActive && bank.webClientUrl) {
      const params = transactionData.sbp_url.split("https://qr.nspk.ru");
      url = bank.webClientUrl + params[1];
    } else {
      url = transactionData.sbp_url.replace("https", bank.schema);
    }
    window.open(url);
  };

  useEffect(() => {
    if (list.current) {
      list.current.addEventListener("scroll", (event) => {
        setShowDivider(event.currentTarget.scrollTop !== 0);
      });
    }
  });

  return (
    <BottomSheet isOpen={isOpen} onClose={onClose}>
      <div className="banks-list">
        <div className="header">
          <img
            src={theme === "dark" ? SbpLogoDark : SbpLogoLight}
            alt="Логотип СБП"
          />
          <div>Выберите банк для подверждения оплаты</div>
        </div>
        <div className="search-container">
          <img
            className="search-icon"
            src={theme === "dark" ? SearchIconDark : SearchIconLight}
            alt="Поиск"
          />
          <input
            className="search-input"
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            placeholder="Найти свой банк"
          />
        </div>

        {showDivider && <div className="divider"></div>}
        <div className="list" ref={list}>
          {filteredBanks.map((bank, index) => (
            <div
              className="bank-item"
              key={index + bank.bankName}
              onClick={() => onBankClick(bank)}
            >
              <img src={bank.logoURL} alt="" />
              <div>{bank.bankName}</div>
            </div>
          ))}
        </div>
      </div>
    </BottomSheet>
  );
};
