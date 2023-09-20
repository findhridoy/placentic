import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import { useLocation, useNavigate } from "react-router-dom";

const CustomBreadcrumbs = ({ title, image }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  // console.log(location.pathname.split("/").filter((x) => x));
  // console.log(pathnames.length - 0);
  // console.log(pathnames.slice(0, 0 + 1).join());

  return (
    <div className="customBreadcrumbs">
      <div
        className="customBreadcrumbs__container"
        style={{ backgroundImage: `url(${image})` }}
      >
        <div className="customBreadcrumbs__content container">
          <h2 className="customBreadcrumbs__title">{title}</h2>
          <Breadcrumbs aria-label="breadcrumb">
            <Link onClick={() => navigate("/")}>Home</Link>
            {pathnames?.map((name, index) => {
              const lastName = index === pathnames.length - 1;
              const routeTo = `/${pathnames.slice(0, index + 1).join()}`;

              return lastName ? (
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
      </div>
    </div>
  );
};

export default CustomBreadcrumbs;
