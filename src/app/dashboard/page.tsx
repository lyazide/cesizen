import React from "react";
import Header from "../../components/mainHeader";
import Footer from "../../components/Footer";
import Dashboard from "../../components/dashboard";
/*import TestSession from "../../components/testcomponent";*/
import { Box, Text } from "@chakra-ui/react";

export default function Page() {
  return (
    <>
      <Box as="main" backgroundColor={"brand.200"} padding="20px">
        <Header />
        <Box as="main" py={8} px={4}>
          <Text fontSize="xl">Dashboard</Text>

          <Dashboard />
        </Box>

        <Footer />
      </Box>
    </>
  );
}
