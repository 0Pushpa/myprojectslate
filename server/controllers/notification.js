import Notification from "../models/Notification.js";
import User from "../models/User.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../errors/index.js";
import url from "url";
import GroupUser from "../models/GroupUser.js";

export const getAllNotificationOfUser = async (req, res) => {
  const userId = url.parse(req.url, true).query.userId;
  const user_notifications = await Notification.find({ UserID: userId })
    .populate("UserID")
    .sort({ createdAt: -1 });
  res
    .status(StatusCodes.OK)
    .json({ user_notifications, count: user_notifications.length });
};

export const addNotification = async (req, res) => {
  const added_notification = await Notification.create(req.body);
  res.status(StatusCodes.OK).json({ added_notification });
};

export const rejectNotification = async (req, res) => {
  const notification = await Notification.updateOne(
    {
      _id: req.body.notificationId,
    },
    {
      $set: {
        remark: "rejected",
        status: false,
      },
    }
  );

  return res.status(StatusCodes.OK).json({ status: "success" });
};

export const acceptNotification = async (req, res) => {
  const notification = await Notification.updateOne(
    {
      _id: req.body.notificationId,
    },
    {
      $set: {
        remark: "accepted",
        status: false,
      },
    }
  );
  if (req.body.groupId) {
    const group = await GroupUser.create({
      UserID: req.body.userId,
      GroupID: req.body.groupId,
      role: "user",
    });
  }

  return res.status(StatusCodes.OK).json({ status: "success" });
};
export const changeNotificationStatus = async (req, res) => {
  const notification = await Notification.find({
    _id: req.body.notificationId,
  });
  notification.status = false;
  const result = await notification.save();
  res.status(StatusCodes.OK).json({ result });
};
