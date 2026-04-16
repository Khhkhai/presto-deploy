import { Stage, Layer, Text, Rect } from 'react-konva';
import { useRef, useState, useEffect } from 'react';
import { ImageElement } from './Elements/ImageElement';
import { VideoElement } from './Elements/VideoElement';
import { CodeElement } from './Elements/CodeElement';
import type Konva from 'konva';
import type { 
  SlideType, 
  SlideElementType, 
  RectangleElementType,
  TextElementType, 
  ImageElementType, 
  VideoElementType, 
  CodeElementType 
} from "../data";

type SlideProps = {
    slide?: SlideType | null;
    onDblClick?: (_el: SlideElementType | null) => void;
    onContextMenu?: (_id: string, _x: number, _y: number) => void;
    onTextChange?: (_id: string, _text: string) => void;
}

export type Frame = {
    x: number;
    y: number;
    width: number;
    height: number;
};

export const Slide = ((props: SlideProps)  => {
  const elements = props.slide?.elements ?? [];
  const containerRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const observer = new ResizeObserver(entries => {
      const { width, height } = entries[0].contentRect;
      setSize({ width, height });
    });

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    return () => observer.disconnect();
  }, []);

  const toPixels = (el: SlideElementType): Frame => {
    const w = el.width / 100 * size.width;
    const h = el.height / 100 * size.height;
    const x = Math.min(el.x / 100 * size.width, size.width - w);
    const y = Math.min(el.y / 100 * size.height, size.height - h);
    return { x, y, width: w, height: h };
  };
    
  const handleTextEdit = (el: TextElementType, textNode: Konva.Text) => {
    const stage = textNode.getStage();
    const stageBox = stage?.container().getBoundingClientRect();
    const box = textNode.getClientRect();

    const textarea = document.createElement('textarea');
    document.body.appendChild(textarea);

    textarea.value = el.text;
    textarea.style.position = 'fixed';
    textarea.style.top = (stageBox!.top + box.y) + 'px';
    textarea.style.left = (stageBox!.left + box.x) + 'px';
    textarea.style.width = box.width + 'px';
    textarea.style.height = box.height + 'px';
    textarea.style.fontSize = el.fontSize + 'em';
    textarea.style.border = '2px solid #333';
    textarea.style.padding = '0';
    textarea.style.resize = 'none';
    textarea.style.outline = 'none';
    textarea.style.color = el.color;
    textarea.style.background = 'transparent';

    textNode.hide();
    textarea.focus();

    textarea.addEventListener('blur', () => {
      textNode.show();
      props.onTextChange?.(el.id, textarea.value);
      textarea.remove();
    });
  };
  const renderElement = (el: SlideElementType) => {
    const frame = toPixels(el);

    switch (el.type) {
    case 'rectangle':
      return (
        <Rect
          key={el.id}
          {...frame}
          fill={(el as RectangleElementType).fill}
          onDblClick={(e) => {
            e.evt.preventDefault();
            props.onDblClick?.(el);
          }}
          onContextMenu={(e) => {
            e.evt.preventDefault();
            props.onContextMenu?.(el.id, e.evt.clientX, e.evt.clientY);
          }}
        />
      );

    case 'text':
      return (
        <Text
          key={el.id}
          text={el.text}
          {...frame}
          fill={el.color}
          fontSize={el.fontSize * 16}
          onDblClick={(e) => {
            e.evt.preventDefault();
            props.onDblClick?.(el);
            handleTextEdit(el, e.target as Konva.Text);
          }}
          onContextMenu={(e) => {
            e.evt.preventDefault();
            props.onContextMenu?.(el.id, e.evt.clientX, e.evt.clientY);
          }}
        />
      );

    case 'image':
      return (
        <ImageElement
          key={el.id}
          el={el as ImageElementType}
          frame={frame}
          onDblClick={props.onDblClick}
          onContextMenu={props.onContextMenu}
        />
      );

    case 'video':
      return (
        <VideoElement
          key={el.id}
          el={el as VideoElementType}
          frame={frame}
          containerSize={size}
          onDblClick={props.onDblClick}
          onContextMenu={props.onContextMenu}
        />
      );

    case 'code':
      return (
        <CodeElement
          key={el.id}
          el={el as CodeElementType}
          frame={frame}
          onDblClick={props.onDblClick}
          onContextMenu={props.onContextMenu}
        />
      );

    default:
      return null;
    }
  };

  const canvasElements = elements.filter(
    el => el.type === 'rectangle' || el.type === 'text' || el.type === 'image'
  );

  const overlayElements = elements.filter(
    el => el.type === 'video' || el.type === 'code'
  );

  return (
    <div ref={containerRef} className="relative w-full h-full bg-white">
      <Stage className="absolute top-0 left-0 z-0" width={size.width} height={size.height}>
        <Layer>
          {canvasElements.map(renderElement)}
        </Layer>
      </Stage>
      {overlayElements.map(renderElement)}
    </div>
  );
})