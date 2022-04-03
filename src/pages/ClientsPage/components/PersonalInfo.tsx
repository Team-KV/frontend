import {
  Box,
  Button,
  Card,
  Divider,
  Link,
  Paper,
  Typography,
} from '@mui/material';
import { Client } from 'models/Client';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import FamilyRestroomIcon from '@mui/icons-material/FamilyRestroom';
const PersonalInfo = ({ client }: { client: Client }) => {
  return (
    <Card
      sx={{
        textAlign: 'center',
        height: '100%',
        width: '100%',
        p: 5,
        position: 'relative',
      }}
      elevation={5}
    >
      <Button
        size="small"
        sx={{ position: 'absolute', top: 7, right: 7, padding: 0.3 }}
      >
        <FamilyRestroomIcon fontSize="small" />
      </Button>
      <Box display="flex" flexDirection={'column'} sx={{ mb: 2 }}>
        <Typography variant="h5" fontWeight="bold">
          {client?.firstName} {client?.lastName}
        </Typography>
      </Box>

      <Box>
        <Typography
          mt={5}
          fontWeight={'bold'}
          textAlign="left"
          color={'silver'}
        >
          Contact
        </Typography>
        <Divider sx={{ mb: 4 }} />
      </Box>

      <Box display="flex" justifyContent="space-between" alignItems="center">
        {/* <Typography fontWeight='bold' color={'lightgray'}>Phone: </Typography> */}
        {/* <EmailOutlinedIcon sx={{ color: 'gray' }} /> */}
        Email:
        <Link href={`mailto:${client?.email}`}>{client?.email}</Link>
      </Box>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mt={3}
      >
        {/* <Typography fontWeight='bold' color={'lightgray'}>Phone: </Typography> */}
        <PhoneIphoneIcon sx={{ color: 'gray' }} />
        <Link href={`tel:${client?.phone}`}>{client?.phone}</Link>
      </Box>
      <Box display="flex" justifyContent="center" alignItems="center">
        {/* <Typography>{client?.phone}</Typography> */}
      </Box>

      <Typography mt={5} fontWeight={'bold'} textAlign="left" color={'silver'}>
        Address
      </Typography>
      <Divider sx={{ mb: 4 }} />

      <Box justifyContent="center" display="flex" gap={2} alignItems="center">
        <Link
          href={`http://maps.google.com/?q=${client?.street} ${client?.city}`}
          rel="noopener"
          target="_blank"
        >
          <Typography textAlign="right">
            {client?.street}
            <br />
            {client?.city} {client?.postalCode}
          </Typography>
        </Link>
      </Box>
    </Card>
  );
};

export default PersonalInfo;
