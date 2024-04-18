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
import { useNavigate } from "react-router-dom";
import { useGetAllCountries } from "../../country/hooks/useGetAllCountries";
import { Country } from "../../country/types";
import { useForm } from "@mantine/form";
import { useGetAllHigherDepartments } from "../../department/hooks/higher/useGetAllHigherDepartments";
import {
  DepartmentDataRow,
  SubDepartmentDataRow,
} from "../../department/types";
import { useGetLowerDepartmentsByParentId } from "../../department/hooks/lower/useGetLowerDepartmentsByParentId";
import { useEffect, useMemo, useRef, useState } from "react";
import { useGetAllPositions } from "../../position/hooks/useGetAllPositions";
import { PositionDataRow } from "../../position/types";
import { DatePickerInput } from "@mantine/dates";
import { IconCloudUpload } from "@tabler/icons-react";
import { IconTrash } from "@tabler/icons-react";
import { convertMil } from "../../../utils/date-mil";
import { useCreateEmployee } from "../hooks/useCreateEmployee";
import { useGetHigherDepartment } from "../../department/hooks/higher/useGetHigherDepartment";
import { useGetLowerDepartment } from "../../department/hooks/lower/useGetLowerDepartment";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { notifyError } from "../../../utils/toast-error";
import { SkillCreateForm } from "../components/form/SkillCreateForm";
import { Skill } from "../types";
import { SkillUpdateForm } from "../components/form/SkillUpdateForm";
import { useCreateEmployeeProfile } from "../hooks/useCreateEmployeeProfile";
import { calculateAge } from "../../../utils/calculate-age";

