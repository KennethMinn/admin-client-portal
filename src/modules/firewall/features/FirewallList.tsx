import { Box, Flex, Text } from "@mantine/core";
import DataTable from "react-data-table-component";
import { centerStyles } from "../../department/components/table/table-styles";
import { useGetAllFirewalls } from "../hooks/useGetAllFirewalls";
import { useFirewallColumns } from "../components/table/columns";
import { FirewallCreateFormModal } from "../components/modal/create/FirewallCreateFormModal";
import { useGetIp } from "../hooks/useGetIp";

export const FirewallList = () => {
  const firewallColumns = useFirewallColumns();
  const { data: firewalls, isLoading } = useGetAllFirewalls();
  const { data } = useGetIp();

  if (isLoading) {
    return <div>loading...</div>;
  }

  return (
    <Box component="div" style={{ borderRadius: "8px" }} bg="#fff" p={15}>
      <FirewallCreateFormModal />
      <Flex align="center">
        <Text fz={12} fw={400}>
          The IP address of the computer you are currently connected to is
        </Text>
        <Text ml={5} c="#FA6464" fz={12} fw={600}>
          {data?.clientIp}
        </Text>
      </Flex>
      <Box
        mt={10}
        component="div"
        style={{
          border: "1px solid #e0e0e0",
          borderRadius: "3px",
        }}
      >
        <DataTable
          columns={firewallColumns}
          data={firewalls}
          customStyles={centerStyles}
        />
      </Box>
      {/* <Flex justify="end" mt={10}>
        {data && (
          <Pagination
            radius="sm"
            size="sm"
            color="rgba(191, 191, 191, 1)"
            withEdges
            mt={10}
            total={totalPages}
            value={currentPage}
            onChange={setCurrentPage}
          />
        )}
      </Flex> */}
    </Box>
  );
};

FirewallList.displayName = "FirewallList";
