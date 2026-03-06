import { ComponentToEdit } from "./ComponentToEdit";
import Layout from "./components/layout/Layout";
import Footer from "./components/layout/Footer";

const appStyle = {
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column" as const,
};

const contentStyle = {
  flex: 1,
};

function App() {
  return (
    <div className="App">
      <Layout>
        <div style={appStyle}>
          <div style={contentStyle}>
            <ComponentToEdit />
          </div>
          <Footer />
        </div>
      </Layout>
    </div>
  );
}

export default App;
