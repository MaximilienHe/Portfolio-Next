import React from "react";

export default function Footer() {
	return (
		<section className="footer">
			<p>© Maximilien Herr | {new Date().getFullYear()} (site dev en Next.js)</p>
			<div className="socials">
			<a
				href="https://www.linkedin.com/in/maximilien-herr/"
				target="_blank"
				rel="noopener"
			>
				<p>LinkedIn</p>
			</a>
      <a
        href="https://github.com/MaximilienHe"
        target="_blank"
        rel="noopener"
      >
        <p>GitHub</p>
      </a>
			</div>
		</section>
	);
}
