import "./globals.css";
import { DataContextProvider } from "./context/DataContext";

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`antialiased `}>
				<DataContextProvider>{children}</DataContextProvider>
			</body>
		</html>
	);
}
