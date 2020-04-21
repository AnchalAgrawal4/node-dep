var express = require("express");
var router = express.Router();
var userData = require("../user-data.json");
/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("api call");
});

router.get("/userprofile", function (req, res, next) {
  res.send(userData);
});

router.get(
  "/posts",
  function (req, res, next) {
    if (req.cookies.auth_token) {
      next();
    } else {
      res.send("You are Not Authorized");
    }
  },
  function (req, res, next) {
    userData.forEach((element) => {
      if (element.userName === req.cookies.username) {
        res.send(element.posts);
      }
    });
  }
);

router.post(
  "/posts/new",
  function (req, res, next) {
    if (req.cookies.auth_token) {
      next();
    } else {
      res.send("You are Not Authorized");
    }
  },
  function (req, res, next) {
    userData.forEach((element) => {
      if (element.userName === req.cookies.username) {
        element.posts.push({
          post: req.body.post,
        });
        res.send(element.posts[element.posts.length - 1]);
      } else if (!req.cookies.username) {
        res.send(440);
      } else {
        res.send(422);
      }
    });
  }
);

router.post("/auth", function (req, res, next) {
  userData.forEach((element) => {
    if (
      element.userName === req.body.userName &&
      element.password === req.body.password
    ) {
      res.cookie("auth_token", "true", { httpOnly: true, maxAge: 200000 });
      res.cookie("username", element.userName, { maxAge: 200000 });
      res.send({ valid: true });
    } else {
      res.send(401);
    }
  });
});

router.get(
  "/:user",
  function (req, res, next) {
    if (
      req.cookies.auth_token &&
      req.cookies.username === req.originalUrl.slice(5)
    ) {
      next();
    } else {
      res.send("You are not Authorised");
    }
  },
  function (req, res, next) {
    for (let i = 0; (i = userData.length); i++) {
      if (userData[i].userName === req.originalUrl.slice(5)) {
        res.send({
          fullName: userData[i].firstName + userData[i].lastName,
          email: userData[i].email,
        });
      } else {
        res.send(400);
      }
    }
  }
);

router.post(
  "/clear",
  function (req, res, next) {
    if (req.cookies.auth_token) {
      next();
    }
  },
  function (req, res) {
    if (req.cookies.auth_token && req.cookies.username) {
      res.clearCookie("auth_token");
      res.clearCookie("username");
      res.send({ deleted: true });
    }
  }
);

module.exports = router;
