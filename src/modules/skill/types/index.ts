export type SkillDataRow = {
  id: string;
  no: number;
  name: string;
  formattedCode: string;
  useStatus: string;
};

export type SkillCreateFormValues = {
  name: string;
};

export type SkillUpdateFormValues = {
  name: string;
  useStatus: string;
};

export type Skill = {
  name: string;
};
