export type EmployeeDataRow = {
  no: number;
  id: string;
  country: string;
  authority: string;
  employeeId: string;
  employeeNumber: string;
  useStatus: string;
  phone: string;
  password: string;
  joiningDate: number;
  name: string;
  gender: string;
  email: string;
  position: string;
  kakaoId: string;
  department: string;
  subDepartment: string;
  birthDate: number;
  startDate: number;
  endDate: number;
  adminMemo: string;
  skills: Skill[];
  profileUrl: string;
  profileImgId: string;
};

export type EmployeeCreateFormValues = {
  country: string;
  employeeId: string;
  employeeNumber: string;
  phone: string;
  password: string;
  joiningDate: number;
  name: string;
  email: string;
  position: string;
  kakaoId: string;
  department: string;
  subDepartment: string;
  birthDate: Date | null;
  startDate: Date | null;
  endDate: Date | null;
  adminMemo: string;
  authority: string;
  useStatus: string;
  gender: string;
  skills: Skill[];
};

export type EmployeeUpdateFormValues = {
  // id: string;
  country: string;
  employeeId: string;
  employeeNumber: string;
  phone: string;
  password: string;
  joiningDate: number;
  name: string;
  email: string;
  position: string;
  kakaoId: string;
  department: string;
  subDepartment: string;
  birthDate: Date | null;
  startDate: Date | null;
  endDate: Date | null;
  adminMemo: string;
  gender: string;
  useStatus: string;
  authority: string;
  skills: Skill[];
};

export type Skill = {
  name: string;
  percentage: number;
};

export type EmployeeFilteringFormValue = {
  authority: string;
  department: string;
  subDepartment: string;
  useStatus: string;
};
