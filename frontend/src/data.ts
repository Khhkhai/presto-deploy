export type PresentationType = {
    id: string;
    name: string;
    description: string;
    thumbnail: string | null;
    slides: SlideType[];
};

export type SlideType = {
    id: string;
    elements: SlideElementType[];
};

export type BaseElementType = {
    id: string;
    type: 'text' | 'image' | 'rectangle' | 'video' | 'code';
    x: number;
    y: number;
    width: number;
    height: number;
}

export type TextElementType = BaseElementType & {
    type: 'text';
    text: string;
    fontSize: number;
    color: string;
}

export type RectangleElementType = BaseElementType & {
    type: 'rectangle';
    fill: string;
}

export type ImageElementType = BaseElementType & {
    type: 'image';
    alt: string; 
    src: string;
}

export type VideoElementType = BaseElementType & {
    type: 'video';
    src: string;
    autoplay: boolean;
}

export type CodeElementType = BaseElementType & {
    type: 'code';
    code: string;
    fontSize: number;
    language: Language;
}

export type Language = 'javascript' | 'python' | 'c' | 'unknown';
export type SlideElementType = TextElementType | RectangleElementType | ImageElementType | VideoElementType | CodeElementType; 