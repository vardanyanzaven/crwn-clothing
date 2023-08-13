import { FC } from "react";
import {useNavigate} from "react-router-dom";
import { DirItemContainer, BgImage, Body } from "./directory-item.styles";

import { DirectoryItemType } from "../directory/directory.component";

type DirectoryItemProps = {
  category: DirectoryItemType;
}

const DirectoryItem: FC<DirectoryItemProps> = ({ category: { imageUrl, title, route } }) => {
  const navigate = useNavigate();

  const onNavigateHandler = () => navigate(route)
  return (
    <DirItemContainer onClick={onNavigateHandler}>
      <BgImage imageurl={imageUrl} />
      <Body>
        <h2>{title}</h2>
        <p>Shop Now</p>
      </Body>
    </DirItemContainer>
  );
};

export default DirectoryItem;
