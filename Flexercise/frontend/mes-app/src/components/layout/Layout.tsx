import styled from 'styled-components';
import { GlobalStyle } from '../../style/global';

interface LayoutProps {
  children: React.ReactNode;
}

const WrapperStyled = styled.div`
  min-height: 100vh;
  width: 100%;
`;

const Layout = ({ children }: LayoutProps) => {

  return (
    <>
      <GlobalStyle />
      <WrapperStyled>{children}</WrapperStyled>
    </>
  );
};

export default Layout;