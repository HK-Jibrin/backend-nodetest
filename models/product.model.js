const sql = require("./db.js");

// Constructor
const Product = function (product) {
  this.name = product.name;
  this.price = product.price;
  this.quantity_in_stock = product.quantity_in_stock;
  this.productImageUrl = product.productImageUrl;
  this.description = product.description;
};

// Insert
Product.create = (newProduct, result) => {
  sql.query("INSERT INTO products SET ?", newProduct, (err, res) => {
    if (err) {
      console.log("error:  ", err);
      result(err, null);
      return;
    }
    console.log("product added: ", { id: res.name, ...newProduct });
    result(null, { id: res.name, ...newProduct });
  });
};

Product.findById = (productId, result) => {
  sql.query(`SELECT * FROM products WHERE _id =   ${productId}`, (err, res) => {
    if (err) {
      console.log("error:  ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("Found Product: ", res[0]);
      result(null, res[0]);
    }
    result({ kind: "not_found" }, null);
  });
};

Product.getAll = (result) => {
  sql.query(`SELECT * FROM products`, (err, res) => {
    if (err) {
      console.log("error:  ", err);
      result(err, null);
      return;
    }
    console.log("products: ", res);
    result(null, res);
  });
};

Product.updateById = (productId, product, result) => {
  sql.query(
    `UPDATE products SET name=?, price=?, quantity_in__stock=?, description=?, WHERE _id =? `,
    [
      product.name,
      product.price,
      product.quantity_in__stock,
      product.productImageUrl,
      product.description,
      productId,
    ],
    (err, res) => {
      if (err) {
        console.log("error:  ", err);
        result(err, null);
        return;
      }

      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }
      console.log("Updated Product: ");
      result(null, { _id: productId, ...product });
    }
  );
};

Product.remove = (productId, result) => {
  sql.query(`DELETE FROM products WHERE _id =   ${productId}`, (err, res) => {
    if (err) {
      console.log("error:  ", err);
      result(err, null);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }
    console.log("Deleted Product: ");
    result(null, res);
  });
};

Product.removeAll = (result) => {
  sql.query(`TRUNCATE TABLE products`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log(`deleted ${res.affectedRows} products`);
    result(null, res);
  });
};


module.exports = Product;