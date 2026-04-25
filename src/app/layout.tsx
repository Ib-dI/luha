import type { Metadata } from "next";
import { Bebas_Neue, Caveat, IBM_Plex_Mono, Inter } from "next/font/google";
import { Providers } from "@/components/providers";
import "./globals.css";

const bebasNeue = Bebas_Neue({
	weight: "400",
	variable: "--font-bebas",
	subsets: ["latin"],
});

const inter = Inter({
	weight: ["400", "500", "600", "900"],
	variable: "--font-inter",
	subsets: ["latin"],
});

const caveat = Caveat({
	weight: ["400", "600"],
	variable: "--font-caveat",
	subsets: ["latin"],
});

const ibmPlexMono = IBM_Plex_Mono({
	weight: ["400", "500"],
	variable: "--font-ibm-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Luha — Apprends le shimaoré",
	description:
		"La première application dédiée à l'apprentissage du shimaoré, langue de Mayotte.",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html
			suppressHydrationWarning
			lang="fr"
			className={`${bebasNeue.variable} ${inter.variable} ${caveat.variable} ${ibmPlexMono.variable}`}
		>
			<head>
				<link rel="icon" href="/logo/dark_favicon.png" type="image/png" />
			</head>
			<body className="antialiased" style={{ background: "var(--bg-dark)" }}>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
