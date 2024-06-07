import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Button } from "../components/ui/button"
import Loader from '@/components/loader';
import axios from 'axios';
import { Separator } from "@/components/ui/separator"

interface Review {
  quality: number;
  easiness: number;
  interval: number;
  repetitions: number;
  review_date: string;
  created_at: string;
}

interface CardInterface {
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
  cards: CardInterface[];
}

export function DeckDetails() {
  const { id } = useParams<{ id: string }>();
  const [deck, setDeck] = useState<Deck | null>(null);

  useEffect(() => {
    const fetchDeckAndCards = async () => {
      try {
        const decks = await axios.get<Deck>(`${import.meta.env.VITE_API_URL}/decks/${id}`);
        setDeck(decks.data);
      } catch (error) {

        console.error('Error fetching deck:', error);
      }
    };

    fetchDeckAndCards();
  }, [id]);

  if (!deck) {
    return <Loader />
  }


  const handleDeleteCard = (id: number) => {
    if (window.confirm('Are you sure you want to delete this card?')) {
      axios.delete(`${import.meta.env.VITE_API_URL}/cards/${id}`)
        .then(() => {
          if (deck.cards) {
            setDeck(prevDeck => prevDeck ? { ...prevDeck, cards: prevDeck.cards.filter(card => card.id !== id) } : null);
          }
        })
        .catch(error => {
          console.error('Error deleting deck:', error)
        })
    }
  }

  return (
    <div className="text-gray-50 min-h-screen flex flex-col">
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="container mx-auto px-4 md:px-6 py-12">
          <h1 className="text-3xl font-bold mb-4">{deck.name}</h1>
          <p className="text-gray-400 mb-6">{deck.description}</p>
          <Button onClick={() => { window.location.href = `/deck/${deck.id}/create-card` }}>Create Card</Button>
        </div>
        <div className="flex flex-col container mx-auto px-4 md:px-6 py-12">
            {deck.cards.map((card) => (
                <div key={card.id} className="bg-gray-900 rounded-lg mb-4">
                    <div className="flex flex-col p-4">
                        <label className="text-gray-400 mb-2">Side A</label>
                        <h3 className="text-xl self-auto mb-4">{card.side_a}</h3>

                        <label className="text-gray-400 mb-2">Side B</label>
                        <h3 className="text-xl mb-2">{card.side_b}</h3>

                        <Separator />
                        <label className="text-gray-400 mb-2">Creation Date</label>
                        <h3 className="text-xl mb-2">{card.created_at}</h3>

                        <label className="text-gray-400 mb-2">Next Review Date</label>
                        <h3 className="text-xl mb-2">{card.next_review_date == null ? "Card not yet reviewed" : card.next_review_date}</h3>

                        <Separator />
                        {card.reviews.length > 0 && card.reviews.slice(-3).map((review, index) => (
                            <div key={index}>
                                <label className="text-gray-400 mb-2">Last 3 Reviews</label>
                                <div>
                                    <label className="text-gray-400 mb-2">Review Quality</label>
                                    <h3 className="text-xl mb-2">{review.quality}</h3>

                                    <label className="text-gray-400 mb-2">Review Easiness</label>
                                    <h3 className="text-xl mb-2">{review.easiness}</h3>

                                    <label className="text-gray-400 mb-2">Review Interval</label>
                                    <h3 className="text-xl mb-2">{review.interval}</h3>

                                    <label className="text-gray-400 mb-2">Review Repetitions</label>
                                    <h3 className="text-xl mb-2">{review.repetitions}</h3>

                                    <label className="text-gray-400 mb-2">Review Date</label>
                                    <h3 className="text-xl mb-2">{review.review_date}</h3>
                                </div>
                                <Separator />
                            </div>
                            
                        ))}
                        <Button className="" onClick={() => { handleDeleteCard(card.id) }} >Delete Card</Button>
                    </div>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
}