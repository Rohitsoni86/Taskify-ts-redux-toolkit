import "./globals.css";
import { DataContextProvider } from "./context/DataContext";
import StoreProvider from "./StoreProvider";

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`antialiased `}>
				<StoreProvider>
					<DataContextProvider>{children}</DataContextProvider>
				</StoreProvider>
			</body>
		</html>
	);
}
