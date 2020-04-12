import React, { ReactNode } from "react";
import "./CardList.css";

interface CardListProps {
  children: ReactNode;
}

function CardList(props: CardListProps) {
  return <div className="CardList">{props.children}</div>;
}

export default CardList;