export const EmployeeCreateForm = () => {
  const axios = useAxiosPrivate();
  const { mutate: addProfile, data: response } = useCreateEmployeeProfile();
  const [skills, setSkills] = useState<Skill[]>([]);
  const [newSkill, setNewSkill] = useState<Skill>({ name: "", percentage: 0 });
  const [disableDuplicateId, setDisableDuplicateId] = useState(false);
  const [disableDuplicateNumber, setDisableDuplicateNumber] = useState(false);
  const navigate = useNavigate();
  const { mutate, isPending } = useCreateEmployee();

  const [confirmPassword, setConfirmPassword] = useState("");
  const [file, setFile] = useState<File | null>(null);
  console.log(file);
  const [preview, setPreview] = useState(
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
  );
  const resetRef = useRef<() => void>(null);
  const { data } = useGetAllPositions();
  const positions = data?.map((position: PositionDataRow) => position.name);
  const form = useForm({
    initialValues: {
      country: "",
      employeeId: "",
      employeeNumber: "",
      phone: "",
      password: "",
      joiningDate: null,
      name: "",
      skills: [],
      email: "",
      position: "",
      kakaoId: "",
      department: "",
      subDepartment: "",
      birthDate: null,
      adminMemo: "",
      authority: "USER",
      useStatus: "USE",
      gender: "MALE",
    },

    validate: {
      country: (value) => (!value ? "country is required" : null),
      employeeId: (value) => {
        if (!value) return "this field is required";
        if (value.length < 3) return "this field is less than 3 characters";
        return null;
      },
      employeeNumber: (value) =>
        !value ? "employee number is required" : null,
      password: (value) => {
        const regex = new RegExp(
          "^(?=.[A-Z])(?=.[a-z])(?=.\\d)(?=.[@$!%?&])[A-Za-z\\d@$!%?&]+$"
        );

        if (!value) return "password is required";
        // if (!regex.test(value)) return "password must meet policy requirements";
        if (value.length < 8) return "password must be at least 8 characters";
        if (value !== confirmPassword) return "password must match";
        return null;
      },
      name: (value) => (!value ? "name is required" : null),
      phone: (value) =>
        value.length < 9 ? "phone number at least must be 9 characters" : null,
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
      joiningDate: (value) => (!value ? "join date is required" : null),
    },
  });

  const { data: countries } = useGetAllCountries();
  const { data: higherDepartments } = useGetAllHigherDepartments(
    form.values.country
  );
  console.log(higherDepartments, form.values.country);
  const { data: lowerDepartments } = useGetLowerDepartmentsByParentId(
    form.values.department
  );
  const { data: higherDepartment } = useGetHigherDepartment(
    form.values.department
  );
  const { data: lowerDepartment } = useGetLowerDepartment(
    form.values.subDepartment
  );

  const memoizedPositions = useMemo(() => positions, [positions]);
  const memoizedCountries = useMemo(() => countries, [countries]);
  const memoizedHigherDepartments = useMemo(
    () => higherDepartments,
    [higherDepartments]
  );
  const memoizedLowerDepartments = useMemo(
    () => lowerDepartments,
    [lowerDepartments]
  );
  const memoizedHigherDepartment = useMemo(
    () => higherDepartment,
    [higherDepartment]
  );
  const memoizedLowerDepartment = useMemo(
    () => lowerDepartment,
    [lowerDepartment]
  );

  const onCheckEmployeeId = async () => {
    if (!form.values.employeeId) return;
    try {
      const res = await axios.post(
        `${
          import.meta.env.VITE_API_EMPLOYEE_URL
        }/api/v1/employees/check-employee-id?employeeId=${
          form.values.employeeId
        }`
      );
      if (res.data.status === 400) {
        notifyError(res.data.message);
        setDisableDuplicateId(false);
      } else {
        setDisableDuplicateId(true);
      }
    } catch (error) {
      setDisableDuplicateId(false);
      console.error(error);
    }
  };

  const onCheckEmployeeNumber = async () => {
    if (!form.values.employeeNumber) return;
    try {
      const res = await axios.post(
        `${
          import.meta.env.VITE_API_EMPLOYEE_URL
        }/api/v1/employees/check-employee-number?employeeNumber=${
          form.values.employeeNumber
        }`
      );
      if (res.data.status === 400) {
        notifyError(res.data.message);
        setDisableDuplicateNumber(false);
      } else {
        setDisableDuplicateNumber(true);
      }
    } catch (error) {
      setDisableDuplicateNumber(false);
      console.error(error);
    }
  };

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

  const onSubmit = async (values) => {
    if (!disableDuplicateId || !disableDuplicateNumber) {
      notifyError("Check duplicate first");
      return;
    }
    try {
      const birthDate = convertMil(values.birthDate!);
      const joiningDate = convertMil(values.joiningDate!);

      const { startDate, ...otherValues } = values;

      const data = {
        ...otherValues,
        profileUrl: response?.downloadUrl ?? "",
        profileImgId: response?.id ?? "",
        skills,
        // department: memoizedHigherDepartment.name,
        // subDepartment: memoizedLowerDepartment.name,
        joiningDate,
        birthDate,
        phone: values.phone.toString(),
      };
      console.log(data);
      mutate(data);
      // navigate(-1);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    form.setFieldValue("subDepartment", "");
  }, [form.values.department]);

  useEffect(() => {
    form.setFieldValue("department", "");
  }, [form.values.country]);

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
                    countries && [
                      ...memoizedCountries.map((country: Country) => ({
                        value: country.id,
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
                  <Text w={242} fz={14}>
                    Role
                  </Text>
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
                    defaultChecked
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
                  <Text w={242} fz={14}>
                    Status
                  </Text>
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
                    defaultChecked
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
                <Flex w={322} align="start" gap={4}>
                  <TextInput
                    w="75%"
                    disabled={disableDuplicateId}
                    placeholder="Create your ID"
                    {...form.getInputProps("employeeId")}
                  />
                  <Button
                    disabled={disableDuplicateId}
                    onClick={onCheckEmployeeId}
                    type="button"
                    color="gray"
                  >
                    Check
                  </Button>
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
                    Employee number
                  </Text>
                </Flex>
                <Flex w={322} align="start" gap={4}>
                  <TextInput
                    disabled={disableDuplicateNumber}
                    w="75%"
                    placeholder="Create your employee number"
                    {...form.getInputProps("employeeNumber")}
                  />
                  <Button
                    disabled={disableDuplicateNumber}
                    onClick={onCheckEmployeeNumber}
                    type="button"
                    color="gray"
                  >
                    Check
                  </Button>
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
                  <Text w={242} fz={14}>
                    Gender
                  </Text>
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
                    defaultChecked
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
                    disabled={!form.values.department || !lowerDepartments}
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
                      Age ({calculateAge(form.values.birthDate)})
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
                      bg="#FAFAFA"
                      style={{
                        border: "1px solid #D0D0D0",
                        borderRadius: "4px",
                      }}
                      justify="space-between"
                      w={322}
                    >
                      <Text fz={14} w={60}>
                        {skill.name}
                      </Text>
                      <Text fz={14}>{skill.percentage}%</Text>
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
                      bg="#FAFAFA"
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
              variant="outline"
              type="button"
              color="#1C1C1C"
              onClick={() => navigate(-1)}
            >
              Cancel
            </Button>
            <Button
              w={100}
              radius={4}
              loading={isPending}
              disabled={isPending}
              color="#1C1C1C"
              type="submit"
            >
              Create
            </Button>
          </Flex>
        </form>
      </Box>
    </>
  );
};

EmployeeCreateForm.displayName = "EmployeeCreateForm";
