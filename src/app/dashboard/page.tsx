import React from "react";
import Header from "../../components/mainHeader";
import Footer from "../../components/Footer";
import Dashboard from "../../components/dashboard";
import PostWithLike from "../../components/post_like";
import { Box, Text, Link } from "@chakra-ui/react";

export default function Page() {
  return (
    <>
      <Box as="main" backgroundColor={"brand.200"} padding="20px">
        <Header />
        <Box as="main" py={8} px={4}>
          <Text fontSize="xl">Dashboard</Text>
          <h1>Home</h1>
          <Link href="/about">About</Link>

          <Dashboard />

          <PostWithLike />
        </Box>

        <Footer />
      </Box>
    </>
  );
}
