import Navbar from "./Navbar";

const Layout = ({ navbar = true, container = true, children }) => {
  return (
    <>
      {navbar && <Navbar />}
      {container ? (
        <div className="container mt-3">{children}</div>
      ) : (
        <div className="">{children}</div>
      )}
    </>
  );
};

export default Layout;
