"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import useGlobalSettings from "@/hooks/useGlobalSettings";
import useBusiness, { TFood } from "@/hooks/useBusiness";
import {
  Tab,
  Box,
  Tabs,
  Modal,
  IconButton,
  Typography,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  List as MUIList,
} from "@mui/material";
import CallMadeIcon from "@mui/icons-material/CallMade";
import CallIcon from "@mui/icons-material/Call";
import CloseIcon from "@mui/icons-material/Close";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FoodCard from "@/components/FoodCard";
import List from "@/components/List";
import Counter from "@/components/Counter";
import ColoredButton from "@/components/ColoredButton";
import { API_URL } from "@/utils/consts";
import useShoppingCart from "@/hooks/useShoppingCart";

import styles from "./styles.module.scss";

export default function NegocioPage() {
  const { slug } = useParams<{ slug: string }>();
  const { business, businessLoading } = useBusiness(slug);
  const [firstMainFood, setFirstMainFood] = useState<TFood>();
  const [firstSecondFood, setSecondMainFood] = useState<TFood>();
  const [sectionSelected, setSectionSelected] = useState(0);
  const [targetFood, setTargetFood] = useState<TFood>();
  const [targetFoodAmount, setTargetFoodAmount] = useState(1);
  const { setMainStyles } = useGlobalSettings();
  const { setFood } = useShoppingCart();

  useEffect(() => {
    setMainStyles({
      paddingTop: "25px",
    });

    return () => setMainStyles({});
  }, []);

  useEffect(() => {
    if (businessLoading) return;

    const foodCategoriesLength = business.FoodCategory.length;
    if (
      foodCategoriesLength >= 1 &&
      business.FoodCategory[0].Food.length >= 1
    ) {
      setFirstMainFood(business.FoodCategory[0].Food[0]);
    }

    if (
      foodCategoriesLength >= 2 &&
      business.FoodCategory[1].Food.length >= 2
    ) {
      setSecondMainFood(business.FoodCategory[1].Food[0]);
    }
  }, [businessLoading]);

  function addToShoppingCart() {
    if (targetFood == undefined) return;

    setFood(targetFood, targetFoodAmount, business.id);
    setTargetFood(undefined);
    setTargetFoodAmount(1);
  }

  if (businessLoading) return;
  return (
    <div className={styles.negocio}>
      <div className={styles["business-images"]}>
        <div className={styles["banner-container"]}>
          <Image
            className={styles.banner}
            width={1280}
            height={720}
            src={`${API_URL}/static/banners/${business.banner}`}
            alt="Banner"
            style={{ width: "100%" }}
          />
        </div>
        <Image
          className={styles.logo}
          width={600}
          height={600}
          src={`${API_URL}/static/logos/${business.logo}`}
          alt="Logo"
        />
      </div>
      <div className={styles["initial-info"]}>
        <div className={styles["business-data"]}>
          <div className={styles["title-schedule"]}>
            <h1 className={styles.title}>{business.name}</h1>
            <h6 className={styles.schedule}>Horario: 9:00 a.m a 11:30 p.m</h6>
          </div>
          <div className={styles["main-plates"]}>
            {firstMainFood != undefined && (
              <FoodCard
                name={firstMainFood.name}
                imgSrc={`${API_URL}/static/foods/${firstMainFood.img_url}`}
                description={firstMainFood.description}
                onOrderBtnClick={() => setTargetFood(firstMainFood)}
              />
            )}
            {firstSecondFood != undefined && (
              <FoodCard
                name={firstSecondFood.name}
                imgSrc={`${API_URL}/static/foods/${firstSecondFood.img_url}`}
                description={firstSecondFood.description}
                onOrderBtnClick={() => setTargetFood(firstSecondFood)}
              />
            )}
          </div>
        </div>
        <div className={styles["map-schedules-container"]}>
          <div
            className={styles["map-container"]}
            dangerouslySetInnerHTML={{ __html: business.location }}
          ></div>
          <Box>
            <List
              list={[
                "Lunes: 9:00 a.m - 9:00 p.m",
                "Martes: 9:00 a.m - 9:00 p.m",
              ]}
            />
            <CellphoneAsList cellphone={business.phone_number} />
          </Box>
        </div>
      </div>
      <div className={styles.menu}>
        <h2 className={styles["menu-title"]}>Menú</h2>
        <h4 className={styles["menu-schedule"]}>
          Horario: 9:00 a.m - 11:00 p.m
        </h4>
        <Box>
          <Box sx={{ borderBottom: 1, borderColor: "divider", ml: 15 }}>
            <Tabs
              value={sectionSelected}
              onChange={(_, nv) => setSectionSelected(nv)}
              aria-label="basic tabs example"
            >
              {business.FoodCategory.map((fc, i) => (
                <Tab key={i} value={i} label={fc.name} />
              ))}
            </Tabs>
          </Box>
          {business.FoodCategory.map((fc, i) => (
            <Box
              key={i}
              display={sectionSelected == i ? "grid" : "none"}
              gridTemplateColumns="1fr 1fr"
              gap="50px"
              mt={5}
            >
              {fc.Food.map((f, i) => (
                <FoodCard
                  key={i}
                  name={f.name}
                  description={f.description}
                  imgSrc={`${API_URL}/static/foods/${f.img_url}`}
                  onOrderBtnClick={() => setTargetFood(f)}
                />
              ))}
            </Box>
          ))}
        </Box>
      </div>
      <Modal
        open={targetFood != undefined}
        onClose={() => setTargetFood(undefined)}
      >
        <Box
          sx={{
            width: "35%",
            height: "70%",
            bgcolor: "#fff",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            p: "20px",
            borderRadius: 5,
          }}
        >
          <IconButton onClick={() => setTargetFood(undefined)}>
            <CloseIcon />
          </IconButton>
          <Box
            p="0 15px"
            display="grid"
            gap={1}
            borderBottom="1px solid var(--gray)"
            pb={2}
          >
            <Typography
              fontFamily="inherit"
              component="h2"
              fontSize={25}
              fontWeight="bold"
            >
              {targetFood?.name}
            </Typography>
            <Typography
              fontFamily="inherit"
              component="span"
              fontSize={15}
              color="var(--pink)"
            >
              Precio: ${targetFood?.price}
            </Typography>
            <Typography fontFamily="inherit" component="p" fontSize={15}>
              {targetFood?.description}
            </Typography>
            <Box mt={2}>
              <Image
                src={`${API_URL}/static/foods/${targetFood?.img_url}`}
                alt={targetFood?.name || ""}
                width={200}
                height={200}
                style={{
                  borderRadius: "25px",
                  width: 200,
                  height: "auto",
                  aspectRatio: 1,
                }}
              />
            </Box>
          </Box>
          <Box mt={3} display="flex" justifyContent="space-between">
            <Counter onNumberChange={(n) => setTargetFoodAmount(n)} />
            <ColoredButton color="pink" onClick={addToShoppingCart}>
              <ShoppingCartIcon sx={{ mr: 2 }} /> Agregar al carrito
            </ColoredButton>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}

function CellphoneAsList({ cellphone }: { cellphone: string }) {
  return (
    <MUIList sx={{ width: "100%", bgcolor: "var(--white)" }}>
      <ListItemButton>
        <ListItemIcon>
          <CallIcon sx={{ color: "var(--pink)" }} />
        </ListItemIcon>
        <ListItemText
          primary={cellphone}
          sx={{ borderBottom: "2px solid var(--gray)" }}
          primaryTypographyProps={{ sx: { fontWeight: 800 } }}
        />
        <CallMadeIcon sx={{ color: "var(--pink)" }} />
      </ListItemButton>
    </MUIList>
  );
}
