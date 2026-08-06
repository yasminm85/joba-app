import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export function useJobs(user) {
  const queryClient = useQueryClient();

  const { data: savedJobs = [], isLoading: isJobsLoading } = useQuery({
    queryKey: ['jobs'],
    queryFn: async () => {
      const res = await fetch('/api/jobs');
      if (!res.ok) throw new Error('Failed to fetch jobs');
      const data = await res.json();
      return data.jobs || [];
    },
    enabled: !!user,
  });

  const saveJobMutation = useMutation({
    mutationFn: async (bodyData) => {
      const response = await fetch('/api/jobs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bodyData),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Failed to save job');
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
    },
  });

  const editJobMutation = useMutation({
    mutationFn: async (editingJob) => {
      const jobId = editingJob?._id || editingJob?.id;
      const response = await fetch(`/api/jobs/${jobId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingJob),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Failed to update job');
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
    },
  });

  const deleteJobMutation = useMutation({
    mutationFn: async (id) => {
      const response = await fetch(`/api/jobs/${id}`, { method: 'DELETE' });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Failed to delete job');
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
    },
  });

  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }) => {
      const response = await fetch(`/api/jobs/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Failed to update status');
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
    },
  });

  return {
    savedJobs,
    isJobsLoading,
    saveJob: saveJobMutation.mutateAsync,
    editJob: editJobMutation.mutateAsync,
    deleteJob: deleteJobMutation.mutateAsync,
    updateStatus: updateStatusMutation.mutateAsync,
  };
}