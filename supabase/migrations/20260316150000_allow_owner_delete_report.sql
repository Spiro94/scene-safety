-- Allow report owners to delete their own reports.
-- Votes are already deleted on cascade via the FK defined in
-- 20260312121926_add_trigger_report_user_calification_votes.sql
CREATE POLICY "Owner can delete report"
  ON trigger_reports
  FOR DELETE
  USING (auth.uid() = user_id);
