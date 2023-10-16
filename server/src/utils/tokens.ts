import jwt from "jsonwebtoken";

export const getAccessToken = (_id: string) => {
    return jwt.sign({ _id }, process.env.JWT_ACCESS_TOKEN!, {
        expiresIn: "3h",
    });
};

export const getRefreshToken = (_id: string) => {
    return jwt.sign({ _id }, process.env.JWT_REFRESH_TOKEN!, {
        expiresIn: "1d",
    });
};
