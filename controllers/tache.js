const Tache = require("../models/tache");

const User = require("../models/auth");

exports.addTache = async (req, res) => {
  try {
    const userf = await User.findById(req.user._id);

    const newtache = new Tache({ ...req.body, userId: req.user._id });

    await newtache.save();
    await userf.save();
    res.status(200).send({ msg: "tache added", newtache });
  } catch (error) {
    res.status(500).send({ msg: "could not add tache", error });
  }
};




exports.GetTache = async (req, res) => {
  try {
    const listOfTaches = await Tache.find();
    res.status(200).send({ msg: "list of tache", listOfTaches });
  } catch (error) {
    res.status(500).send({ msg: "could not get taches", error });
  }
};
exports.UpdateTache = async (req, res) => {
  const { id } = req.params;

  try {
    const tacheUpdated = await Tache.findByIdAndUpdate(id, {
      $set: { ...req.body },
    });
    res.status(200).send({ msg: "tache updated", tacheUpdated });
  } catch (error) {
    res.status(500).send({ msg: "could not update tache", error });
  }
};
exports.DeleteTache = async (req, res) => {
  const { id } = req.params;

  try {
    const tacheDeleted = await Tache.findByIdAndDelete(id);
    res.status(200).send({ msg: "tache deleted", tacheDeleted });
  } catch (error) {
    res.status(500).send({ msg: "could not delete tache", error });
  }
};
exports.GetOneTache = async (req, res) => {
  const { id } = req.params;
  try {
    const oneTache = await Tache.findById(id);
    res.status(200).send({ msg: "get one tache", oneTache });
  } catch (error) {
    res.status(500).send({ msg: "could not get this tache", error });
  }
};

exports.GetMytaches = async (req, res) => {
  try {
    const myTaches = await Tache.find({ userId: req.params._id });

    res.status(200).send({ msg: "my taches", myTaches });
  } catch (error) {
    res.status(500).send({ msg: "could not get my taches", error });
  }
};
