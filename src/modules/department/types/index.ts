export type DepartmentDataRow = {
  no: number;
  id: string;
  formattedCode: string;
  name: string;
  country: string;
  countryId: string;
  chartMarkStatus: string;
  useStatus: string;
  closeDate: string;
  closed: boolean;
  createdDate: string;
  subDepartments: SubDepartmentDataRow[];
  expandable: boolean;
};

export type SubDepartmentDataRow = {
  id: string;
  formattedCode: string;
  parentDepartmentName: string;
  parentDepartmentId: string;
  name: string;
  closed: boolean;
  country: string;
  chartMarkStatus: string;
  useStatus: string;
  closeDate: string;
  createdDate: string;
  expandable: boolean;
};

export type HigherDepartmentCreateFormValues = {
  country: string;
  name: string;
  useStatus: string;
  chartMarkStatus: string;
};

export type LowerDepartmentCreateFormValues = {
  parentDepartmentId: string;
  name: string;
  useStatus: string;
  chartMarkStatus: string;
};

export type HigherDepartmentEditFormValues = {
  // country: string;
  countryId: string;
  name: string;
  closed: boolean;
  useStatus: string;
  chartMarkStatus: string;
};

export type LowerDepartmentEditFormValues = {
  name: string;
  closed: boolean;
  useStatus: string;
  chartMarkStatus: string;
};
