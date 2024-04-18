export type PositionDataRow = {
  id: string;
  no: number;
  name: string;
  formattedCode: string;
  useStatus: string;
};

export type PositionCreateFormValues = {
  name: string;
};

export type PositionUpdateFormValues = {
  name: string;
  useStatus: string;
};
