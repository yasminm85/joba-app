import connectDB from '@/lib/db';
import Job from '@/models/job';

export async function getDataJob(userId) {
  if (!userId) {
    throw new Error('Unauthorized');
  }

  await connectDB();

  const jobs = await Job.find({ userId }).sort({ createdAt: -1 }).lean();

  return jobs;
}

export async function savedDataJob(userId, jobData) {
  if (!userId) {
    throw new Error('Unauthorized');
  }

  await connectDB();

  const {
    jobTitle,
    company,
    location,
    description,
    qualifications,
    salary,
    contact,
    status,
  } = jobData;

  const newJob = await Job.create({
    userId,
    jobTitle,
    company: company || '',
    location: location || '',
    description: description || '',
    qualifications: qualifications || [],
    salary: salary || 'Not Disclosed',
    contact: contact || '',
    status: status || 'Applied',
  });

  return newJob;
}

export async function editJob(userId, body, id) {
  if (!userId) {
    throw new Error('Unauthorized');
  }
  await connectDB();

  const { createdAt, updatedAt, ...updateData } = body;

  const updatedJob = await Job.findByIdAndUpdate(
    { _id: id, userId },
    { $set: updateData },
    { returnDocument: 'after' },
  );

  if (!updatedJob) {
    throw new Error('Data not found');
  }

  return updatedJob;
}

export async function deleteJob(userId, id) {
  if (!userId) {
    throw new Error('Unauthorized');
  }

  await connectDB();

  const deletedJob = await Job.findByIdAndDelete({ _id: id, userId });

  if (!deletedJob) {
    throw new Error('Data not found or access denied');
  }

  return true;
}

export async function editStatus(userId, id, status) {
  if (!userId) {
    throw new Error('Unauthorized');
  }

  await connectDB();

  const updatedJob = await Job.findOneAndUpdate(
    { _id: id, userId },
    { $set: { status } },
    { returnDocument: 'after' },
  );

  if (!updatedJob) {
    throw new Error('Data not found');
  }

  return true;
}
