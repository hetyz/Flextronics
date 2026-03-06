import { Title3, Input } from "@fluentui/react-components";
import { SearchRegular } from "@fluentui/react-icons";
import { ReactNode } from "react";

interface Props {
  title: string;
  searchTerm?: string;
  onSearchChange?: (value: string) => void;
  actions?: ReactNode;
}

const headerContainer = {
  padding: "20px 16px",
  borderBottom: "1px solid #525252",
  display: "flex",
  flexDirection: "column" as const,
  gap: 16,
};

const headerTop = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const headerActions = {
  display: "flex",
  gap: 12,
  alignItems: "center",
};

const Header = ({ title, searchTerm, onSearchChange, actions }: Props) => {
  return (
    <div style={headerContainer}>
      <div style={headerTop}>
        <Title3>{title}</Title3>

        <img src="/logo192.png" alt="Logo" style={{ height: 40 }} />
      </div>

      <div style={headerActions}>
        {onSearchChange && (
          <Input
            contentBefore={<SearchRegular />}
            placeholder="Search..."
            value={searchTerm}
            onChange={(e, data) => onSearchChange(data.value)}
            style={{ width: 280 }}
          />
        )}

        {actions}
      </div>
    </div>
  );
};

export default Header;
