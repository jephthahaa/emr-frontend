"use client";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import {
  IPatient,
  PatientTableData,
  PatientTableDataFilter,
  SortDirection,
} from "@/types";
// import Image from "next/image";
import { cn, isUrl } from "@/utils";
import EyeIcon from "@/assets/icons/EyeIcon";
import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHeader,
  TableRow,
} from "./ui/table";
import { useAppDispatch } from "@/hooks";
import { action } from "@/redux";
import { Button } from "./ui/button";
import Image from "next/image";
import { format } from "date-fns";

type Props = {
  data?: IPatient[];
  filterData: (
    orderBy: keyof PatientTableData,
    direction: SortDirection,
  ) => void;
  currentFilter: PatientTableDataFilter | null;
  currentPage?: number;
  totalPages?: number;
  onChangePage?: (page: number) => void;
};

export const PatientTable = ({
  data,
  filterData,
  currentFilter,
  currentPage = 1,
  totalPages = 1,
  onChangePage,
}: Props) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  return (
    <>
      <Table className="w-full rounded-2xl border border-grayscale-200 bg-white">
        <TableHeader className="sticky top-0 border-b border-grayscale-200 bg-grayscale-75">
          <TableRow className="sticky top-0">
            <TableHead>ID</TableHead>

            <TableHead className="flex items-center gap-1">
              Patient Name
              <div className="flex flex-col">
                <span
                  className={cn(
                    "cursor-pointer",
                    currentFilter?.orderBy === "patientName"
                      ? currentFilter?.direction === "asc"
                        ? "text-primary"
                        : ""
                      : "",
                  )}
                  onClick={() => filterData("patientName", "asc")}
                >
                  <FaChevronUp size={8} />
                </span>

                <span
                  className={cn(
                    "cursor-pointer",
                    currentFilter?.orderBy === "patientName"
                      ? currentFilter?.direction === "desc"
                        ? "text-primary"
                        : ""
                      : "",
                  )}
                  onClick={() => filterData("patientName", "desc")}
                >
                  <FaChevronDown size={8} />
                </span>
              </div>
            </TableHead>

            <TableHead>Gender</TableHead>

            <TableHead className="flex items-center gap-1">
              Recent Consult
            </TableHead>

            <TableHead>Contact</TableHead>

            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data &&
            data.map((item, _) => (
              <tr
                className="[&:not(:last-child)]:border-grayscale200 p-4 [&:not(:last-child)]:border-b"
                key={_}
              >
                <TableData>{item.id}</TableData>
                <TableData>
                  <div className="flex items-center gap-2">
                    <Image
                      className="h-[26px] w-[26px] flex-shrink-0 rounded-full object-cover"
                      src={isUrl(item.profilePicture)}
                      width={26}
                      height={26}
                      alt={item.firstName}
                    />

                    <span className="block w-[min(170px)] overflow-hidden overflow-ellipsis whitespace-nowrap">
                      {item.firstName} {item.lastName}{" "}
                    </span>
                  </div>
                </TableData>
                <TableData>
                  <GenderPill gender={item.gender} />
                </TableData>
                <TableData className="text-gray-500">
                  {item.recentConsultDate !== null
                    ? format(new Date(item.recentConsultDate), "MMM dd, yyyy")
                    : "N/A"}
                </TableData>
                <TableData>{item.contact}</TableData>
                <TableData>
                  <button
                    onClick={() => {
                      dispatch(
                        action.patients.addOpenTab({
                          id: item.id,
                          firstName: item.firstName,
                          lastName: item.lastName,
                          profilePicture: item.profilePicture ?? "",
                        }),
                      );
                      router.push(`/patients/${item.id}`);
                    }}
                    className="flex items-center gap-1 text-baseBlack"
                  >
                    <EyeIcon />
                    View
                  </button>
                </TableData>
              </tr>
            ))}
          {data && data.length === 0 && (
            <TableRow>
              <TableData
                rowSpan={6}
                className="p-4 [&:not(:last-child)]:border-b [&:not(:last-child)]:border-grayscale-200"
              >
                Empty data
              </TableData>
            </TableRow>
          )}
        </TableBody>
        <TableFooter className="sticky bottom-0 z-20 h-11 bg-gray-100">
          <TableRow>
            <TableCell colSpan={1} className="text-start"></TableCell>
            <TableCell colSpan={3} className="text-center"></TableCell>
            <TableCell colSpan={2} className="text-end">
              <div className="flex flex-row items-center justify-end">
                <Button
                  onClick={() => onChangePage?.(currentPage! - 1)}
                  disabled={currentPage === 1}
                  className="w-16"
                  variant="outline"
                >
                  Prev
                </Button>
                <div className="flex w-[80px] items-center justify-center font-mono">
                  {currentPage} of {totalPages}
                </div>
                <Button
                  onClick={() => onChangePage?.(currentPage! + 1)}
                  disabled={currentPage === totalPages}
                  className="w-16"
                  variant="outline"
                >
                  Next
                </Button>
              </div>
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </>
  );
};

const TableHead = ({
  children,
  className,
  ...rest
}: React.ComponentProps<"th">) => (
  <th
    className={cn(
      "sticky whitespace-nowrap p-4 text-left text-sm text-baseBlack",
      className,
    )}
    {...rest}
  >
    {children}
  </th>
);

const TableData = ({
  children,
  className,
  ...rest
}: React.ComponentProps<"td">) => (
  <td
    className={cn("text-grayscale500 p-4 text-sm font-medium", className)}
    {...rest}
  >
    {children}
  </td>
);

const GenderPill = ({ gender }: { gender: string }) => (
  <div
    className={cn(
      "grid h-[25px] place-content-center rounded-l-full rounded-r-full px-[10px] text-sm",
      gender === "male"
        ? "bg-warning-50 text-warning-600"
        : "bg-[#E8EFF6] text-[#165FA3]",
    )}
  >
    {String(gender)}
  </div>
);
