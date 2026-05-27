const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

// 允許解析 JSON 資料與靜態網頁檔案
app.use(express.json());
app.use(express.static(__dirname));

// 📝 API：接收前端傳來的新管理員，並寫入 passuser.json
app.post('/api/add-admin', (req, res) => {
    const newAdmin = req.body;
    const jsonPath = path.join(__dirname, 'passuser.json');

    // 1. 讀取現有的 JSON 檔案
    fs.readFile(jsonPath, 'utf8', (err, data) => {
        let adminList = [];
        if (!err && data) {
            try {
                adminList = JSON.parse(data);
            } catch (e) {
                adminList = [];
            }
        }

        // 2. 把前端傳來的新管理員塞進陣列
        adminList.push(newAdmin);

        // 3. 寫回 passuser.json 檔案中
        fs.writeFile(jsonPath, JSON.stringify(adminList, null, 4), 'utf8', (writeErr) => {
            if (writeErr) {
                return res.status(500).json({ success: false, message: '寫入檔案失敗' });
            }
            res.json({ success: true, message: '成功寫入 passuser.json！' });
        });
    });
});

app.listen(PORT, () => {
    console.log(`🚀 伺服器已啟動：http://localhost:${PORT}`);
});