import {
  ActionIcon,
  Box,
  Button,
  FileButton,
  Flex,
  Group,
  Image,
  NumberInput,
  PasswordInput,
  Radio,
  Select,
  Stack,
  Text,
  TextInput,
  Textarea,
} from "@mantine/core";
import { IconArrowLeft, IconCalendar } from "@tabler/icons-react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetAllCountries } from "../../country/hooks/useGetAllCountries";
import { Country } from "../../country/types";
import { useForm } from "@mantine/form";
import { EmployeeDataRow, Skill } from "../types";
import { useGetAllHigherDepartments } from "../../department/hooks/higher/useGetAllHigherDepartments";
import {
  DepartmentDataRow,
  SubDepartmentDataRow,
} from "../../department/types";
import { useGetLowerDepartmentsByParentId } from "../../department/hooks/lower/useGetLowerDepartmentsByParentId";
import { FC, useEffect, useMemo, useRef, useState } from "react";
import { useGetAllPositions } from "../../position/hooks/useGetAllPositions";
import { PositionDataRow } from "../../position/types";
import { DatePickerInput } from "@mantine/dates";
import { IconCloudUpload } from "@tabler/icons-react";
import { IconTrash } from "@tabler/icons-react";
import { convertMil } from "../../../utils/date-mil";
import { useGetHigherDepartment } from "../../department/hooks/higher/useGetHigherDepartment";
import { useGetLowerDepartment } from "../../department/hooks/lower/useGetLowerDepartment";
import { useUpdateEmployee } from "../hooks/useUpdateEmployee";
import { SkillCreateForm } from "../components/form/SkillCreateForm";
import { SkillUpdateForm } from "../components/form/SkillUpdateForm";
import { useCreateEmployeeProfile } from "../hooks/useCreateEmployeeProfile";
import { calculateAge } from "../../../utils/calculate-age";

type EmployeeEditFormProps = {
  initialData: EmployeeDataRow;
  initialHigherDepartment: DepartmentDataRow;
  initialLowerDepartment: SubDepartmentDataRow;
};

