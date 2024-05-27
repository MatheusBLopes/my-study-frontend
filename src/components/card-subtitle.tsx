import {
    Card,
    CardContent,
  } from "../components/ui/card"

export function CardSubtitle() {
    return (
        <>
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
        </>
    );
}