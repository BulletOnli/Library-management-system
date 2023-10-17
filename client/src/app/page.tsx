import { Button } from "@chakra-ui/react";

const HomePage = () => {
    return (
        <div className="w-full flex flex-col items-center p-6">
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
        </div>
    );
};

export default HomePage;
