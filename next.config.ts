import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /*Ajouter suite erreur cypress*/
  reactStrictMode: true,
  //swcMinify: true,
  transpilePackages: ["react-icons"],
  /*Fin Ajouter suite erreur cypress*/
  experimental: {
    optimizePackageImports: ["@chakra-ui/react"],
    /*swcPlugins: [["swc-plugin-coverage-instrument", {}]],*/
  },
};

export default nextConfig;
