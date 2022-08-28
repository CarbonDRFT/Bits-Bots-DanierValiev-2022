import { Link } from "react-router-dom";

import DefaultLayout from "../layouts/DefaultLayout";
import ContentWrapper from "../components/elements/ContentWrapper";

const AdminPage = (): JSX.Element => (
  <DefaultLayout>
    <ContentWrapper>
      <h1>Admin</h1>
      <Link to="/admin/products">Products</Link>
      <Link to="/admin/orders">Orders</Link>
      <Link to="/admin/users">Users</Link>
    </ContentWrapper>
  </DefaultLayout>
);

export default AdminPage;
