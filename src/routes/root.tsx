import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { DeckComponent } from "../components/deck-component"

interface Review {
  quality: number;
  easiness: number;
  interval: number;
  repetitions: number;
  review_date: string;
  created_at: string;
}

interface Card {
  side_a: string;
  side_b: string;
  id: number;
  created_at: string;
  reviews: Review[];
  next_review_date: string;
  deck_id: number;
}

interface Deck {
  name: string;
  description: string;
  id: number;
  created_at: string;
  cards: Card[];
}


export function Root() {
  const [decks, setDecks] = useState<Deck[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<Deck[]>('http://localhost:8000/decks/');
        setDecks(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  if (!decks) {
    return <div className="bg-gray-950 text-gray-50 min-h-screen flex flex-col">Loading...</div>;
  }


  const handleDeleteDeck = (id: number) => {
    if (window.confirm('Are you sure you want to delete this deck?')) {
      axios.delete(`http://localhost:8000/decks/${id}`)
        .then(() => {
          if (decks) {
            setDecks(decks.filter(deck => deck.id !== id))
          }
        })
        .catch(error => {
          console.error('Error deleting deck:', error)
        })
    }
  }

  return (
    <div className="bg-gray-950 text-gray-50 min-h-screen flex flex-col">

      <main className="flex-col justify-around mx-auto px-4 md:px-6 py-12">
        <Link to={`/create-deck`}>Create Deck</Link>
        <div className="container mx-auto px-4 md:px-6 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {decks.map(deck => (
            <DeckComponent key={deck.id} deck={deck} onDelete={handleDeleteDeck} />
          ))}
        </div>
      </main>
    </div>
  );
}