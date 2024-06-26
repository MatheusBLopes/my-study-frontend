import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { CardSubtitle } from '@/components/card-subtitle';
import axios from 'axios';
import { ScrollArea } from "@/components/ui/scroll-area"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from '../components/ui/carousel';


import {
  Card,
  CardContent,
} from "../components/ui/card"


import { Button } from "../components/ui/button"
import Loader from '@/components/loader';

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

export function Deck() {
  const { id } = useParams<{ id: string }>();
  const [deck, setDeck] = useState<Deck | null>(null);
  const [showAnswerMap, setShowAnswerMap] = useState<{ [key: number]: boolean }>({});

  const updateReview = (id: number, quality: number) => {

    const data = {
      "quality": quality
    };

    axios.put(`${import.meta.env.VITE_API_URL}/cards/card-review/${id}`, data)
      .then(() => {
      })
      .catch(error => {
        if (error.response.data.detail == "You cant perform a new review today") {
          alert("You cant perform a new review today")
        }
        console.error('Error updating card review:', error);
      })
  }

  useEffect(() => {
    const fetchDeckAndCards = async () => {
      try {
        const response = await axios.get<Deck>(`${import.meta.env.VITE_API_URL}/decks/${id}`);
        
        const currentDate = new Date().toISOString().slice(0, 10); // Format: YYYY-MM-DD
        const filteredCards = response.data.cards.filter(card => card.next_review_date === null || card.next_review_date === currentDate || card.next_review_date < currentDate) ?? [];
        response.data.cards = filteredCards

        setDeck(response.data)

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


  const toggleShowAnswer = (cardId: number) => {
    setShowAnswerMap(prevState => ({
      ...prevState,
      [cardId]: !prevState[cardId]
    }));
  };

  return (
    <div className="text-gray-50 min-h-screen flex flex-col">
      <div className="container mx-auto px-4 md:px-6 py-12">
        <CardSubtitle />
        <div className="container mx-auto px-4 md:px-6 py-12">
          <h1 className="text-3xl font-bold mb-4">{deck.name}</h1>
          <p className="text-gray-400 mb-6">{deck.description}</p>
          <Button onClick={() => { window.location.href = `/deck/${deck.id}/create-card` }}>Create Card</Button>
        </div>


        <Carousel className="relative">
          <CarouselPrevious />
          <CarouselContent className="flex">
            {deck.cards.map((card) => (
              <CarouselItem key={card.id} className="min-w-full flex justify-center md:basis-1/2 lg:basis-1/3">

                <Card className="flex flex-col justify-between items-center p-6 bg-gray-900 rounded-lg w-4/5">
                  <div className="flex justify-center">
                    <Button variant="outline" onClick={() => { handleDeleteCard(card.id) }}>X</Button>
                  </div>

                    <ScrollArea className="h-2/5 w-4/5 rounded-md border p-4 my-4">
                      <CardContent className="">
                          <p className="">{card.side_a}</p>
                      </CardContent>
                    </ScrollArea>
                  {showAnswerMap[card.id] && (
                    <>
                      <ScrollArea className="h-2/5 w-4/5 rounded-md border p-4 mb-4">
                        <p className="">{card.side_b}</p>
                      </ScrollArea>
                      <div className="mb-4">
                        <Button variant="outline" onClick={() => { updateReview(card.id, 5) }}>5</Button>
                        <Button variant="outline" onClick={() => { updateReview(card.id, 4) }}>4</Button>
                        <Button variant="outline" onClick={() => { updateReview(card.id, 3) }}>3</Button>
                        <Button variant="outline" onClick={() => { updateReview(card.id, 2) }}>2</Button>
                        <Button variant="outline" onClick={() => { updateReview(card.id, 1) }}>1</Button>
                        <Button variant="outline" onClick={() => { updateReview(card.id, 0) }}>0</Button>
                      </div>
                    
                    </>

                  )}
                  <Button variant="outline" className="" onClick={() => toggleShowAnswer(card.id)}>
                      {showAnswerMap[card.id] ? "Hide Answer" : "Show Answer"}
                  </Button>
                </Card>
              </CarouselItem>
            ))}

          </CarouselContent>
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
}