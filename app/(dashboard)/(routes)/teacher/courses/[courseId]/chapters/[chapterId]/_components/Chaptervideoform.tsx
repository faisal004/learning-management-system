'use client'

import * as z from 'zod'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import MuxPlayer from '@mux/mux-player-react'
import { Button } from '@/components/ui/button'
import { ImageIcon, Pencil, PlusCircle, Video } from 'lucide-react'
import { useState } from 'react'
import toast from 'react-hot-toast'

import { Chapter, MuxData } from '@prisma/client'
import Image from 'next/image'
import { FileUpload } from '@/components/file-upload'

interface ChaptervideoformProps {
  initialData: Chapter & { muxData?: MuxData | null }
  courseId: string
  chapterId: string
}
const formSchema = z.object({
  videoUrl: z.string().min(1),
})
const Chaptervideoform = ({
  initialData,
  courseId,
  chapterId,
}: ChaptervideoformProps) => {
  const router = useRouter()
  const [isEditing, setIsEditing] = useState(false)
  const toggleEdit = () => setIsEditing((e) => !e)

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}`, values)
      toast.success('Chapter Updated')
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
        Chapter Video
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing && <>Cancel</>}
          {!isEditing && !initialData.videoUrl && (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add a video
            </>
          )}
          {!isEditing && initialData.videoUrl && (
            <>
              {' '}
              <Pencil className="h-4 w-4 mr-2" />
              Edit Image
            </>
          )}
        </Button>
      </div>
      {!isEditing &&
        (!initialData?.videoUrl ? (
          <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
            <Video className="h-10 w-10 text-slate-500" />
          </div>
        ) : (
          <div className="relative aspect-video mt-2"><MuxPlayer
          
          playbackId={initialData?.muxData?.playbackId ||""}/></div>
        ))}
      {isEditing && (
        <div>
          <FileUpload
            endpoint="chapterVideo"
            onChange={(url) => {
              if (url) {
                onSubmit({ videoUrl: url })
              }
            }}
          />
          <div className="text-sm mt-4">Uplaod this chapter&apos;s video </div>
        </div>
      )}
      {initialData.videoUrl && !isEditing && (
        <div className="text-xs text-muted-foreground mt-2">
          Videos take few minutes to process.Refresh the page if videos does not
          appear.
        </div>
      )}
    </div>
  )
}

export default Chaptervideoform
