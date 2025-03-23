import Assignment from "../models/Assignment.js";
import GroupUser from "../models/GroupUser.js";
import UserAssignment from "../models/UserAssignment.js";

export const getAssignments = async (req, res) => {
  const usersGroups = await GroupUser.find({
    UserID: req.params.id,
  });

  const groupIds = usersGroups.map((el) => {
    return el.GroupID.toString();
  });

  const allAssignments = await Assignment.find().populate("groupId");

  const assignments = allAssignments.filter((el) =>
    groupIds.includes(el.groupId?._id.toString())
  );

  if (!assignments) {
    return res.status(500).json({ message: "error" });
  }
  return res.status(200).json({ assignments, message: "success" });
};

export const getAssignmentDetails = async (req, res) => {
  const assignment = await Assignment.findById({
    _id: req.params.id,
  });
  const assignmentSubmit = await UserAssignment.find({
    assignmentId: req.params.id,
  }).populate("userId");
  if (!assignment || !assignmentSubmit) {
    return res.status(500).json({ message: "error" });
  }
  return res
    .status(200)
    .json({ assignment, assignmentSubmit, message: "success" });
};

export const postAssignment = async (req, res) => {
  try {
    const assignment = Assignment.create({
      title: req.body.title,
      deadline: req.body.deadline,
      groupId: req.body.groupId,
      description: req.body.description,
      createdBy: req.body.userId,
    });
    return res.status(200).json({ message: "success" });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

export const postUserAssignment = async (req, res) => {
  try {
    const newpath = "./resources/files/assignments/";

    const file = req.files[`file`];
    const filename = file.name;

    file.mv(`${newpath}${filename}`, (err) => {
      if (err) {
        console.log(err);
      }
      UserAssignment.create({
        assignmentId: req.body.assignmentId,
        userId: req.body.userId,
        name: filename,
      });
    });
    return res.status(200).json({ message: "success" });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

export const getUserAssignments = async () => {
  const userAssignments = await UserAssignment.find({
    assignmentId: req.body.assignmentId,
  });
  if (!userAssignments) {
    return res.status(500).json({ message: "error" });
  }
  return res.status(200).json({ userAssignments, message: "success" });
};

export const downloadFile = async (req, res) => {
  const path = `./resources/files/assignments/${req.query.file}`;
  res.download(path, req.query.file);
};
