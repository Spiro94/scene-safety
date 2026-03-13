-- Add user_id and calification to trigger_reports
ALTER TABLE trigger_reports
  ADD COLUMN user_id      UUID REFERENCES auth.users(id) ON UPDATE CASCADE ON DELETE SET NULL,
  ADD COLUMN calification TEXT CHECK (calification IN ('high', 'medium', 'low'));

-- Votes table
CREATE TABLE trigger_report_votes (
  id                UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  trigger_report_id UUID        NOT NULL REFERENCES trigger_reports(id) ON UPDATE CASCADE ON DELETE CASCADE,
  user_id           UUID        NOT NULL REFERENCES auth.users(id)      ON UPDATE CASCADE ON DELETE CASCADE,
  vote              SMALLINT    NOT NULL CHECK (vote IN (1, -1)),
  created_at        TIMESTAMPTZ DEFAULT now() NOT NULL,
  UNIQUE (trigger_report_id, user_id)
);

CREATE INDEX idx_trigger_report_votes_report ON trigger_report_votes (trigger_report_id);

ALTER TABLE trigger_report_votes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read votes"   ON trigger_report_votes FOR SELECT USING (true);
CREATE POLICY "Authenticated can vote"  ON trigger_report_votes FOR INSERT  WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Owner can change vote"   ON trigger_report_votes FOR UPDATE  USING (auth.uid() = user_id);
CREATE POLICY "Owner can delete vote"   ON trigger_report_votes FOR DELETE  USING (auth.uid() = user_id);
