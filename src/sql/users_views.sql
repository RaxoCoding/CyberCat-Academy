CREATE OR REPLACE VIEW user_scores AS
SELECT 
    u.id AS user_id,
    u.username,
    COALESCE(SUM(c.points), 0) AS total_score,
    COUNT(ulc.challenge_id) AS challenges_solved
FROM 
    users u
LEFT JOIN 
    users_link_challenges ulc ON u.id = ulc.user_id
LEFT JOIN 
    challenges c ON ulc.challenge_id = c.id
GROUP BY 
    u.id, u.username;

-- Grant access to the view
GRANT SELECT ON user_scores TO authenticated, anon;