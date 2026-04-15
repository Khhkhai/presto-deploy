export type Presentation = {
    id: string;
    name: string;
    description: string;
    thumbnail: string | null;
    slides: Slide[];
};

export type Slide = {
    id: string;
    elements: SlideElement[];
};

export type BaseElement = {
    id: string;
    type: 'text' | 'image' | 'rectangle';
    x: number;
    y: number;
    width: number;
    height: number;
}

export type TextElement = BaseElement & {
    type: 'text';
    text: string;
    fontSize: number;
    color: string;
}

export type RectangleElement = BaseElement & {
    type: 'rectangle';
    fill: string;
}

export type ImageElement = BaseElement & {
    type: 'image';
    alt: string; 
    src: string;
}

export type SlideElement = TextElement | RectangleElement | ImageElement;