import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import styles from '../styles/Home.module.css';
import Head from 'next/head';
import { AppBar } from '@mui/material';
import { Typography } from '@mui/material';

export default function RootLayout(props) {
	return (

		<div className={styles.container}>
			<AppRouterCacheProvider>
				<Head>
					<title>Game Of Life</title>
					<link rel="icon" href="/favicon.ico" />
				</Head>

				<main>
					<AppBar sx={{ padding: 3 }}>
						<Typography>Game of Life</Typography>
					</AppBar>
					{props.children}
				</main>
			</AppRouterCacheProvider>
		</div>
	);
}
