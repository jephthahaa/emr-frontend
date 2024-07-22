import TextArea from "@/components/FormElements/TextArea";
import MultiSelect from "@/components/FormElements/multiSelect";
import CustomTimePicker from "@/components/misc/customTimePicker";
import DatePicker from "@/components/misc/datePicker";
import ToggleButton from "@/components/misc/toggleButton";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { action } from "@/redux";
import { Info } from "lucide-react";

const FutureVisitsView = () => {
  const futureVisit = useAppSelector(
    (state) => state.consultation.consultationState.futureVisit,
  );
  const dispatch = useAppDispatch();

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row items-center gap-2">
        <div className="flex flex-row items-center gap-1.5">
          <p className="text-lg font-bold">Future Visits</p>
          <Info size={14} />
        </div>
        <ToggleButton
          toggled={futureVisit !== undefined}
          setToggled={(toggled) =>
            dispatch(action.consultation.toggleFutureVisit(toggled))
          }
        />
      </div>
      {futureVisit && (
        <div className="flex flex-col gap-12">
          <MultiSelect
            label="Visit Type"
            options={[
              { value: "General Visit", label: "General Visit" },
              { value: "General Screening", label: "General Screening" },
            ]}
            selected={futureVisit.visitType}
            setSelected={(selected) =>
              dispatch(action.consultation.setFutureVisitType(selected))
            }
            containerClassName="gap-4"
          />

          <div className="flex flex-col gap-5">
            <p className="font-medium leading-4">Send SMS & Email in:</p>

            <div className="flex flex-row flex-wrap gap-3">
              <DatePicker
                date={futureVisit.dateTime}
                setDate={(date) =>
                  dispatch(action.consultation.setFutureVisitDateTime(date))
                }
              />
              <CustomTimePicker
                date={futureVisit.dateTime}
                setDate={(date) =>
                  dispatch(action.consultation.setFutureVisitDateTime(date))
                }
                className="flex w-[120px]"
              />
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <p className="font-medium leading-4">Compose Message</p>
            <TextArea
              className="h-36"
              value={futureVisit.message}
              onChange={(e) =>
                dispatch(
                  action.consultation.setFutureVisitMessage(e.target.value),
                )
              }
              placeholder="Type something"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default FutureVisitsView;
