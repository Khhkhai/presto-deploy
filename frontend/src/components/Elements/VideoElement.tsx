import type { VideoElementType, SlideElementType } from "../../data";
import type { Frame } from "../Slide";

type VideoProps = {
  el: VideoElementType;
  frame: Frame;
  onDblClick?: (_el: SlideElementType) => void;
  onContextMenu?: (_id: string, _x: number, _y: number) => void;
  containerSize: { width: number; height: number };
};

export const VideoElement = (props: VideoProps) => {
  const { x, y, width, height } = props.frame;
  const src = props.el.autoplay ? `${props.el.src}&autoplay=1` : props.el.src;

  return (
    <div
      className="absolute bg-base-200 overflow-hidden p-1 flex items-center justify-center"
      style={{
        left: x,
        top: y,
        width: width + 25,
        height: height + 25,
      }}
      onDoubleClick={() => props.onDblClick?.(props.el)}
      onContextMenu={(e) => {
        e.preventDefault();
        props.onContextMenu?.(props.el.id, e.clientX, e.clientY);
      }}
    >
      <div style={{ width, height }}>
        <iframe
          src={src}
          width="100%"
          height="100%"
          allow="autoplay; encrypted-media"
          allowFullScreen
        />
      </div>
    </div>
  );
};