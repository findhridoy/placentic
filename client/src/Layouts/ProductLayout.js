import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import CustomBreadcrumbs from "../Components/CustomBreadcrumbs";
import {
  categoryList,
  categoryListReset,
} from "../Redux/actions/categoryActions";
import Layout from "./Layout";

const ProductLayout = () => {
  // Redux element
  const dispatch = useDispatch();
  const { loading, error, categories } = useSelector(
    (state) => state.categoryList
  );

  useEffect(() => {
    dispatch(categoryList("categories"));

    return () => {
      dispatch(categoryListReset());
    };
  }, [dispatch]);
  return (
    <Layout>
      <CustomBreadcrumbs title="Catalog" />
      <section className="productLayout">
        <div className="container">
          <div className="productLayout__container">
            <div className="productLayout__menu">
              <ul className="menu__list">
                <li className="list__item">
                  <NavLink to="/catalog">All</NavLink>
                </li>
                {categories?.map((category) => (
                  <li className="list__item" key={category?._id}>
                    <NavLink to="/catalog">{category?.title}</NavLink>
                  </li>
                ))}
              </ul>
            </div>
            <div className="productLayout__content"></div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ProductLayout;
