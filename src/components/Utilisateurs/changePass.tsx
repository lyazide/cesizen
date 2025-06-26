"use client";

import { useRouter } from "next/navigation";
import { Button } from "@chakra-ui/react";

export default function ChangePasswordButton({ userId }: { userId: number }) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/utilisateurs/${userId}`);
  };

  return (
    <Button colorScheme="teal" onClick={handleClick}>
      Changer le mot de passe
    </Button>
  );
}
