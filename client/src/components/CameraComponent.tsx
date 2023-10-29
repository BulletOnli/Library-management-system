"use client";
import React, { useEffect, useState } from "react";
import { Html5QrcodeScanType, Html5QrcodeScanner } from "html5-qrcode";

const CameraComponent = () => {
    const [scanResult, setScanResult] = useState(null);

    //TODO Fix the camera, 2 cameras rendered

    useEffect(() => {
        const success = (result: any) => {
            scanner.clear();
            setScanResult(result);
            console.log(JSON.parse(result));
        };

        const error = (err: any) => {
            console.log(err);
        };

        const scanner = new Html5QrcodeScanner(
            "reader",
            {
                fps: 10,
                qrbox: {
                    width: 250,
                    height: 250,
                },
                rememberLastUsedCamera: true,
                supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA],
            },
            false
        );
        scanner.render(success, error);
    }, []);

    return (
        <div>
            {scanResult ? <div>{scanResult}</div> : <div id="reader"></div>}
            {/* <div id="reader"></div> */}
        </div>
    );
};

export default CameraComponent;
