"use client";
import { HiOutlineTrash } from "react-icons/hi";
import { useRouter } from "next/navigation";
import { Button } from "@chakra-ui/react";

import { useSession } from "next-auth/react";

export default function DeleteButton({ id }: { id: number }) {
  const { data: session } = useSession();
  const router = useRouter();
  if (!session || session.user.isAdministrateur !== true) {
    return null; // Ne rien afficher si non admin
  }

  const handleDelete = async () => {
    const confirm = window.confirm("Confirmer la suppression ?");
    if (!confirm) return;

    const res = await fetch(`/api/informations/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      router.push("/informations");
    } else {
      alert("Erreur lors de la suppression.");
    }
  };

  return (
    <Button colorScheme="red" onClick={handleDelete}>
      <HiOutlineTrash size="20px" />
    </Button>
  );
}
