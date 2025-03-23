import GroupUser from "../models/GroupUser.js";
import User from "../models/User.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../errors/index.js";

export const getAllUsersInGroup = async (req, res) => {
  const group_users = await GroupUser.find({ _id: req.groupId}).sort("createdAt");
  res.status(StatusCodes.OK).json({ group_users, count: group_users.length });
};


export const addUserToGroup = async (req, res) => {
  const user_in_group = await GroupUser.create(req.body);
  res.status(StatusCodes.OK).json({ user_in_group });
};


export const deleteUserFromGroup = async (req, res) => {

  const user_in_group = await GroupUser.findByIdAndRemove({
    userId: req.userId,
    groupId: req.groupId,

  });
  if (!user_in_group) {
    throw new NotFoundError(`No user_in_group with id ${req.userId}`);
  }
  res.status(StatusCodes.OK).send();
};
