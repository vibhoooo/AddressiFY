import { Grid, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import CustomCard from './CustomCard';

function Display() {
	const [records, setRecords] = useState([]);
	useEffect(() => {
		async function fetchData() {
			try {
				const accessToken = localStorage.getItem('accessToken');
				if (!accessToken) {
					throw new Error('Authentication token not found!');
				}
				const response = await fetch(
					'http://localhost:8080/address/display', 
					{
						method: 'GET',
						headers: {
							'Content-Type': 'application/json',
							'Authorization': `Bearer ${accessToken}`
						}
					}
				);
				const data = await response.json();
				if (response.ok) {
					setRecords(data.results);
				} else {
					throw new Error(data.message || 'Failed to fetch records!');
				}
			} 
			catch (error) {
				console.error('Fetch error:', error.message);
			}
		}
		fetchData();
	}, []);
	const { id } = useParams();
	return (
		<Grid container spacing={2}>
			<Grid item xs={12}>
				<Grid container justifyContent="space-between" alignItems="center">
					<Grid item>
						<Typography variant="h4" align="center" gutterBottom>
							Your Records
						</Typography>
					</Grid>
					<Grid item>
						<Link to={`/add/${id}`}>
							Add Record
						</Link>
					</Grid>
				</Grid>
			</Grid>
			{records.map(record => (
				<Grid item key={record.id} lg={3} md={4} sm={6} xs={12}>
					<CustomCard record={record} />
				</Grid>
			))}
		</Grid>
	);
}

export default Display;
