import React, { useCallback } from "react";
import { Box, Grid, IconButton, Typography } from "@material-ui/core";
import { useRef } from "react";
import styled from "styled-components";
import { AiOutlinePlus } from "react-icons/ai";
import Pdf from "../../../../assets/files/pdf.png";
import Docs from "../../../../assets/files/doc.png";
import Excel from "../../../../assets/files/xls.png";
import Ppt from "../../../../assets/files/ppt-file.png";
import Txt from "../../../../assets/files/txt-file.png";
import ClearIcon from "@material-ui/icons/Clear";
import BackupIcon from "@material-ui/icons/Backup";
import notFound from "../../../../assets/no-data2.png";
import { UploadFileService } from "../../../../services/GroupService";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { store } from "react-notifications-component";

const AddingButton = styled.div`
  color: #575757;
  border-radius: 4px;
  width: 110px;
  aspect-ratio: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  transition: all 0.3s ease-in-out;
  cursor: pointer;
  padding: 8px;
  box-shadow: 0px 2px 3px 0px rgba(0, 0, 0, 0.3);
  &:hover {
    background-color: #e7e7e7;
  }
`;

const UploadButton = styled.div`
  color: #575757;
  border-radius: 4px;
  width: 140px;
  aspect-ratio: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  transition: all 0.3s ease-in-out;
  cursor: pointer;
  padding: 8px;
  margin-bottom: 15px;
  background-color: #97d6f0;
  box-shadow: 0px 2px 3px 0px rgba(0, 0, 0, 0.3);
  &:hover {
    background-color: #e7e7e7;
  }
`;

const Img = styled.img`
  width: 40px;
  height: 40px;
`;

const FileWrapper = styled(Grid)`
  padding: 5px;
`;

const FileLayer = styled(Box)`
  box-shadow: 0px 2px 3px 0px rgba(0, 0, 0, 0.2);
  width:'90%',
  margin:"0 auto"
`;

const FilesToUpload = ({ filesUrl, removeFile, upLoadFiles }) => {
  const getImg = (file) => {
    if (file.name.includes(".pdf")) {
      return <Img src={Pdf} alt="pdf" />;
    } else if (file.name.includes(".doc")) {
      return <Img src={Docs} alt="doc" />;
    } else if (file.name.includes(".xls") || file.name.includes(".csv")) {
      return <Img src={Excel} alt="xls" />;
    } else if (file.name.includes(".ppt")) {
      return <Img src={Ppt} alt="ppt" />;
    } else {
      return <Img src={Txt} alt="txt" />;
    }
  };

  return (
    <Box border={"1px dashed rgba(0, 0, 0, 1)"} padding={3}>
      <UploadButton onClick={upLoadFiles}>
        <BackupIcon />
        <Box fontSize={"14px"} paddingLeft={1}>
          Upload files
        </Box>
      </UploadButton>
      <Grid container>
        {filesUrl.map((file, index) => (
          <FileWrapper item xs={12} sm={6} md={4} key={index}>
            <FileLayer display="flex">
              <Box display={"flex"} alignItems="center" flex={4}>
                {getImg(file)}
                <Box component={"span"} paddingLeft={1}>
                  {file.name}
                </Box>
              </Box>
              <Box flex={1}>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  style={{
                    float: "right",
                    marginRight: "5px",
                  }}
                  onClick={() => removeFile(file.name)}
                >
                  <ClearIcon />
                </IconButton>
              </Box>
            </FileLayer>
          </FileWrapper>
        ))}
      </Grid>
    </Box>
  );
};

const FileUploader = ({ setIsUpload, getFiles }) => {
  const fileUploader = useRef(null);
  const [files, setFiles] = React.useState([]);

  const fileUpload = (e) => {
    setFiles([...files, e.target.files[0]]);
  };

  const openUploader = () => {
    fileUploader.current.click();
  };
  const removeFile = useCallback((name) => {
    const removeFile = files.filter((el) => el.name !== name);
    setFiles(removeFile);
  }, []);

  const user = useSelector((state) => state.user?.details);

  const params = useParams();

  const upLoadFiles = async () => {
    //api call
    const fd = new FormData();
    files.map((el, index) => {
      fd.append(`file[${index}]`, el);
    });
    fd.append("total", files.length);
    fd.append("fromID", user._id);
    fd.append("toID", params.id);
    const res = await UploadFileService(fd);
    if (res?.status === 200) {
      store.addNotification({
        title: "Success",
        message: "File uploaded successfully",
        type: "success",
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 3000,
          onScreen: true,
        },
      });
      setFiles([]);
      getFiles();
    } else {
      store.addNotification({
        title: "Error",
        message: "File upload failed",
        type: "danger",
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 3000,
          onScreen: true,
        },
      });
    }
  };

  return (
    <Box borderTop={"1px solid rgba(0, 0, 0, 0.125)"} padding={"15px"}>
      <Box>
        <Box
          display={"flex"}
          justifyContent={"flex-end"}
          padding={"0 15px 15px 15px"}
        >
          <AddingButton onClick={openUploader}>
            <AiOutlinePlus />
            <Box fontSize={"14px"} paddingLeft={1}>
              Add Files
            </Box>
          </AddingButton>
        </Box>
        <input
          ref={fileUploader}
          type="file"
          accept=".pdf,.docx,.txt,.doc,.xlsx,.xls,.csv,.ppt,.pptx,.pptm"
          onChange={fileUpload}
          style={{ display: "none" }}
        />
        {files.length > 0 && (
          <FilesToUpload
            filesUrl={files}
            removeFile={removeFile}
            upLoadFiles={upLoadFiles}
          />
        )}
      </Box>
    </Box>
  );
};

export default FileUploader;
