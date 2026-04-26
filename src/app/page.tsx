"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

/* ─── Reusable primitives ─────────────────────────────────────── */

function Crosshairs() {
	return (
		<>
			<span className="ch ch-tl" />
			<span className="ch ch-tr" />
			<span className="ch ch-bl" />
			<span className="ch ch-br" />
		</>
	);
}

function BtnPrimary({
	href,
	children,
	onClick,
}: {
	href?: string;
	children: React.ReactNode;
	onClick?: () => void;
}) {
	const cls =
		"inline-flex items-center justify-center py-[11px] px-[26px] rounded-xl font-body text-sm font-semibold bg-[var(--accent-blue)] text-white [border:1.5px_solid_var(--accent-blue)] cursor-pointer transition-colors duration-200 whitespace-nowrap";
	if (href)
		return (
			<Link href={href} className={cls}>
				{children}
			</Link>
		);
	return (
		<button className={cls} onClick={onClick}>
			{children}
		</button>
	);
}

function BtnOutline({
	href,
	children,
}: {
	href: string;
	children: React.ReactNode;
}) {
	return (
		<a
			href={href}
			className="inline-flex items-center justify-center py-2.75 px-6.5 rounded-xl font-body text-sm font-semibold bg-transparent text-(--text-dark) [border:1.5px_solid_rgba(26,26,26,0.35)] cursor-pointer transition-all duration-200 whitespace-nowrap"
		>
			{children}
		</a>
	);
}

/* ─── Landing Page ────────────────────────────────────────────── */

