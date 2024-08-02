import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";

type TableProps = {
  data?: any[];
  currentPage?: number;
  totalPages?: number;
  onChangePage?: (page: number) => void;
};

const IcdsTable = ({
  data = [],
  currentPage = 1,
  totalPages = 1,
  onChangePage,
}: TableProps) => {
  return (
    <Table>
      <TableHeader className="sticky top-0 z-20 bg-white">
        <TableRow>
          <TableHead>Issuer name</TableHead>
          <TableHead>Doctor/Patient</TableHead>
          <TableHead>Issue</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>
            <div className="flex flex-row items-center">
              Date <ChevronsUpDown className="h-4 w-4" />
            </div>
          </TableHead>
          <TableHead>
            <div className="flex flex-col items-center justify-center">
              Action
            </div>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {/*{data.map((item) => (*/}
        {/*  <TableRow key={item.id}>*/}
        {/*    <TableCell>*/}
        {/*      <div className="flex items-center gap-2">*/}
        {/*        <div className="h-7 w-7 shrink-0 rounded-full  bg-gray-600">*/}
        {/*          <Image*/}
        {/*            className="h-full w-full rounded-full"*/}
        {/*            src={isUrl(item.patient.profilePicture)}*/}
        {/*            width={28}*/}
        {/*            height={28}*/}
        {/*            alt="profile"*/}
        {/*          />*/}
        {/*        </div>*/}

        {/*        <span className="block w-[min(170px)] overflow-hidden overflow-ellipsis whitespace-nowrap">*/}
        {/*          {`${item.patient.firstName} ${item.patient.lastName}`}*/}
        {/*        </span>*/}
        {/*      </div>*/}
        {/*    </TableCell>*/}
        {/*    <TableCell className="text-gray-500">Patient</TableCell>*/}
        {/*    <TableCell className="text-gray-500">{item.type}</TableCell>*/}
        {/*    <TableCell className="text-end text-gray-500">*/}
        {/*      {item.amount.toFixed(2)}*/}
        {/*    </TableCell>*/}
        {/*    <TableCell className="text-gray-500">{item.channel}</TableCell>*/}
        {/*    <TableCell>*/}
        {/*      <Chip*/}
        {/*        text={item.status}*/}
        {/*        varient={item.status === "success" ? "green" : "blood"}*/}
        {/*      />*/}
        {/*    </TableCell>*/}
        {/*    <TableCell className="text-gray-500">*/}
        {/*      {format(new Date(item.createdAt), "MMM dd, yyyy")}*/}
        {/*    </TableCell>*/}
        {/*    <TableCell>*/}
        {/*      <Sheet*/}
        {/*        sheetChild={({ onClose }) => (*/}
        {/*          <TransactionsDetailsSheet onClose={onClose} id={item.id} />*/}
        {/*        )}*/}
        {/*      >*/}
        {/*        <button className="flex w-full flex-col items-center justify-center">*/}
        {/*          <EyeIcon className="h-5 w-5" />*/}
        {/*        </button>*/}
        {/*      </Sheet>*/}
        {/*    </TableCell>*/}
        {/*  </TableRow>*/}
        {/*))}*/}
        {data && data.length === 0 && (
          <TableRow>
            <TableCell colSpan={7} className="text-center">
              No Transactions
            </TableCell>
          </TableRow>
        )}
      </TableBody>
      <TableFooter className="sticky bottom-0 z-20 h-11 bg-gray-100">
        <TableRow className="h-11">
          <TableCell colSpan={1} className="text-start"></TableCell>
          <TableCell colSpan={3} className="text-center"></TableCell>
          <TableCell colSpan={2} className="p-2 text-end">
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
  );
};
export default IcdsTable;
