const express = require("express");
const fileUpload = require("express-fileupload");
const csv = require("csv-parser");
const fs = require("fs");

const app = express();

app.use(fileUpload());

app.post("/upload", (req, res) => {
  if (!req.files || !req.files.file) {
    return res.status(400).json({ error: "Nenhum arquivo enviado" });
  }

  const file = req.files.file;

  if (file.mimetype !== "text/csv") {
    return res.status(400).json({
      error: "Formato de arquivo inválido. Apenas arquivos CSV são permitidos",
    });
  }

  const products = [];
  const errors = [];

  fs.createReadStream(file.path)
    .pipe(csv())
    .on("data", (row) => {
      if (!row.code || !row.name || !row.price) {
        errors.push("Campos obrigatórios ausentes");
        return;
      }

      if (!isValidProductCode(row.code)) {
        errors.push(`Código de produto inválido: ${row.code}`);
        return;
      }

      if (!row.price || isNaN(parseFloat(row.price))) {
        errors.push(`Preço inválido: ${row.price}`);
        return;
      }

      if (!isValidRules(row)) {
        errors.push(`Regras inválidas para o produto: ${row.code}`);
        return;
      }

      products.push(row);
    })
    .on("end", () => {
      res.json({ products, errors });
    })
    .on("error", (err) => {
      res.status(500).json({ error: err.message });
    });

  const uploadPath = __dirname + "/uploads/" + file.name;
  file.mv(uploadPath, (err) => {
    if (err) {
      console.error(err);
      return res
        .status(500)
        .json({ error: "Ocorreu um erro ao salvar o arquivo" });
    }

    function isValidProductCode(code) {
      if (code.toString().length !== 10) {
        return false;
      }
      if (typeof code !== "bigint") {
        return false;
      }
      return true;
    }

    function isValidRules(product) {
        if (product.sales_price < product.cost_price) {
            return false;
          }
          const results = [];
          fs.createReadStream(uploadPath)
            .pipe(csv())
            .on("data", (data) => results.push(data))
            .on("end", () => {
             //////////////////////////////
              res.json({ message: "Arquivo enviado e processado com sucesso" });
            });
          };
        });
      })