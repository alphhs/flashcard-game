import { CardList } from "./CardList";
import { useRef, useState } from "react";
import { useEffect } from "react";
import axios from "axios";

const initialCategories = [
  { id: "1", name: "Arts & Literature" },
  { id: "2", name: "Film & TV" },
  { id: "3", name: "Food & Drink" },
  { id: "4", name: "General Knowledge" },
  { id: "5", name: "Geography" },
  { id: "6", name: "History" },
  { id: "7", name: "Music" },
  { id: "8", name: "Science" },
  { id: "9", name: "Society & Culture" },
  { id: "10", name: "Sport & Leisure" },
];

const initialCards = [];
function App() {
  const categoryEl = useRef();
  const amountEl = useRef();
  const [cards, setCards] = useState(initialCards);
  const [categories, setCategories] = useState([]);
  useEffect(() => setCategories(initialCategories), []);

  function handleSubmit(e) {
    e.preventDefault();
    axios
      .get("https://the-trivia-api.com/api/questions", {
        params: {
          limit: amountEl.current.value,
          categories: categoryEl.current.value,
        },
      })
      .then((res) => {
        setCards(
          res.data.map((questionItem) => {
            const question = questionItem.question;
            const answer = questionItem.correctAnswer;
            const options = [answer, ...questionItem.incorrectAnswers];
            return {
              id: questionItem.id,
              question,
              answer,
              options: options.sort(() => Math.random() - 0.5),
            };
          })
        );
      });
  }
  return (
    <>
      <form className="header" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="category">Categories</label>
          <select id="category" ref={categoryEl}>
            {categories.map((category) => {
              return <option key={category.id}>{category.name}</option>;
            })}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="amount">Number of Questions</label>
          <input
            ref={amountEl}
            id="amount"
            type="number"
            min="1"
            max="100"
            defaultValue="10"
            step="1"
          />
        </div>
        <div>
          <button className="btn">Generate</button>
        </div>
      </form>
      <div className="container">
        <div>
          <CardList cards={cards} />
        </div>
      </div>
    </>
  );
}

export default App;
