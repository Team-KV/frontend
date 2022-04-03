import { Box, Divider, Typography } from '@mui/material';

const Section = ({ label, first }: any) => {
  return (
    <>
      <Box mt={first ? 3 : 7} mb={3}>
        <Typography sx={{ mb: 1, pl: 3 }} variant="h5" fontWeight={'bold'}>
          {label}
        </Typography>
        <Divider />
      </Box>
    </>
  );
};

export default Section;
