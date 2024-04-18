import { useParams } from "react-router-dom";
import { useGetEmployee } from "../hooks/useGetEmployee";
import { EmployeeEditForm } from "../features/EmployeeEditForm";
import { useEffect, useState } from "react";
import { Text } from "@mantine/core";

export const EmployeeEditPage = () => {
  const [loading, setLoading] = useState(true);
  const { employeeId } = useParams();
  const { data } = useGetEmployee(employeeId!);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setLoading(false); // Set loading to false after 2 seconds
    }, 2000);

    // Cleanup function
    return () => {
      clearTimeout(timerId); // Clear the timeout if the component unmounts before the timeout finishes
    };
  }, []);

  if (loading) return <Text>Loading...</Text>;

  if (!data) return null;

  return <EmployeeEditForm initialData={data} />;
};

EmployeeEditPage.displayName = "EmployeeEditPage";
