import React from "react";
// import Box from "@mui/material/Box";
import styled from "styled-components";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function createData(GroupName, Scheduleid, before, after, beforeafter) {
  return { GroupName, Scheduleid, before, after, beforeafter };
}

const rows = [
  createData("Java", "1hsgshjjjsjsjjs59", 6.0, 24, 4.0),
  createData("Math", "5363637vshdndnbddn", 9.0, 37, 4.3),
  createData("Project Management", "hshshei44h3h33j", 16.0, 24, 6.0),
  createData("English", "7ebdbdnddndnd", 305, 67, 4.3),
  createData("CSIT 2021", "gdgdh546446464", 356, 49, 3.9),
];

export default function CompressionStatus(props) {
  const MainDiv = styled.div`
    width: 98%;
    height: calc(100vh - 30px);
    margin: 15px;
    padding: 15px;
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 0px 0px 10px 0px rgb(0 0 0 / 20%);
  `;
  const H3 = styled.h3`
    font-size: 1.5rem;
    font-weight: lighter;
  `;
  const Title = styled.div`
    padding: 10px;
    border-bottom: 4px solid #41a4cc;
  `;
  const Green = styled.span`
    color: #12cb12;
  `;
  const Red = styled.span`
    color: #dd2525;
  `;
  const data = Array.from(props.data);
  return (
    <>
      <MainDiv component="div">
        <Title>
          <H3>Statistics</H3>
        </Title>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <strong>SN.</strong>
                </TableCell>

                <TableCell>
                  <strong>Group Name</strong>
                </TableCell>
                <TableCell align="right">
                  <strong>Schedule Id</strong>
                </TableCell>

                <TableCell align="right">
                  <strong>Before&nbsp;Compression </strong>
                </TableCell>
                <TableCell align="right">
                  <strong>After&nbsp;Compression</strong>{" "}
                </TableCell>
                <TableCell align="right">
                  <strong>Compressed size</strong>
                </TableCell>
                <TableCell align="right">
                  <strong>Compressed %</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.map((row, key) => (
                <TableRow
                  key={row.group_id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>{key + 1}</TableCell>

                  <TableCell component="th" scope="row">
                    {row.group_name}
                  </TableCell>
                  <TableCell align="right">{row.group_id}</TableCell>

                  <TableCell align="right">{row.beforeCompression}</TableCell>
                  <TableCell align="right">{row.afterCompression}</TableCell>
                  <TableCell align="right">
                    {row.compressed_size.split(" ")[0] > 0 ? (
                      <Green>{row.compressed_size}</Green>
                    ) : (
                      <Red>{row.compressed_size}</Red>
                    )}
                  </TableCell>
                  <TableCell align="right">
                    {row.compressed_percentage > 0 ? (
                      <Green>{row.compressed_percentage.toFixed(2)}%</Green>
                    ) : (
                      <Red>{row.compressed_percentage.toFixed(2)}%</Red>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </MainDiv>
    </>
  );
}
