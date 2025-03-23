import React, { useEffect, useRef } from "react";
import styled from "styled-components";

const StyledVideo = styled.video`
  width: 100%;
  position: static;
  overflow: hidden;
  margin: 1px;
  z-index: 99;
`;

export default class Video extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }
  componentDidMount() {
    this.props.peer.peer.on("stream", (stream) => {
      this.myRef.current.srcObject = stream;
    });
  }
  render() {
    return (
      <StyledVideo
        style={{
          height: "50vh",
          objectFit: "contain",
        }}
        playsInline
        autoPlay
        ref={this.myRef}
      />
    );
  }
}

// const Video = ({ peer }) => {
//   const ref = useRef();
//   // props.peer.on("stream", (stream) => {
//   //   console.log("video ko props", props);
//   // });
//   console.log("video hai");

//   useEffect(() => {
//     console.log("my peer", peer);
//     peer.peer.on("stream", (stream) => {});
//   }, [peer]);

//   return <StyledVideo id="kcha" playsInline autoPlay ref={ref} />;
// };

//  export default Video;
