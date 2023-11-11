"use client";
import React, { useEffect, useState } from "react";
import { Html5QrcodeScanType, Html5QrcodeScanner } from "html5-qrcode";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";

const QrCodeScanner = ({ onClose }: { onClose: () => void }) => {
    const queryClient = useQueryClient();
    const [isSuccess, setIsSuccess] = useState(false);

    const addVisitorMutation = useMutation({
        mutationFn: async (data: any) => {
            const response = await axios.post(
                "http://localhost:5050/visitor/add",
                {
                    studentFName: data.studentFName,
                    studentLName: data.studentLName,
                    department: data.studentCourse,
                    timeIn: new Date().toString().slice(3, 15),
                }
            );

            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["visitor", "list"] });
            toast.success("New visitor added!");
        },
        onError: (err: any) => {
            console.log(err);
        },
    });

    useEffect(() => {
        let scanner = new Html5QrcodeScanner(
            "reader",
            {
                fps: 10,
                qrbox: {
                    width: 250,
                    height: 250,
                },
                supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA],
            },
            false
        );

        const success = async (result: any) => {
            scanner.pause();
            scanner.clear();
            setIsSuccess(true);
            onClose();
            addVisitorMutation.mutate(JSON.parse(result));
        };

        scanner.render(success, () => setIsSuccess(false));
    }, []);

    return <div>{!isSuccess ? <div id="reader"></div> : ""}</div>;
};

export default QrCodeScanner;
