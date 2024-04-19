import { useState } from 'react';
import {
  HomePageHeader,
  HomePageParagraph,
  StyledHint,
  StyledParaph,
} from './index.styles';
import { createPortal } from 'react-dom';
import { ArrowBackRounded } from '@mui/icons-material';

const Hint = ({
  setHintVisibility,
}: {
  setHintVisibility: (value: boolean) => void;
}) => {
  return (
    <StyledHint
      onClick={() => setHintVisibility(false)}
      data-testid='hint-homepage-testid'
    >
      <ArrowBackRounded
        sx={{
          marginTop: '40px',
        }}
      />
      <StyledParaph>
        Hint: You can click on the drawer to navigate to the board.
      </StyledParaph>
    </StyledHint>
  );
};

export const HomePage = () => {
  const [hintVisibility, setHintVisibility] = useState(true);

  return (
    <div>
      <HomePageHeader>Home Page</HomePageHeader>
      <HomePageParagraph> Work in progress. </HomePageParagraph>

      {hintVisibility &&
        createPortal(
          <Hint setHintVisibility={setHintVisibility} />,
          document.body
        )}
    </div>
  );
};
