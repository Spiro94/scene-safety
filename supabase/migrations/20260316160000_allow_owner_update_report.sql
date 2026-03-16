-- Allow report owners to update their own reports
CREATE POLICY "Owner can update report"
  ON trigger_reports
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Reset all votes when a report is edited, since the content has changed
CREATE OR REPLACE FUNCTION reset_votes_on_report_update()
RETURNS TRIGGER AS $$
BEGIN
  DELETE FROM trigger_report_votes WHERE trigger_report_id = NEW.id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER trg_reset_votes_on_update
  AFTER UPDATE ON trigger_reports
  FOR EACH ROW
  EXECUTE FUNCTION reset_votes_on_report_update();
