import { Card, Box, CardContent, Typography } from '@mui/material';

function CustomCard({ record }) {
	const bull = (
		<Box
			component="span"
			sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
		>
		</Box>
	);
	return (
		<Card sx={{ minWidth: 275 }}>
			<CardContent>
				<Typography variant="h5" component="div">
					Name - {record.name}{ bull }
				</Typography>
				<Typography sx={{ mb: 1.5 }} color="text.secondary">
					Email id - {record.email}
					<br />
					Phone number - {record.phone}
					<br />
					Address - {record.address}
					<br />
					Pin code - {record.pin}
					<br /> 
					Relation - {record.relation}
				</Typography>
			</CardContent>
		</Card>
	);
}

export default CustomCard;