import React, { createContext, useState } from "react";

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
    const [isActivate, setIsActivate] = useState(false);

    return (
        <OrderContext.Provider value={{ isActivate, setIsActivate }}>
            {children}
        </OrderContext.Provider>
    );
};

export default OrderContext;
