import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Button } from "../components/ui/button"
import { InputForm } from "../components/form"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"



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
  const [data, setData] = useState<Deck[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<Deck[]>('http://localhost:8000/decks/');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  if (!data) {
    return <div className="bg-gray-950 text-gray-50 min-h-screen flex flex-col">Loading...</div>;
  }

  function getCurrentDate(): string {
    return new Date().toISOString().slice(0, 10); // Format: YYYY-MM-DD
  }

  function countCardsToReview(deck: Deck): number {
    const currentDate = getCurrentDate();
    let count = 0;

    deck.cards.forEach((card) => {
      if (card.next_review_date === currentDate) {
        count++;
      }
    });

    return count;
  }

  return (
    <div className="bg-gray-950 text-gray-50 min-h-screen flex flex-col">

      <main className="flex-col justify-around mx-auto px-4 md:px-6 py-12">
      <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Create Deck</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Deck</DialogTitle>
          <DialogDescription>
            Create a new deck
          </DialogDescription>
        </DialogHeader>
        <InputForm />
      </DialogContent>
    </Dialog>
        <div className="container mx-auto px-4 md:px-6 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.map(deck => (
            <Link key={deck.id} to={`/deck/${deck.id}`} className="bg-gray-900 rounded-lg shadow-lg overflow-hidden">
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{deck.name}</h3>
                <p className="text-gray-400 mb-4">{deck.description}</p>
                <p className="text-gray-400 mb-4">Total cards: {deck.cards.length}</p>
                <p className="text-gray-400 mb-4">Cards for today: {countCardsToReview(deck)}</p>
              </div>
            </Link>
          ))}
        </div>

      </main>
    </div>
  );
}