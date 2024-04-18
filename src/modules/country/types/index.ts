export type CountryDataRow = {
  id: string;
  no: number;
  name: string;
  formattedCode: string;
  useStatus: string;
};

export type CountryCreateFormValues = {
  name: string;
};

export type CountryUpdateFormValues = {
  name: string;
  useStatus: string;
};

export type Country = {
  id: string;
  name: string;
};
