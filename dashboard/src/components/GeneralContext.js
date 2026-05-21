import React, { useState } from "react";

const GeneralContext = React.createContext({
  openBuyWindow: (uid) => {},
  openSellWindow: (uid) => {},
  closeWindow: () => {},
  user: null,
  setUser: () => {},
  refetchTrigger: 0,
  triggerRefetch: () => {},
});

export const GeneralContextProvider = (props) => {
  const [isBuyWindowOpen, setIsBuyWindowOpen] = useState(false);
  const [isSellWindowOpen, setIsSellWindowOpen] = useState(false);
  const [selectedStock, setSelectedStock] = useState("");
  const [user, setUser] = useState(null);
  const [refetchTrigger, setRefetchTrigger] = useState(0);

  const triggerRefetch = () => {
    setRefetchTrigger(prev => prev + 1);
  };

  const handleOpenBuyWindow = (uid) => {
    setIsBuyWindowOpen(true);
    setIsSellWindowOpen(false);
    setSelectedStock(uid);
  };

  const handleOpenSellWindow = (uid) => {
    setIsSellWindowOpen(true);
    setIsBuyWindowOpen(false);
    setSelectedStock(uid);
  };

  const handleCloseWindow = () => {
    setIsBuyWindowOpen(false);
    setIsSellWindowOpen(false);
    setSelectedStock("");
  };

  return (
    <GeneralContext.Provider
      value={{
        openBuyWindow: handleOpenBuyWindow,
        openSellWindow: handleOpenSellWindow,
        closeWindow: handleCloseWindow,
        isBuyWindowOpen,
        isSellWindowOpen,
        selectedStock,
        user,
        setUser,
        refetchTrigger,
        triggerRefetch,
      }}
    >
      {props.children}
    </GeneralContext.Provider>
  );
};

export default GeneralContext;
