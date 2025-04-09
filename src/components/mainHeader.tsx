import {
  Button,
  CloseButton,
  Drawer,
  Portal,
  Link,
  Stack,
  Container,
} from "@chakra-ui/react";

const Header = () => {
  const navItems = [
    { label: "A propos", href: "/apropos" },
    { label: "Dashboard", href: "/dashboard" },
    { label: "Diagnostic de stress", href: "/diagnostics" },
    { label: "Exercises de respiration", href: "/respirations" },
    { label: "Suivis des emaotions", href: "/emotions" },
    { label: "Activités Détente", href: "/detentes" },
    { label: "Informations sur la santé mentale", href: "informations" },
  ];
  return (
    <Container as="header">
      <Drawer.Root>
        <Drawer.Trigger asChild>
          <Button variant="outline" size="sm">
            ...
          </Button>
        </Drawer.Trigger>
        <Portal>
          <Drawer.Backdrop />
          <Drawer.Positioner padding="4">
            <Drawer.Content rounded="md">
              <Drawer.Header>
                <Drawer.Title>Menu</Drawer.Title>
              </Drawer.Header>
              <Drawer.Body>
                <Stack direction="column" gap="4">
                  {navItems.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href} // Ajout de l'URL
                      fontWeight="medium"
                      color="fg.muted"
                      _hover={{
                        color: "colorPalette.fg",
                        textDecoration: "none",
                      }}
                    >
                      {item.label}
                    </Link>
                  ))}
                </Stack>
              </Drawer.Body>
              <Drawer.Footer>
                <Button variant="outline">Login</Button>
                <Button>Logout</Button>
              </Drawer.Footer>
              <Drawer.CloseTrigger asChild>
                <CloseButton size="sm" />
              </Drawer.CloseTrigger>
            </Drawer.Content>
          </Drawer.Positioner>
        </Portal>
      </Drawer.Root>
    </Container>
  );
};

export default Header;
