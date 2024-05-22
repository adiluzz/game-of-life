import { Typography } from '@mui/material';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { AppContainer, AppHeader } from './components';

export default function RootLayout(props) {
	return (

		<div className={styles.container}>
			<AppRouterCacheProvider>
				<Head>
					<title>Game Of Life</title>
					<link rel="icon" href="/favicon.ico" />
				</Head>

				<main>
					<AppHeader position='fixed'>
						<Typography>Game of Life</Typography>
					</AppHeader>
					<AppContainer>
						{props.children}
					</AppContainer>
				</main>
			</AppRouterCacheProvider>
		</div>
	);
}
