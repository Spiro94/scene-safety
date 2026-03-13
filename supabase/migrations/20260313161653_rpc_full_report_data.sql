CREATE OR REPLACE FUNCTION wilson_score(ups INT, downs INT)
RETURNS DOUBLE PRECISION AS $$
DECLARE
  n INT := ups + downs;
  z DOUBLE PRECISION := 1.96;
  phat DOUBLE PRECISION;
BEGIN
  IF n = 0 THEN
    RETURN 0;
  END IF;

  phat := ups::DOUBLE PRECISION / n;

  RETURN (
    phat + z * z / (2 * n) - z * SQRT((phat * (1 - phat) + z * z / (4 * n)) / n)
  ) / (1 + z * z / n);
END;
$$ LANGUAGE plpgsql IMMUTABLE;

CREATE OR REPLACE FUNCTION get_full_trigger_reports(
  p_user_id UUID
)
RETURNS TABLE (
  id UUID,
  tmdb_movie_id INTEGER,
  trigger_type TEXT,
  start_time TEXT,
  end_time TEXT,
  user_id UUID,
  calification TEXT,
  description TEXT,
  created_at TIMESTAMPTZ,
  helpful_votes BIGINT,
  not_helpful_votes BIGINT,
  accuracy_score DOUBLE PRECISION
) AS $$
  SELECT
    tr.id,
    tr.tmdb_movie_id,
    tr.trigger_type,
    tr.start_time,
    tr.end_time,
    tr.user_id,
    tr.calification,
    tr.description,
    tr.created_at,
    COALESCE(v.helpful_votes, 0) AS helpful_votes,
    COALESCE(v.not_helpful_votes, 0) AS not_helpful_votes,
    wilson_score(
      COALESCE(v.helpful_votes, 0)::INT,
      COALESCE(v.not_helpful_votes, 0)::INT
    ) AS accuracy_score
  FROM trigger_reports tr
  LEFT JOIN LATERAL (
    SELECT
      COUNT(*) FILTER (WHERE vote = 1) AS helpful_votes,
      COUNT(*) FILTER (WHERE vote = -1) AS not_helpful_votes
    FROM trigger_report_votes
    WHERE trigger_report_id = tr.id
  ) v ON true
  WHERE tr.user_id = p_user_id
  ORDER BY accuracy_score DESC, helpful_votes DESC, tr.created_at DESC;
$$ LANGUAGE sql STABLE;

GRANT EXECUTE ON FUNCTION get_full_trigger_reports(UUID) TO anon, authenticated;