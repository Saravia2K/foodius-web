"use client";

import { useEffect, useState } from "react";
import {
  MenuItem,
  InputLabel,
  FormControl,
  SelectChangeEvent,
} from "@mui/material";
import useGlobalSettings from "@/hooks/useGlobalSettings";

import styles from "./styles.module.scss";
import NEGOCIOS from "./NEGOCIOS.json";
import Image from "next/image";
import Select from "@/components/Select";
import Link from "next/link";

export default function NegociosPage() {
  const [order, setOrder] = useState<"p" | "n">("p");
  const { setMainStyles } = useGlobalSettings((s) => s);

  useEffect(() => {
    setMainStyles({
      paddingTop: "25px",
    });

    return () => setMainStyles({});
  }, []);

  return (
    <div className={styles.negocios}>
      <Select
        sx={{ width: 150 }}
        value={order}
        onChange={(e) => setOrder(e.target.value as any)}
        items={[
          { text: "Precio", value: "p" },
          { text: "Nombre", value: "n" },
        ]}
      />
      <h2 className={styles.title}>Hecho especialmente para ti</h2>
      <div className={styles.container}>
        {NEGOCIOS.map((n, i) => (
          <Link
            key={i}
            className={styles["business-card"]}
            href={`negocios/${n.slug}`}
          >
            <Image
              className={styles["business-image"]}
              src={n.image}
              alt={n.title}
              width={1280}
              height={720}
              style={{
                width: "100%",
                height: "auto",
              }}
            />
            <span className={styles["business-title"]}>{n.title}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
