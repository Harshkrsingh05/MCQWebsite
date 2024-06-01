import React from "react";
import { Button } from "@/components/ui/button";
import Link from 'next/link'
const Test=()=>{
    return (
        <>
        <div><h1 className="text-red-600">i am hArsh</h1></div>
        <Button className="mx-2"><Link href="/instructor/create">
            Create Quiz
        </Link>
        </Button>
        <Button className="mx-2"><Link href="/learner/attend">Attend Quiz</Link> </Button>
        </>
    );
};
export default Test;