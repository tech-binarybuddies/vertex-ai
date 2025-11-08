const bcrypt = require('bcryptjs');

async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  console.log(hashedPassword);
}

// Replace 'your_admin_password' with the desired password for the admin user
hashPassword('your_admin_password');
