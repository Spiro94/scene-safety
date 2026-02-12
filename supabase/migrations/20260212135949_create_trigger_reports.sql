CREATE TABLE trigger_reports (
  id             UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  tmdb_movie_id  INTEGER NOT NULL,
  trigger_type   TEXT NOT NULL,
  start_time     TEXT NOT NULL,
  end_time       TEXT NOT NULL,
  description    TEXT,
  created_at     TIMESTAMPTZ DEFAULT now() NOT NULL
);

CREATE INDEX idx_trigger_reports_movie ON trigger_reports (tmdb_movie_id);

CREATE INDEX idx_trigger_reports_movie_type ON trigger_reports (tmdb_movie_id, trigger_type);

ALTER TABLE trigger_reports ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read" ON trigger_reports FOR SELECT USING (true);
CREATE POLICY "Anyone can insert" ON trigger_reports FOR INSERT WITH CHECK (true);
