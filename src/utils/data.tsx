export interface OfficerType {
    value: string;
    label: string;
  }
  
  export function getOfficerTypes(): OfficerType[] {
    return [
      {
        value: "EUR",
        label: " ",
      },
      {
        value: "EUR",
        label: "Gazetted",
      },
      {
        value: "BTC",
        label: "Non Gazetted",
      },
      {
        value: "JPY",
        label: "Not Applicable",
      },
    ];
  }
  
  export interface Department {
    value: string;
    label: string;
  }
  
  export function getDepartments(): Department[] {
    return [
      {
        value: "EUR",
        label: " ",
      },
      {
        value: "EUR",
        label: " IS Wing",
      },
      {
        value: "BTC",
        label: "Confidential Branch",
      },
      {
        value: "JPY",
        label: "Exam Branch",
      },
      {
        value: "EUR",
        label: " Arrangement Branch",
      },
      {
        value: "BTC",
        label: "VMS",
      },
      {
        value: "JPY",
        label: "Expert Branch",
      },
    ];
  }
  
  export interface Designation {
    value: string;
    label: string;
  }
  
  export function getDesignations(): Designation[] {
    return [
      {
        value: "EUR",
        label: " ",
      },
      {
        value: "EUR",
        label: "Joint Secretary",
      },
      {
        value: "BTC",
        label: "Assistant Director",
      },
      {
        value: "JPY",
        label: "Assistant Section Officer",
      },
      // Add more designations as needed
    ];
  }
  
  export interface Status {
    value: string;
    label: string;
  }
  
  export function getStatuses(): Status[] {
    return [
      { value: " ", label: "" },
      { value: "Y", label: "Active" },
      { value: "N", label: "Inactive" },
    ];
  }
  
  export interface Module {
    value: string;
    label: string;
  }
  
  export function getModules(): Module[] {
    return [
      { value: " ", label: "" },
      { value: "Y", label: "OTR" },
      { value: "N", label: "SOAP" },
      { value: " ", label: "CDR" },
      { value: "Y", label: "DAF" },
      { value: "N", label: "ORA" },
      { value: " ", label: "E- Admit" },
      { value: "Y", label: "SAL" },
      { value: "N", label: "Chance Verification" },
      { value: " ", label: "IBR" },
      { value: "Y", label: "Panel Data Bank" },
      { value: "N", label: "VMS" },
      { value: " ", label: "Payment gateway" },
      { value: "Y", label: "ORA Pre Processing" },
      { value: "N", label: "ORA Post Processing" },
      { value: " ", label: "E-Summon" },
      { value: "Y", label: "Expert Management System" },
      { value: "N", label: "Hindi to English" },
      { value: " ", label: "Email & SMS Portal" },
      { value: "Y", label: "Marksheet System" },
      { value: "N", label: "Requisition Index Card" },
      { value: "Y", label: "Socio Economic Analysis" },
      { value: "N", label: "QPRep" },
      { value: " ", label: "PT Board" },
      { value: "Y", label: "Alpha Query System" },
      { value: "N", label: "Item Analysis Report" },
      { value: " ", label: "SSB Marks System" },
      { value: "Y", label: "SSB conventional" },
      { value: "N", label: "Change Slip" },
      { value: " ", label: "GIGW 3.0" },
    ];
  }
  
  export interface UserType {
    value: string;
    label: string;
  }
  
  export function getUserTypes(): UserType[] {
    return [
    {
      value: "EUR",
      label: "Employee ",
    },
    {
      value: "EUR",
      label: "Temporary",
    },
    {
      value: "BTC",
      label: "Contractual",
    },
    {
      value: "JPY",
      label: "Consultant",
    },
    {
      value: "EUR",
      label: "Advisor",
    },
    {
      value: "EUR",
      label: "Centre Coordinator ",
    },
    {
      value: "BTC",
      label: " Venue Coordinator ",
    },
    {
      value: "JPY",
      label: "Others",
    },
  ];
}

export function moduleName(): UserType[] {
  return [
  {
    value: "1",
    label: "OTR",
  },
  {
    value: "2",
    label: "SOAP",
  },
  {
    value: "3",
    label: "CDR",
  },
  {
    value: "4",
    label: "DAF",
  },
  {
    value: "5",
    label: "ORA",
  },
  {
    value: "5",
    label: "E-Admit",
  },
  {
    value: "6",
    label: "SAL",
  },
];
}