export const EmployeeEditForm: FC<EmployeeEditFormProps> = ({
  initialData,
}) => {
  const { mutate, isPending } = useUpdateEmployee();
  const { mutate: addProfile, data: response } = useCreateEmployeeProfile();

  const [skills, setSkills] = useState<Skill[]>(initialData.skills);
  const [newSkill, setNewSkill] = useState<Skill>({ name: "", percentage: 0 });
  const { employeeId } = useParams();
  const navigate = useNavigate();
  const [confirmPassword, setConfirmPassword] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState(
    initialData.profileUrl ||
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
  );
  const resetRef = useRef<() => void>(null);
  const { data } = useGetAllPositions();
  const positions = data?.map((position: PositionDataRow) => position.name);
  const form = useForm({
    initialValues: {
      ...initialData,
      birthDate: new Date(initialData.birthDate!),
      startDate: new Date(initialData.startDate!),
      endDate: null,
      joiningDate: new Date(initialData.joiningDate),
    },

    validate: {
      country: (value) => (!value ? "country is required" : null),
      employeeId: (value) => (!value ? "employee id is required" : null),
      employeeNumber: (value) =>
        !value ? "employee number is required" : null,
      password: (value) => {
        if (!value) return "password is required";
        if (value.length < 8) return "password must be at least 8 characters";
        if (value !== confirmPassword && confirmPassword)
          return "password must match";
        return null;
      },
      name: (value) => (!value ? "name is required" : null),
      phone: (value) =>
        value?.length < 9 ? "phone number at least must be 9 characters" : null,
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      department: (value) => (!value ? "this field is required" : null),
      subDepartment: (value) => (!value ? "this field is required" : null),
      position: (value) => (!value ? "position is required" : null),
      birthDate: (value) => {
        if (!value) {
          return "This field is required";
        }

        const eighteenYears = 18 * 365.25 * 24 * 60 * 60 * 1000; // More accurate with leap years
        const minimumDate = Date.now() - eighteenYears;

        if (convertMil(value) > minimumDate) {
          return "Must be 18 years or older";
        }

        return null;
      },
      startDate: (value) => (!value ? "start date is required" : null),
      endDate: (value) => {
        // if (!value) return "this filed is required";
        if (value && convertMil(value) < convertMil(form.values.joiningDate))
          return "end date must be greater than start date";
        return null;
      },
    },
  });
  console.log(form.values);

  const { data: countries } = useGetAllCountries();
  const { data: higherDepartments } = useGetAllHigherDepartments(
    form.values.country
  );
  const { data: higherDepartment } = useGetHigherDepartment(
    form.values.department
  );
  const { data: lowerDepartment } = useGetLowerDepartment(
    form.values.subDepartment
  );
  const { data: lowerDepartments } = useGetLowerDepartmentsByParentId(
    form.values.department
  );

  const memoizedPositions = useMemo(() => positions, [positions]);
  const memoizedCountries = useMemo(() => countries, [countries]);
  const memoizedHigherDepartments = useMemo(
    () => higherDepartments,
    [higherDepartments]
  );
  const memoizedHigherDepartment = useMemo(
    () => higherDepartment,
    [higherDepartment]
  );
  const memoizedLowerDepartments = useMemo(
    () => lowerDepartments,
    [lowerDepartments]
  );
  const memoizedLowerDepartment = useMemo(
    () => lowerDepartment,
    [lowerDepartment]
  );

  const onChange = (file: File | null) => {
    if (!file) return;

    setFile(file);
    const formData = new FormData();
    formData.append("profile", file);
    addProfile(formData);
    const reader = new FileReader();
    reader.onload = () => setPreview(reader.result as string); // Set preview URL
    reader.readAsDataURL(file);
  };

  const clearFile = () => {
    setFile(null);
    setPreview(
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
    );
    resetRef.current?.();
  };

  console.log("Initial data:", initialData);

  const onSubmit = async (values) => {
    try {
      const birthDate = convertMil(values.birthDate!);
      // const startDate = convertMil(values.startDate!);
      const endDate = values.endDate ? convertMil(values.endDate!) : 0;
      const joiningDate = convertMil(values.joiningDate!);

      const { no, startDate, createdDate, ...otherValues } = values;

      const data = {
        id: employeeId,
        ...otherValues,
        profileUrl: response?.downloadUrl || initialData.profileUrl,
        profileImgId: response?.id ?? initialData.profileImgId,
        skills,
        department: memoizedHigherDepartment.name,
        subDepartment: memoizedLowerDepartment.name,
        birthDate,
        joiningDate,
        endDate,
        phone: values.phone.toString(),
      };
      console.log(data);
      mutate(data);
      navigate(-1);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    form.setFieldValue("subDepartment", "");
  }, [form.values.department]);

  return (
    <>
      <Flex
        align="center"
        gap={6}
        onClick={() => navigate(-1)}
        style={{ cursor: "pointer" }}
      >
        <IconArrowLeft stroke={1.5} />
        <Text fz={16} fw={600}>
          Employee and Authority Management
        </Text>
      </Flex>
      <Box
        mt={15}
        component="div"
        style={{ borderRadius: "8px" }}
        bg="#fff"
        p={15}
      >
        <form onSubmit={form.onSubmit(onSubmit)}>
          <Flex gap={30}>
            <Stack gap={0}>
              <Flex h={250} align="center" gap={40}>
                <Flex bg="#FAFAFA" justify="center" h={250} direction="column">
                  <Flex justify="center" w={262}>
                    <Image radius="50%" w={150} h={150} src={preview} />
                  </Flex>
                  <Group align="center" mt={20} justify="center">
                    <FileButton
                      resetRef={resetRef}
                      onChange={onChange}
                      accept="image/png,image/jpeg"
                    >
                      {(props) => (
                        <Button
                          size="sm"
                          color="#1C1C1C"
                          rightSection={<IconCloudUpload size={18} />}
                          {...props}
                        >
                          Upload image
                        </Button>
                      )}
                    </FileButton>
                    <ActionIcon
                      size="lg"
                      radius="50%"
                      disabled={!file}
                      color="red"
                      onClick={clearFile}
                    >
                      <IconTrash size={18} />
                    </ActionIcon>
                  </Group>
                </Flex>
              </Flex>
              <Flex h={70} align="center" gap={40}>
                <Flex
                  bg="#FAFAFA"
                  pl={20}
                  justify="center"
                  h={70}
                  direction="column"
                >
                  <Text fz={14} w={242}>
                    Country
                  </Text>
                </Flex>
                <Select
                  w={322}
                  placeholder="Select Country"
                  {...form.getInputProps("country")}
                  data={
                    memoizedCountries && [
                      ...memoizedCountries.map((country: Country) => ({
                        value: country.name,
                        label: country.name,
                      })),
                    ]
                  }
                />
              </Flex>
              <Flex align="center" gap={40}>
                <Flex
                  bg="#FAFAFA"
                  pl={20}
                  justify="center"
                  h={70}
                  direction="column"
                >
                  <Text w={242}>Role</Text>
                </Flex>
                <Flex gap={30}>
                  <Radio
                    styles={{
                      label: {
                        marginRight: "15px",
                        cursor: "pointer",
                      },
                      radio: {
                        cursor: "pointer",
                      },
                    }}
                    w={70}
                    name="authority"
                    defaultChecked={initialData.authority === "User"}
                    {...form.getInputProps("authority")}
                    label="User"
                    value="User"
                  />
                  <Radio
                    styles={{
                      label: {
                        marginRight: "15px",
                        cursor: "pointer",
                      },
                      radio: {
                        cursor: "pointer",
                      },
                    }}
                    {...form.getInputProps("authority")}
                    defaultChecked={initialData.authority === "Admin"}
                    name="authority"
                    label="Admin"
                    value="Admin"
                  />
                </Flex>
              </Flex>
              <Flex align="center" gap={40}>
                <Flex
                  bg="#FAFAFA"
                  pl={20}
                  justify="center"
                  h={70}
                  direction="column"
                >
                  <Text w={242}>Status</Text>
                </Flex>
                <Flex gap={30}>
                  <Radio
                    styles={{
                      label: {
                        marginRight: "15px",
                        cursor: "pointer",
                      },
                      radio: {
                        cursor: "pointer",
                      },
                    }}
                    w={70}
                    name="useStatus"
                    defaultChecked={initialData.useStatus === "USE"}
                    {...form.getInputProps("useStatus")}
                    label="Use"
                    value="USE"
                  />
                  <Radio
                    styles={{
                      label: {
                        marginRight: "15px",
                        cursor: "pointer",
                      },
                      radio: {
                        cursor: "pointer",
                      },
                    }}
                    {...form.getInputProps("useStatus")}
                    defaultChecked={initialData.useStatus === "STOP"}
                    name="useStatus"
                    label="Stop"
                    value="STOP"
                  />
                </Flex>
              </Flex>
              <Flex align="center" gap={40}>
                <Flex
                  bg="#FAFAFA"
                  pl={20}
                  justify="center"
                  h={70}
                  direction="column"
                >
                  <Text fz={14} w={242}>
                    ID
                  </Text>
                </Flex>

                <TextInput
                  w={322}
                  disabled
                  placeholder="Create your ID"
                  {...form.getInputProps("employeeId")}
                />
              </Flex>
              <Flex align="center" gap={40}>
                <Flex
                  bg="#FAFAFA"
                  pl={20}
                  justify="center"
                  h={70}
                  direction="column"
                >
                  <Text fz={14} w={242}>
                    Employee number
                  </Text>
                </Flex>
                <TextInput
                  w={322}
                  disabled
                  placeholder="Create your employee number"
                  {...form.getInputProps("employeeNumber")}
                />
              </Flex>
              <Flex align="center" gap={40}>
                <Flex
                  bg="#FAFAFA"
                  pl={20}
                  justify="center"
                  h={70}
                  direction="column"
                >
                  <Text fz={14} w={242}>
                    Password
                  </Text>
                </Flex>
                <PasswordInput
                  placeholder="Enter Password"
                  w={322}
                  {...form.getInputProps("password")}
                />
              </Flex>
              <Flex align="center" gap={40}>
                <Flex
                  bg="#FAFAFA"
                  pl={20}
                  justify="center"
                  h={70}
                  direction="column"
                >
                  <Text fz={14} w={242}>
                    Confirm Password
                  </Text>
                </Flex>
                <PasswordInput
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm Password"
                  w={322}
                />
              </Flex>
              <Flex align="center" gap={40}>
                <Flex
                  bg="#FAFAFA"
                  pl={20}
                  justify="center"
                  h={70}
                  direction="column"
                >
                  <Text fz={14} w={242}>
                    Name
                  </Text>
                </Flex>
                <TextInput
                  placeholder="Enter name"
                  w={322}
                  {...form.getInputProps("name")}
                />
              </Flex>
              <Flex align="center" gap={40}>
                <Flex
                  bg="#FAFAFA"
                  pl={20}
                  justify="center"
                  h={70}
                  direction="column"
                >
                  <Text w={242}>Gender</Text>
                </Flex>
                <Flex gap={30}>
                  <Radio
                    styles={{
                      label: {
                        marginRight: "15px",
                        cursor: "pointer",
                      },
                      radio: {
                        cursor: "pointer",
                      },
                    }}
                    w={70}
                    name="gender"
                    defaultChecked={initialData.gender === "MALE"}
                    {...form.getInputProps("gender")}
                    label="Male"
                    value="MALE"
                  />
                  <Radio
                    styles={{
                      label: {
                        marginRight: "15px",
                        cursor: "pointer",
                      },
                      radio: {
                        cursor: "pointer",
                      },
                    }}
                    {...form.getInputProps("gender")}
                    defaultChecked={initialData.gender === "FEMALE"}
                    name="gender"
                    label="Female"
                    value="FEMALE"
                  />
                </Flex>
              </Flex>
              <Flex align="center" gap={40}>
                <Flex
                  bg="#FAFAFA"
                  pl={20}
                  justify="center"
                  h={70}
                  direction="column"
                >
                  <Text fz={14} w={242}>
                    Email
                  </Text>
                </Flex>
                <TextInput
                  placeholder="Enter your email"
                  w={322}
                  {...form.getInputProps("email")}
                />
              </Flex>
              <Flex align="center" gap={40}>
                <Flex
                  bg="#FAFAFA"
                  pl={20}
                  justify="center"
                  h={70}
                  direction="column"
                >
                  <Text fz={14} w={242}>
                    Phone number
                  </Text>
                </Flex>
                <NumberInput
                  hideControls
                  placeholder="Enter your phone number"
                  w={322}
                  {...form.getInputProps("phone")}
                />
              </Flex>
              <Flex align="center" gap={40}>
                <Flex
                  bg="#FAFAFA"
                  pl={20}
                  justify="center"
                  h={70}
                  direction="column"
                >
                  <Text fz={14} w={242}>
                    Kakaotalk ID
                  </Text>
                </Flex>
                <TextInput
                  placeholder="Enter kakaotalk ID"
                  w={322}
                  {...form.getInputProps("kakaoId")}
                />
              </Flex>
              <Flex align="center" gap={40}>
                <Flex
                  bg="#FAFAFA"
                  pl={20}
                  justify="center"
                  h={70}
                  direction="column"
                >
                  <Text fz={14} w={242}>
                    Department
                  </Text>
                </Flex>
                <Flex w={322} align="start" gap={10}>
                  <Select
                    allowDeselect={false}
                    {...form.getInputProps("department")}
                    maxDropdownHeight={160}
                    placeholder="Higher Department"
                    data={memoizedHigherDepartments?.map(
                      (department: DepartmentDataRow) => ({
                        label: department.name,
                        value: department.id,
                      })
                    )}
                  />
                  <Select
                    allowDeselect={false}
                    // disabled={
                    //   !form.values.department ||
                    //   !lowerDepartments ||
                    //   !memoizedInitialLowerDepartment
                    // }
                    {...form.getInputProps("subDepartment")}
                    placeholder="Lower Department"
                    data={memoizedLowerDepartments?.map(
                      (department: SubDepartmentDataRow) => ({
                        label: department.name,
                        value: department.id,
                      })
                    )}
                  />
                </Flex>
              </Flex>
              <Flex align="center" gap={40}>
                <Flex
                  bg="#FAFAFA"
                  pl={20}
                  justify="center"
                  h={70}
                  direction="column"
                >
                  <Text fz={14} w={242}>
                    Birth date
                  </Text>
                </Flex>
                <Flex justify="center" align="center">
                  <DatePickerInput
                    w={322}
                    leftSection={<IconCalendar stroke={1} />}
                    // leftSectionPointerEvents="none"
                    placeholder="Choose birth date"
                    {...form.getInputProps("birthDate")}
                  />
                  {form.values.birthDate && (
                    <Text ml={10} fz={14}>
                      Age({calculateAge(form.values.birthDate)})
                    </Text>
                  )}
                </Flex>
              </Flex>
              <Flex align="center" gap={40}>
                <Flex
                  bg="#FAFAFA"
                  pl={20}
                  justify="center"
                  h={70}
                  direction="column"
                >
                  <Text fz={14} w={242}>
                    Join date
                  </Text>
                </Flex>
                <DatePickerInput
                  w={322}
                  leftSection={<IconCalendar stroke={1} />}
                  // leftSectionPointerEvents="none"
                  placeholder="Choose start date"
                  {...form.getInputProps("joiningDate")}
                />
              </Flex>
              <Flex align="center" gap={40}>
                <Flex
                  bg="#FAFAFA"
                  pl={20}
                  justify="center"
                  h={70}
                  direction="column"
                >
                  <Text fz={14} w={242}>
                    End date
                  </Text>
                </Flex>
                <DatePickerInput
                  w={322}
                  leftSection={<IconCalendar stroke={1} />}
                  // leftSectionPointerEvents="none"
                  placeholder="Choose end date"
                  {...form.getInputProps("endDate")}
                />
              </Flex>
              <Flex align="center" gap={40}>
                <Flex
                  bg="#FAFAFA"
                  pl={20}
                  justify="center"
                  h={80}
                  direction="column"
                >
                  <Text fz={14} w={242}>
                    Admin memo
                  </Text>
                </Flex>
                <Textarea
                  {...form.getInputProps("adminMemo")}
                  w={322}
                  placeholder="Enter memo here..."
                />
              </Flex>
              <Flex align="center" gap={40}>
                <Flex
                  bg="#FAFAFA"
                  pl={20}
                  justify="center"
                  h={70}
                  direction="column"
                >
                  <Text fz={14} w={242}>
                    Position
                  </Text>
                </Flex>
                <Select
                  w={322}
                  allowDeselect={false}
                  {...form.getInputProps("position")}
                  maxDropdownHeight={160}
                  placeholder="Enter your position"
                  data={memoizedPositions}
                />
              </Flex>
              <Flex align="start" gap={40}>
                <Flex
                  bg="#FAFAFA"
                  pl={20}
                  justify="center"
                  h={50}
                  direction="column"
                >
                  <Text fz={14} w={242}>
                    Skills and proficiency
                  </Text>
                </Flex>
                <Flex w={322} direction="column" align="start" gap={10}>
                  <Box mb={10}>
                    <SkillCreateForm
                      newSkill={newSkill}
                      setSkills={setSkills}
                      setNewSkill={setNewSkill}
                    />
                  </Box>
                  {skills.map((skill: Skill, i: number) => (
                    <Flex
                      key={i}
                      p={10}
                      bg="#FAFAFA                    "
                      style={{
                        border: "1px solid #D0D0D0",
                        borderRadius: "4px",
                      }}
                      justify="space-between"
                      w={322}
                    >
                      <Text fz={14}>{skill.name}</Text>
                      <Text fz={14} w={60}>
                        {skill.percentage}%
                      </Text>
                      <Flex gap={10} align="center">
                        <SkillUpdateForm
                          initialSkill={skills[i]}
                          index={i}
                          setSkills={setSkills}
                        />
                        <IconTrash
                          onClick={() => {
                            setSkills((prevSkills) =>
                              prevSkills.filter((_, index) => index !== i)
                            );
                          }}
                          stroke={1.5}
                          style={{ cursor: "pointer", color: "#D05151" }}
                        />
                      </Flex>
                    </Flex>
                  ))}
                </Flex>
              </Flex>
            </Stack>
            {/* <Stack>
              <Flex align="center" gap={40}>
                <Flex
                  bg="#FAFAFA"
                  pl={20}
                  justify="center"
                  h={70}
                  direction="column"
                >
                  <Text fz={14} w={242}>
                    Position
                  </Text>
                </Flex>
                <Select
                  w={322}
                  allowDeselect={false}
                  {...form.getInputProps("position")}
                  maxDropdownHeight={160}
                  placeholder="Enter your position"
                  data={memoizedPositions}
                />
              </Flex>
              <Flex align="start" gap={40}>
                <Flex
                  bg="#FAFAFA"
                  pl={20}
                  justify="center"
                  h={50}
                  direction="column"
                >
                  <Text fz={14} w={242}>
                    Skills and proficiency
                  </Text>
                </Flex>
                <Flex w={322} direction="column" align="start" gap={10}>
                  <Box mb={10}>
                    <SkillCreateForm
                      newSkill={newSkill}
                      setSkills={setSkills}
                      setNewSkill={setNewSkill}
                    />
                  </Box>
                  {skills.map((skill: Skill, i: number) => (
                    <Flex
                      key={i}
                      p={10}
                      bg="#FAFAFA                    "
                      style={{
                        border: "1px solid #D0D0D0",
                        borderRadius: "4px",
                      }}
                      justify="space-between"
                      w={322}
                    >
                      <Text>{skill.name}</Text>
                      <Text>{skill.percentage}%</Text>
                      <Flex gap={10} align="center">
                        <SkillUpdateForm
                          initialSkill={skills[i]}
                          index={i}
                          setSkills={setSkills}
                        />
                        <IconTrash
                          onClick={() => {
                            setSkills((prevSkills) =>
                              prevSkills.filter((_, index) => index !== i)
                            );
                          }}
                          stroke={1.5}
                          style={{ cursor: "pointer", color: "#D05151" }}
                        />
                      </Flex>
                    </Flex>
                  ))}
                </Flex>
              </Flex>
            </Stack> */}
          </Flex>
          <Flex justify="end" align="center" mt={15} gap={15}>
            <Button
              w={100}
              radius={4}
              color="#1C1C1C"
              variant="outline"
              type="button"
              onClick={() => navigate(-1)}
            >
              Cancel
            </Button>
            <Button
              w={100}
              radius={4}
              color="#1C1C1C"
              loading={isPending}
              disabled={isPending}
              type="submit"
            >
              Save
            </Button>
          </Flex>
        </form>
      </Box>
    </>
  );
};

EmployeeEditForm.displayName = "EmployeeEditForm";
