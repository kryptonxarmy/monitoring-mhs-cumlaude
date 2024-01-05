const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const port = 8081;
const multer = require("multer");
const path = require("path");
const md5 = require("md5");

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
app.get("/berkasMhs", (req, res) => {
  const query = "SELECT * FROM berkas_mhs";

  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error getting all berkas: " + err);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }

    res.json(results);
  });
});

// RESTful API endpoint untuk mendapatkan berkas berdasarkan ID
app.get("/berkasMhs/:id", (req, res) => {
  const berkasId = req.params.id;
  const query = "SELECT * FROM berkas_mhs WHERE id = ?";

  connection.query(query, [berkasId], (err, results) => {
    if (err) {
      console.error("Error getting berkas by ID: " + err);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }

    if (results.length === 0) {
      res.status(404).json({ error: "Berkas not found" });
      return;
    }

    res.json(results[0]);
  });
});

// RESTful API endpoint untuk memperbarui berkas berdasarkan ID
app.put("/berkasMhs/:id", (req, res) => {
  const berkasId = req.params.id;
  const newStatus = req.body.status; // Ambil status baru dari req.body

  // Simpan NIM sebelum pembaruan
  let currentNIM;

  // Ambil NIM sebelum pembaruan
  const getNIMQuery = "SELECT nim FROM berkas_mhs WHERE id = ?";

  connection.query(getNIMQuery, [berkasId], (err, results) => {
    if (err) {
      console.error("Error getting NIM before update: " + err);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }

    if (results.length === 0) {
      res.status(404).json({ error: "Berkas not found" });
      return;
    }

    currentNIM = results[0].nim;

    // Lakukan pembaruan status
    const updateQuery = "UPDATE berkas_mhs SET status = ? WHERE id = ?";

    connection.query(updateQuery, [newStatus, berkasId], (updateErr) => {
      if (updateErr) {
        console.error("Error updating berkas: " + updateErr);
        res.status(500).json({ error: "Internal Server Error" });
        return;
      }

      // Panggil endpoint /jadwalSidang dengan NIM yang sudah diperoleh
      res.redirect(`/jadwalSidang?nim=${currentNIM}`);
    });
  });
});
// RESTful API endpoint untuk menghapus berkas berdasarkan ID

// -------------------------- DELETE START -------------------------------------
app.delete("/berkasMhs/:id", async (req, res) => {
  const fileId = req.params.id;

  try {
    // Perform the deletion operation in your database
    // Example: Delete from berkas_mhs where id = fileId

    // Assuming you are using a MySQL database
    const sql = "DELETE FROM berkas_mhs WHERE id = ?";
    connection.query(sql, [fileId], (err, result) => {
      if (err) {
        console.error(err.message);
        return res.status(500).json({ msg: "Internal Server Error" });
      }

      if (result.affectedRows > 0) {
        res.status(200).json({ msg: "File Deleted Successfully" });
      } else {
        res.status(404).json({ msg: "File not found" });
      }
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
});

// -------------------------- DELETE END -------------------------------------

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const fileName = md5(file.originalname + Date.now()) + ext;
    cb(null, fileName);
  },
});

const upload = multer({ storage: storage });

// Endpoint for file upload
app.post("/berkasMhs", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send("No file was uploaded.");
    }
    const keterangan = req.body.keterangan;
    const nim = req.body.nim;
    const score = req.body.score || null;
    const judulJurnal = req.body.judul_jurnal || null;
    const tingkat = req.body.tingkat || null;
    const status = "Delivered";
    const nama_berkas = req.body.nama_berkas;

    const fileName = req.file.filename;
    const url = `${req.protocol}://${req.get("host")}/uploads/${fileName}`;
    try {
      const sql = "INSERT INTO berkas_mhs (nama_berkas, nim, keterangan, status, file_berkas, score, judul_jurnal, tingkat) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
      const values = [nama_berkas, nim, keterangan, status, url, score, judulJurnal, tingkat];

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

// ----------------- UNTUK GET METHOD DARI KAPRODI ------------------
app.get("/berkasKaprodi", (req, res) => {
  const query = `
  SELECT bm.*, u.name AS user_name
  FROM berkas_mhs bm
  INNER JOIN users u ON bm.nim = u.user_id  
  `;

  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error getting all berkas: " + err);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
    res.json(results);
  });
});
// ----------------- UNTUK GET METHOD DARI KAPRODI ------------------

// ----------------- UNTUK GET METHOD DARI KAPRODI ------------------
app.post("/getInfoMhs", (req, res) => {
  const nim = req.body.nim;
  if (!nim) {
    return res.status(400).json({ error: "NIM is required in the request body." });
  }

  const query = `
    SELECT users.name, berkas_mhs.*
    FROM berkas_mhs
    JOIN users ON berkas_mhs.nim = users.user_id
    WHERE berkas_mhs.nim = '${nim}'
      AND berkas_mhs.nama_berkas IN ('TAK', 'EPrT', 'Jurnal', 'Bimbingan')
      AND berkas_mhs.status = 'Approved'
    ORDER BY berkas_mhs.updated_at DESC;
  `;

  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error getting berkas info: " + err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    res.json(results);
  });
});

app.get("/getApprovalStatus", (req, res) => {
  const nim = req.query.nim;

  const query = `
    SELECT nama_berkas, status
    FROM berkas_mhs
    WHERE nim = '${nim}'
      AND nama_berkas IN ('TAK', 'EPrT', 'Jurnal');
  `;

  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error getting approval status: " + err);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }

    const approvalStatus = {};
    results.forEach((result) => {
      approvalStatus[result.nama_berkas] = result.status;
    });

    res.json(approvalStatus);
  });
});

app.get("/jadwalSidang", (req, res) => {
  const nim = req.query.nim;

  // Query untuk mengambil data TAK, EPrT, dan Jurnal yang sudah Approved berdasarkan nim
  const query = `
    SELECT berkas_mhs.nim, users.name
    FROM berkas_mhs
    JOIN users ON berkas_mhs.nim = users.user_id
    WHERE berkas_mhs.nim = '${nim}' AND berkas_mhs.status = 'Approved'
      AND berkas_mhs.nama_berkas IN ('TAK', 'EPrT', 'Jurnal');
  `;

  // Eksekusi query
  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error getting approved data: " + err);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }

    if (results.length !== 3) {
      // Jika tidak ada data yang memenuhi kriteria atau belum semuanya di-approved
      res.status(404).json({ error: "Not all required documents are approved for the specified NIM" });
      return;
    }

    // Jika ada data yang memenuhi kriteria, masukkan ke dalam tabel sidang
    const insertQuery = `
      INSERT INTO sidang (nama_mhs, nim, date, periode, status)
      VALUES ('${results[0].name}', '${results[0].nim}', NOW(), 'semester_ini', 'Approved');
    `;

    // Eksekusi query untuk insert ke tabel sidang
    connection.query(insertQuery, (insertErr, insertResults) => {
      if (insertErr) {
        console.error("Error inserting data into sidang: " + insertErr);
        res.status(500).json({ error: "Internal Server Error" });
        return;
      }

      // Berhasil memasukkan data ke dalam tabel sidang
      res.json({ message: "Data successfully inserted into sidang" });
    });
  });
});

// ----------------- UNTUK GET METHOD DARI KAPRODI ------------------

// BERKAS MAHASISWA
