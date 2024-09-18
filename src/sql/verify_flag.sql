CREATE OR REPLACE FUNCTION verify_flag(challenge_id INT, submitted_flag TEXT)
RETURNS TABLE (id bigint) AS $$
BEGIN
  RETURN QUERY
  SELECT c.id
  FROM challenges c
  WHERE c.id = challenge_id AND c.flag = submitted_flag;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

GRANT EXECUTE ON FUNCTION verify_flag TO authenticated, anon;