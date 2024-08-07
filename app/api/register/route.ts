import bcrypt from "bcryptjs";
import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(
    request:Request
){
    try{
    const body=await request.json();

    const {
        email,
        name,
        password
    }=body;
    //console.log(email,password,name);
    if(!email || !password || !name){
        return new NextResponse('Missing Info',{status:400});
    }
    const hashedPassword=await bcrypt.hash(password,12);
    const user= await prisma.user.create({
        data:{
            email,
            name,
            hashedPassword
        }
    });
    return NextResponse.json(user);
}
catch(error:any){
    console.log(error,'REGISTERATION ERROR');
    return new NextResponse('INTERNAL ERROR',{status:500});
}
}