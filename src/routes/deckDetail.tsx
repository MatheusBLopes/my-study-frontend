import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from '../components/ui/carousel';

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

export function DeckDetail() {
  const { id } = useParams<{ id: string }>();
  const [deck, setDeck] = useState<Deck | null>(null);

  useEffect(() => {
    const fetchDeck = async () => {
      try {
        const response = await axios.get<Deck>(`http://localhost:8000/decks/${id}`);
        setDeck(response.data);
      } catch (error) {
        console.error('Error fetching deck:', error);
      }
    };

    fetchDeck();
  }, [id]);

  if (!deck) {
    return <div className="bg-gray-950 text-gray-50 min-h-screen flex flex-col">Loading...</div>;
  }

  return (
    <div className="bg-gray-950 text-gray-50 min-h-screen flex flex-col">
      <div className="container mx-auto px-4 md:px-6 py-12">
        <h1 className="text-3xl font-bold mb-4">{deck.name}</h1>
        <p className="text-gray-400 mb-6">{deck.description}</p>
        <Carousel className="relative">
          <CarouselPrevious />
          <CarouselContent className="flex">
            {deck.cards.map((card) => (
              <CarouselItem key={card.id} className="min-w-full">
                <div className="p-6 bg-gray-900 rounded-lg shadow-lg overflow-hidden">
                  <h3 className="text-xl font-semibold mb-2">{card.side_a}</h3>
                  <p className="text-gray-400">{card.side_b}</p>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
}