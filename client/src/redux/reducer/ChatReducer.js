const initialData = {
  messages: [],
  groupMessages: {},
};
export const chatReducers = (state = initialData, action) => {
  switch (action.type) {
    case "GET_MESSAGES":
      const unfilteredAll1 = action.payload;
      const filteredAll1 = unfilteredAll1.filter(
        (value, index, self) =>
          index ===
          self.findIndex(
            (t) =>
              t.message === value.message &&
              t.sent_at === value.sent_at &&
              t.uid === value.uid
          )
      );
      const groupMessages1 = state.groupMessages;
      if (groupMessages1[action.payload[0]?.groupId]) {
        action?.payload.map((el) => {
          groupMessages1[action.payload[0]?.groupId].push(el);
        });
      } else {
        groupMessages1[action.payload[0]?.groupId] = action.payload;
      }

      //to remove duplicate messages if exists
      const unfiltered1 = groupMessages1[action.payload[0]?.groupId];
      const filtered1 = unfiltered1.filter(
        (value, index, self) =>
          index ===
          self.findIndex(
            (t) =>
              t.message === value.message &&
              t.sent_at === value.sent_at &&
              t.uid === value.uid
          )
      );

      groupMessages1[action.payload[0]?.groupId] = filtered1;
      state = {
        messages: filteredAll1,
        groupMessages: groupMessages1,
      };
      return state;
    case "SEND_MESSAGE":
      const unfilteredAll = [...state.messages, action.payload];
      const filteredAll = unfilteredAll.filter(
        (value, index, self) =>
          index ===
          self.findIndex(
            (t) =>
              t.message === value.message &&
              t.sent_at === value.sent_at &&
              t.uid === value.uid
          )
      );
      const groupMessages = state.groupMessages;
      if (groupMessages[action.payload.groupId]) {
        groupMessages[action.payload.groupId].push(action.payload);
      } else {
        groupMessages[action.payload.groupId] = [action.payload];
      }

      //to remove duplicate messages if exists
      const unfiltered = groupMessages[action.payload.groupId];
      const filtered = unfiltered.filter(
        (value, index, self) =>
          index ===
          self.findIndex(
            (t) =>
              t.message === value.message &&
              t.sent_at === value.sent_at &&
              t.uid === value.uid
          )
      );
      groupMessages[action.payload.groupId] = filtered;
      state = {
        messages: filteredAll,
        groupMessages: groupMessages,
      };
      return state;
    case "AVAILABLE_PARTICIPANTS":
      state = {
        ...state,
        details: {
          participants: action.payload,
        },
      };
      return state;
    case "CHAT_ERROR":
      state = {
        messages: [],
      };
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
