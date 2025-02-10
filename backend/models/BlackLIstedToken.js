const mongoose = require('mongoose');

const blacklistedTokenSchema = new mongoose.Schema({
  token: { type: String, required: true },
  expiresAt: { type: Date, required: true },
});

// Prevent model overwrite
const BlacklistedToken = mongoose.models.BlacklistedToken || mongoose.model('BlacklistedToken', blacklistedTokenSchema);

module.exports = BlacklistedToken;

