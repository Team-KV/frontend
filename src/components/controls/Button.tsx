import React from 'react';

import { Button as MuiButton } from '@mui/material';

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
