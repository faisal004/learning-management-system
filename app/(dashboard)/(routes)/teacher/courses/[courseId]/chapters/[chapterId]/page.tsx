import { IconBadge } from '@/components/icons-badge'
import { db } from '@/lib/db'
import { auth } from '@clerk/nextjs'
import { ArrowLeft, Camera, Eye, LayoutDashboard, Video } from 'lucide-react'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React from 'react'

import Chaptertitleform from './_components/Chaptertitleform'
import Chapterdescriptionform from './_components/Chapterdescriptionform'
import Chapteraccessform from './_components/Chapteraccessform'
import Chaptervideoform from './_components/Chaptervideoform'
import { Banner } from '@/components/banner'
import { Chapteractions } from './_components/Chapteractions'

const ChapterId = async ({
  params,
}: {
  params: { courseId: string; chapterId: string }
}) => {
  const { userId } = auth()
  if (!userId) {
    return redirect('/')
  }
  const chapter = await db.chapter.findUnique({
    where: {
      id: params.chapterId,
      courseId: params.courseId,
    },
    include: {
      muxData: true,
    },
  })
  if (!chapter) {
    return redirect('/')
  }
  const requiredField = [chapter.title, chapter.description, chapter.videoUrl]
  const totalFields = requiredField.length
  const completedFields = requiredField.filter(Boolean).length
  const completedText = `(${completedFields}/${totalFields})`
  const isComplete = requiredField.every(Boolean)
  return (
    <>
      {!chapter.isPublished && (
        <Banner
          label="This chapter is unpublished it will not be visible in course"
          variant="warning"
        />
      )}
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="w-full">
            <Link
              className="flex items-center text-sm hover:opacity-75 transition mb-6"
              href={`/teacher/courses/${params.courseId}`}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to course setup
            </Link>
            <div className="flex items-center justify-between w-full">
              <div className="flex flex-col gap-y-2">
                <h1 className="text-2xl font-medium">Chapter Creation</h1>
                <span className="text-sm text-slate-700">
                  Complete all the fields {completedText}
                </span>
              </div>
              <Chapteractions
                disabled={!isComplete}
                courseId={params.courseId}
                chapterId={params.chapterId}
                isPublished={chapter.isPublished}
              />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
          <div className="space-y-4">
            <div>
              <div className="flex flex-row items-center gap-x-2">
                <IconBadge icon={LayoutDashboard} />
                <h2 className="text-xl">Customize your chapter</h2>
              </div>
              <Chaptertitleform
                initialData={chapter}
                courseId={params.courseId}
                chapterId={params.chapterId}
              />
              <Chapterdescriptionform
                initialData={chapter}
                courseId={params.courseId}
                chapterId={params.chapterId}
              />
            </div>
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={Eye} />
                <h2 className="text-xl">Access Settings</h2>
              </div>
              <Chapteraccessform
                initialData={chapter}
                courseId={params.courseId}
                chapterId={params.chapterId}
              />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={Video} />
              <h2 className="text-xl">Add Video</h2>
            </div>
            <Chaptervideoform
              initialData={chapter}
              courseId={params.courseId}
              chapterId={params.chapterId}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default ChapterId
