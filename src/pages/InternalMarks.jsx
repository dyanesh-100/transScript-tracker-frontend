import React, { useEffect, useMemo } from 'react';
import { useTable } from 'react-table';
// import './StudentDetails.css';

function StudentDetails() {
  const [data, setData] = React.useState([]);

  useEffect(() => {
    fetch('http://localhost:3005/api/attendance')
      .then(response => response.json())
      .then(data => setData(data));
  }, []);

  const columns = useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'Name',
      },
      {
        Header: 'RollNumber',
        accessor: 'RollNumber',
      },
      {
        Header: 'Sub1 cia1',
        accessor: 'sub1cia1',
      },
      {
        Header: 'Sub1 cia2',
        accessor: 'sub1cia2',
      },
      {
        Header: 'Sub1 cia3',
        accessor: 'sub1cia3',
      },
      {
        Header: 'Sub2 cia1',
        accessor: 'sub2cia1',
      },
      {
        Header: 'Sub2 cia2',
        accessor: 'sub2cia2',
      },
      {
        Header: 'Sub2 cia3',
        accessor: 'sub2cia3',
      },
      {
        Header: 'Sub3 cia1',
        accessor: 'sub3cia1',
      },
      {
        Header: 'Sub3 cia2',
        accessor: 'sub3cia2',
      },
      {
        Header: 'Sub3 cia3',
        accessor: 'sub3cia3',
      },{
        Header: 'Sub4 cia1',
        accessor: 'sub4cia1',
      },{
        Header: 'Sub4 cia2',
        accessor: 'sub4cia2',
      },{
        Header: 'Sub4 cia3',
        accessor: 'sub4cia3',
      },{
        Header: 'Sub5 cia1',
        accessor: 'sub5cia1',
      },{
        Header: 'Sub5 cia2',
        accessor: 'sub5cia2',
      },{
        Header: 'Sub5 cia3',
        accessor: 'sub5cia3',
      },
      {
        Header: 'S1 Assign1',
        accessor: 'sub1assignment1',
      },
      {
        Header: 'S1 Assignm2',
        accessor: 'sub1assignment2',
      },
      {
        Header: 'S2 Assign1',
        accessor: 'sub2assignment1',
      },
      {
        Header: 'S2 Assign2',
        accessor: 'sub2assignment2',
      },
      {
        Header: 'S3 Assign1',
        accessor: 'sub3assignment1',
      },
      {
        Header: 'S3 Assign2',
        accessor: 'sub3assignment2',
      },
      {
        Header: 'S4 Assign1',
        accessor: 'sub4assignment1',
      },
      {
        Header: 'S5 Assignm2',
        accessor: 'sub5assignment2',
      },
      
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
      <div className="stud">
        <h2>INTERNAL MARKS</h2>
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map(row => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map(cell => (
                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
  );
}

export default StudentDetails;