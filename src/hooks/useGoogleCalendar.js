import { useState } from 'react';
import { useGoogleLogin } from '@react-oauth/google';

export function useGoogleCalendar(onScheduleSuccess) {
  const [googleCalendarToken, setGoogleCalendarToken] = useState(null);
  const [pendingExportData, setPendingExportData] = useState(null);
  const [calendarExporting, setCalendarExporting] = useState(false);
  const [calendarStatusMsg, setCalendarStatusMsg] = useState(null);

  const loginToCalendar = useGoogleLogin({
    scope: 'https://www.googleapis.com/auth/calendar.events',
    onSuccess: async (tokenResponse) => {
      const accessToken = tokenResponse.access_token;
      setGoogleCalendarToken(accessToken);

      if (pendingExportData) {
        await executeCalendarExport(
          pendingExportData.job,
          pendingExportData.dateToUse,
          pendingExportData.timeToUse,
          pendingExportData.durationToUse,
          accessToken
        );
        setPendingExportData(null);
      }
    },
    onError: (error) => {
      console.error('Calendar OAuth Error:', error);
      setCalendarStatusMsg({
        type: 'error',
        text: 'Permission denied',
      });
      setCalendarExporting(false);
    },
  });

  const executeCalendarExport = async (
    job,
    dateToUse,
    timeToUse,
    durationToUse,
    token
  ) => {
    setCalendarExporting(true);
    setCalendarStatusMsg({
      type: 'info',
      text: 'Syncing to Google Calendar...',
    });

    try {
      const startDateTimeStr = `${dateToUse}T${timeToUse}:00`;
      const startDateObj = new Date(startDateTimeStr);
      if (isNaN(startDateObj.getTime())) {
        throw new Error('Date or time format is invalid');
      }

      const endDateObj = new Date(
        startDateObj.getTime() + parseInt(durationToUse) * 60 * 1000
      );

      const eventDetails = {
        summary: `Interview: ${job.jobTitle || job.job_title} - ${job.company}`,
        location: job.location || 'Online / Remote',
        description: `Interview recorded via Joba.\n\nDetail:\nQualifications:\n${(
          job.qualifications || []
        )
          .map((q) => `- ${q}`)
          .join('\n')}\n\nContact: ${job.contact || '-'}`,
        start: {
          dateTime: startDateObj.toISOString(),
          timeZone:
            Intl.DateTimeFormat().resolvedOptions().timeZone || 'Asia/Jakarta',
        },
        end: {
          dateTime: endDateObj.toISOString(),
          timeZone:
            Intl.DateTimeFormat().resolvedOptions().timeZone || 'Asia/Jakarta',
        },
      };

      const apiResponse = await fetch(
        'https://www.googleapis.com/calendar/v3/calendars/primary/events',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(eventDetails),
        }
      );

      if (!apiResponse.ok) {
        const errJson = await apiResponse.json();
        throw new Error(
          errJson?.error?.message || 'Failed to set schedule'
        );
      }

      setCalendarStatusMsg({
        type: 'success',
        text: 'Successfully saved into Google Calendar!',
      });

      if (onScheduleSuccess) {
        await onScheduleSuccess(job, {
          interviewDate: dateToUse,
          interviewTime: timeToUse,
          interviewDuration: durationToUse,
        });
      }
    } catch (err) {
      setCalendarStatusMsg({
        type: 'error',
        text: err?.message || 'Something went wrong',
      });
    } finally {
      setCalendarExporting(false);
    }
  };

  const exportToCalendar = async (job, dateToUse, timeToUse, durationToUse) => {
    if (!dateToUse || !timeToUse) {
      setCalendarStatusMsg({
        type: 'error',
        text: 'Silakan pilih tanggal dan waktu terlebih dahulu.',
      });
      return;
    }

    if (!googleCalendarToken) {
      setPendingExportData({ job, dateToUse, timeToUse, durationToUse });
      loginToCalendar();
      return;
    }

    await executeCalendarExport(
      job,
      dateToUse,
      timeToUse,
      durationToUse,
      googleCalendarToken
    );
  };

  return {
    exportToCalendar,
    calendarExporting,
    calendarStatusMsg,
    setCalendarStatusMsg,
  };
}