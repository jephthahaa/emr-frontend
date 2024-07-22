import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from ".";
import { COMMON_COMPLAINTS } from "@/constants";
import { IPrescription } from "@/types";

const loadFromLocalStorage = (): RootState | undefined => {
  try {
    const serialisedState = localStorage.getItem("persistantState");
    if (serialisedState === null) return undefined;
    const state: RootState = JSON.parse(serialisedState);
    return state;
  } catch (e) {
    console.warn(e);
    return undefined;
  }
};

type initialStateType = {
  activeConsultationDetails:
    | {
        id: string;
        userId: string;
      }
    | undefined;
  currentStep: number;
  symptoms: {
    id: string;
    name: string;
    type: string;
  }[];
  DEFAULTS: {
    COMPLAINTS: string[];
  };
  consultationState: {
    complaints: string[];
    complaintsDuration: Date | string | undefined;
    sypmtoms: {
      [key: string]: {
        symptoms: string[];
        notes: string;
      };
    };
    medicineTaken: {
      medicine: string[];
      notes: string;
    };
    diagnosis: {
      name: string;
      code: string;
      notes: string;
    }[];
    prescriptions: Omit<IPrescription, "id">[];
    futureVisit?: {
      visitType: string;
      message: string;
      dateTime?: Date | string;
    };
    consultationNotes: string;
  };
};

const initialStateDefault: initialStateType = {
  DEFAULTS: {
    COMPLAINTS: COMMON_COMPLAINTS,
  },
  activeConsultationDetails: undefined,
  currentStep: 0,
  symptoms: [],
  consultationState: {
    complaints: [],
    complaintsDuration: new Date(),
    sypmtoms: {},
    medicineTaken: {
      medicine: [],
      notes: "",
    },
    diagnosis: [],
    prescriptions: [],
    futureVisit: {
      visitType: "",
      message: "",
      dateTime: new Date(),
    },
    consultationNotes: "",
  },
};

const initialState = (): initialStateType => {
  if (typeof window !== "undefined") {
    if (loadFromLocalStorage() !== undefined) {
      return loadFromLocalStorage()!.consultation;
    } else {
      return initialStateDefault;
    }
  } else {
    return initialStateDefault;
  }
};

