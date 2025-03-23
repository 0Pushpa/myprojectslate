import HttpService from "./HttpService";

export const GetGroupService = async () => {
  const http = new HttpService();
  return await http.getData("api/group/");
};
export const GetMyGroupService = async (userId) => {
  const http = new HttpService();
  return await http.postData(userId, "api/group/my-groups/");
};
export const GetMyAccessedGroupService = async (userId) => {
  const http = new HttpService();
  return await http.postData(userId, "api/group/accessible-groups");
};
export const AddGroupService = async (credentials) => {
  const http = new HttpService();
  return await http.postData(credentials, "api/group/");
};
export const EditGroupService = async (credentials) => {
  const http = new HttpService();
  return await http.patchData(credentials, `api/group/${credentials.id}`);
};
export const IndividualGroupService = async (id) => {
  const http = new HttpService();
  return await http.getData(`api/group/${id}`);
};

export const DeleteGroupService = async (id) => {
  const http = new HttpService();
  return await http.deleteData({ id }, `api/group/${id}`);
};

export const SendInvite = (credentials) => {
  const http = new HttpService();
  return http.postData(credentials, "api/group/invite");
};

export const VerifyUsersAccessibilityService = (credentials) => {
  const http = new HttpService();
  return http.postData(credentials, "api/group/accessibility");
};

export const LeaveGroupService = (credentials) => {
  const http = new HttpService();
  return http.postData(credentials, "api/group/leave");
};

export const ChatService = (credentials) => {
  const http = new HttpService();
  return http.postData(credentials, "api/chat");
};

export const GetChatService = (id) => {
  const http = new HttpService();
  return http.getData(`api/chat?groupId=${id}`);
};

export const UploadFileService = (credentials) => {
  const http = new HttpService();
  return http.postData(credentials, "api/file");
};

export const DownloadFileService = (credentials) => {
  const http = new HttpService();
  return http.downloadData(`api/file/download?file=${credentials}`);
};

export const GetFilesService = (id) => {
  const http = new HttpService();
  return http.getData(`api/file?groupId=${id}`);
};

export const DeleteFilesService = (id) => {
  const http = new HttpService();
  return http.postData(id, `api/file/delete`);
};

// export const UpdateGroupService = async (credentials) => {
//   const http = new HttpService();
//   return await http.postData(credentials, "api/group/forgot-password");
// };
// export const DeleteGroupService = async (credentials) => {
//   const http = new HttpService();
//   return await http.postData(credentials, "api/group/forgot-password");
// };
