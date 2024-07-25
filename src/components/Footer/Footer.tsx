import "./Footer.css";
import { useTranslation } from "react-i18next";

function Footer() {
  const { t } = useTranslation();
  return <footer className="main-footer">{t("textFooter")}</footer>;
}

export default Footer;
