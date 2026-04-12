
export type Presentation = {
    id: string;
    name: string;
    description: string;
    thumbnail: string | null;
    slides: Slide[];
};

export type Slide = {
    id: string;
    elements: Element[];
};

type Element = {
    id: string;
    type: 'text' | 'image' | 'rectangle';
    x: number;
    y: number;
    width: number;
    height: number;

    content?: string; 
    src?: string;
    fill?: string;
}