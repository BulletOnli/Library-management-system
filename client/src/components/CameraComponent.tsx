"use client";
import React, { useRef, useEffect } from "react";

function CameraComponent() {
    const videoRef = useRef<HTMLVideoElement | null>(null);

    useEffect(() => {
        async function enableCamera() {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({
                    video: true,
                });

                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
            } catch (error) {
                console.error("Error accessing camera:", error);
            }
        }
        enableCamera();
    }, []);

    return (
        <div>
            <video ref={videoRef} autoPlay />
        </div>
    );
}

export default CameraComponent;
