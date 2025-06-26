"use client";

import { useRouter } from "next/navigation";
import { Button } from "@chakra-ui/react";
import { HiOutlinePencil } from "react-icons/hi";
import { useSession } from "next-auth/react";

export default function EditButton({ id }: { id: number }) {
  const { data: session } = useSession();
  const router = useRouter();

  if (!session || session.user.isAdministrateur !== true) {
    return null; // Ne rien afficher si non admin
  }

  const handleClick = () => {
    router.push(`/informations/${id}/edit`);
  };

  return (
    <Button colorScheme="blue" onClick={handleClick}>
      <HiOutlinePencil size="20px" />
    </Button>
  );
}