const consultationSlice = createSlice({
  name: "consultation",
  initialState: initialState(),
  reducers: {
    setActiveConsultationDetails(
      state,
      action: PayloadAction<
        initialStateType["activeConsultationDetails"] | undefined
      >,
    ) {
      state.activeConsultationDetails = action.payload;
    },
    setCurrentStep(state, action: PayloadAction<number>) {
      state.currentStep = action.payload;
    },
    addSymptom(
      state,
      action: PayloadAction<{
        id: string;
        name: string;
        type: string;
      }>,
    ) {
      if (state.symptoms.find((symptom) => symptom.id === action.payload.id)) {
        return;
      }
      state.symptoms.push(action.payload);
    },
    removeSymptom(
      state,
      action: PayloadAction<{
        id: string;
        name: string;
        type: string;
      }>,
    ) {
      state.symptoms = state.symptoms.filter(
        (symptom) => symptom.id !== action.payload.id,
      );
    },
    setSymptoms(
      state,
      action: PayloadAction<
        {
          id: string;
          name: string;
          type: string;
        }[]
      >,
    ) {
      state.symptoms = action.payload;
    },

    addComplaint(state, action: PayloadAction<string>) {
      state.consultationState.complaints.push(action.payload);
    },
    addComplaintAndDefault(state, action: PayloadAction<string>) {
      state.consultationState.complaints.push(action.payload);
      state.DEFAULTS.COMPLAINTS.push(action.payload);
    },
    removeComplaint(state, action: PayloadAction<string>) {
      state.consultationState.complaints =
        state.consultationState.complaints.filter(
          (complaint) => complaint !== action.payload,
        );
    },

    setComplaintDuration(state, action: PayloadAction<Date | undefined>) {
      state.consultationState.complaintsDuration =
        action.payload?.toISOString();
    },

    setSymptomNotes(
      state,
      action: PayloadAction<{ id: string; notes: string }>,
    ) {
      if (!state.consultationState.sypmtoms[action.payload.id]) {
        state.consultationState.sypmtoms[action.payload.id] = {
          symptoms: [],
          notes: action.payload.notes,
        };
      }

      state.consultationState.sypmtoms[action.payload.id] = {
        symptoms: state.consultationState.sypmtoms[action.payload.id].symptoms,
        notes: action.payload.notes,
      };
    },
    prepareSymptomsExport(state, action: PayloadAction<undefined>) {
      const symptoms: initialStateType["consultationState"]["sypmtoms"] = {};

      state.symptoms.forEach((item) => {
        if (symptoms[item.type]) {
          if (!symptoms[item.type].symptoms.includes(item.name)) {
            symptoms[item.type].symptoms.push(item.name);
          }
        } else {
          symptoms[item.type] = {
            symptoms: [item.name],
            notes: "",
          };
        }
      });

      for (let key in symptoms) {
        if (state.consultationState.sypmtoms[key]) {
          state.consultationState.sypmtoms[key].symptoms =
            symptoms[key].symptoms;
        } else {
          state.consultationState.sypmtoms[key] = symptoms[key];
        }
      }

      for (let key in state.consultationState.sypmtoms) {
        if (symptoms[key] === undefined) {
          if (state.consultationState.sypmtoms[key]) {
            state.consultationState.sypmtoms[key].symptoms = [];
          }
        }

        if (
          state.consultationState.sypmtoms[key].notes === "" &&
          state.consultationState.sypmtoms[key].symptoms.length === 0
        ) {
          delete state.consultationState.sypmtoms[key];
        }
      }
    },

    addMedicine(state, action: PayloadAction<string>) {
      if (
        !state.consultationState.medicineTaken.medicine.includes(action.payload)
      ) {
        state.consultationState.medicineTaken.medicine.push(action.payload);
      }
    },
    removeMedicine(state, action: PayloadAction<string>) {
      state.consultationState.medicineTaken.medicine =
        state.consultationState.medicineTaken.medicine.filter(
          (item) => item !== action.payload,
        );
    },
    setMedicineNote(state, action: PayloadAction<string>) {
      state.consultationState.medicineTaken.notes = action.payload;
    },

    addDiagnosis(
      state,
      action: PayloadAction<
        initialStateType["consultationState"]["diagnosis"][0]
      >,
    ) {
      if (
        state.consultationState.diagnosis.find(
          (item) => item.code === action.payload.code,
        )
      ) {
        return;
      }
      state.consultationState.diagnosis.push(action.payload);
    },
    removeDiagnosis(
      state,
      action: PayloadAction<
        initialStateType["consultationState"]["diagnosis"][0]["code"]
      >,
    ) {
      state.consultationState.diagnosis =
        state.consultationState.diagnosis.filter(
          (item) => item.code !== action.payload,
        );
    },

    addPrescription(state, action: PayloadAction<Omit<IPrescription, "id">>) {
      if (
        state.consultationState.prescriptions.find(
          (item) => item.medicine === action.payload.medicine,
        )
      ) {
        return;
      }
      state.consultationState.prescriptions.push(action.payload);
    },
    removePrescription(
      state,
      action: PayloadAction<Omit<IPrescription, "id">>,
    ) {
      state.consultationState.prescriptions =
        state.consultationState.prescriptions.filter(
          (item) => item.medicine !== action.payload.medicine,
        );
    },

    setFutureVisitMessage(state, action: PayloadAction<string>) {
      if (state.consultationState.futureVisit) {
        state.consultationState.futureVisit.message = action.payload;
      }
    },
    setFutureVisitType(state, action: PayloadAction<string>) {
      if (state.consultationState.futureVisit) {
        state.consultationState.futureVisit.visitType = action.payload;
      }
    },
    setFutureVisitDateTime(
      state,
      action: PayloadAction<Date | string | undefined>,
    ) {
      if (state.consultationState.futureVisit) {
        state.consultationState.futureVisit.dateTime = action.payload;
      }
    },
    toggleFutureVisit(state, action: PayloadAction<boolean>) {
      if (state.consultationState.futureVisit) {
        state.consultationState.futureVisit = undefined;
      } else {
        state.consultationState.futureVisit = {
          visitType: "",
          message: "",
          dateTime: new Date(),
        };
      }
    },

    setConsultationNotes(state, action: PayloadAction<string>) {
      state.consultationState.consultationNotes = action.payload;
    },

    resetConsultationState(state) {
      state.activeConsultationDetails =
        initialStateDefault.activeConsultationDetails;
      state.consultationState = initialStateDefault.consultationState;
      state.symptoms = [];
      state.currentStep = 0;
    },
  },
});

export default consultationSlice;
