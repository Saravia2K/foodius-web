"use client";

import { Fragment } from "react";
import { useRouter } from "next/navigation";
import { Box, IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import ColoredButton from "@/components/ColoredButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import useShoppingCart from "@/hooks/useShoppingCart";
import Image from "next/image";
import Counter from "@/components/Counter";
import { API_URL } from "@/utils/consts";

export default function ShoppingCart({ onClose }: TProps) {
  const { foods, updateFoodAmount, deleteFood } = useShoppingCart();
  const router = useRouter();

  return (
    <Fragment>
      <Box width={300} height="5%">
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Box flex={1} padding="15px 25px">
        <Typography
          component="h3"
          fontFamily="inherit"
          fontWeight="bold"
          fontSize={25}
          borderBottom="1px solid var(--gray) !important"
        >
          Tu carrito <ShoppingCartIcon sx={{ color: "var(--pink)" }} />
        </Typography>
        <Box py={1}>
          {foods.map((f, i) => (
            <Box
              key={i}
              display="grid"
              gridTemplateColumns="repeat(3, 100px)"
              gap={3}
              py={2}
              borderBottom="1px solid var(--gray)"
            >
              <Image
                src={`${API_URL}/static/foods/${f.img_url}`}
                alt={f.name}
                width={200}
                height={200}
                style={{ width: "100%", height: "auto", borderRadius: 10 }}
              />
              <Box>
                <Typography
                  fontFamily="inherit"
                  component="h4"
                  fontSize={16}
                  fontWeight="bold"
                >
                  {f.name}
                </Typography>
                <Typography
                  fontFamily="inherit"
                  component="span"
                  color="var(--pink)"
                  fontSize={15}
                >
                  ${f.price} c/u - ${+f.price * f.amount} total
                </Typography>
              </Box>
              <Box>
                <Counter
                  small
                  initialNumber={f.amount}
                  onNumberChange={(n) => updateFoodAmount(f.id, n)}
                />
                <IconButton
                  style={{ color: "var(--yellow)" }}
                  onClick={() => deleteFood(f.id)}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
      <Box height="10%" padding="0 25px">
        <ColoredButton
          color="pink"
          sx={{ width: "100% !important" }}
          disabled={foods.length == 0}
          onClick={() => router.push("/orden")}
        >
          Ordena aquí
        </ColoredButton>
      </Box>
    </Fragment>
  );
}

type TProps = {
  onClose: () => any;
};
