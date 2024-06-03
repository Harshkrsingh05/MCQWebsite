"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  
import Link from 'next/link'
import { BackgroundBeams } from "../ui/background-beams";

const Test=()=>{
    return (
        <div className="h-[50rem] w-full rounded-md bg-neutral-950 relative flex flex-col items-center justify-center antialiased">
        <BackgroundBeams/>
        <div className="text-orange-600 text-3xl font-semibold font-serif antialiased absolute top-0 right-[45%] m-4"><h1 className="" style={{textShadow: "#FC0 1px 0 10px"}}>IPROPEL</h1></div>
        <Card className="bg-orange-100 h-[20rem]">
            <CardHeader>
                <CardTitle className="mt-[1rem]">Welcome to Ipropel</CardTitle>
                <CardDescription className="mt-[2rem]">Your own Quiz website.</CardDescription>
            </CardHeader>
            <CardContent className="mt-[5rem]">
                <Button className="relative mx-2 my-2 font-medium font-sans hover:bg-sky-700 bg-orange-500 shadow-lg shadow-orange-500/50"><Link href="/instructor/create">
                        Create Quiz
                    </Link>
                </Button>
                <Button className="mx-2 relative my-2 font-medium font-sans hover:bg-sky-700 bg-orange-500 shadow-lg shadow-orange-500/50" ><Link href="/learner/attend">Attend Quiz</Link> </Button>
            </CardContent>
        </Card>
        </div>
    );
};
export default Test;