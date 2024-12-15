import { useEffect, useState } from "react";
import api from "../api/api";
interface IFormInput {
  fullName: string;
  email: string;
  phone: string;
  nid: string;
}

const Dashboards = () => {
  const [data, setData] = useState<[IFormInput]>();
  const [page, setPage] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);
  const [pages, setPages] = useState<number>(0);

  const getData = async () => {
    const res = await api.get(`/leads?limit=10&page=${page}`, {});
    setData(res?.data?.data?.leads);
    setTotal(res?.data?.data?.pages);
    setPages(res?.data?.data?.total);
  };

  useEffect(() => {
    getData();
  }, [page, total]);

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    if (page < pages) {
      setPage(page + 1);
    }
  };

  const handleGoToLastPage = () => {
    setPage(pages);
  };

  const handleGoToFirstPage = () => {
    setPage(1);
  };
  return (
    <div className=" flex justify-between flex-col bg-white min-h-[100vh]  rounded-[24px]  ">
      <div className="h-full relative overflow-x-auto shadow-md  border border-primary rounded-t-[26px]">
        <table className="w-full text-sm text-left rtl:text-right text-blue-100 dark:text-blue-100">
          <thead className="text-xs font-[600] capitalize bg-white text-black">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-center text-[14px] font-[600]"
              >
                FullName
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-center text-[14px] font-[600]"
              >
                Email
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-center text-[14px] font-[600]"
              >
                Phone
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-center text-[14px] font-[600]"
              >
                National ID
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.map((item, i) => {
              return (
                <tr key={i} className="bg-tablePink text-black">
                  <td className="text-center font-[400] py-[17.5px] px-[16px]">
                    {item.fullName}
                    fullName
                  </td>

                  <td className="text-center font-[400] py-[17.5px] px-[16px]">
                    email
                    {item.email}
                  </td>
                  <td className="text-center font-[400] py-[17.5px] px-[16px]">
                    phone
                    {item.phone}
                  </td>
                  <td className="text-center font-[400] py-[17.5px] px-[16px]">
                    nid
                    {item.nid}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <nav
        className="flex items-center flex-column flex-row-reverse justify-between py-[13px] px-4 h-[42px]  text-secondaryDark"
        aria-label="Table navigation"
      >
        <span className="md:text-sm text-[12px] font-normal mb-0 block  w-auto">
          <span>{page}</span> of {pages} pages <span>({total} record)</span>
        </span>
        <ul className="inline-flex items-center justify-center md:gap-[10px] gap-[2px] -space-x-px rtl:space-x-reverse text-sm h-8">
          {page > 1 && (
            <li>
              <button
                onClick={handlePreviousPage}
                className="flex items-center justify-center font-[600] md:text-[14px] text-[12px]"
              >
                Previous
              </button>
            </li>
          )}
          <li>
            <button
              className="flex items-center justify-center"
              onClick={handleGoToFirstPage}
            >
              {/* <IoPlaySkipBackSharp /> */}
            </button>
          </li>
          <li>
            <button
              className="flex items-center justify-center"
              onClick={handlePreviousPage}
            >
              {/* <FaChevronLeft /> */}
              {"<"}
            </button>
          </li>
          <li>
            <button
              className="flex items-center justify-center"
              onClick={handleNextPage}
            >
              {/* <FaChevronRight /> */}
              {">"}
            </button>
          </li>
          <li>
            <button
              className="flex items-center justify-center"
              onClick={handleGoToLastPage}
            >
              {/* <IoPlaySkipForward /> */}
            </button>
          </li>

          {page < pages && (
            <li>
              <button
                onClick={handleNextPage}
                className="flex items-center justify-center font-[600] md:text-[14px] text-[12px]"
              >
                Next
              </button>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Dashboards;
