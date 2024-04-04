import { Grid, Paper, TextField, Button } from '@mui/material';
import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';

function Form() {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		phone: '',
		address: '',
		pin: '',
		relation: ''
	});
	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value
		});
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const accessToken = localStorage.getItem('accessToken');
			if (!accessToken) {
				throw new Error('Authentication token not found!');
			}
			const response = await fetch(
				'http://localhost:8080/address/submit',
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${accessToken}`
					},
					body: JSON.stringify(formData)
				}
			);
			const data = await response.json();
			if (response.ok) {
				alert('Record added successfully!')
			} else {
				throw new Error(data.message || 'Submission failed!');
			}
		} catch (error) {
			console.error('Submission error:', error.message);
		}
	};
	const paperStyle = { padding: 20, height: '60vh', width: 500, margin: "50px auto" };
	const btnstyle = { margin: '8px 0' };
	const { id } = useParams();
	return (
		<Grid>
			<Grid container justifyContent="flex-end" alignItems="center">
				<Grid item>
					<Link to={`/home/${id}`}>
						Go Back
					</Link>
				</Grid>
			</Grid>
			<Paper elevation={10} style={paperStyle}>
				<Grid align='center'>
					<h2>Information</h2>
				</Grid>
				<form onSubmit={handleSubmit}>
					<TextField
						name='name'
						label='Name'
						placeholder='Enter name'
						fullWidth
						required
						value={formData.name}
						onChange={handleChange}
					/>
					<TextField
						name='email'
						label='Email id'
						placeholder='Enter email id'
						fullWidth
						required
						value={formData.email}
						onChange={handleChange}
					/>
					<TextField
						name='phone'
						label='Phone no'
						placeholder='Enter phone no'
						fullWidth
						required
						value={formData.phone}
						onChange={handleChange}
					/>
					<TextField
						name='address'
						label='Address'
						placeholder='Enter address'
						fullWidth
						required
						value={formData.address}
						onChange={handleChange}
					/>
					<TextField
						name='pin'
						label='Pin'
						placeholder='Enter pin code'
						fullWidth
						required
						value={formData.pin}
						onChange={handleChange}
					/>
					<TextField
						name='relation'
						label='Relation'
						placeholder='Enter relation'
						fullWidth
						required
						value={formData.relation}
						onChange={handleChange}
					/>
					<Button
						type='submit'
						color='primary'
						variant="contained"
						style={btnstyle}
						fullWidth
					>
						Add
					</Button>
				</form>
			</Paper>
		</Grid>
	);
}

export default Form;
