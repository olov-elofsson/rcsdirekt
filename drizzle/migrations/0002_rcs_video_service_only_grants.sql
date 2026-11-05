REVOKE ALL ON TABLE public.rcs_video_uploads FROM anon, authenticated;
GRANT ALL ON TABLE public.rcs_video_uploads TO service_role;