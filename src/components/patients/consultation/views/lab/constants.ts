export const LabsData = {
  "CHEMICAL PATHOLOGY": {
    "ANAEMIA STUDIES": ["Ferritin", "Folate", "Iron", "TIBC", "Vit B12"],
    "BLOOD GLUCOSE": [
      "FBS",
      "RBG",
      "2HR OGTT",
      "4HR OGTT",
      "GAD",
      "C-Peptide",
      "Insulin",
      "HbA1c",
      "Lactate",
      "Cortisol",
    ],
    "GEN. CHEMISTRY": [
      "Urea",
      "Creatinine",
      "Electrolytes",
      "Calcium",
      "Magnesium",
    ],
    "LIPID PROFILE": [
      "Cholesterol",
      "HDL-Ch",
      "Triglycerides",
      "LDL-Ch",
      "LDL-Ch calc",
    ],
    HORMONES: [
      "T3",
      "T4",
      "FT3",
      "FT4",
      "TSH",
      "Prolactin",
      "FSH",
      "LH",
      "Testosterone",
      "Oestradiol",
      "Progesterone",
      "PTH",
      "BNP",
    ],
    "LIVER FUNCTION TESTS (LFTs)": [
      "Bilirubin Total",
      "Bilirubin Direct",
      "Alk Phos",
      "Gamma GT",
      "Total Protein",
      "Serum Albumin",
      "ALT",
      "AST",
    ],
    MISCELLANEOUS: [
      "G6PD",
      "Alpha HBD",
      "Serum Acid Phos",
      "Fructosamine",
      "Urine Fructosamine",
      "Serum Amylase",
      "HBAc (Specific)",
    ],
    RENAL: [
      "Urine Protein",
      "Urine Albumin",
      "Urine Glucose",
      "Urine Chloride",
      "Urine Sodium",
      "Urine Potassium",
      "Urine Urea",
      "Urine Creatinine",
      "Urine Osmolality",
      "Urine Calcium",
      "Urine Amylase",
      "Urine Total Protein",
      "Urine Phosphate",
      "Urine Uric Acid",
    ],
    "TUMOR MARKERS": [
      "PSA",
      "CA-125",
      "CEA",
      "AFP",
      "hCG (Quantitative)",
      "CA 15-3",
    ],
    "URINE CHEMISTRY": [
      "Urine Protein",
      "Urine Glucose",
      "Urine Albumin",
      "Urine Osmolality",
      "Urine Sodium",
      "Urine Potassium",
      "Urine Calcium",
      "Urine Amylase",
      "Urine Chloride",
      "Urine Phosphate",
      "Urine Uric Acid",
    ],
  },
  HAEMATOLOGY: {
    "GENERAL HAEMATOLOGY": [
      "Hb",
      "Packed Cell Volume (PCV)",
      "Red Cell Count",
      "Total WBC Count",
      "Differential Count",
      "Platelet Count",
      "Reticulocyte Count",
      "ESR",
    ],
    "SPECIAL HAEMATOLOGY": [
      "HbA1c",
      "Hb Electrophoresis",
      "Direct Coombs Test",
      "Sickle Cell Test",
      "D-Dimer",
    ],
    COAGULATION: [
      "Bleeding Time",
      "Clotting Time",
      "Prothrombin Time",
      "APTT",
      "TT",
      "INR",
      "Fibrinogen",
      "Factor VIII Assay",
    ],
  },
  IMMUNOLOGY: {
    GENERAL: [
      "ASOT",
      "C3",
      "C4",
      "CRP",
      "RF",
      "HLA-B27",
      "HLA-B5",
      "HLA-B51",
      "HLA-B52",
      "Anti-DNA",
      "Anti-Sm",
      "Anti-Ro",
      "Anti-La",
      "Anti-CCP",
      "ANA",
    ],
  },
  MICROBIOLOGY: {
    ASPIRATES: ["AFB ZN", "AFB Bactec", "Fungus", "C/S"],
    BLOOD: ["AFB ZN", "AFB Bactec", "Fungus", "C/S"],
    "CEREBROSPINAL FLUID (CSF)": ["AFB ZN", "AFB Bactec", "Fungus", "C/S"],
    "CONJUNCTIVAL SWAB": ["AFB ZN", "AFB Bactec", "Fungus", "C/S"],
    "CORNEAL SCRAPING": ["AFB ZN", "AFB Bactec", "Fungus", "C/S"],
    "EYE SWAB": ["AFB ZN", "AFB Bactec", "Fungus", "C/S"],
    "INTRAVENOUS CATHETER TIP": ["AFB ZN", "AFB Bactec", "Fungus", "C/S"],
    "NASOPHARYNGEAL SWAB": ["AFB ZN", "AFB Bactec", "Fungus", "C/S"],
    "PLEURAL FLUID": ["AFB ZN", "AFB Bactec", "Fungus", "C/S"],
    "SKIN SCRAPING": ["AFB ZN", "AFB Bactec", "Fungus", "C/S"],
    SPUTUM: ["AFB ZN", "AFB Bactec", "Fungus", "C/S"],
    STOOL: ["AFB ZN", "AFB Bactec", "Fungus", "C/S"],
    SWABS: ["AFB ZN", "AFB Bactec", "Fungus", "C/S"],
    "THROAT SWAB": ["AFB ZN", "AFB Bactec", "Fungus", "C/S"],
    URINE: ["AFB ZN", "AFB Bactec", "Fungus", "C/S"],
    "VAGINAL SWAB": ["AFB ZN", "AFB Bactec", "Fungus", "C/S"],
    "WOUND SWAB": ["AFB ZN", "AFB Bactec", "Fungus", "C/S"],
  },
};

function getAllTests(json: Record<string, any>): string[] {
  let allTests: string[] = [];

  function traverse(obj: Record<string, any>): void {
    for (const key in obj) {
      if (Array.isArray(obj[key])) {
        allTests = allTests.concat(obj[key]);
      } else if (typeof obj[key] === "object") {
        traverse(obj[key]);
      }
    }
  }

  traverse(json);
  return allTests;
}
export const getSections = (category: keyof typeof LabsData) => {
  return Object.keys(LabsData[category]).map((section) => ({
    label: section,
    options: (LabsData[category] as any)[section] as string[],
  }));
};

export function findLabTest(testName: string) {
  for (const category in LabsData) {
    const subcategories = LabsData[category as keyof typeof LabsData];
    for (const subcategory in subcategories) {
      const tests = subcategories[
        subcategory as keyof typeof subcategories
      ] as string[];
      if (Array.isArray(tests) && tests.includes(testName)) {
        return {
          category: category,
          subcategory: subcategory,
          testName: testName,
        };
      }
    }
  }
  return null;
}

export const LabCategories = Object.keys(LabsData);

export const AllLabTests = getAllTests(LabsData);
