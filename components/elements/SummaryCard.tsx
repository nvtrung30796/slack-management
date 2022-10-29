import { alpha, styled } from '@mui/material/styles';
import { Card, Typography } from '@mui/material';

const StyledIcon = styled('div')(({ theme }) => ({
  margin: 'auto',
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  width: theme.spacing(8),
  height: theme.spacing(8),
  justifyContent: 'center',
  marginBottom: theme.spacing(3),
}));

type SummaryCardPropType = {
  title: string;
  total: number;
  icon?: any;
  [key: string]: any
}

export default function SummaryCard(props: SummaryCardPropType) {
  //@ts-ignore
  const { title, total, icon, color = 'primary', sx, ...other } = props;
  return (
    <Card
      sx={{
        py: 5,
        boxShadow: 0,
        textAlign: 'center',
        //@ts-ignore
        color: (theme) => theme.palette[color].darker,
        //@ts-ignore
        bgcolor: (theme) => theme.palette[color].lighter,
        ...sx,
      }}
      {...other}
    >
      {icon && <StyledIcon
        sx={{
          //@ts-ignore
          color: (theme) => theme.palette[color].dark,
          backgroundImage: (theme) =>
            //@ts-ignore
            `linear-gradient(135deg, ${alpha(theme.palette[color].dark, 0)} 0%, ${alpha(
              //@ts-ignore
              theme.palette[color].dark,
              0.24
            )} 100%)`,
        }}
      >
        {icon}
      </StyledIcon>}

      <Typography variant="h3">{(total)}</Typography>

      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
        {title}
      </Typography>
    </Card>
  );
}