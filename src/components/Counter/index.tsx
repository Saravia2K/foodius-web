"use client";

import { useEffect, useState } from "react";
import { Box, IconButton } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

export default function Counter({
  initialNumber = 1,
  small,
  onNumberChange,
}: TProps) {
  const [counter, setCounter] = useState(initialNumber < 0 ? 1 : initialNumber);

  useEffect(() => onNumberChange && onNumberChange(counter), [counter]);

  const handleRemoveCircleClick = () => {
    if (counter == 0) return;

    setCounter((c) => --c);
  };

  const handleAddCircleClick = () => {
    if (counter == 20) return;

    setCounter((c) => ++c);
  };

  const smallSizes = {
      icons: 15,
      counter: 12,
      height: 20,
      width: 55,
    },
    normalSizes = {
      icons: 23,
      counter: 15,
      height: 30,
      width: 75,
    };
  const sizes = small ? smallSizes : normalSizes;
  return (
    <Box display="flex" alignItems="center">
      <IconButton onClick={handleRemoveCircleClick}>
        <RemoveCircleOutlineIcon
          sx={{
            color: "var(--yellow)",
            fontSize: sizes.icons,
          }}
        />
      </IconButton>
      <Box
        bgcolor="var(--white)"
        width={sizes.width}
        height={sizes.height}
        display="flex"
        justifyContent="center"
        alignItems="center"
        borderRadius="50px"
        fontSize={sizes.counter}
      >
        {counter}
      </Box>
      <IconButton onClick={handleAddCircleClick}>
        <AddCircleOutlineIcon
          sx={{
            color: "var(--yellow)",
            fontSize: sizes.icons,
          }}
        />
      </IconButton>
    </Box>
  );
}

type TProps = {
  initialNumber?: number;
  small?: boolean;
  onNumberChange?: (n: number) => void;
};
