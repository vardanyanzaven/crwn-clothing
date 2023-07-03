import {useNavigate} from "react-router-dom";
import { DirItemContainer, BgImage, Body } from "./directory-item.styles";

const DirectoryItem = ({ category: { imageUrl, title, route } }) => {
  const navigate = useNavigate();

  const onNavigateHandler = () => navigate(route)
  return (
    <DirItemContainer onClick={onNavigateHandler}>
      <BgImage imageUrl={imageUrl} />
      <Body>
        <h2>{title}</h2>
        <p>Shop Now</p>
      </Body>
    </DirItemContainer>
  );
};

export default DirectoryItem;
