import { useState } from "react";
import { createElement, updateSlide } from "../api/store";
import { detectLanguage } from "../utils/detectLanguage";
import type { SlideType, SlideElementType } from "../data";

type UpdateSlides = (_updater: (_prev: SlideType[]) => SlideType[]) => void;

const createId = () => Date.now().toString();

export const useElements = (
  presentationId: string, 
  slides: SlideType[],
  currentSlideIndex: number,
  setSlides: UpdateSlides
) => {
  const [height, setHeight] = useState('0');
  const [width, setWidth] = useState('0');
  const [posX, setPosX] = useState('0');
  const [posY, setPosY] = useState('0');
  const [fontSize, setFontSize] = useState('1');
  const [color, setColor] = useState('#000000');
  const [selectedElementId, setSelectedElementId] = useState<string | null>(null);
  const selectedElement: SlideElementType | null = selectedElementId
    ? slides[currentSlideIndex]?.elements.find((e: SlideElementType) => e.id === selectedElementId) ?? null
    : null;


  const handleSelectElement = (el: SlideElementType | null) => {
    setSelectedElementId(el?.id ?? null);
    if (!el) return;

    setWidth(el.width.toString());
    setHeight(el.height.toString());
    setPosX(el.x.toString());
    setPosY(el.y.toString());
    
    if (el.type === 'text') {
      setFontSize(el.fontSize.toString());
      setColor(el.color);
    }
  };

  return {
    width, setWidth,
    height, setHeight,
    posX, setPosX,
    posY, setPosY,
    fontSize, setFontSize,
    color, setColor,
    selectedElement,
    handleSelectElement
  };
};