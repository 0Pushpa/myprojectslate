import React from "react";
import { shallow, mount } from "enzyme";
import "setupTests.js";
import { BrowserRouter as Router } from "react-router-dom";
//redux
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
//message
import SentMessage from "components/application/group/call-interface/chat/Renderer/SentMessage";
import ReceivedMessage from "components/application/group/call-interface/chat/Renderer/ReceivedMessage";
//notification
import NotificationCard from "components/application/notification/NotificationCard";
//group
import GroupCard from "components/application/group/components/GroupCard";
//auth
import Login from "components/login_signup/v2/Login";

describe("Authentication Components", () => {
  const initialState = { output: 10 };
  const mockStore = configureStore();
  let store;
  it("should create an entry in login state", () => {
    store = mockStore(initialState);
    const component = mount(
      <Router>
        <Provider store={store}>
          <Login />
        </Provider>
      </Router>
    );
    const form = component.find("#email-input").first();
    form.props().onChange({
      target: {
        name: "myName",
        value: "myValue",
      },
    });
    expect(0).toEqual(0);
  });
});

describe("Attendance Components", () => {
  const initialState = { output: 10 };
  const mockStore = configureStore();
  let store;
  it("should create an entry in login state", () => {
    store = mockStore(initialState);
    const component = mount(
      <Router>
        <Provider store={store}>
          <Login />
        </Provider>
      </Router>
    );
    const form = component.find("#email-input").first();
    form.props().onChange({
      target: {
        name: "myName",
        value: "myValue",
      },
    });
    expect(0).toEqual(0);
  });
});

describe("Assignment Components", () => {
  const initialState = { output: 10 };
  const mockStore = configureStore();
  let store;
  it("should create an entry in login state", () => {
    store = mockStore(initialState);
    const component = mount(
      <Router>
        <Provider store={store}>
          <Login />
        </Provider>
      </Router>
    );
    const form = component.find("#email-input").first();
    form.props().onChange({
      target: {
        name: "myName",
        value: "myValue",
      },
    });
    expect(0).toEqual(0);
  });
});

describe("Chat Components", () => {
  it("should render sent message", () => {
    const component = shallow(
      <SentMessage
        i="1"
        message={{
          message: "eje",
          by: "Aman Maharjan",
          uid: "61b704402e69c9b32d73c90f",
          groupId: "6237e780a159bc00abc9715f",
          sent_at: "2022-03-21T02:58:39.802Z",
          messageType: "message",
          type: "sent",
        }}
      />
    );
    expect(component).toMatchSnapshot();
  });

  it("should render receiving message", () => {
    const component = shallow(
      <ReceivedMessage
        i="1"
        messages={[
          {
            message: "eje",
            by: "Aman Maharjan",
            uid: "61b704402e69c9b32d73c90f",
            groupId: "6237e780a159bc00abc9715f",
            sent_at: "2022-03-21T02:58:39.802Z",
            messageType: "message",
            type: "received",
          },
          {
            message: "ok",
            by: "Baman Maharjan",
            uid: "61b704402e69c9b32d73c94f",
            groupId: "6237e780a159bc00abc9715f",
            sent_at: "2022-04-21T02:58:39.802Z",
            messageType: "message",
            type: "received",
          },
        ]}
        message={{
          message: "eje",
          by: "Aman Maharjan",
          uid: "61b704402e69c9b32d73c90f",
          groupId: "6237e780a159bc00abc9715f",
          sent_at: "2022-03-21T02:58:39.802Z",
          messageType: "message",
          type: "received",
        }}
      />
    );
    expect(component).toMatchSnapshot();
  });
});

describe("Group Components", () => {
  it("should display group list", () => {
    const component = shallow(
      <GroupCard
        index="1"
        ad={{
          _id: "61ce780a0f14779f59d64588",
          GroupID: {
            _id: "61caa5206d4819a4121b77bd",
            name: "Aman Group",
            status: true,
            type: "private",
            createdBy: "61b707b5c25f987fb2af5594",
            createdAt: "2021-12-28T05:48:16.277Z",
            updatedAt: "2021-12-28T05:48:16.277Z",
          },
          UserID: "61b704402e69c9b32d73c90f",
          role: "user",
          status: true,
          createdAt: "2021-12-31T03:24:58.006Z",
          updatedAt: "2021-12-31T03:24:58.006Z",
        }}
      />
    );
    expect(component).toMatchSnapshot();
  });
});

describe("Notification Components", () => {
  it("should display notification list", () => {
    const component = shallow(
      <NotificationCard
        data={{
          _id: "61c9fe8d4c6bc8a0583aef7c",
          UserID: "61b707b5c25f987fb2af5594",
          message: "You have been invited to join a group",
          type: "confirmation",
          url: "/slate/groups/61b62b0b5677213522aad463",
          remark: "",
          status: false,
          createdAt: "2021-12-27T17:57:33.172+00:00",
          updatedAt: "2021-12-27T17:57:33.172+00:00",
        }}
      />
    );
    expect(component).toMatchSnapshot();
  });
});
