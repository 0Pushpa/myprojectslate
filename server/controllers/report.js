import Attendence from "../models/Attendence.js";
import AttendenceDetails from "../models/AttendenceDetails.js";
import reader from "xlsx";

export const getReports = async (req, res) => {
  try {
    const reports = await Attendence.find({
      groupId: req.params.id,
    });
    res.status(200).json({ reports });
  } catch (e) {
    res.status(500).json({ e });
  }
};

export const generateAttendanceReport = async (data) => {
  try {
    let workBook = reader.utils.book_new();
    const workSheet = reader.utils.json_to_sheet(data);
    reader.utils.book_append_sheet(workBook, workSheet, `report`);
    let exportFileName = `./resources/reports/Attendance-${data[
      data.length - 1
    ].left.getTime()}.xls`;
    reader.writeFile(workBook, exportFileName);

    const attendance = await Attendence.create({
      groupId: data[0].groupId,
      file_name: `Attendance-${data[data.length - 1].left.getTime()}.xls`,
    });

    for (let i = 0; i < data.length; i++) {
      await AttendenceDetails.create({
        attendanceId: attendance._id,
        userId: data[0].user,
        joined: data[0].joined,
        left: data[0].left,
      });
    }
    return "success";
  } catch (e) {
    console.log(e);
  }
};

export const downloadReport = async (req, res) => {
  const path = `./resources/reports/${req.query.file}`;
  res.download(path, req.query.file);
};
