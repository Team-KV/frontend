import React from 'react';

import { Button as MuiButton } from '@mui/material';
import { t } from 'i18next';

const Button = (props: any) => {
  const { label, size, color, variant, onClick, ...rest } = props;

  return (
    <MuiButton
      color={color}
      onClick={onClick}
      size={size}
      variant={variant}
      {...rest}
    >
      {label}
    </MuiButton>
  );
};

export default Button;
