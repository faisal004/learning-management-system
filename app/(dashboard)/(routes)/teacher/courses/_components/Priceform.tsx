'use client'

import * as z from 'zod'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Ghost, Pencil } from 'lucide-react'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { cn } from '@/lib/utils'

import { Course } from '@prisma/client'
import { describe } from 'node:test'
import { Input } from '@/components/ui/input'

interface PriceformProps {
  initialData: Course
  courseId: string
}
const formSchema = z.object({
  price: z.coerce.number(),
})
const Priceform = ({ initialData, courseId }: PriceformProps) => {
  const router = useRouter()
  const [isEditing, setIsEditing] = useState(false)
  const toggleEdit = () => setIsEditing((e) => !e)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { price: initialData?.price || undefined },
  })

  const { isSubmitting, isValid } = form.formState

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/courses/${courseId}`, values)
      toast.success('Course Price Updated')
      toggleEdit()
      router.refresh()
    } catch (error) {
      console.log(error)
      toast.error('Something went wrong')
    }
  }
  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4 ">
      <div className="font-medium flex items-center justify-between">
        Course Price
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              {' '}
              <Pencil className="h-4 w-4 mr-2" />
              Edit Price
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <p
          className={cn(
            'text-sm mt-2  bg-slate-800  text-center text-slate-200 w-2/4 rounded-md  p-2',
            !initialData?.price && 'text-slate-500 italic',
          )}
        >
         {initialData?.price !== null ? `₹${initialData?.price}` : 'No price'}
        </p>
      )}
      {isEditing && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4"
          >
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="number"
                      step="1"
                      disabled={isSubmitting}
                      placeholder="Set a price for your course "
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-2">
              <Button disabled={!isValid || isSubmitting} type="submit">
                Save
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  )
}

export default Priceform
