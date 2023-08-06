import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useMemo } from "react";
import { useTable } from "react-table";
import { useOutletContext } from "react-router-dom";
import Upvote from "../components/Upvote";
import ApproveLocation from "../components/ApproveLocation";
export default function PendingLocation() {
  const user = useOutletContext();
  const [data, setData] = useState([]);
  const items = useMemo(() => {
    return data.map((el) => {
      return {
        ...el,
        apvotes: el.upvotes.length,
        action: <Upvote user={user} location={el} />,
        adminaction: <ApproveLocation user={user} location={el} />,
      };
    });
  }, [data, user]);

  const columns = useMemo(() => {
    const clm = [
      {
        Header: "Name",
        accessor: "name", // accessor is the "key" in the data
      },
      {
        Header: "Location",
        accessor: "location",
      },
      {
        Header: "Apvotes",
        accessor: "apvotes",
      },
      {
        Header: "Action",
        accessor: "action",
      },
    ];
    if (user.role === "admin") {
      clm.push({
        Header: "Admin action",
        accessor: "adminaction",
      });
    }
    return clm;
  }, [user.role]);
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`${process.env.REACT_APP_URL}/pending-locations`);
      setData(res.data);
    };
    fetchData();
  }, []);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data: items });
  return (
    <div className="ml-[18px]">
      <div className="flex items-center justify-between pr-[18px]">
        <h3 className="text-xl font-medium mt-[22px] mb-8 ">
          Pending Locations
        </h3>
      </div>
      <div>
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup, i) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column, index) => (
                  <th
                    {...column.getHeaderProps()}
                    className={`text-[#9D9292] mb-6 ${
                      index === 0 ? "w-[238px]" : "w-[170px]"
                    } inline-block text-left`}
                  >
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell, index) => {
                    return (
                      <td
                        {...cell.getCellProps()}
                        className={`${
                          index === 0 ? "w-[238px]" : "w-[170px]"
                        } inline-block mb-1.5`}
                      >
                        {cell.render("Cell")}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
