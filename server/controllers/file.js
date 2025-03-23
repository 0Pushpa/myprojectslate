import Files from "../models/Files.js";

export const uploadFile = async (req, res) => {
  try {
    const total = req.body.total;
    for (let i = 0; i < total; i++) {
      const newpath = "./resources/files/";
      const file = req.files[`file[${i}]`];
      const filename = file.name;
      file.mv(`${newpath}${filename}`, (err) => {
        if (err) {
          console.log(err);
        }
        Files.create({
          FromID: req.body.fromID,
          ToID: req.body.toID,
          fileName: filename,
          fileType: file.mimetype,
        });
      });
    }
    return res.status(200).json({ message: "File upload success" });
  } catch (e) {
    return res
      .status(500)
      .json({ message: e?.message || "Unexpected error occurred!" });
  }
};

export const getFiles = async (req, res) => {
  const files = await Files.find({
    ToID: req.query.groupId,
  }).sort({ createdAt: -1 });

  res.status(200).json({ files, count: files.length });
};

export const removeFiles = async (req, res) => {
  const id = req.body.id;
  const files = await Files.findByIdAndDelete({
    _id: id,
  });
  if (!files) {
    throw new NotFoundError(`No group with id ${id}`);
  }
  res.status(200).json({ message: "Deleted successfully" });
};

export const downloadFile = async (req, res) => {
  const path = `./resources/files/${req.query.file}`;
  res.download(path, req.query.file);
};
