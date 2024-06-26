"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { PropsWithChildren } from "react";
import { useRouter } from "next-nprogress-bar";
import classnames from "classnames";

import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import HomeIcon from "@mui/icons-material/Home";
import StorefrontIcon from "@mui/icons-material/Storefront";
import ScheduleIcon from "@mui/icons-material/Schedule";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";

import useSession from "@/hooks/useSession";
import useBusinessDashboard from "@/hooks/useBusinessDashboard";

import styles from "./styles.module.scss";
import logo from "@/assets/images/foodius-logo.png";
import { removeCookie } from "@/services/system.service";

export default function AdminLayout({ children }: PropsWithChildren) {
  const { logoutBusiness } = useSession();
  const pathname = usePathname();
  const router = useRouter();
  const { businessLogged } = useSession();
  const { business } = useBusinessDashboard(businessLogged?.id ?? 0);

  const handleLogout = async () => {
    await removeCookie("business");
    logoutBusiness();
    router.push("/");
  };

  return (
    <div className={styles.admin}>
      <head>
        <title>Foodius | Dashboard</title>
      </head>
      <nav className={styles.sidebar}>
        <Image
          src={logo}
          width={300}
          height={300}
          alt="Foodius logo"
          className={styles.logo}
        />
        <ul className={styles["sections-list"]}>
          {SECTIONS.map((s, i) => {
            let to = "/dashboard";
            if (s.path != "") to += `/${s.path}`;
            const isActive = `${pathname}` == to;
            return (
              <li
                key={i}
                className={classnames({
                  [styles.item]: true,
                  [styles.active]: isActive,
                })}
                onClick={() => !isActive && router.push(to)}
              >
                <Tooltip title={s.label}>
                  <IconButton>{s.icon}</IconButton>
                </Tooltip>
              </li>
            );
          })}
          <li
            className={classnames({
              [styles.item]: true,
            })}
            onClick={handleLogout}
          >
            <Tooltip title="Logout">
              <IconButton>
                <LogoutRoundedIcon />
              </IconButton>
            </Tooltip>
          </li>
        </ul>
        <div></div>
      </nav>
      <main className={styles.content}>
        <header className={styles.header}>{business?.name}</header>
        <div className="main">{children}</div>
      </main>
    </div>
  );
}

const SECTIONS = [
  { label: "Home", path: "", icon: <HomeIcon /> },
  { label: "Órdenes", path: "ordenes", icon: <StorefrontIcon /> },
  { label: "Horarios", path: "horarios", icon: <ScheduleIcon /> },
  { label: "Menú", path: "menu", icon: <RestaurantIcon /> },
];
