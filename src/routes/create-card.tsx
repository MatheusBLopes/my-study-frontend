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
import { Input } from "@/components/ui/input"
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
  
    axios.post(`http://localhost:8000/cards/`, payload)
        .then(() => {
            navigate(`/deck/${deckId}`)
        }
        )
        .catch(error => {
            console.error('Error creating card:', error);
        })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="side_a"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Side A" {...field} />
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
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder="Side B" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
