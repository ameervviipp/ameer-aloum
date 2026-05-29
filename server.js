const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 5000;

const mimeTypes = {
    '.html': 'text/html; charset=utf-8',
    '.css':  'text/css',
    '.js':   'application/javascript',
    '.png':  'image/png',
    '.jpg':  'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif':  'image/gif',
    '.svg':  'image/svg+xml',
    '.ico':  'image/x-icon',
    '.json': 'application/json',
};

function readBody(req, cb) {
    var chunks = [];
    req.on('data', function(c) { chunks.push(c); });
    req.on('end', function() { cb(Buffer.concat(chunks)); });
}

function sendJson(res, code, obj) {
    res.writeHead(code, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(obj));
}

http.createServer(function(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') { res.writeHead(204); res.end(); return; }

    // ── رفع صورة بروفيل: POST /api/upload-profile ──────────────────────────
    if (req.method === 'POST' && req.url === '/api/upload-profile') {
        readBody(req, function(buf) {
            try {
                var body = JSON.parse(buf.toString());
                var code = (body.code || '').replace(/[^a-zA-Z0-9_\-]/g, '');
                var dataUrl = body.dataUrl || '';
                if (!code || !dataUrl.startsWith('data:image/')) {
                    return sendJson(res, 400, { ok: false, error: 'بيانات غير صحيحة' });
                }
                var matches = dataUrl.match(/^data:image\/(\w+);base64,(.+)$/);
                if (!matches) return sendJson(res, 400, { ok: false, error: 'صيغة الصورة غير صحيحة' });
                var imgData = Buffer.from(matches[2], 'base64');
                var savePath = path.join(__dirname, 'images', 'profiles', code + '.png');
                fs.mkdirSync(path.dirname(savePath), { recursive: true });
                fs.writeFile(savePath, imgData, function(err) {
                    sendJson(res, err ? 500 : 200, err ? { ok: false, error: 'فشل الحفظ' } : { ok: true });
                });
            } catch (e) {
                sendJson(res, 400, { ok: false, error: 'خطأ في البيانات' });
            }
        });
        return;
    }

    // ── حذف صورة بروفيل: POST /api/delete-profile-image ───────────────────
    if (req.method === 'POST' && req.url === '/api/delete-profile-image') {
        readBody(req, function(buf) {
            try {
                var body = JSON.parse(buf.toString());
                var code = (body.code || '').replace(/[^a-zA-Z0-9_\-]/g, '');
                if (!code) return sendJson(res, 400, { ok: false, error: 'كود غير صحيح' });
                var filePath = path.join(__dirname, 'images', 'profiles', code + '.png');
                fs.unlink(filePath, function(err) {
                    sendJson(res, 200, err ? { ok: false, error: 'الصورة غير موجودة' } : { ok: true });
                });
            } catch (e) {
                sendJson(res, 400, { ok: false, error: 'خطأ في البيانات' });
            }
        });
        return;
    }

    // ── خدمة الملفات الثابتة ────────────────────────────────────────────────
    var urlPath = req.url.split('?')[0];
    if (urlPath === '/' || urlPath === '') urlPath = '/index.html';

    var filePath = path.join(__dirname, urlPath);
    if (!filePath.startsWith(__dirname)) { res.writeHead(403); res.end('Forbidden'); return; }

    fs.readFile(filePath, function(err, data) {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
            res.end('404 Not Found: ' + urlPath);
            return;
        }
        var ext = path.extname(filePath).toLowerCase();
        var mime = mimeTypes[ext] || 'application/octet-stream';
        res.writeHead(200, { 'Content-Type': mime });
        res.end(data);
    });
}).listen(PORT, '0.0.0.0', function() {
    console.log('Server running at http://0.0.0.0:' + PORT);
});
