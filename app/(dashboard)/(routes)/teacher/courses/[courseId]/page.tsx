import { db } from '@/lib/db'
import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import { boolean } from 'zod'
import { IconBadge } from '@/components/icons-badge'
import { LayoutDashboard } from 'lucide-react'
import Titleform from '../_components/Titleform'
import Descriptionform from '../_components/Descriptionform'
import Imageform from '../_components/Imageform'
import Categoryform from '../_components/Categoryform'

const CourseIdPage = async ({ params }: { params: { courseId: string } }) => {
  const { userId } = auth()
  if (!userId) {
    return redirect('/')
  }

  const course = await db.course.findUnique({
    where: {
      id: params.courseId,
    },
  })

  const categories = await db.category.findMany({
    orderBy: {
      name: 'asc',
    },
  })

  if (!course) {
    return redirect('/')
  }

  const requiredFields = [
    course.title,
    course.description,
    course.imageUrl,
    course.price,
    course.categoryId,
  ]
  const totlaFields = requiredFields.length
  const completedFields = requiredFields.filter(Boolean).length
  const completionText = `(${completedFields}/${totlaFields})`

  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-y-2">
          <h1 className="text-2xl font-medium">Course Setup</h1>
          <span className="text-sm text-slate-700">
            Complete all fields {completionText}
          </span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
        <div>
          <div className="flex items-center gap-x-2">
            <IconBadge icon={LayoutDashboard} />
            <h2 className="text-xl font-medium">Customize your course</h2>
          </div>
          <div>
            <Titleform initialData={course} courseId={course.id} />
            <Descriptionform initialData={course} courseId={course.id} />
            <Imageform initialData={course} courseId={course.id} />
            <Categoryform
              initialData={course}
              courseId={course.id}
              options={categories.map((category) => ({
                label: category.name,
                value: category.id,
              }))}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default CourseIdPage
