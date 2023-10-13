import jwt from "jsonwebtoken";

const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.SECRET, {
    expiresIn: "1d",
  });
  res.cookie('jwt',token,{
    httpOnly:true,
    secure: process.env.DEV_BUILD==="true"?false:true,
    sameSite:'strict',
    maxAge: 3600*24,
  })
};


export default generateToken