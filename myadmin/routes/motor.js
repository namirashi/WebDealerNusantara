var express = require("express");
var router = express.Router();
var authentication_mdl = require("../middlewares/authentication");
var session_store;
/* GET Motor page. */

router.get("/", authentication_mdl.is_login, function (req, res, next) {
  req.getConnection(function (err, connection) {
    var query = connection.query(
      "SELECT * FROM motor",
      function (err, rows) {
        if (err) var errornya = ("Error Selecting : %s ", err);
        req.flash("msg_error", errornya);
        res.render("motor/list", {
          title: "Motor",
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
      var motor = {
        id: req.params.id,
      };

      var delete_sql = "delete from motor where ?";
      req.getConnection(function (err, connection) {
        var query = connection.query(
          delete_sql,
          motor,
          function (err, result) {
            if (err) {
              var errors_detail = ("Error Delete : %s ", err);
              req.flash("msg_error", errors_detail);
              res.redirect("/motor");
            } else {
              req.flash("msg_info", "Delete Motor Success");
              res.redirect("/motor");
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
        "SELECT * FROM motor where id=" + req.params.id,
        function (err, rows) {
          if (err) {
            var errors_detail = ("Error Selecting : %s ", err);
            req.flash("msg_error", errors_detail);
            res.redirect("/motor");
          } else {
            if (rows.length <= 0) {
              req.flash("msg_error", "Motor can't be find!");
              res.redirect("/motor");
            } else {
              console.log(rows);
              res.render("motor/edit", {
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
    req.assert("harga", "Please fill the kode motor").notEmpty();
    var errors = req.validationErrors();
    if (!errors) {
      v_kode_motor = req.sanitize("kode_motor").escape();
      v_no_rangka = req.sanitize("no_rangka").escape();
      v_no_mesin = req.sanitize("no_mesin").escape();
      v_kode_kategori = req.sanitize("kode_kategori").escape();
      v_type = req.sanitize("type").escape();
      v_tahun = req.sanitize("tahun").escape();
      v_warna = req.sanitize("warna").escape().trim();
      v_harga = req.sanitize("harga").escape();

      var motor = {
        kode_motor: v_kode_motor,
        no_rangka :  v_no_rangka,
        no_mesin : v_no_mesin,
        kode_kategori : v_kode_kategori,
        type  : v_type,
        tahun : v_tahun,
        warna : v_warna,
        harga: v_harga,
      };

      var update_sql = "update motor SET ? where id = " + req.params.id;
      req.getConnection(function (err, connection) {
        var query = connection.query(
          update_sql,
          motor,
          function (err, result) {
            if (err) {
              var errors_detail = ("Error Update : %s ", err);
              req.flash("msg_error", errors_detail);
              res.render("motor/edit", {
                kode_motor: req.param("kode_motor"),
                no_rangka: req.param("no_rangka"),
                no_mesin: req.param("no_mrsin"),
                kode_kategori: req.param("kode_kategori"),
                type: req.param("type"),
                tahun: req.param("tahun"),
                warna: req.param("warna"),
                harga: req.param("harga"),
              });
            } else {
              req.flash("msg_info", "Update motor success");
              res.redirect("/motor/edit/" + req.params.id);
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
      res.redirect("/motor/edit/" + req.params.id);
    }
  }
);

router.post("/add", authentication_mdl.is_login, function (req, res, next) {
  req.assert("harga", "Please fill the kode motor").notEmpty();
  var errors = req.validationErrors();
  if (!errors) {
    v_kode_motor = req.sanitize("kode_motor").escape();
    v_no_rangka = req.sanitize("no_rangka").escape();
    v_no_mesin = req.sanitize("no_mesin").escape();
    v_kode_kategori = req.sanitize("kode_kategori").escape();
    v_type = req.sanitize("type").escape();
    v_tahun = req.sanitize("tahun").escape();
    v_warna = req.sanitize("warna").escape().trim();
    v_harga = req.sanitize("harga").escape();

    var motor = {
        kode_motor: v_kode_motor,
        no_rangka :  v_no_rangka,
        no_mesin : v_no_mesin,
        kode_kategori : v_kode_kategori,
        type  : v_type,
        tahun : v_tahun,
        warna : v_warna,
        harga: v_harga,
    };

    var insert_sql = "INSERT INTO motor SET ?";
    req.getConnection(function (err, connection) {
      var query = connection.query(
        insert_sql,
        motor,
        function (err, result) {
          if (err) {
            var errors_detail = ("Error Insert : %s ", err);
            req.flash("msg_error", errors_detail);
            res.render("motor/add-motor", {
                kode_motor: req.param("kode_motor"),
                no_rangka: req.param("no_rangka"),
                no_mesin: req.param("no_mrsin"),
                kode_kategori: req.param("kode_kategori"),
                type: req.param("type"),
                tahun: req.param("tahun"),
                warna: req.param("warna"),
                harga: req.param("harga"),
              session_store: req.session,
            });
          } else {
            req.flash("msg_info", "Create motor success");
            res.redirect("/motor");
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
    res.render("motor/add-motor", {
      kode_motor: req.param("kode_motor"),
      harga: req.param("harga"),
      session_store: req.session,
    });
  }
});

router.get("/add", authentication_mdl.is_login, function (req, res, next) {
  res.render("motor/add-motor", {
    title: "Add New Data Motor",
    kode_motor: "",
    no_rangka: "",
    no_mesin: "",
    kode_kategori: "",
    type: "",
    tahun: "",
    warna: "",
    harga: "",
    session_store: req.session,
  });
});

module.exports = router;
