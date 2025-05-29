"use client";

import {
  Icon,
  IconButton,
  Popover,
  Portal /*, PopoverContext*/,
} from "@chakra-ui/react";
import type { PropsWithChildren } from "react";
import { LuAlignRight, LuX } from "react-icons/lu";

export const MobilePopover = (props: PropsWithChildren) => {
  type PopoverContextType = {
    open: boolean;
  };
  return (
    <Popover.Root
      positioning={{
        placement: "bottom",
        overflowPadding: 0,
        offset: { mainAxis: 12 },
      }}
    >
      <Popover.Context>
        {(context: PopoverContextType) => (
          <Popover.Trigger>
            <IconButton
              aria-label="Open Menu"
              variant="ghost"
              size="sm"
              colorPalette="gray"
              hideFrom="md"
            >
              <Icon size="md">{context.open ? <LuX /> : <LuAlignRight />}</Icon>
            </IconButton>
          </Popover.Trigger>
        )}
      </Popover.Context>
      <Portal>
        <Popover.Positioner>
          <Popover.Content {...props} />
        </Popover.Positioner>
      </Portal>
    </Popover.Root>
  );
};