export default function LandingPage() {
	const [email, setEmail] = useState("");
	const year = new Date().getFullYear();

	return (
		<main className="[font-family:var(--font-body)] ">
			{/* ── NAVBAR ─────────────────────────────────────────────── */}
			<nav className="fixed top-0 left-0 right-0 z-100 py-4.5 bg-[rgba(242,237,227,0.88)] backdrop-blur-md border-b border-black/8">
				<div className="flex container-custom items-center gap-8">
					
					<Link
						href="/"
						className="flex items-center gap-2 mr-auto"
					>
						<Image
							src="/logo/Logo desktop light theme.png"
							alt="Luha Logo"
							width={70}
							height={40}
							
						/>
					</Link>
					<ul className="hidden md:flex gap-8 list-none">
						<li>
							<a
								href="#methode"
								className="text-sm font-medium text-(--text-dark-gray) transition-colors duration-200"
							>
								Méthode
							</a>
						</li>
						<li>
							<a
								href="#modules"
								className="text-sm font-medium text-(--text-dark-gray) transition-colors duration-200"
							>
								Modules
							</a>
						</li>
					</ul>
					<BtnPrimary href="/learn">Commencer gratuitement</BtnPrimary>
				</div>
			</nav>

			{/* ── HERO ───────────────────────────────────────────────── */}
			<section className="grid-light ch-box ch-light relative overflow-hidden bg-(--bg-light) min-h-screen flex items-center pt-36 md:pt-40 pb-16 md:pb-24 px-4 sm:px-8 md:px-16">
				<Crosshairs />

				{/* Decorative tubes */}
				<span
					className="tube tube-orange"
					style={{
						width: 320,
						top: "8%",
						right: -80,
						transform: "rotate(-42deg)",
						opacity: 0.5,
					}}
				/>
				<span
					className="tube tube-blue-pu"
					style={{
						width: 260,
						bottom: "18%",
						right: -40,
						transform: "rotate(-38deg)",
						opacity: 0.4,
					}}
				/>
				<span
					className="tube tube-pink"
					style={{
						width: 200,
						bottom: "10%",
						left: -50,
						transform: "rotate(35deg)",
						opacity: 0.4,
					}}
				/>
				<span
					className="tube tube-green"
					style={{
						width: 180,
						top: "25%",
						left: -60,
						transform: "rotate(-28deg)",
						opacity: 0.35,
					}}
				/>

				<div className="fade-up container-custom mx-auto w-full flex flex-col gap-6 relative z-1">
					<span className="inline-flex items-center self-start px-3 py-1 rounded-full text-[11px] font-semibold tracking-widest uppercase bg-[rgba(232,72,72,0.12)] text-(--accent-red)">
						SHIMAORÉ · MAYOTTE
					</span>

					<h1 className="font-display text-[52px] md:text-[72px] lg:text-[80px] leading-none tracking-[-0.01em] mt-2">
						<span className="text-(--text-dark)">
							APPRENDS LA
							<br />
							LANGUE MAHORAISE.
						</span>
						<br />
						<span
							className="font-script text-[32px] md:text-[48px] lg:text-[56px] text-(--accent-yellow)"
							style={{ WebkitTextStroke: "0.7px rgba(0,0,0,0.1)" }}
						>
							Luha ya Shi-Maoré.
						</span>
					</h1>

					<p className="text-base md:text-lg text-(--text-dark-gray) leading-relaxed max-w-135">
						Luha — première application dédiée au shimaoré. Leçons structurées,
						exercices et culture mahoraise en immersion.
						<br />
						Apprends à ton rythme, 5 min par jour. Gratuit, sans pub, avec
						amour.{" "}
						<span className="font-script text-[22px] text-(--accent-blue)">
							&quot;Oussi lindra tséna trini ?&quot;
						</span>
					</p>

					<div className="flex gap-3 flex-wrap mt-1">
						<BtnPrimary href="/dashboard">Commencer — gratuit</BtnPrimary>
						<BtnOutline href="#methode">Voir la méthode</BtnOutline>
					</div>

					<div className="flex items-center gap-3 flex-wrap font-mono text-[13px] text-(--accent-red) tracking-[0.04em] mt-2">
						<span>12 000 mots</span>
						<span className="opacity-30">·</span>
						<span>8 modules</span>
						<span className="opacity-30">·</span>
						<span>5 min / jour</span>
					</div>
				</div>
			</section>

			{/* ── SOCIAL PROOF ───────────────────────────────────────── */}
			<section className="grid-light ch-box ch-light relative bg-(--bg-light-2) text-center py-16 md:py-24 px-4 sm:px-8 md:px-16">
				<Crosshairs />

				<div className="container-custom mx-auto flex flex-col items-center gap-5">
					<div className="flex">
						{["🧑🏾", "👩🏽", "🧑🏿", "👩🏾", "🧑🏽"].map((e, i) => (
							<span
								key={i}
								className="text-[36px]"
								style={{ marginLeft: i === 0 ? 0 : -10 }}
							>
								{e}
							</span>
						))}
					</div>

					<p className="text-lg text-(--text-dark)">
						Rejoins{" "}
						<strong className="text-(--accent-blue) font-bold">
							nos apprenants
						</strong>
					</p>

					<p
						className="text-(--accent-yellow) text-[22px] tracking-[2px]"
						style={{ WebkitTextStroke: "1px rgba(0,0,0,0.2)" }}
					>
						★★★★★{" "}
						<span
							className="text-[13px] text-(--text-dark-gray) ml-2 font-body tracking-normal"
							style={{ WebkitTextStroke: 0 }}
						>
							4.9 / 5
						</span>
					</p>

					<p className="font-display text-3xl md:text-[38px] text-(--text-dark) leading-[1.1] mt-2">
						&quot;Wawé u juwa luha ya shi-Maoré?&quot;
					</p>

					<p className="font-script text-[22px] text-(--accent-blue)">
						— &quot;Pourquoi tu ne sais pas encore ?&quot;
					</p>
				</div>
			</section>

			{/* ── MÉTHODE ────────────────────────────────────────────── */}
			<section
				id="methode"
				className="grid-light ch-box ch-light relative overflow-hidden bg-(--bg-light) py-16 md:py-24 px-4 sm:px-8 md:px-16"
			>
				<Crosshairs />
				<span
					className="tube tube-cyan"
					style={{
						width: 240,
						top: 60,
						right: -15,
						transform: "rotate(-42deg)",
						opacity: 0.35,
					}}
				/>
				<span
					className="tube tube-rainbow"
					style={{
						width: 180,
						height: 18,
						bottom: 60,
						left: -35,
						transform: "rotate(42deg)",
						opacity: 0.35,
					}}
				/>

				<div className="container-custom mx-auto relative z-1">
					<p className="font-mono text-[11px] tracking-[0.12em] uppercase text-(--accent-red) mb-3">
						La Méthode
					</p>
					<h2 className="font-display text-4xl md:text-5xl text-(--text-dark) leading-[1.05] mb-12">
						APPRENDS COMME
						<br />
						UN NATIF.
					</h2>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
						{[
							{
								num: "01",
								icon: "📚",
								title: "Leçons structurées",
								desc: "Chaque module avance pas à pas — alphabet, prononciation, grammaire simple, vocabulaire ancré dans la vie quotidienne à Mayotte.",
							},
							{
								num: "02",
								icon: "🎮",
								title: "Exercices gamifiés",
								desc: "XP, streaks, cœurs — chaque session de 5 min compte. Tu progresses sans t'en rendre compte.",
							},
							{
								num: "03",
								icon: "🌿",
								title: "Culture & contexte",
								desc: "Le shimaoré ne s'apprend pas hors sol. Chaque leçon est ancrée dans la culture, les usages et l'histoire de Mayotte.",
							},
						].map(({ num, icon, title, desc }) => (
							<div
								key={num}
								className="grain grain-light relative overflow-hidden rounded-2xl p-8 bg-(--bg-light-2) border border-black/8"
							>
								<span className="absolute -top-4 right-5 font-display text-[100px] text-(--accent-red) opacity-[0.07] leading-none pointer-events-none select-none">
									{num}
								</span>
								<span className="text-[32px] mb-4 block">{icon}</span>
								<h3 className="text-[17px] font-bold text-(--text-dark) mb-2.5">
									{title}
								</h3>
								<p className="text-sm text-(--text-dark-gray) leading-relaxed">
									{desc}
								</p>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* ── MODULES ────────────────────────────────────────────── */}
			<section
				id="modules"
				className="grid-light ch-box ch-light relative bg-(--bg-light-2) py-16 md:py-24 px-4 sm:px-8 md:px-16"
			>
				<Crosshairs />

				<div className="container-custom mx-auto">
					<p className="font-mono text-[11px] tracking-[0.12em] uppercase text-(--accent-red)] mb-3">
						Les Modules
					</p>
					<h2 className="font-display text-4xl md:text-5xl text-(--text-dark) leading-[1.05] mb-12">
						8 NIVEAUX.
						<br />
						UN VOYAGE.
					</h2>

					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
						{[
							{
								icon: "🔤",
								name: "Alphabet & Sons",
								level: "Débutant",
								locked: false,
							},
							{
								icon: "👋",
								name: "Salutations",
								level: "Débutant",
								locked: false,
							},
							{
								icon: "👨‍👩‍👧",
								name: "La Famille",
								level: "Débutant",
								locked: true,
							},
							{
								icon: "🛒",
								name: "Au Marché",
								level: "Intermédiaire",
								locked: true,
							},
							{
								icon: "⚡",
								name: "Verbes du Quotidien",
								level: "Intermédiaire",
								locked: true,
							},
							{
								icon: "🌿",
								name: "Culture & Traditions",
								level: "Intermédiaire",
								locked: true,
							},
						].map(({ icon, name, level, locked }) => (
							<div
								key={name}
								className="grain grain-light relative overflow-hidden flex items-center gap-4 rounded-2xl px-6 py-5 bg-(--bg-light) border border-black/8"
								style={{ opacity: locked ? 0.45 : 1 }}
							>
								<span className="absolute top-0 left-0 right-0 h-0.75 bg-(--accent-red) rounded-t-2xl" />
								<span className="text-[28px] shrink-0">{icon}</span>
								<div className="flex-1 min-w-0">
									<p className="text-sm font-semibold text-(--text-dark)">
										{name}
									</p>
									<p className="font-mono text-[10px] text-(--text-gray) tracking-[0.08em] uppercase mt-0.75">
										{level}
									</p>
								</div>
								{locked && <span className="text-sm opacity-50">🔒</span>}
							</div>
						))}
					</div>
				</div>
			</section>

			{/* ── TÉMOIGNAGES ────────────────────────────────────────── */}
			{/* <section
				id="temoignages"
				className="grid-light ch-box ch-light relative overflow-hidden bg-(--bg-light) py-16 md:py-24 px-4 sm:px-8 md:px-16"
			>
				<Crosshairs />
				<span
					className="tube tube-blue-pu"
					style={{
						width: 220,
						top: 40,
						left: -25,
						transform: "rotate(54deg)",
						opacity: 0.3,
					}}
				/>
				<span
					className="tube tube-pink"
					style={{
						width: 160,
						bottom: -10,
						right: -30,
						transform: "rotate(50deg)",
						opacity: 0.3,
					}}
				/>

				<div className="container-custom mx-auto relative z-1">
					<p className="font-mono text-[11px] tracking-[0.12em] uppercase text-(--accent-red) mb-3">
						Témoignages
					</p>
					<h2 className="font-display text-4xl md:text-5xl text-(--text-dark) leading-[1.05] mb-12">
						ILS APPRENNENT.
						<br />
						TU PEUX AUSSI.
					</h2>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
						{[
							{
								quote:
									'"Je comprends enfin ma grand-mère quand elle parle. Luha a changé ma relation à mes origines."',
								author: "Fatima O.",
								badge: "Diaspora — Paris",
							},
							{
								quote:
									'"Méthode claire, exercices ludiques. En 3 semaines j\'arrive à former des phrases simples."',
								author: "Youssouf M.",
								badge: "Étudiant — Lyon",
							},
							{
								quote:
									'"Enfin une app qui respecte notre langue. Le contexte culturel dans chaque leçon fait toute la différence."',
								author: "Naïma B.",
								badge: "Enseignante — Marseille",
							},
						].map(({ quote, author, badge }) => (
							<div
								key={author}
								className="grain grain-light relative overflow-hidden flex flex-col gap-5 rounded-2xl p-8 bg-(--bg-light-2) border border-black/8"
								style={{ borderLeft: "3px solid var(--accent-red)" }}
							>
								<div
									className="absolute top-0 right-0 w-20 h-20"
									style={{
										background:
											"repeating-linear-gradient(45deg,rgba(0,0,0,0.03) 0px,rgba(0,0,0,0.03) 1px,transparent 1px,transparent 8px)",
									}}
								/>
								<p className="text-[15px] text-(--text-dark-gray) leading-relaxed flex-1 italic">
									{quote}
								</p>
								<div>
									<p className="text-sm font-bold text-(--text-dark)">
										{author}
									</p>
									<p className="font-mono text-[10px] text-(--text-gray) tracking-[0.08em] uppercase mt-0.5">
										{badge}
									</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</section> */}

			{/* ── FOOTER CTA ─────────────────────────────────────────── */}
			<section className="grid-light ch-box ch-light relative overflow-hidden text-center bg-(--bg-light-2) py-16 md:py-24 px-4 sm:px-8 md:px-16">
				<Crosshairs />
				<span
					className="tube tube-rainbow"
					style={{
						width: 260,
						height: 20,
						top: 20,
						right: -60,
						transform: "rotate(-35deg)",
						opacity: 0.35,
					}}
				/>
				<span
					className="tube tube-green"
					style={{
						width: 200,
						bottom: 20,
						left: -50,
						transform: "rotate(32deg)",
						opacity: 0.35,
					}}
				/>

				<div className="container-custom mx-auto flex flex-col items-center gap-5 relative z-1">
					<h2 className="font-display text-6xl md:text-[76px] text-(--text-dark) leading-[0.98]">
						PRÊT À<br />
						COMMENCER ?
					</h2>

					<p className="text-base text-(--text-dark-gray)">
						Rejoins des milliers d&apos;apprenants. Gratuit, sans carte
						bancaire.
					</p>

					<form
						onSubmit={(e) => e.preventDefault()}
						className="flex flex-col sm:flex-row gap-2.5 w-full max-w-100"
					>
						<input
							type="email"
							placeholder="ton@email.com"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							className="flex-1 bg-white/70 [border:1.5px_solid_rgba(0,0,0,0.15)] rounded-xl px-4 py-2.75 text-(--text-dark) font-body text-[15px] outline-none"
						/>
						<BtnPrimary>Rejoindre</BtnPrimary>
					</form>

					<div className="flex flex-col sm:flex-row items-center sm:justify-between gap-3 w-full border-t border-black/1 pt-6 mt-4">
						<span className="font-mono text-[11px] text-(--text-gray) tracking-[0.08em]">
							© {year} LUHA
						</span>
						<span className="font-script text-[20px] text-(--text-dark-gray)">
							Avec ❤️ depuis Mayotte
						</span>
					</div>
				</div>
			</section>
		</main>
	);
}
