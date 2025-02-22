const express = require("express");
const { getRooms, addRoom, getRoom } = require("../controllers/room");
const authenticated = require("../middlewares/authenticated");
const hasRole = require("../middlewares/hasRole");
const mapRoom = require("../helpers/mapRoom");
const ROLES = require("../constants/roles");
const { addBooking, getRoomBooking } = require("../controllers/booking");

const router = express.Router({ mergeParams: true });

router.get("/", async (req, res) => {
  try {
    const data = await getRooms();
    res.send({ error: null, data: data.map(mapRoom) });
  } catch (e) {
    res.send({ error: e.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const room = await getRoom(req.params.id);

    res.send({ error: null, data: mapRoom(room) });
  } catch (e) {
    res.send({ error: "Room not found" });
  }
});

router.get("/:id/booking", authenticated, async (req, res) => {
  try {
    const data = await getRoomBooking(req.params.id);
    const dates = data.map((booking) => booking.date);
    const newArr = [];

    res.send({ error: null, dates: newArr.concat.apply(newArr, dates) });
  } catch (e) {
    res.send({ error: e.message });
  }
});

router.post("/:id/booking", authenticated, async (req, res) => {
  try {
    const newBooking = await addBooking({
      room: req.params.id,
      author: req.user.id,
      date: req.body.date,
    });

    res.send({ error: null, data: newBooking });
  } catch (e) {
    res.send({ error: e.message });
  }
});

////добавление номера(для дальнейшей разработки)
router.post("/", authenticated, hasRole([ROLES.ADMIN]), async (req, res) => {
  try {
    const newRoom = await addRoom({
      title: req.body.title,
      img_url: req.body.imgUrl,
      content: req.body.content,
      max_capacity: req.body.maxCapacity,
      price: req.body.price,
    });

    res.send({ error: null, data: newRoom });
  } catch (e) {
    res.send({ error: e.message });
  }
});
////

module.exports = router;
