import { Card } from "./Card";

export const CardList = ({ cards }) => {
  return (
    <div className="card-grid">
      {cards.map((card) => (
        <Card key={card.id} card={card} />
      ))}
    </div>
  );
};
