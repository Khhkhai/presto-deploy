import { Image, Text } from "react-konva";
import type { ImageElementType, SlideElementType } from "../../data";
import useImage from "use-image";
import type { Frame } from "../Slide";

type ImageElementProps = {
  el: ImageElementType;
  frame: Frame
  onDblClick?: (_el: SlideElementType) => void;
  onContextMenu?: (_id: string, _x: number, _y: number) => void;
}
export const ImageElement = (props: ImageElementProps) => {
  const [image, status] = useImage(props.el.src);

  if (status === 'failed') {
    return (
      <Text
        text={props.el.alt || "Image failed"}
        {...props.el}
        {...props.frame}
        fill="black"
        align="center"
        verticalAlign="middle"
      />
    );
  }

  return (
    <Image
      image={image}
      {...props.el}
      {...props.frame}
      onDblClick={(e) => {
        e.evt.preventDefault();
        props.onDblClick?.(props.el);
      }}
      onContextMenu={(e) => {
        e.evt.preventDefault();
        props.onContextMenu?.(props.el.id, e.evt.clientX, e.evt.clientY);
      }}
    />
  );
};