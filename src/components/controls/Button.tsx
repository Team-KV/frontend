import React from 'react';

import { Button as MuiButton } from '@mui/material';
import { t } from 'i18next';

const Button = (props: any) => {
  const { text, size, color, variant, onClick, ...rest } = props;

  return (
    <MuiButton
      color={color}
      onClick={onClick}
      size={size}
      variant={variant}
      {...rest}
    >
      {t(text)}
    </MuiButton>
  );
};

export default Button;
