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


import {
    Card,
    CardContent,
    CardFooter,
  } from "../components/ui/card"


import { Button } from "../components/ui/button"

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

export function DeckDetail() {
  const { id } = useParams<{ id: string }>();
  const [deck, setDeck] = useState<Deck | null>(null);
  const [showAnswerMap, setShowAnswerMap] = useState<{ [key: number]: boolean }>({});

  const updateReview = (id: number, quality: number) => {

    const data = {
        "quality": quality
    };

    axios.put(`http://localhost:8000/cards/card-review/${id}`, data)
        .then(response => {
        })
        .catch(error => {
            if (error.response.data.detail == "You cant perform a new review today")  {
                alert("You cant perform a new review today")
            }
            console.error('Error updating card review:', error);
        })
  }

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

  const handleDeleteCard = (id: number) => {

    axios.delete(`http://localhost:8000/cards/${id}`)
        .then(response => {
          if (deck.cards) {
            setDeck(prevDeck => prevDeck ? { ...prevDeck, cards: prevDeck.cards.filter(card => card.id !== id) } : null);
          }
        })
        .catch(error => {
            console.error('Error deleting deck:', error)
        })
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
        <Card className="bg-gray-900 rounded-lg shadow-lg md:px-6 py-12">
            <CardContent>
                <h1 className="text-3xl font-bold mb-4">Card Options Subtitle</h1>
                <ul className="text-gray-400">
                    <li>5 - Perfect response</li>
                    <li>4 - Correct response after a hesitation</li>
                    <li>3 - Correct response recalled with serious difficulty</li>
                    <li>2 - Incorrect response; where the correct one seemed easy to recall</li>
                    <li>1 - Incorrect response; the correct one remembered</li>
                    <li>0 - Complete blackout</li>
                </ul>

            </CardContent>
        </Card>
        <div className="container mx-auto px-4 md:px-6 py-12">
            <h1 className="text-3xl font-bold mb-4">{deck.name}</h1>
            <p className="text-gray-400 mb-6">{deck.description}</p>
        </div>

        
        <Carousel className="relative">
          <CarouselPrevious />
          <CarouselContent className="flex">
            {deck.cards.map((card) => (
              <CarouselItem key={card.id} className="min-w-full flex justify-center">

                    <Card className="p-6 bg-gray-900 rounded-lg shadow-lg w-[500px] ">
                      <Button onClick={() => { handleDeleteCard(card.id) }}>Delete Card</Button>
                        <CardContent className="">
                            <h3 className="text-xl mb-2">{card.side_a}</h3>
                            <Button variant="outline" onClick={() => toggleShowAnswer(card.id)}>
                                {showAnswerMap[card.id] ? "Hide Answer" : "Show Answer"}
                            </Button>
                        </CardContent>
                        {showAnswerMap[card.id] && (
                            <CardFooter className="flex-col">
                              <h3 className="text-xl mb-2">{card.side_b}</h3>
                              <div className="flex justify-between">
                                  <Button variant="outline" onClick={() => { updateReview(card.id, 5) }}>5</Button>
                                  <Button variant="outline" onClick={() => { updateReview(card.id, 4) }}>4</Button>
                                  <Button variant="outline" onClick={() => { updateReview(card.id, 3) }}>3</Button>
                                  <Button variant="outline" onClick={() => { updateReview(card.id, 2) }}>2</Button>
                                  <Button variant="outline" onClick={() => { updateReview(card.id, 1) }}>1</Button>
                                  <Button variant="outline" onClick={() => { updateReview(card.id, 0) }}>0</Button>
                              </div>
                            </CardFooter>
                        )}
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