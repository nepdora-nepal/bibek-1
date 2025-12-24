"use client";

import React, { useState, useRef, useEffect } from "react";
import { useDynamicFonts } from "@/src/providers/dynamic-font-provider";
import { useThemeQuery } from "@/src/hooks/owner-site/components/use-theme";
import { useTextSelection } from "@/src/contexts/text-selection-context";

interface EditableTextProps {
    value: string;
    onChange: (value: string) => void;
    onStyleChange?: (style: TextStyle) => void;
    as?: "p" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "div" | "span";
    className?: string;
    style?: React.CSSProperties;
    isEditable?: boolean;
    placeholder?: string;
    multiline?: boolean;
    useHeadingFont?: boolean;
    currentTextColor?: string;
    currentFontFamily?: string;
}

interface TextStyle {
    color?: string;
    fontFamily?: string;
    fontSize?: string;
}

const cn = (...classes: any[]) => classes.filter(Boolean).join(" ");

const getDefaultFontSize = (tag: string): string => {
    switch (tag) {
        case "h1":
            return "2.5rem";
        case "h2":
            return "2rem";
        case "h3":
            return "1.75rem";
        case "h4":
            return "1.5rem";
        case "h5":
            return "1.25rem";
        case "h6":
            return "1rem";
        case "p":
            return "1rem";
        case "div":
            return "1rem";
        case "span":
            return "inherit";
        default:
            return "1rem";
    }
};

const getDefaultLineHeight = (tag: string): string => {
    switch (tag) {
        case "h1":
            return "1.1";
        case "h2":
            return "1.2";
        case "h3":
            return "1.3";
        case "h4":
            return "1.3";
        case "h5":
            return "1.4";
        case "h6":
            return "1.4";
        default:
            return "";
    }
};

const getDefaultFontWeight = (tag: string): string => {
    switch (tag) {
        case "h1":
            return "bold";
        case "h2":
            return "bold";
        case "h3":
            return "bold";
        case "h4":
            return "600";
        case "h5":
            return "600";
        case "h6":
            return "600";
        default:
            return "normal";
    }
};

export const EditableText: React.FC<EditableTextProps> = ({
    value,
    onChange,
    onStyleChange,
    as: Tag = "p",
    className,
    style,
    isEditable = false,
    placeholder = "Click to edit...",
    multiline = false,
    useHeadingFont = false,
    currentTextColor,
    currentFontFamily,
}) => {
    const { bodyFont, headingFont } = useDynamicFonts();
    const { data: themeResponse } = useThemeQuery();
    const theme = themeResponse?.data?.[0]?.data?.theme;

    const { setSelection } = useTextSelection();

    const isHeading = ["h1", "h2", "h3", "h4", "h5", "h6"].includes(Tag);
    const defaultFont = useHeadingFont || isHeading ? headingFont : bodyFont;

    const [selectedFont, setSelectedFont] = useState(
        currentFontFamily || style?.fontFamily || defaultFont
    );

    const [selectedFontSize, setSelectedFontSize] = useState(
        style?.fontSize || getDefaultFontSize(Tag)
    );

    const textRef = useRef<HTMLElement>(null);

    useEffect(() => {
        if (!currentFontFamily && !style?.fontFamily) {
            setSelectedFont(defaultFont);
        }
    }, [defaultFont, currentFontFamily, style?.fontFamily]);

    useEffect(() => {
        if (!style?.fontSize) {
            setSelectedFontSize(getDefaultFontSize(Tag));
        }
    }, [Tag, style?.fontSize]);

    useEffect(() => {
        if (textRef.current && value) {
            if (textRef.current.innerHTML !== value) {
                textRef.current.innerHTML = value;
            }
        }
    }, [value]);

    const handleTextChange = (e: React.FocusEvent<HTMLElement>) => {
        const newValue = e.target.innerHTML;
        if (value !== newValue) {
            onChange(newValue);
        }
    };

    const handleTextSelect = () => {
        if (!isEditable) return;

        const selection = window.getSelection();
        if (selection && selection.toString().trim().length > 0) {
            const range = selection.getRangeAt(0);

            setSelection({
                text: selection.toString(),
                range: range,
                element: textRef.current || undefined,
            });
        } else {
            setSelection(null);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
        if (!isEditable) return;

        if (e.ctrlKey || e.metaKey) {
            switch (e.key.toLowerCase()) {
                case "b":
                    e.preventDefault();
                    document.execCommand("bold", false);
                    break;
                case "i":
                    e.preventDefault();
                    document.execCommand("italic", false);
                    break;
                case "u":
                    e.preventDefault();
                    document.execCommand("underline", false);
                    break;
            }
        }

        if (!multiline && e.key === "Enter") {
            e.preventDefault();
            e.currentTarget.blur();
        }

        if (e.key === "Escape") {
            e.currentTarget.blur();
            setSelection(null);
            window.getSelection()?.removeAllRanges();
        }
    };

    const commonProps = {
        ref: textRef,
        contentEditable: isEditable,
        onBlur: handleTextChange,
        onMouseUp: handleTextSelect,
        onKeyDown: handleKeyDown,
        onKeyUp: handleTextSelect,
        suppressContentEditableWarning: true,
        "data-placeholder": !value ? placeholder : undefined,
        className: cn(
            className,
            isEditable && [
                "cursor-text",
                "hover:bg-blue-50/30 transition-colors rounded px-2 py-1 relative group",
                "min-h-[1.5em]",
                "empty:before:content-[attr(data-placeholder)] empty:before:text-gray-400",
                "empty:before:pointer-events-none empty:before:absolute",
            ]
        ),
        style: {
            position: "relative" as const,
            fontFamily: `var(${isHeading || useHeadingFont ? "--font-heading" : "--font-body"}, ${selectedFont})`,
            fontSize: selectedFontSize,
            lineHeight: getDefaultLineHeight(Tag),
            fontWeight: getDefaultFontWeight(Tag),
            ...style,
        },
    };

    return (
        <div className="relative inline-block w-full">
            {React.createElement(Tag, commonProps)}
        </div>
    );
};
