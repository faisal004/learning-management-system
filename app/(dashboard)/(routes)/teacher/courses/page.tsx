import { auth } from "@clerk/nextjs"
import { columns } from "./_components/columns"
import { DataTable } from "./_components/data-table"
import { redirect } from "next/navigation"
import { db } from "@/lib/db"




const Coursepage = async() => {
  const {userId}= auth() 
  if(!userId){
    return redirect("/")
  }
  const course=await db.course.findMany({
    where:{
      userId,
    },
    orderBy:{
      createdAt:"desc"
    }
  })
 
  return (
    <div className="p-6">
      
      <DataTable
      columns={columns}
      data={course}
      />
    </div>
  )
}

export default Coursepage
