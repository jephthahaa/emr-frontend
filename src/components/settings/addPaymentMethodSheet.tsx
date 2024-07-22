import React, { useState } from "react";
import AppointmentTabs from "../appointments/appointmentTabs";
import { Input } from "../FormElements";
import Select from "../FormElements/Select";
import Button from "../misc/button";
import useZomujoApi from "@/services/zomujoApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { wait } from "@/utils";
import toast from "react-hot-toast";

const tabs = [
  {
    name: "Add card",
    count: 0,
  },
  {
    name: "Add mobile wallet",
    count: 0,
  },
];

const formSchema = z.object({
  cardNumber: z.string({ required_error: "card number is required" }),
  nameOnCard: z.string({ required_error: "name on card is required" }),
  mobileMoneyNumber: z.string({
    required_error: "mobile money number is required",
  }),
  mobileMoneyProvider: z.string({
    required_error: "mobile money provider is required",
  }),
  mobileMoneyName: z.string({
    required_error: "mobile money name is required",
  }),
});

type formFields = z.infer<typeof formSchema>;

const AddPaymentMethodSheet = ({ onClose }: { onClose: () => void }) => {
  const [selectedTab, setSelectedTab] = useState(tabs[0].name);
  const { addPaymentMethod } = useZomujoApi(false).doctors.settings;
  const queryClient = useQueryClient();

  const defaultValues: formFields = {
    cardNumber: "",
    nameOnCard: "",
    mobileMoneyName: "",
    mobileMoneyNumber: "",
    mobileMoneyProvider: "",
  };

  const f = useForm<formFields>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const m = useMutation({
    mutationKey: ["doctors", "addPaymentMethod", selectedTab],
    mutationFn: (data: formFields) =>
      addPaymentMethod(
        selectedTab === tabs[0].name
          ? {
              card: {
                cardNumber: data.cardNumber,
                nameOnCard: data.nameOnCard,
              },
            }
          : {
              mobile: {
                mobileMoneyName: data.mobileMoneyName,
                mobileMoneyNumber: data.mobileMoneyNumber,
                mobileMoneyProvider: data.mobileMoneyProvider,
              },
            },
      ),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["doctors", "PaymentMethods"],
      });
      toast.success("Payment method added successfully!");
      await wait(500);
      onClose();
    },
    onError: () => {
      toast.error("An error occured");
    },
  });

  return (
    <form
      onSubmit={f.handleSubmit((data) => m.mutate(data))}
      className="flex h-full flex-col justify-between p-7"
    >
      <div>
        <p className="text-2xl font-bold leading-6">Add method</p>
        <hr className="my-6" />
        <div className="flex flex-col gap-7">
          <div className="w-fit rounded-full bg-gray-100">
            <AppointmentTabs
              counts={[0, 0]}
              tabs={tabs}
              float={false}
              selectedTab={selectedTab}
              setSelectedTab={setSelectedTab}
            />
          </div>
          {selectedTab === tabs[0].name ? (
            <div key={tabs[0].name} className="flex flex-col gap-6">
              <div className="">
                <Input
                  label="Card Number"
                  placeholder="1231 1234 1243 1123"
                  {...f.register("cardNumber", { required: true })}
                  error={f.formState.errors.cardNumber}
                />
              </div>
              <div className="">
                <Input
                  label="Card Holder"
                  placeholder="Eg Bra Derez"
                  {...f.register("nameOnCard", { required: true })}
                  error={f.formState.errors.nameOnCard}
                />
              </div>
              <div className="flex flex-1 flex-row gap-4">
                <div className="flex-1">
                  <Input label="Expire date" placeholder="01/2026" />
                </div>
                <div className="flex-1">
                  <Input label="CVV" placeholder="Eg Bra Derez" />
                </div>
              </div>
            </div>
          ) : (
            <div key={tabs[1].name} className="flex flex-col gap-6">
              <div className="">
                <Input
                  label="Wallet Name"
                  placeholder="My Main"
                  {...f.register("mobileMoneyName", { required: true })}
                  error={f.formState.errors.mobileMoneyName}
                />
              </div>
              <div className="">
                <Select
                  label="Select network"
                  labelClassName="text-base"
                  {...f.register("mobileMoneyProvider", { required: true })}
                >
                  <option value="MTN">MTN</option>
                  <option value="AirtelTigo">AirtelTigo</option>
                  <option value="Telecel">Telecel(Vodafone)</option>
                </Select>
              </div>
              <div className="">
                <Input
                  label="Mobile Number"
                  placeholder="050 123 1234"
                  {...f.register("mobileMoneyNumber", { required: true })}
                  error={f.formState.errors.mobileMoneyNumber}
                />
              </div>
            </div>
          )}
        </div>
      </div>
      <Button isLoading={m.isPending} type="submit" className="w-full ">
        Add Payment Method
      </Button>
    </form>
  );
};

export default AddPaymentMethodSheet;
