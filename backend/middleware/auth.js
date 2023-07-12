import jwt from 'jsonwebtoken'

export default function auth(req, res, next) {
    try {

        const token = req.header('x-auth-token');

        try {
            const decoded = jwt.verify(token, process.env.SECRET_KEY);
            req.user = decoded.user;
            next();
        }
        catch(err) {
            return res.status(400).send('Invalid Token');
        }
        
    }
    catch(err) {
        console.errot(err);
        res.send("error");
    }
}