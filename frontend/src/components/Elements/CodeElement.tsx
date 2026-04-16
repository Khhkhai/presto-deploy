import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import type { CodeElementType, SlideElementType } from "../../data";
import type { Frame } from "../Slide";

type Props = {
  el: CodeElementType;
  frame: Frame
  onDblClick?: (_el: SlideElementType) => void;
  onContextMenu?: (_id: string, _x: number, _y: number) => void;
};

export const CodeElement = (props: Props) => {
  const { x, y, width, height } = props.frame;

  return (
    <div
      className="absolute bg-base-300 rounded-lg overflow-hidden"
      style={{ left: x, top: y, width, height }}
      onDoubleClick={() => props.onDblClick?.(props.el)}
      onContextMenu={(e) => {
        e.preventDefault();
        props.onContextMenu?.(props.el.id, e.clientX, e.clientY);
      }}
    >
      <SyntaxHighlighter
        language={props.el.language}
        style={atomOneDark}
        customStyle={{
          margin: 0,
          height: "100%",
          width: "100%",
          fontSize: `${props.el.fontSize}em`,
          whiteSpace: "pre",
          overflow: "auto",
        }}
      >
        {props.el.code}
      </SyntaxHighlighter>
    </div>
  );
};