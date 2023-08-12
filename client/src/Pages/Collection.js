import collectionImage from "../assets/banners/collection2.jpg";
import CustomBreadcrumbs from "../components/controls/CustomBreadcrumbs";
import ProductLayout from "../layouts/ProductLayout";

const Collection = () => {
  return (
    <>
      <CustomBreadcrumbs title="New arrivals" image={collectionImage} />
      <ProductLayout />
    </>
  );
};

export default Collection;
