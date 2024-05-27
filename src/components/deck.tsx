import { Button } from "../components/ui/button"
import { Link } from 'react-router-dom';


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


function countCardsToReview(deck: Deck): number {
    const currentDate = new Date().toISOString().slice(0, 10); // Format: YYYY-MM-DD
    let count = 0;

    deck.cards.forEach((card) => {
        if (card.next_review_date === currentDate) {
            count++;
        }
    });

    return count;
}


export function DeckComponent({ deck, onDelete }: { deck: Deck, onDelete: (id: number) => void }) {
    return (
        <div key={deck.id} className="bg-gray-900 rounded-lg shadow-lg overflow-hidden">
            <Link to={`/deck/${deck.id}`} >
                <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{deck.name}</h3>
                    <p className="text-gray-400 mb-4">{deck.description}</p>
                    <p className="text-gray-400 mb-4">Total cards: {deck.cards.length}</p>
                    <p className="text-gray-400 mb-4">Cards for today: {countCardsToReview(deck)}</p>
                </div>
            </Link>
            <Button onClick={() => onDelete(deck.id)}>Delete Deck</Button>
        </div>
    );
}