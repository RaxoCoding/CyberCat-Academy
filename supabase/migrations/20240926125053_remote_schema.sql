create policy "Allow users that solved challenge to select files 1g7otat_0"
on "storage"."objects"
as permissive
for select
to authenticated
using (((bucket_id = 'challenge_writeups'::text) AND (EXISTS ( SELECT 1
   FROM users_link_challenges ulc
  WHERE ((ulc.user_id = auth.uid()) AND (ulc.challenge_id = ( SELECT public_challenges.id
           FROM public_challenges
          WHERE (public_challenges.name_id = (storage.foldername(objects.name))[2]))))))));


create policy "read_authenticated"
on "storage"."objects"
as permissive
for select
to authenticated
using ((bucket_id = 'challenge_files'::text));



