import Layout from "../../components/layout/Layout";
import { Children } from "../../src/types/children";

const RootLayout = ({ children }: Children) => {
  return <Layout backButton>{children}</Layout>;
};

export default RootLayout;
