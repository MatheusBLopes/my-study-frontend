import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';

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
        if (card.next_review_date === currentDate || card.next_review_date === null || card.next_review_date < currentDate) {
            count++;
        }
    });

    return count;
}


export function DeckComponent({ deck, onDelete }: { deck: Deck, onDelete: (id: number) => void }) {

    
    return (
        <div className="bg-gray-900 rounded-lg">
            <div className="p-6 grid grid-cols-2 place-items-start">
                <Link to={`/deck/${deck.id}`} >
                    <h3 className="text-xl font-semibold mb-2">{deck.name}</h3>
                </Link>
                <div className="cursor-pointer self-center place-self-end">
                    <Link to={`/deck-details/${deck.id}`} className="mr-4">
                        <FontAwesomeIcon icon={faInfoCircle} />
                    </Link>
                    <FontAwesomeIcon icon={faTrash} className="cursor-pointer" onClick={() => { onDelete(deck.id) }} />
                </div>
                <p className="text-gray-400 mb-4 col-span-2">{deck.description}</p>
                <p className="text-gray-400 mb-4 col-span-2">Total cards: {deck.cards.length}</p>
                <p className="text-gray-400 mb-4 col-span-2">Cards for today: {countCardsToReview(deck)}</p>
            </div>
        </div>
    );
}