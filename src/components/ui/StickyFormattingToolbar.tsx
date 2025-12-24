"use client";

import React, { useState, useEffect, useRef } from "react";
import {
    Bold,
    Italic,
    Underline,
    Strikethrough,
    Palette,
    Type,
    X,
    Minus,
    Plus,
    Highlighter,
    AlignLeft,
    AlignCenter,
    AlignRight,
    AlignJustify,
    ChevronDown,
} from "lucide-react";
import { useTextSelection } from "@/src/contexts/text-selection-context";
import { useThemeQuery } from "@/src/hooks/owner-site/components/use-theme";

export const StickyFormattingToolbar: React.FC = () => {
    const {
        selection,
        clearSelection,
        applyFormatting,
        applyColor,
        applyFontSize,
    } = useTextSelection();

    const [showColorPicker, setShowColorPicker] = useState(false);
    const [showHighlightPicker, setShowHighlightPicker] = useState(false);
    const [showFontSizePicker, setShowFontSizePicker] = useState(false);
    const [showFontPicker, setShowFontPicker] = useState(false);
    const [showAlignPicker, setShowAlignPicker] = useState(false);

    const [selectionColor, setSelectionColor] = useState("#000000");
    const [selectionHighlight, setSelectionHighlight] = useState("#FFFF00");
    const [selectionFontSize, setSelectionFontSize] = useState("16px");
    const [selectedFont, setSelectedFont] = useState("Inter");

    const toolbarRef = useRef<HTMLDivElement>(null);

    const { data: themeResponse } = useThemeQuery();
    const theme = themeResponse?.data?.[0]?.data?.theme;

    const quickColors = [
        theme?.colors?.text || "#0F172A",
        theme?.colors?.primary || "#3B82F6",
        theme?.colors?.secondary || "#F59E0B",
        "#DC2626",
        "#10B981",
        "#9333EA",
        "#CA8A04",
        "#DB2777",
        "#0891B2",
        "#65A30D",
        "#EA580C",
        "#475569",
    ];

    const quickHighlights = [
        "#FFFF00",
        "#90EE90",
        "#FFB6C1",
        "#87CEEB",
        "#FFD700",
        "#FFA500",
        "#DDA0DD",
        "#F0E68C",
        "#98FB98",
        "#E6E6FA",
        "#F5F5DC",
    ];

    const quickFontSizes = [
        "10px",
        "12px",
        "14px",
        "16px",
        "18px",
        "20px",
        "24px",
        "28px",
        "32px",
        "36px",
        "48px",
        "60px",
    ];

    const fontOptions = [
        "Inter",
        "Poppins",
        "Roboto",
        "Arial",
        "Georgia",
        "Times New Roman",
        "Courier New",
        "Verdana",
        "Helvetica",
        "Comic Sans MS",
    ];

    const applyHighlight = (color: string) => {
        if (selection?.range) {
            const sel = window.getSelection();
            if (sel) {
                sel.removeAllRanges();
                sel.addRange(selection.range.cloneRange());

                try {
                    document.execCommand("styleWithCSS", false, "true");
                    document.execCommand("backColor", false, color);

                    if (sel.rangeCount > 0) {
                        const range = sel.getRangeAt(0);
                        const span = document.createElement("span");
                        span.style.backgroundColor = color;

                        if (!range.collapsed) {
                            try {
                                range.surroundContents(span);
                            } catch (e) {
                                const content = range.extractContents();
                                span.appendChild(content);
                                range.insertNode(span);
                            }
                        }
                    }
                } catch (error) {
                    console.warn("Highlight application failed:", error);
                    document.execCommand("backColor", false, color);
                }

                sel.removeAllRanges();
            }
        }
        setShowHighlightPicker(false);
    };

    const applyFontFamily = (font: string) => {
        if (selection?.range) {
            const sel = window.getSelection();
            sel?.removeAllRanges();
            sel?.addRange(selection.range.cloneRange());

            try {
                document.execCommand("fontName", false, font);
                setSelectedFont(font);
            } catch (error) {
                console.warn("Font family application failed:", error);
                document.execCommand("styleWithCSS", false, "true");
                document.execCommand("fontName", false, font);
            }

            sel?.removeAllRanges();
        }
        setShowFontPicker(false);
    };

    const applyAlignment = (
        alignment: "left" | "center" | "right" | "justify"
    ) => {
        const alignCommands = {
            left: "justifyLeft",
            center: "justifyCenter",
            right: "justifyRight",
            justify: "justifyFull",
        };

        try {
            document.execCommand(alignCommands[alignment], false);
        } catch (error) {
            console.warn(`Alignment ${alignment} failed:`, error);
        }
        setShowAlignPicker(false);
    };

    const handleFormatting = (format: string) => {
        if (selection?.range) {
            const sel = window.getSelection();
            sel?.removeAllRanges();
            sel?.addRange(selection.range.cloneRange());

            try {
                document.execCommand(format, false);
            } catch (error) {
                console.warn(`Formatting ${format} failed:`, error);
            }

            sel?.removeAllRanges();
        }
    };

    const handleColorApply = (color: string) => {
        if (selection?.range) {
            const sel = window.getSelection();
            sel?.removeAllRanges();
            sel?.addRange(selection.range.cloneRange());

            try {
                document.execCommand("styleWithCSS", false, "true");
                document.execCommand("foreColor", false, color);
                setSelectionColor(color);
            } catch (error) {
                console.warn("Color application failed:", error);
                document.execCommand("foreColor", false, color);
            }

            sel?.removeAllRanges();
        }
        setShowColorPicker(false);
    };

    const handleFontSizeApply = (size: string) => {
        if (selection?.range) {
            const sel = window.getSelection();
            if (!sel) return;
            sel?.removeAllRanges();
            sel?.addRange(selection.range.cloneRange());

            try {
                document.execCommand("fontSize", false, "7");
                document.execCommand("styleWithCSS", false, "true");

                const span = document.createElement("span");
                span.style.fontSize = size;

                const range = sel.getRangeAt(0);
                if (!range.collapsed) {
                    try {
                        const content = range.extractContents();
                        span.appendChild(content);
                        range.insertNode(span);
                    } catch (e) {
                        document.execCommand("fontSize", false, "7");
                    }
                }

                setSelectionFontSize(size);
            } catch (error) {
                console.warn("Font size application failed:", error);
                applyFontSize(size);
            }

            sel?.removeAllRanges();
        }
        setShowFontSizePicker(false);
    };

    useEffect(() => {
        if (!selection) {
            setShowColorPicker(false);
            setShowHighlightPicker(false);
            setShowFontSizePicker(false);
            setShowFontPicker(false);
            setShowAlignPicker(false);
        }
    }, [selection]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                toolbarRef.current &&
                !toolbarRef.current.contains(event.target as Node)
            ) {
                setShowColorPicker(false);
                setShowHighlightPicker(false);
                setShowFontSizePicker(false);
                setShowFontPicker(false);
                setShowAlignPicker(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const closeAllDropdowns = () => {
        setShowColorPicker(false);
        setShowHighlightPicker(false);
        setShowFontSizePicker(false);
        setShowFontPicker(false);
        setShowAlignPicker(false);
    };

    if (!selection) return null;

    return (
        <div
            ref={toolbarRef}
            className="animate-in slide-in-from-top-2 fixed top-20 left-1/2 z-[100] -translate-x-1/2 border border-gray-300 bg-white shadow-xl duration-200 rounded-lg"
        >
            <div className="flex items-center gap-1 px-3 py-2">
                <div className="relative">
                    <button
                        onClick={e => {
                            e.stopPropagation();
                            closeAllDropdowns();
                            setShowFontPicker(!showFontPicker);
                        }}
                        className="flex min-w-[100px] items-center justify-between gap-1 rounded border border-gray-300 px-2 py-1.5 text-xs font-medium text-gray-700 transition-colors hover:bg-gray-100"
                        title="Font Family"
                    >
                        <span
                            className="max-w-[70px] truncate"
                            style={{ fontFamily: selectedFont }}
                        >
                            {selectedFont}
                        </span>
                        <ChevronDown className="h-3 w-3" />
                    </button>

                    {showFontPicker && (
                        <div className="absolute top-full left-0 z-50 mt-1 max-h-60 w-48 overflow-y-auto rounded-lg border border-gray-200 bg-white shadow-lg">
                            {fontOptions.map(font => (
                                <button
                                    key={font}
                                    onClick={() => applyFontFamily(font)}
                                    className="block w-full px-4 py-2 text-left text-sm transition-colors hover:bg-blue-50"
                                    style={{ fontFamily: font }}
                                >
                                    {font}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                <div className="h-6 w-px bg-gray-300 mx-1" />

                <div className="flex items-center gap-0.5">
                    <button
                        onClick={() => {
                            const current = parseInt(selectionFontSize) || 16;
                            if (current > 8) {
                                const newSize = `${current - 2}px`;
                                setSelectionFontSize(newSize);
                                handleFontSizeApply(newSize);
                            }
                        }}
                        className="rounded border border-gray-300 p-1.5 transition-colors hover:bg-gray-100"
                        title="Decrease font size"
                    >
                        <Minus className="h-4 w-4 text-gray-700" />
                    </button>

                    <button
                        onClick={e => {
                            e.stopPropagation();
                            closeAllDropdowns();
                            setShowFontSizePicker(!showFontSizePicker);
                        }}
                        className="min-w-[40px] rounded border border-gray-300 px-1 py-1.5 text-xs font-medium text-gray-700 transition-colors hover:bg-gray-100"
                        title="Font Size"
                    >
                        {parseInt(selectionFontSize) || 16}
                    </button>

                    <button
                        onClick={() => {
                            const current = parseInt(selectionFontSize) || 16;
                            if (current < 96) {
                                const newSize = `${current + 2}px`;
                                setSelectionFontSize(newSize);
                                handleFontSizeApply(newSize);
                            }
                        }}
                        className="rounded border border-gray-300 p-1.5 transition-colors hover:bg-gray-100"
                        title="Increase font size"
                    >
                        <Plus className="h-4 w-4 text-gray-700" />
                    </button>
                </div>

                {showFontSizePicker && (
                    <div className="absolute top-full left-32 z-50 mt-1 max-h-60 w-24 overflow-y-auto rounded-lg border border-gray-200 bg-white shadow-lg">
                        {quickFontSizes.map(size => (
                            <button
                                key={size}
                                onClick={() => handleFontSizeApply(size)}
                                className="block w-full px-4 py-2 text-left text-xs transition-colors hover:bg-blue-50"
                            >
                                {parseInt(size)}px
                            </button>
                        ))}
                    </div>
                )}

                <div className="h-6 w-px bg-gray-300 mx-1" />

                <div className="flex items-center gap-1">
                    <button
                        onClick={() => handleFormatting("bold")}
                        className="rounded border border-gray-300 p-1.5 transition-colors hover:bg-gray-100"
                        title="Bold (Ctrl+B)"
                    >
                        <Bold className="h-4 w-4 text-gray-700" />
                    </button>

                    <button
                        onClick={() => handleFormatting("italic")}
                        className="rounded border border-gray-300 p-1.5 transition-colors hover:bg-gray-100"
                        title="Italic (Ctrl+I)"
                    >
                        <Italic className="h-4 w-4 text-gray-700" />
                    </button>

                    <button
                        onClick={() => handleFormatting("underline")}
                        className="rounded border border-gray-300 p-1.5 transition-colors hover:bg-gray-100"
                        title="Underline (Ctrl+U)"
                    >
                        <Underline className="h-4 w-4 text-gray-700" />
                    </button>

                    <button
                        onClick={() => handleFormatting("strikeThrough")}
                        className="rounded border border-gray-300 p-1.5 transition-colors hover:bg-gray-100"
                        title="Strikethrough"
                    >
                        <Strikethrough className="h-4 w-4 text-gray-700" />
                    </button>
                </div>

                <div className="h-6 w-px bg-gray-300 mx-1" />

                <div className="relative">
                    <button
                        onClick={e => {
                            e.stopPropagation();
                            closeAllDropdowns();
                            setShowColorPicker(!showColorPicker);
                        }}
                        className={`rounded border border-gray-300 p-1.5 transition-colors ${showColorPicker ? "bg-gray-100" : "hover:bg-gray-100"
                            }`}
                        title="Text Color"
                    >
                        <div className="relative">
                            <Palette className="h-4 w-4 text-gray-700" />
                            <div
                                className="absolute right-0 -bottom-1 left-0 h-1 rounded-full"
                                style={{ backgroundColor: selectionColor }}
                            />
                        </div>
                    </button>

                    {showColorPicker && (
                        <div className="absolute top-full left-0 z-50 mt-1 w-48 rounded-lg border border-gray-200 bg-white p-2 shadow-lg">
                            <div className="grid grid-cols-6 gap-1">
                                {quickColors.map(color => (
                                    <button
                                        key={color}
                                        onClick={() => handleColorApply(color)}
                                        className="h-6 w-6 rounded border border-gray-200 transition-transform hover:scale-110"
                                        style={{ backgroundColor: color }}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                <div className="relative">
                    <button
                        onClick={e => {
                            e.stopPropagation();
                            closeAllDropdowns();
                            setShowHighlightPicker(!showHighlightPicker);
                        }}
                        className={`rounded border border-gray-300 p-1.5 transition-colors ${showHighlightPicker ? "bg-gray-100" : "hover:bg-gray-100"
                            }`}
                        title="Highlight Color"
                    >
                        <div className="relative">
                            <Highlighter className="h-4 w-4 text-gray-700" />
                            <div
                                className="absolute right-0 -bottom-1 left-0 h-1 rounded-full"
                                style={{ backgroundColor: selectionHighlight }}
                            />
                        </div>
                    </button>

                    {showHighlightPicker && (
                        <div className="absolute top-full left-0 z-50 mt-1 w-48 rounded-lg border border-gray-200 bg-white p-2 shadow-lg">
                            <div className="grid grid-cols-6 gap-1">
                                {quickHighlights.map(color => (
                                    <button
                                        key={color}
                                        onClick={() => applyHighlight(color)}
                                        className="h-6 w-6 rounded border border-gray-200 transition-transform hover:scale-110"
                                        style={{ backgroundColor: color }}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                <div className="h-6 w-px bg-gray-300 mx-1" />

                <div className="relative">
                    <button
                        onClick={e => {
                            e.stopPropagation();
                            closeAllDropdowns();
                            setShowAlignPicker(!showAlignPicker);
                        }}
                        className={`rounded border border-gray-300 p-1.5 transition-colors ${showAlignPicker ? "bg-gray-100" : "hover:bg-gray-100"
                            }`}
                        title="Text Alignment"
                    >
                        <AlignLeft className="h-4 w-4 text-gray-700" />
                    </button>

                    {showAlignPicker && (
                        <div className="absolute top-full right-0 z-50 mt-1 rounded-lg border border-gray-200 bg-white shadow-lg overflow-hidden">
                            <button
                                onClick={() => applyAlignment("left")}
                                className="flex w-full items-center gap-2 px-3 py-2 text-xs hover:bg-blue-50"
                            >
                                <AlignLeft className="h-3 w-3" /> Left
                            </button>
                            <button
                                onClick={() => applyAlignment("center")}
                                className="flex w-full items-center gap-2 px-3 py-2 text-xs hover:bg-blue-50"
                            >
                                <AlignCenter className="h-3 w-3" /> Center
                            </button>
                            <button
                                onClick={() => applyAlignment("right")}
                                className="flex w-full items-center gap-2 px-3 py-2 text-xs hover:bg-blue-50"
                            >
                                <AlignRight className="h-3 w-3" /> Right
                            </button>
                        </div>
                    )}
                </div>

                <button
                    onClick={clearSelection}
                    className="rounded border border-gray-300 p-1.5 transition-colors hover:bg-red-50 hover:text-red-600"
                    title="Close Toolbar"
                >
                    <X className="h-4 w-4" />
                </button>
            </div>
        </div>
    );
};
