"use client"

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "../ui/textarea"
import { CoachingExpert } from "../../constants/constant"
import { useState } from "react"
import { Button } from "../ui/button"
import axios from 'axios'
import { useRouter } from "next/navigation"
import { Loader2Icon } from "lucide-react"
import { v4 as uuidv4 } from 'uuid';

const UserInputDialog = ({
  children, coachingOptions
}: {
  children: React.ReactNode, coachingOptions: any
}) => {

  const [selectedExpert, setSelectedExpert] = useState<string>();
  const [topic, setTopic] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);
  const [openDialog,setOpenDialog] = useState<boolean>(false);


  const route = useRouter()

  const onClickStart = async () => {
    const roomId = uuidv4();
    setLoading(true)
    const response = await axios.post('/api/discussion-room', {
      roomId : roomId,
      coachingOption: coachingOptions,
      topic: topic,
      expertName: selectedExpert
    });

    console.log("discusin room response data",response.data);
    
    setLoading(false)
    setOpenDialog(false);
    route.push('/discussion-room/'+roomId)
  }

  return (


    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>AI Mock Interview</DialogTitle>
          <DialogDescription>
            Enter a topic to master your skills in our guided AI mock interview. You can adjust the prompt later inside the session.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4 space-y-5">
          <div>
            <Textarea
              className="mt-1"
              placeholder="e.g., Software Engineering, Data Science, Product Management..."
              onChange={(e)=>setTopic(e.target.value)}
            />
            <p className="mt-2 text-sm text-neutral-400">
              Try to be as specific as possible for better results.
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold text-neutral-300">Popular experts</p>
            <div className="">
              {CoachingExpert.map((expert: any, index: number) => (
                <div key={`${index}`} className="inline-flex flex-col items-center gap-2 mr-6 mt-4" onClick={()=>setSelectedExpert(expert.name)}>
                <span
                  key={`${index}`}
                  className={`rounded-full bg-neutral-800 text-neutral-300 w-15 h-15 flex items-center justify-center hover:scale-105 transition-all text-xl font-bold cursor-pointer ${selectedExpert === expert.name? 'border-2 border-blue-500': ''}`}
                >
                  {expert.avatar}
                </span>
                <span key={`${index}-name`}>{expert.name}</span>
                </div>
                
              ))}
            </div>
          </div>
          <div className="flex justify-end mt-6">
            <DialogClose asChild><Button variant="outline" className="mr-4">Cancel</Button></DialogClose>
            <Button variant='default' disabled={loading || !topic || !selectedExpert} onClick={onClickStart} >
              {loading && <Loader2Icon className="animate-spin" />} Start
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default UserInputDialog