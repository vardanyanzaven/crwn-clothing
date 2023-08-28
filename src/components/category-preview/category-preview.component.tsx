import {FC} from "react";
import { Link } from "react-router-dom";

import ProductCard from "../product-card/product-card.component";
import { CatPreviewContainer, Title, Preview } from "./category-preview.styles";
import { CategoryItem } from "../../store/categories/categories.types";

type CategoryPreviewProps = {
  title: string;
  items: CategoryItem[];
}

const CategoryPreview: FC<CategoryPreviewProps> = ({ title, items }) => {
  return (
    <CatPreviewContainer>
      <Title>
        <Link to={title} className="title">
          {title.toUpperCase()}
        </Link>
      </Title>
      <Preview data-testid="preview">
        {items
          .filter((_: unknown, i: number) => i < 4)
          .map((item: CategoryItem) => (
            <ProductCard key={item.id} product={item} />
          ))}
      </Preview>
    </CatPreviewContainer>
  );
};

export default CategoryPreview;
