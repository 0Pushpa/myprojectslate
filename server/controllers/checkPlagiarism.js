import Assignment from "../models/Assignment.js";
import GroupUser from "../models/GroupUser.js";
import UserAssignment from "../models/UserAssignment.js";
// import docxParser  from "docx-parser";
import reader from "any-text";
import { compareTwoStrings } from "../controllers/comparestring.js";

export const getUserAssignments = async () => {
  const userAssignments = await UserAssignment.find({
    assignmentId: req.body.assignmentId,
  });
  if (!userAssignments) {
    return res.status(500).json({ message: "error" });
  }
  return res.status(200).json({ userAssignments, message: "success" });
};

//   function getwordata() {
//       var data2;
//     data2 = docxParser.parseDocx("./resources/files/assignments/latest-EMS-Report(1).docx", function(data){
//         //  console.log(data)
//         data2 = data;
//       })
//     console.log("data3");
//     console.log(data2);

//     return data2;
//  }
export const checkplagiarism = async (req, res) => {
  console.log("howdy");
  var userAssiID = req.body.userAssID; //'623c2dd29cbf5c710ca8b6fc';
  const assignmentToCompare = await UserAssignment.find({
    _id: userAssiID,
  }).populate("userId");
  console.log(assignmentToCompare, "assignmentToCompare");

  const otherAssignment = await UserAssignment.find({
    assignmentId: assignmentToCompare[0]?.assignmentId,
    _id: { $ne: userAssiID },
  }).populate("userId");

  const fileToCheck = await reader.getText(
    `./resources/files/assignments/${assignmentToCompare[0]["name"]}`
  );
  var matcheddocument = [];

  for (const assignment of otherAssignment) {
    const checkforthis = await reader.getText(
      `./resources/files/assignments/${assignment["name"]}`
    );
    var result = compareTwoStrings(fileToCheck, checkforthis);
    // console.log(assignment["name"]);
    // console.log(result);

    if (parseFloat(result) > 0.08) {
      matcheddocument.push([assignment, parseFloat(result) * 100]);
    }
  }

  //   otherAssignment.forEach(async (assignment) => {
  //     await promise;
  //     const checkforthis = await reader.getText(`./resources/files/assignments/${assignment['name']}`);
  //     var result =compareTwoStrings(fileToCheck,checkforthis)
  //     console.log( assignment['name']);
  //     console.log( result);

  //     if(parseFloat(result) > 0.09){
  //         console.log("hello")
  //         matcheddocument.push([assignment,parseFloat(result)*100]);
  //     }

  // },Promise.resolve() );

  return res.status(200).json({ matcheddocument, message: "sucess" });
};
