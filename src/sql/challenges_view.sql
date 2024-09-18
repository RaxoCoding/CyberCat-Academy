CREATE VIEW public_challenges AS
SELECT id, name, description, points, category_id
FROM challenges;

GRANT SELECT ON public_challenges TO public;