// lib/authMiddleware.js

export function authMiddleware(handler: any) {
    return (req: any, res: any) => {
        // Lakukan pemeriksaan token di sini
        const token = req.cookies.token; // Misalnya, Anda menyimpan token dalam cookie
        ("====================================");
        req;
        ("====================================");
        if (!token) {
            // Jika tidak ada token, alihkan pengguna ke halaman login
            res.writeHead(302, { Location: "/login" });
            res.end();
            return;
        }

        // Token valid, lanjutkan ke halaman yang diminta
        return handler(req, res);
    };
}
