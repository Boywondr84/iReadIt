const router = require("express").Router();

const apiRoutes = require("./api");
const homeRoutes = require("./home-routes");
const dashboardRoute = require("./dashboard-route");

router.use("/api", apiRoutes);
router.use("/", homeRoutes);
router.use("/dashboard", dashboardRoute);


router.use((req, res) => {
  res.status(404).end();
});

module.exports = router;
