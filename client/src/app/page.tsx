import CourseChart from "@/components/Charts/CourseChart";
import DailyAttendanceChart from "@/components/Charts/DailyAttendanceChart";
import IssuedBooksChart from "@/components/Charts/IssuedBooksChart";
import { Spacer, VStack } from "@chakra-ui/react";

const HomePage = () => {
    return (
        <div className="w-full min-h-screen flex flex-col items-center justify-between p-6">
            <div className="w-full 2xl:w-[80%] mt-4 flex justify-evenly items-center text-center">
                <div className="w-[11rem] h-[9rem] flex flex-col items-center justify-center gap-2 bg-[#008948] border-2 border-[#F0D77B] rounded-lg">
                    <p className="text-3xl font-bold">500</p>
                    <p className="font-medium">Total Books</p>
                </div>
                <div className="w-[11rem] h-[9rem] flex flex-col items-center justify-center gap-2 bg-[#008948] border-2 border-[#F0D77B] rounded-lg">
                    <p className="text-3xl font-bold">120</p>
                    <p className="font-medium">Total Students</p>
                </div>
                <div className="w-[11rem] h-[9rem] flex flex-col items-center justify-center gap-2 bg-[#008948] border-2 border-[#F0D77B] rounded-lg">
                    <p className="text-3xl font-bold">12</p>
                    <p className="font-medium">Issued Books</p>
                </div>
                <div className="w-[11rem] h-[9rem] flex flex-col items-center justify-center gap-2 bg-[#008948] border-2 border-[#F0D77B] rounded-lg">
                    <p className="text-3xl font-bold">0</p>
                    <p className="font-medium">Borowed Books</p>
                </div>
                <div className="w-[11rem] h-[9rem] flex flex-col items-center justify-center gap-2 bg-[#008948] border-2 border-[#F0D77B] rounded-lg">
                    <p className="text-3xl font-bold">0</p>
                    <p className="font-medium">N/A</p>
                </div>
            </div>

            <Spacer />
            <div className="w-full h-full grid grid-cols-2 gap-4 mt-6">
                <div className="w-full flex justify-center items-center bg-[#008948] p-6 rounded-xl border-[#F0D77B] border-2">
                    <VStack w={"full"}>
                        <p className="mb-4 font-medium">Student Courses</p>

                        <CourseChart />
                    </VStack>
                </div>
                <div className="w-full flex flex-col justify-center items-center gap-4 rounded-xl">
                    <VStack
                        w="full"
                        p={3}
                        rounded="lg"
                        bg="#008948"
                        border="2px"
                        borderColor="#F0D77B"
                    >
                        <p className="font-medium">Attendance Analytics</p>
                        <DailyAttendanceChart />
                    </VStack>
                    <VStack
                        w="full"
                        p={3}
                        rounded="lg"
                        bg="#008948"
                        border="2px"
                        borderColor="#F0D77B"
                    >
                        <p className="font-medium">Issued Books</p>
                        <IssuedBooksChart />
                    </VStack>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
