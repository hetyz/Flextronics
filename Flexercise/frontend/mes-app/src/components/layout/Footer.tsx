import { Text } from "@fluentui/react-components";

const footerStyle = {
  borderTop: "1px solid #525252",
  padding: "12px 16px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const Footer = () => {
  const today = new Date().toLocaleDateString();

  return (
    <footer style={footerStyle}>
      <Text>{today}</Text>
    </footer>
  );
};

export default Footer;
