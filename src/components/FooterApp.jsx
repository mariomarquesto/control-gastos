import React from "react";
import { Layout } from "antd"; // Importamos el componente principal Layout

const { Footer } = Layout; // Destructuramos Footer para usarlo directamente

/**
 * Renders the FooterApp component.
 *
 * @return {JSX.Element} The rendered FooterApp component.
 */
const FooterApp = () => {
  return (
    <Footer style={{ textAlign: "center" }}>
      Hecho por Mario Marquestó
    </Footer>
  );
};

export default FooterApp;