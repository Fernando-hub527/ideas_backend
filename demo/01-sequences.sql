SELECT pg_catalog.setval('votes_id_seq', (SELECT MAX(id) FROM "votes"));
SELECT pg_catalog.setval('public.user_id_seq', (SELECT MAX(id) FROM "user"));
SELECT pg_catalog.setval('public.idea_id_seq', (SELECT MAX(id) FROM "idea"));
SELECT pg_catalog.setval('public.comment_id_seq', (SELECT MAX(id) FROM "comment"));
