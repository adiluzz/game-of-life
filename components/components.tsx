import { Box, FormHelperText, Paper, lighten, styled } from "@mui/material";


export const ButtonsWrapper = styled(Box)({
	display: 'flex',
	justifyContent: 'space-between',
	padding: 10,
	margin: 10,
});

export const ErrorWrapper = styled(FormHelperText)(({ theme }) => {
	return {
		display: 'flex',
		justifyContent: 'center',
		marginBottom: 15,
		fontSize: 24,
		color: theme.palette.error.main
	}
});


export const CellComponent = styled(Paper)<{ alive: string }>(({ theme, alive }) => {
	const backgroundColor = alive === 'true' ? lighten(theme.palette.success.light, 0.2) : lighten(theme.palette.error.light, 0.4)
	return {
		display: 'inline-block',
		backgroundColor,
		padding: 15,
		margin: 10,
		width: 25,
	}
});

export const BoardWrapper = styled(Paper)({
	padding: 10,
	margin: 10,
})

export const RowComponent = styled('div')({});

export const SimulateWrapper = styled('div')({});


export const BoardsWrapper = styled('div')({
	display: 'flex',
	flexDirection: 'row'
});

export const SimulationActionsWrapper = styled(Paper)({
	display: 'flex',
	justifyContent: 'space-between',
	margin: 10,
	padding: 10,
});