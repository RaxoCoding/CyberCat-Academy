DROP VIEW IF EXISTS public_challenges;

CREATE VIEW public_challenges AS
SELECT id, name, description, points, created_at, category_id, tags, url, writeup, ressources, files, author_id
FROM challenges;

GRANT SELECT ON public_challenges TO public;