// Generate a bcrypt hash for the admin password so plaintext never touches env or git.
// Usage: npm run hash-password -- "your-strong-password"
import bcrypt from 'bcryptjs';

const pw = process.argv[2];
if (!pw) {
  console.error('Usage: npm run hash-password -- "your-strong-password"');
  process.exit(1);
}

const hash = bcrypt.hashSync(pw, 12);
// bcrypt hashes contain `$`, which Next's .env loader expands as variables.
const escaped = hash.replace(/\$/g, '\\$');

console.log('\nRaw hash (use this in a hosting env UI, e.g. Vercel — no escaping):');
console.log(hash);
console.log('\nFor a local .env FILE (escape $ so Next does not expand it):');
console.log(`ADMIN_PASSWORD_HASH="${escaped}"`);
console.log('');
