import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import connectDB from '@/lib/db';
import User from '@/models/user';
import sendResetPasswordEmail from '@/services/reset-password.email';
import sendVerificationEmail from '@/services/sendemail';

const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\W_]{8,}$/;

export async function registerUser({ name, email, password }) {
  await connectDB();

  if (!name || !email || !password) {
    throw new Error('All fields are required');
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    throw new Error('Your email is already registered');
  }

  if (!PASSWORD_REGEX.test(password)) {
    throw new Error(
      'Password must be at least 8 characters long and contain a combination of uppercase letters, lowercase letters, and numbers',
    );
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const verificationToken = crypto.randomBytes(32).toString('hex');
  const verificationTokenExpires = Date.now() + 24 * 60 * 60 * 1000;

  const newUser = await User.create({
    name,
    email,
    password: hashedPassword,
    emailVerified: null,
    verificationToken,
    verificationTokenExpires,
  });

  const verifyUrl = `${process.env.NEXTAUTH_URL}/verify-email?token=${verificationToken}`;
  await sendVerificationEmail(email, verifyUrl);

  return { name: newUser.name, email: newUser.email };
}

export async function verifyEmail(token) {
  await connectDB();

  if (!token) {
    return NextResponse.json({ message: 'Invalid Token' }, { status: 400 });
  }

  const user = await User.findOne({
    verificationToken: token,
    verificationTokenExpires: { $gt: Date.now() },
  });

  if (!user) {
    throw new Error('Verification Link Invalid or Expired');
  }

  user.emailVerified = new Date();
  user.verificationToken = undefined;
  user.verificationTokenExpires = undefined;

  await user.save();
  return true;
}

export async function sendResetPassword(email) {
  if (!email) {
    throw Error('Email is required');
  }

  await connectDB();
  const user = await User.findOne({ email });

  if (!user) {
    return true;
  }

  if (user.isGoogleUser && !user.password) {
    throw new Error('Please Login using google');
  }

  const resetToken = crypto.randomBytes(32).toString('hex');

  const passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');
  const passwordResetExpires = Date.now() + 3600000;

  user.passwordResetToken = passwordResetToken;
  user.passwordResetExpires = passwordResetExpires;
  await user.save();

  const resetUrl = `${process.env.NEXTAUTH_URL}/reset-password?token=${resetToken}`;
  await sendResetPasswordEmail(email, resetUrl);

  return true;
}

export async function resetPassword(token, newPassword) {
  if (!token || !newPassword) {
    throw Error('Token and Password are required');
  }

  if (!PASSWORD_REGEX.test(newPassword)) {
    throw new Error(
      'Password must be at least 8 characters long and contain uppercase, lowercase, and numbers',
    );
  }

  const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

  await connectDB();

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  if (!user) {
    throw Error('Token Invalid or Expired');
  }

  user.password = await bcrypt.hash(newPassword, 10);
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  return true;
}

export async function validateUserCredentials(email, password) {
  if (!email || !password) {
    throw new Error('Email and Password are required');
  }

  await connectDB();

  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('Email not registered');
  }

  if (!user.password) {
    throw new Error('Please Sign In Using Google');
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    throw new Error('Password Incorrect');
  }

  if (!user.emailVerified) {
    throw new Error('Please verify your email address before logging in');
  }

  return {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    image: user.image,
  };
}

export async function findOrCreateGoogleUser(user) {
  await connectDB();
  const existingUser = await User.findOne({ email: user.email });

  if (!existingUser) {
    await User.create({
      name: user.name,
      email: user.email,
      image: user.image,
      isGoogleUser: true,
      emailVerified: new Date(),
    });
  }

  return true;
}
