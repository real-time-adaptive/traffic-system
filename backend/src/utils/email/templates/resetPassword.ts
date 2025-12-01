export type ResetPasswordParams = {
	url: string;
	name?: string;
	expiresInMinutes?: number;
	supportEmail?: string;
};

export const resetPasswordEmailTemplate = (
	params: string | ResetPasswordParams
) => {
	const { url, name = "there", expiresInMinutes, supportEmail = "support@jam-peak.com" } =
		typeof params === "string" ? { url: params } : params;

	const subject = "Reset your Jam Peak password";

	const html = `<!doctype html>
<html lang="en">
	<head>
		<meta charset="utf-8" />
		<meta name="viewport" content="width=device-width,initial-scale=1" />
		<title>${subject}</title>
		<style>
			body { font-family: Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial; color: #0f172a; background: #ffffff; margin:0; padding:0; }
			.container { max-width:600px; margin:24px auto; padding:24px; border-radius:8px; border:1px solid #e6eef8; }
			.btn { display:inline-block; background:#0b69ff; color:white; text-decoration:none; padding:12px 18px; border-radius:6px; font-weight:600; }
			.muted { color:#6b7280; font-size:14px; }
			.footer { font-size:12px; color:#9aa4b2; margin-top:18px; }
		</style>
	</head>
	<body>
		<div class="container">
			<h2 style="margin-top:0">Hi ${escapeHtml(name)},</h2>
			<p class="muted">We received a request to reset the password for your Jam Peak account.</p>

			<p style="text-align:center; margin:24px 0;">
				<a class="btn" href="${escapeHtml(url)}" target="_blank" rel="noopener">Reset your password</a>
			</p>

			<p class="muted">If the button doesn't work, copy and paste the following link into your browser:</p>
			<p style="word-break:break-all;"><a href="${escapeHtml(url)}" target="_blank" rel="noopener">${escapeHtml(url)}</a></p>

			${expiresInMinutes ? `<p class="muted">This link will expire in ${expiresInMinutes} minutes.</p>` : ""}

			<p class="muted">If you did not request a password reset, please ignore this email or contact <a href="mailto:${escapeHtml(
				supportEmail
			)}">${escapeHtml(supportEmail)}</a>.</p>

			<div class="footer">Thanks — The Jam Peak team</div>
		</div>
	</body>
</html>`;

	const text = [
		`Hi ${name},`,
		"",
		"We received a request to reset the password for your Jam Peak account.",
		"",
		`Open the link to reset your password: ${url}`,
		expiresInMinutes ? `\nThis link will expire in ${expiresInMinutes} minutes.` : "",
		"",
		`If you did not request a password reset, ignore this email or contact ${supportEmail}.`,
		"",
		"Thanks — The Jam Peak team",
	]
		.filter(Boolean)
		.join("\n");

	return { subject, html, text };
};

function escapeHtml(input: string) {
	return String(input)
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&#39;");
}
