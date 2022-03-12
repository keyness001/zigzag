import React, { useState, useCallback, useMemo, useEffect } from "react";
import Item from "../../components/Item";
import { FixedSizeList as List } from "react-window";
import './DrapDrop.css';

function buildCardData(n) {
  const cardsById = {};
  const arr = Array.from({length: n}, (_, index) => []);

  for (let i = 0; i < Math.pow(n, 2); i++) {
    const subArrIndex = Math.floor(i / n) || 0;
    const card = { id: i, text: i };
    cardsById[card.id] = card;
    if (subArrIndex % 2) {
      arr[subArrIndex].unshift(card);
    } else {
      arr[subArrIndex].push(card);
    }
  }
  
  return {
    arr,
    cardsById,
  };
}

const DrapDrop = ({ n }) => {
  const [data, setData] = useState({})

  const cardData = useMemo(() => buildCardData(n),[n])

  useEffect(() => {
    setData(cardData)
  }, [cardData])

  const moveCard = useCallback((id, afterId, arrIndex, afterArrIndex) => {
    const nextData = { ...data };
    const { cardsById, arr } = data;

    const card = cardsById[id];
    const afterCard = cardsById[afterId];

    const cardIndex = arr[arrIndex].indexOf(card);
    const afterIndex = arr[afterArrIndex].indexOf(afterCard);

    nextData.arr[afterArrIndex][afterIndex] = card;
    nextData.arr[arrIndex][cardIndex] = afterCard;

    setData(nextData);
  }, [data]);

  return (
    <div className="drapdrog">
      {
        data?.arr?.map((arr_, index) => {
          return (
            <div className="wrapper" style={{ left: `${index * 100}px` }}>
              <List
                width={100}
                itemData={{
                  cards: data.arr[index],
                  moveCard: moveCard,
                  arrIndex: index
                }}
                itemCount={data.arr[index].length}
                itemSize={50}
                height={window.innerHeight}
              >
                {Item}
              </List>
            </div>
          )
        })
      }
    </div>
  );
}

export default DrapDrop;
