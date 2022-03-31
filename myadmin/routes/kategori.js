var express = require("express");
var router = express.Router();
var authentication_mdl = require("../middlewares/authentication");
var session_store;
/* GET kategori page. */

router.get("/", authentication_mdl.is_login, function (req, res, next) {
  req.getConnection(function (err, connection) {
    var query = connection.query(
      "SELECT * FROM kategori",
      function (err, rows) {
        if (err) var errornya = ("Error Selecting : %s ", err);
        req.flash("msg_error", errornya);
        res.render("kategori/list", {
          title: "kategori",
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
      var kategori = {
        id: req.params.id,
      };

      var delete_sql = "delete from kategori where ?";
      req.getConnection(function (err, connection) {
        var query = connection.query(
          delete_sql,
          kategori,
          function (err, result) {
            if (err) {
              var errors_detail = ("Error Delete : %s ", err);
              req.flash("msg_error", errors_detail);
              res.redirect("/kategori");
            } else {
              req.flash("msg_info", "Delete kategori Success");
              res.redirect("/kategori");
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
        "SELECT * FROM kategori where id=" + req.params.id,
        function (err, rows) {
          if (err) {
            var errors_detail = ("Error Selecting : %s ", err);
            req.flash("msg_error", errors_detail);
            res.redirect("/kategori");
          } else {
            if (rows.length <= 0) {
              req.flash("msg_error", "kategori can't be find!");
              res.redirect("/kategori");
            } else {
              console.log(rows);
              res.render("kategori/edit", {
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
    req.assert("type", "Please fill the kode kendaraan").notEmpty();
    var errors = req.validationErrors();
    if (!errors) {
      v_kode_kategori = req.sanitize("kode_kategori").escape().trim();
      v_merk = req.sanitize("merk").escape().trim();
      v_type = req.sanitize("type").escape().trim();
      v_nama = req.sanitize("nama").escape().trim();

      if (!req.files) {
        var kategori = {
          kode_kategori: v_kode_kategori,
          merk: v_merk,
          type: v_type,
          nama: v_nama,
          };
      }else{
      var file = req.files.gambar;
      file.mimetype == "image/jpeg";
      file.mv("public/images/upload/" + file.name);

      var kategori = {
        kode_kategori: v_kode_kategori,
        merk: v_merk,
        type: v_type,
        nama: v_nama,
        gambar: file.name,
      }
    };

      var update_sql = "update kategori SET ? where id = " + req.params.id;
      req.getConnection(function (err, connection) {
        var query = connection.query(
          update_sql,
          kategori,
          function (err, result) {
            if (err) {
              var errors_detail = ("Error Update : %s ", err);
              req.flash("msg_error", errors_detail);
              res.render("kategori/edit", {
                kode_kategori: req.param("kode_kategori"),
                merk: req.param("merk"),
                type: req.param("type"),
                nama: req.param("nama"),
              });
            } else {
              req.flash("msg_info", "Update kategori success");
              res.redirect("/kategori/edit/" + req.params.id);
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
      res.redirect("/kategori/edit/" + req.params.id);
      } 
    }
  );


router.post("/add", authentication_mdl.is_login, function (req, res, next) {
  req.assert("type", "Please fill the kode kendaraan").notEmpty();
  var errors = req.validationErrors();
  if (!errors) {
    v_kode_kategori = req.sanitize("kode_kategori").escape();
    v_merk = req.sanitize("merk").escape().trim();
    v_type = req.sanitize("type").escape();
    v_nama = req.sanitize("nama").escape().trim();

    var file = req.files.gambar;
        file.mimetype == "image/jpeg";
        file.mv("public/images/upload/" + file.name);

    var kategori = {
        kode_kategori: v_kode_kategori,
        merk: v_merk,
        type: v_type,
        nama: v_nama,
        gambar: file.name,
    };

    var insert_sql = "INSERT INTO kategori SET ?";
    req.getConnection(function (err, connection) {
      var query = connection.query(
        insert_sql,
        kategori,
        function (err, result) {
          if (err) {
            var errors_detail = ("Error Insert : %s ", err);
            req.flash("msg_error", errors_detail);
            res.render("kategori/add-kategori", {
              kode_kategori: req.param("kode_kategori"),
              merk: req.param("merk"),
              type: req.param("type"),
              nama: req.param("nama"),
              session_store: req.session,
            });
          } else {
            req.flash("msg_info", "Create kategori success");
            res.redirect("/kategori");
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
    res.render("kategori/add-kategori", {
      kode_kategori: req.param("kode_kategori"),
      nama: req.param("nama"),
      session_store: req.session,
    });
  }
});


router.get("/add", authentication_mdl.is_login, function (req, res, next) {
  res.render("kategori/add-kategori", {
    title: "Add New kategori",
    kode_kategori: "",
    merk: "",
    type: "",
    nama: "",
    session_store: req.session,
  });
});

module.exports = router;
