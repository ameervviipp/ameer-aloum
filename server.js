const http  = require('http');
const https = require('https');
const fs    = require('fs');
const path  = require('path');

const PORT   = 5000;
const BUCKET = 'ameer-aluom.firebasestorage.app';

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

function storageRequest(method, objectPath, token, body, contentType, cb) {
    var encoded = objectPath.split('/').map(encodeURIComponent).join('%2F');
    var isUpload = method === 'POST';
    var apiPath  = isUpload
        ? '/v0/b/' + BUCKET + '/o?name=' + encoded + '&uploadType=media'
        : '/v0/b/' + BUCKET + '/o/' + encoded;

    var headers = { 'Authorization': 'Firebase ' + token };
    if (isUpload && body) {
        headers['Content-Type']   = contentType || 'image/png';
        headers['Content-Length'] = body.length;
    }

    var req = https.request({
        hostname: 'firebasestorage.googleapis.com',
        path: apiPath,
        method: method,
        headers: headers
    }, function(res) {
        var data = '';
        res.on('data', function(c) { data += c; });
        res.on('end', function() {
            var ok = res.statusCode >= 200 && res.statusCode < 300;
            cb(ok ? null : new Error('Storage ' + res.statusCode + ': ' + data));
        });
    });
    req.on('error', cb);
    if (body) req.write(body);
    req.end();
}

http.createServer(function(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') { res.writeHead(204); res.end(); return; }

    var reqPath = req.url.split('?')[0];
    console.log('[REQ]', req.method, req.url, '->', reqPath);

    // ── رفع صورة بروفيل: POST /api/upload-profile ──────────────────────────
    if (req.method === 'POST' && reqPath === '/api/upload-profile') {
        readBody(req, function(buf) {
            console.log('[UPLOAD] body bytes:', buf.length);
            try {
                var body  = JSON.parse(buf.toString());
                var code  = (body.code  || '').replace(/[^a-zA-Z0-9_\-]/g, '');
                var dataUrl = body.dataUrl || '';
                var token   = body.token  || '';
                console.log('[UPLOAD] code:', code, 'hasToken:', !!token, 'dataUrlLen:', dataUrl.length);
                if (!code || !dataUrl.startsWith('data:image/') || !token) {
                    return sendJson(res, 400, { ok: false, error: 'بيانات غير صحيحة' });
                }
                var matches = dataUrl.match(/^data:image\/(\w+);base64,(.+)$/);
                if (!matches) return sendJson(res, 400, { ok: false, error: 'صيغة الصورة غير صحيحة' });
                var imgData = Buffer.from(matches[2], 'base64');
                storageRequest('POST', 'profiles/' + code + '.png', token, imgData, 'image/png', function(err) {
                    sendJson(res, err ? 500 : 200, err ? { ok: false, error: err.message } : { ok: true });
                });
            } catch (e) {
                sendJson(res, 400, { ok: false, error: 'خطأ في البيانات' });
            }
        });
        return;
    }

    // ── حذف صورة بروفيل: POST /api/delete-profile-image ───────────────────
    if (req.method === 'POST' && reqPath === '/api/delete-profile-image') {
        readBody(req, function(buf) {
            try {
                var body  = JSON.parse(buf.toString());
                var code  = (body.code  || '').replace(/[^a-zA-Z0-9_\-]/g, '');
                var token = body.token  || '';
                if (!code || !token) return sendJson(res, 400, { ok: false, error: 'بيانات غير صحيحة' });
                storageRequest('DELETE', 'profiles/' + code + '.png', token, null, null, function(err) {
                    sendJson(res, 200, err ? { ok: false, error: 'الصورة غير موجودة' } : { ok: true });
                });
            } catch (e) {
                sendJson(res, 400, { ok: false, error: 'خطأ في البيانات' });
            }
        });
        return;
    }

    // ── خدمة الملفات الثابتة ────────────────────────────────────────────────
    var urlPath = reqPath;
    if (urlPath === '/' || urlPath === '') urlPath = '/index.html';

    var baseDir  = path.resolve(__dirname);
    var filePath = path.resolve(path.join(baseDir, urlPath));
    console.log('[STATIC] baseDir=' + baseDir + ' filePath=' + filePath + ' urlPath=' + urlPath);
    if (!filePath.startsWith(baseDir + path.sep) && filePath !== baseDir) {
        console.log('[403] BLOCKED path traversal: ' + filePath);
        res.writeHead(403); res.end('Forbidden'); return;
    }

    if (urlPath === '/favicon.ico') { res.writeHead(204); res.end(); return; }

    fs.readFile(filePath, function(err, data) {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
            res.end('404 Not Found: ' + urlPath);
            return;
        }
        var ext     = path.extname(filePath).toLowerCase();
        var mime    = mimeTypes[ext] || 'application/octet-stream';
        var headers = { 'Content-Type': mime };
        if (ext === '.html') {
            headers['Cache-Control'] = 'no-store, no-cache, must-revalidate';
            headers['Pragma']  = 'no-cache';
            headers['Expires'] = '0';
        }
        res.writeHead(200, headers);
        res.end(data);
    });
}).listen(PORT, '0.0.0.0', function() {
    console.log('Server running at http://0.0.0.0:' + PORT);
});
