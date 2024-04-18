export type DocumentDataRow = {
  id: string;
  no: number;
  name: string;
  formattedCode: string;
  useStatus: string;
};

export type DocumentCreateFormValues = {
  name: string;
};

export type DocumentUpdateFormValues = {
  name: string;
  useStatus: string;
};

export type Document = {
  name: string;
};
