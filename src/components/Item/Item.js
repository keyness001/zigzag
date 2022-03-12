import React, { memo, useMemo, useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import './Item.css';

const Item = ({ index, style, data }) => {
  const item = data.cards[index];
  const { text, id } = item;
  const { moveCard, arrIndex } = data;
  const ref = useRef(null);

  const [{ isDragging }, connectDrag] = useDrag({
    item: { id, arrIndex },
    type: "card",
    collect: (monitor) => {
      const result = {
        isDragging: monitor.isDragging()
      };
      return result;
    }
  });

  const [, connectDrop] = useDrop({
    accept: "card",
    drop({ id: draggedId, arrIndex: draggedArrIndex }) {
      if (draggedId !== id) {
        moveCard(draggedId, id, draggedArrIndex, arrIndex);
      }
    }
  });

  connectDrag(connectDrop(ref));

  const opacity = isDragging ? 0.5 : 1;

  const itemStyle = useMemo(() => ({ ...style, opacity }), [
    opacity,
    style
  ]);

  return (
    <div className="item" ref={ref} style={itemStyle}>
      {text}
    </div>
  );
};

export default React.memo(Item);
