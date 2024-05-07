import { Link } from "react-router-dom";
import Spinners from "../components/Spinners";
import { useCardContext } from "../contexts/CardsContext";
import "./Cards.scss";
import { useState, useEffect } from "react";
import FavoriteButton from "../components/FavoriteButton";
import { useCards } from "../hooks/useCards";
import { useAuth } from "../contexts/AuthContext";

const Cards = ({ favoritesOnly = false }) => {
  const { cards: contextCards } = useCardContext();
  const { loading, error } = useCards();
  const [favorites, setFavorites] = useState<string[]>([]);
  const { token } = useAuth(); // new

  useEffect(() => {
    const currentFavorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    setFavorites(currentFavorites);
  }, []);

  /* function addToFavorites(cardId: string) {
    const currentFavorites = [...favorites];
    if (currentFavorites.includes(cardId)) {
      const index = currentFavorites.indexOf(cardId);
      currentFavorites.splice(index, 1);
    } else {
      currentFavorites.push(cardId);
    }
    setFavorites(currentFavorites);
    localStorage.setItem("favorites", JSON.stringify(currentFavorites));
  } */

  const addToFavorites = async (cardId: string) => {
    try {
      // Example of how to use the token to call the API
    /*   await axios.patch(
        `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${cardId}`,
        {}, // No data required for patching
        { headers: { 'x-auth-token': token } }
      ); */

      // Update the local favorites list
      const currentFavorites = [...favorites];
      if (currentFavorites.includes(cardId)) {
        const index = currentFavorites.indexOf(cardId);
        currentFavorites.splice(index, 1);
      } else {
        currentFavorites.push(cardId);
      }
      setFavorites(currentFavorites);



      /* localStorage.setItem("favorites", JSON.stringify(currentFavorites)); */


    } catch (e) {
      console.error("Failed to update favorite status:", e);
    }
  }

  const filteredCards = favoritesOnly
    ? contextCards.filter(card => favorites.includes(card._id))
    : contextCards;

  return (
    <div className="cards-container dark:bg-gray-700">
      {loading && <Spinners />}
      {error && <div>{error}</div>}

      {filteredCards.map((c) => (
        <div key={c._id}>
          <Link to={`/cards/${c._id}`} className="card-link dark:bg-gray-500 dark:text-white rounded-lg shadow-lg p-4">
            <FavoriteButton
              cardId={c._id}
              isFavorite={favorites.includes(c._id)}
              onToggleFavorite={addToFavorites} token={""}            />
            <h2 className="card-title">{c.title}</h2>
            <hr />
            <p className="card-subtitle">{c.subtitle}</p>
            <img src={c.image.url} alt={c.image.alt} className="card-image" />
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Cards;