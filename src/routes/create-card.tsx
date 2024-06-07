import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import axios from 'axios';
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { useParams, useNavigate } from 'react-router-dom';

const FormSchema = z.object({
  side_a: z.string().min(2, {
    message: "Side A must be at least 2 characters.",
  }),
  side_b: z.string().min(2, {
    message: "Side B must be at least 2 characters.",
  })
})

export function CreateCard() {
    const navigate = useNavigate();
    const { deckId } = useParams()

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
        side_a: "",
        side_b: "",
        },
    })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const payload = {
        "side_a": data.side_a,
        "side_b": data.side_b,
        "deck_id": deckId
      };
  
    axios.post(`${import.meta.env.VITE_API_URL}/cards/`, payload)
        .then(() => {
            navigate(`/deck/${deckId}`)
        }
        )
        .catch(error => {
            console.error('Error creating card:', error);
        })
  }

  return (
    <div className="min-h-screen">
      <main className="flex-col mx-auto">
      <div className="container mx-auto px-4 md:px-6 py-12">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="side_a"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Side A</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Side A" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="side_b"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Side B</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Side B" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </div>
      </main>
    </div>
  )
}
