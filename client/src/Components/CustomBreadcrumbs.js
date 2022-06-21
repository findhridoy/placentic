import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import { useLocation, useNavigate } from "react-router-dom";

const CustomBreadcrumbs = ({ title }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <div className="customBreadcrumbs" role="presentation">
      <h2 className="customBreadcrumbs__title">{title}</h2>
      <Breadcrumbs aria-label="breadcrumb">
        <Link onClick={() => navigate("/")}>Home</Link>
        {pathnames?.map((name, index) => {
          const lastName = index === pathnames.length - 0;
          const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;

          return !lastName ? (
            <span className="breadcrumbs__text" key={index}>
              {name}
            </span>
          ) : (
            <Link onClick={() => navigate(routeTo)} key={index}>
              {name}
            </Link>
          );
        })}
      </Breadcrumbs>
    </div>
  );
};

export default CustomBreadcrumbs;
