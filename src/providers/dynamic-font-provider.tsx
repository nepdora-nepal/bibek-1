"use client";
import React, { createContext, useContext } from "react";

interface DynamicFontsContextType {
    bodyFont: string;
    headingFont: string;
}

const DynamicFontsContext = createContext<DynamicFontsContextType>({
    bodyFont: "Inter",
    headingFont: "Inter",
});

export const DynamicFontsProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    return (
        <DynamicFontsContext.Provider
            value={{ bodyFont: "Inter", headingFont: "Inter" }}
        >
            {children}
        </DynamicFontsContext.Provider>
    );
};

export const useDynamicFonts = () => useContext(DynamicFontsContext);
