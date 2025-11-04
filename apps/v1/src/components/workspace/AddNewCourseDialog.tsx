'use client'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "../ui/textarea"
import { Switch } from "@/components/ui/switch"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Button } from "../ui/button"
import { useState } from "react"
import  axios  from "axios"
import { Loader2Icon, Sparkles } from "lucide-react"
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from "next/navigation"

export const AddNewCourseDialog = ({ children }: any) => {

    const [loading, setLoading] = useState(false);

    const [formData, setFormData] =  useState<Record<string, any>>({
        courseName: '',
        courseDescription: '',
        numberOfLessons: 1,
        includeVideo: false,
        difficultyLevel: '',
        category: '',
    });

    const router = useRouter();

    const onHandelInputChange = (field: string, value: any) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));

    }

    const onGenerate = async () => {
        // Logic to generate course using AI based on formData
        console.log("Generating course with data: ", formData);
        const courseId = uuidv4();
        setLoading(true)
        try {
        const response = await axios.post('/api/generate-course-layout', {
            ...formData,
            courseId: courseId
        });
        console.log("AI Generated Course: ", response.data);
        setLoading(false)
        router.push(`/workspace/edit-course/${courseId}`);
        }
        catch (error){
            setLoading(false)
            console.log(error)
        }
    }

    return (
        <>
            <Dialog>
                <DialogTrigger asChild>{children}</DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Create New Course Using AI</DialogTitle>
                        <DialogDescription asChild>
                            <div className="flex flex-col gap-2 mt-4">
                                <div>
                                    <Label>Course Name</Label>
                                    <Input type="text" placeholder="Enter course name" className="w-full mt-2 mb-4" onChange={(event)=>onHandelInputChange('courseName', event?.target.value)}/>
                                </div>

                                <div>
                                    <Label>Course Description</Label>
                                    <Textarea placeholder="Enter course description" className="w-full mt-2 mb-4" onChange={(event)=>onHandelInputChange('courseDescription', event?.target.value)}/>
                                </div>

                                 <div>
                                    <Label>Number of Lessons</Label>
                                    <Input type="number" placeholder="Enter number of lessons" className="w-full mt-2 mb-4" onChange={(event)=>onHandelInputChange('numberOfLessons', event?.target.value)}/>
                                </div>

                                <div className="flex gap-3 items-center mb-2">
                                    <Label>Include Video</Label>
                                    <Switch className="cursor-pointer" onCheckedChange={() => onHandelInputChange('includeVideo', !formData?.includeVideo)} />
                                </div>

                                <div>
                                    <Label>Difficulty Level</Label>
                                    <Select onValueChange={(value) => onHandelInputChange('difficultyLevel', value)}>
                                        <SelectTrigger className="w-full mt-2 mb-4">
                                            <SelectValue placeholder="Select difficulty level" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="easy">Easy</SelectItem>
                                            <SelectItem value="medium">Medium</SelectItem>
                                            <SelectItem value="hard">Hard</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                
                                 <div>
                                    <Label>Category</Label>
                                    <Input type="text" placeholder="Enter category {separated by comma}" className="w-full mt-2 mb-4" onChange={(event)=>onHandelInputChange('category', event?.target.value)}/>
                                </div>

                                <div>

                                    
                                    <Button variant="default" className="w-full mt-4 text-white cursor-pointer" onClick={onGenerate} disabled={loading}>
                                        {loading ? <Loader2Icon className="animate-spin" /> : <Sparkles />}
                                            Generate Course
                                    </Button>
                                </div>
                            </div>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>

        </>
    )
}