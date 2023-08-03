import { Link } from "react-router-dom";
import ProductCard from "../product-card/product-card.component";
import { CatPreviewContainer, Title, Preview } from "./category-preview.styles";

const CategoryPreview = ({ title, products }) => {
  return (
    <CatPreviewContainer>
      <Title>
        <Link to={title} className="title">
          {title.toUpperCase()}
        </Link>
      </Title>
      <Preview>
        {products
          .filter((_, i) => i < 4)
          .map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </Preview>
    </CatPreviewContainer>
  );
};

export default CategoryPreview;
