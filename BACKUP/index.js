const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const port = 8080;
const multer = require('multer')
const path = require('path');
const md5 = require('md5')



const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.listen(port, (req, res) => {
  console.log(`Server is running on http://localhost:${port}`);
});

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "monitoring-cumlaude",
});

// Tes koneksi
connection.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    return;
  }
  console.log("Connected to MySQL");
});

app.get("/", (req, res) => {
  res.send("Welcome to the API");
});

// app.post("/login", (req, res) => {
//   const { user_id, password } = req.body;
//   const sql = `SELECT from users WHERE user_id=${user_id},password=${password}` 
//   res.send(sql)
// });

app.post("/login", (req, res) => {
  const { user_id, password } = req.body;
  const sql = `SELECT * FROM users WHERE user_id = ? AND password = ?`;
  connection.query(sql, [user_id, password], (err, result) => {
    if (result.length > 0) {
      const { id, user_id, role, name } = result[0];
      return res.status(200).json({ id, user_id, role, name, message: "Login successfully" });
    } else {
      return res.status(401).send("Yok Bismillah yok login");
    }
  });
});


// BERKAS MAHASISWA

// RESTful API endpoint untuk mendapatkan semua berkas
app.get('/berkasMhs', (req, res) => {
  const query = 'SELECT * FROM berkas_mhs';

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error getting all berkas: ' + err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    res.json(results);
  });
});

// RESTful API endpoint untuk membuat berkas baru
// app.post('/berkasMhs', (req, res) => {
//   const newBerkas = req.body;

//   const query = 'INSERT INTO berkas_mhs SET ?';

//   connection.query(query, newBerkas, (err, results) => {
//     if (err) {
//       console.error('Error creating berkas: ' + err);
//       res.status(500).json({ error: 'Internal Server Error' });
//       return;
//     }

//     res.json({ id: results.insertId });
//   });
// });

// RESTful API endpoint untuk mendapatkan berkas berdasarkan ID
app.get('/berkasMhs/:id', (req, res) => {
  const berkasId = req.params.id;
  const query = 'SELECT * FROM berkas_mhs WHERE id = ?';

  connection.query(query, [berkasId], (err, results) => {
    if (err) {
      console.error('Error getting berkas by ID: ' + err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    if (results.length === 0) {
      res.status(404).json({ error: 'Berkas not found' });
      return;
    }

    res.json(results[0]);
  });
});

// RESTful API endpoint untuk memperbarui berkas berdasarkan ID
app.put('/berkasMhs/:id', (req, res) => {
  const berkasId = req.params.id;
  const updatedData = req.body;

  const query = 'UPDATE berkas_mhs SET ? WHERE id = ?';

  connection.query(query, [updatedData, berkasId], (err) => {
    if (err) {
      console.error('Error updating berkas: ' + err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    res.json({ message: 'Berkas updated successfully' });
  });
});

// RESTful API endpoint untuk menghapus berkas berdasarkan ID
app.delete('/berkasMhs/:id', (req, res) => {
  const berkasId = req.params.id;
  const query = 'DELETE FROM berkas_mhs WHERE id = ?';

  connection.query(query, [berkasId], (err) => {

    if (err) {
      console.error('Error deleting berkas: ' + err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    res.json({ message: 'Berkas deleted successfully' });
  });
});


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads');
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const fileName = md5(file.originalname + Date.now()) + ext;
    cb(null, fileName);
  },
});

const upload = multer({ storage: storage });

// Endpoint for file upload
app.post('/berkasMhs', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send('No file was uploaded.');
    }

    const keterangan = req.body.keterangan;
    const keperluan = req.body.keperluan;
    const status = req.body.status;
    const nama_berkas = req.body.nama_berkas;

    const fileName = req.file.filename;
    const url = `${req.protocol}://${req.get("host")}/uploads/${fileName}`;
    
    // Your validation logic for file type and size goes here

    try {
      const sql = 'INSERT INTO berkas_mhs (nama_berkas, nim, keterangan, status, file_berkas) VALUES (?, ?, ?, ?, ?)';
      const values = [nama_berkas, nim, keterangan,  "Delivered" , url];

      connection.query(sql, values, (err, result) => {
        if (err) {
          console.log(err.message);
          return res.status(500).json({ msg: "Internal Server Error" });
        }

        if (result.affectedRows > 0) {
          res.status(201).json({ msg: "Product Created Successfully" });
        } else {
          return res.status(401).send("Failed to insert data into the database");
        }
      });
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ msg: "Internal Server Error" });
    }
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
});
  

      

// BERKAS MAHASISWA

