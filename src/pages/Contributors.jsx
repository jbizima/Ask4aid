import { useEffect, useMemo, useState } from "react";
import { useOutletContext, Navigate } from "react-router-dom";
import { useTable } from "react-table";
import axios from "axios";
import ApproveContributor from "../components/ApproveContributor";

export default function Contributors() {
  const user = useOutletContext();
  const [data, setData] = useState([]);
  const items = useMemo(() => {
    return data.map((el) => ({
      ...el,
      action:  <ApproveContributor admin={user} user={el} />,
    }));
  }, [data, user]);

  const columns = useMemo(
    () => [
      {
        Header: "First name",
        accessor: "first_name", // accessor is the "key" in the data
      },
      {
        Header: "Last name",
        accessor: "last_name",
      },
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "Action",
        accessor: "action",
      },
    ],
    []
  );
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        `${process.env.REACT_APP_URL}/pending-contributors`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setData(res.data);
    };
    fetchData();
  }, []);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data: items });
  return user.role === "admin" ? (
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
  ) : (
    <Navigate to="/contribute" />
  );
}
