import Schedule from "../models/Schedule.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../errors/index.js";

export const getAllGroups = async (req, res) => {
  // const groups = await Group.find({ createdBy: req.user.userId }).sort('createdAt')
  const groups = await Group.find().sort("createdAt");
  res.status(StatusCodes.OK).json({ groups, count: groups.length });
};
export const getSchedule = async (req, res) => {
  const filter = {};
  const schedule = await Schedule.find(filter);
  if (!schedule) {
    throw new NotFoundError(`No schedule with id ${groupId}`);
  }
  res.status(200).json({ schedule });
};

export const createSchedule = async (req, res) => {
  const schedule = await Schedule.create(req.body);
  res.status(StatusCodes.OK).json({ schedule });
};

export const updateGroup = async (req, res) => {
  const {
    body: { company, position },
    user: { userId },
    params: { id: groupId },
  } = req;

  if (company === "" || position === "") {
    throw new BadRequestError("Company or Position fields cannot be empty");
  }
  const group = await group.findByIdAndUpdate(
    { _id: groupId, createdBy: userId },
    req.body,
    { new: true, runValidators: true }
  );
  if (!group) {
    throw new NotFoundError(`No group with id ${groupId}`);
  }
  res.status(StatusCodes.OK).json({ group });
};

export const deleteGroup = async (req, res) => {
  const {
    user: { userId },
    params: { id: groupId },
  } = req;

  const group = await Group.findByIdAndRemove({
    _id: groupId,
    createdBy: userId,
  });
  if (!group) {
    throw new NotFoundError(`No group with id ${groupId}`);
  }
  res.status(StatusCodes.OK).send();
};

// module.exports = {
//   createGroup,
//   deleteGroup,
//   getAllGroups,
//   updateGroup,
//   getGroup,
// }
