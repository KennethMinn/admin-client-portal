export type FireWallDataRow = {
  id: string;
  no: number;
  itemName: string;
  ipAddress: string;
  createdBy: string;
  lastConnectTime: string;
  createdDate: string;
};

export type FireWallCreateFormValues = {
  itemName: string;
  ipAddress: string;
  // createdBy: string;
};

export type FireWallUpdateFormValues = {
  itemName: string;
  ipAddress: string;
  // createdBy: string;
};

export type FireWall = {
  name: string;
};
