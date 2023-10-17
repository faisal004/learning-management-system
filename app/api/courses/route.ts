import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs"
import { NextRequest, NextResponse } from "next/server"

export async function POST( req:Request,){
    try {
        const {userId}=auth()
        const {title}= await req.json()
        if(!userId){
            return new NextResponse("Unauthorised",{status:401})

        }
        const course=await db.course.create({
            data:{
                userId,
                title,
            }
        })
        console.log(userId)
        return NextResponse.json(course)
    } catch (error) {
        console.log("{COURSES",error)
        return new NextResponse("Internal Error",{status:500})
    }
}