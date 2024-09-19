CREATE OR REPLACE FUNCTION add_solved_challenge(
  p_user_id TEXT,
  p_challenge_id INT,
  p_submitted_flag TEXT
)
RETURNS BOOLEAN AS $$
DECLARE
  v_challenge_exists BOOLEAN;
  v_already_solved BOOLEAN;
  v_flag_correct BOOLEAN;
BEGIN
  -- Check if the challenge exists
  SELECT EXISTS(SELECT 1 FROM challenges WHERE id = p_challenge_id) INTO v_challenge_exists;
  IF NOT v_challenge_exists THEN
    RAISE EXCEPTION 'Challenge does not exist';
  END IF;

  -- Check if the user has already solved this challenge
  SELECT EXISTS(
    SELECT 1 
    FROM users_link_challenges 
    WHERE user_id = p_user_id AND challenge_id = p_challenge_id
  ) INTO v_already_solved;
  
  IF v_already_solved THEN
    RETURN FALSE; -- User has already solved this challenge
  END IF;

  -- Verify the flag
  SELECT EXISTS(
    SELECT 1 FROM verify_flag(p_challenge_id, p_submitted_flag)
  ) INTO v_flag_correct;

  IF v_flag_correct THEN
    -- Flag is correct, add the record to users_link_challenges
    INSERT INTO users_link_challenges (user_id, challenge_id)
    VALUES (p_user_id, p_challenge_id);
    RETURN TRUE;
  ELSE
    -- Flag is incorrect
    RETURN FALSE;
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permission on the function
GRANT EXECUTE ON FUNCTION add_solved_challenge TO authenticated;