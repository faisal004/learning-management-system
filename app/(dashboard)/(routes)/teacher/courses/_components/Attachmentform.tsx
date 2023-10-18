'use client'

import * as z from 'zod'
import { useRouter } from 'next/navigation'
import axios from 'axios'

import { Button } from '@/components/ui/button'
import { File,  Loader2,  PlusCircle, X } from 'lucide-react'
import { useState } from 'react'
import toast from 'react-hot-toast'

import { Attachment, Course } from '@prisma/client'
import Image from 'next/image'
import { FileUpload } from '@/components/file-upload'

interface AttachmentformProps {
  initialData: Course & { attachments: Attachment[] }
  courseId: string
}
const formSchema = z.object({
  url: z.string().min(1),
})
const Attachmentform = ({ initialData, courseId }: AttachmentformProps) => {
  const router = useRouter()
  const [isEditing, setIsEditing] = useState(false)
  const [deletingId,setDeletingId]=useState<string | null>(null)
  const toggleEdit = () => setIsEditing((e) => !e)

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post(`/api/courses/${courseId}/attachments`, values)
      toast.success('Course Image Updated')
      toggleEdit()
      router.refresh()
    } catch (error) {
      console.log(error)
      toast.error('Something went wrong')
    }
  }
  const onDelete= async(id:string)=>{
    try {
      setDeletingId(id)
      await axios.delete(`/api/courses/${courseId}/attachments/${id}`)
      toast.success("Attachment deleted")
      router.refresh()
      
    } catch (error) {
      toast.error("Something went wrong")
    }finally{
      setDeletingId(null)
    }
  }
  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4 ">
      <div className="font-medium flex items-center justify-between">
        Course Attachment
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing && <>Cancel</>}
          {!isEditing && (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add an file
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <>
          {initialData.attachments.length === 0 && (
            <p className="text-sm mt-2 text-slate-500 italic">
              No attachments yet
            </p>
          )}
          {initialData.attachments.length > 0 && (
            <div className="space-y-2">
              {initialData.attachments.map((e) => (
                <div
                  key={e.id}
                  className="flex items-center p-3 w-full bg-sky-100 border-sky-200 border text-sky-700 rounded-md"
                >
                  <File className="h-4 w-4 mr-2 flex-shrink" />
                  <p className="text-sm line-clamp-1">{e.name}</p>
                  {deletingId===e.id && (
                    <div>
                      <Loader2 className='h-4 w-4 animate-spin'/>
                    </div>
                  )}
                  {deletingId!==e.id && (
                    <button
                    onClick={()=>onDelete(e.id)}
                    className='ml-auto hover:opacity-75 transition'>
                      <X className='h-4 w-4 '/>
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </>
      )}
      {isEditing && (
        <div>
          <FileUpload
            endpoint="courseImage"
            onChange={(url) => {
              if (url) {
                onSubmit({ url: url })
              }
            }}
          />
          <div className="text-sm mt-4">
            Add anything your student might need to complete course.
          </div>
        </div>
      )}
    </div>
  )
}

export default Attachmentform
