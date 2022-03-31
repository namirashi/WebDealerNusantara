var express = require("express");
var router = express.Router();
var authentication_mdl = require("../middlewares/authentication");
var session_store;
/* GET Customer page. */

router.get("/", authentication_mdl.is_login, function (req, res, next) {
  req.getConnection(function (err, connection) {
    var query = connection.query(
      "SELECT * FROM customer",
      function (err, rows) {
        if (err) var errornya = ("Error Selecting : %s ", err);
        req.flash("msg_error", errornya);
        res.render("customer/list", {
          title: "Customers",
          data: rows,
          session_store: req.session,
        });
      }
    );
    //console.log(query.sql);
  });
});

router.delete(
  "/delete/(:id)",
  authentication_mdl.is_login,
  function (req, res, next) {
    req.getConnection(function (err, connection) {
      var customer = {
        id: req.params.id,
      };

      var delete_sql = "delete from customer where ?";
      req.getConnection(function (err, connection) {
        var query = connection.query(
          delete_sql,
          customer,
          function (err, result) {
            if (err) {
              var errors_detail = ("Error Delete : %s ", err);
              req.flash("msg_error", errors_detail);
              res.redirect("/customers");
            } else {
              req.flash("msg_info", "Delete Customer Success");
              res.redirect("/customers");
            }
          }
        );
      });
    });
  }
);
router.get(
  "/edit/(:id)",
  authentication_mdl.is_login,
  function (req, res, next) {
    req.getConnection(function (err, connection) {
      var query = connection.query(
        "SELECT * FROM customer where id=" + req.params.id,
        function (err, rows) {
          if (err) {
            var errors_detail = ("Error Selecting : %s ", err);
            req.flash("msg_error", errors_detail);
            res.redirect("/customers");
          } else {
            if (rows.length <= 0) {
              req.flash("msg_error", "Customer can't be find!");
              res.redirect("/customers");
            } else {
              console.log(rows);
              res.render("customer/edit", {
                title: "Edit ",
                data: rows[0],
                session_store: req.session,
              });
            }
          }
        }
      );
    });
  }
);
router.put(
  "/edit/(:id)",
  authentication_mdl.is_login,
  function (req, res, next) {
    req.assert("pembayaran", "Please fill the nama").notEmpty();
    var errors = req.validationErrors();
    if (!errors) {
      v_id_cust = req.sanitize("id_cust").escape();
      v_nama = req.sanitize("nama").escape().trim();
      v_tanggal = req.sanitize("tanggal").escape();
      v_pembayaran = req.sanitize("pembayaran").escape();
      v_alamat = req.sanitize("alamat").escape().trim();

      var customer = {
        id_cust: v_id_cust,
        nama: v_nama,
        tanggal: v_tanggal,
        pembayaran: v_pembayaran,
        alamat: v_alamat,
      };

      var update_sql = "update customer SET ? where id = " + req.params.id;
      req.getConnection(function (err, connection) {
        var query = connection.query(
          update_sql,
          customer,
          function (err, result) {
            if (err) {
              var errors_detail = ("Error Update : %s ", err);
              req.flash("msg_error", errors_detail);
              res.render("customer/edit", {
                id_cust: req.param("id_cust"),
                nama: req.param("nama"),
                tanggal: req.param("tanggal"),
                pembayaran: req.param("pembayaran"),
                alamat: req.param("alamat"),
              });
            } else {
              req.flash("msg_info", "Update customer success");
              res.redirect("/customers/edit/" + req.params.id);
            }
          }
        );
      });
    } else {
      console.log(errors);
      errors_detail = "<p>Sory there are error</p><ul>";
      for (i in errors) {
        error = errors[i];
        errors_detail += "<li>" + error.msg + "</li>";
      }
      errors_detail += "</ul>";
      req.flash("msg_error", errors_detail);
      res.redirect("/customers/edit/" + req.params.id);
    }
  }
);

router.post("/add", authentication_mdl.is_login, function (req, res, next) {
  req.assert("pembayaran", "Please fill the nama").notEmpty();
  var errors = req.validationErrors();
  if (!errors) {
      v_id_cust = req.sanitize("id_cust").escape();
      v_nama = req.sanitize("nama").escape().trim();
      v_tanggal = req.sanitize("tanggal").escape();
      v_pembayaran = req.sanitize("pembayaran").escape();
      v_alamat = req.sanitize("alamat").escape().trim();


    var customer = {
      id_cust: v_id_cust,
      nama: v_nama,
      tanggal: v_tanggal,
      pembayaran: v_pembayaran,
      alamat: v_alamat,
    };

    var insert_sql = "INSERT INTO customer SET ?";
    req.getConnection(function (err, connection) {
      var query = connection.query(
        insert_sql,
        customer,
        function (err, result) {
          if (err) {
            var errors_detail = ("Error Insert : %s ", err);
            req.flash("msg_error", errors_detail);
            res.render("customer/add-customer", {
              id_cust: req.param("id_cust"),
              nama: req.param("nama"),
              tanggal: req.param("tanggal"),
              pembayaran: req.param("pembayaran"),
              alamat: req.param("alamat"),
              session_store: req.session,
            });
          } else {
            req.flash("msg_info", "Create customer success");
            res.redirect("/customers");
          }
        }
      );
    });
  } else {
    console.log(errors);
    errors_detail = "<p>Sory there are error</p><ul>";
    for (i in errors) {
      error = errors[i];
      errors_detail += "<li>" + error.msg + "</li>";
    }
    errors_detail += "</ul>";
    req.flash("msg_error", errors_detail);
    res.render("customer/add-customer", {
      nama: req.param("nama"),
      alamat: req.param("alamat"),
      session_store: req.session,
    });
  }
});

router.get("/add", authentication_mdl.is_login, function (req, res, next) {
  res.render("customer/add-customer", {
    title: "Add New Customer",
    id_cust: "",
    nama: "",
    tanggal: "",
    pembayaran: "",
    alamat: "",
    session_store: req.session,
  });
});

module.exports = router;
