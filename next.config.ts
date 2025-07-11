import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /*Ajouter suite erreur cypress*/
  reactStrictMode: true,
  //output: "export", //used for capacitor
  //swcMinify: true,
  transpilePackages: ["react-icons"],
  /*Fin Ajouter suite erreur cypress*/
  experimental: {
    optimizePackageImports: ["@chakra-ui/react"],
    /*swcPlugins: [["swc-plugin-coverage-instrument", {}]],*/
  },
  output: "standalone",
  /*assetPrefix: process.env.NODE_ENV === "production" ? "/_next" : "",*/
};

module.exports = nextConfig;

export default nextConfig;
