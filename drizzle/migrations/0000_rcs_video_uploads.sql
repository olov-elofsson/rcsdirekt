CREATE TABLE public.rcs_video_uploads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ip_hash text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT ALL ON public.rcs_video_uploads TO service_role;
ALTER TABLE public.rcs_video_uploads ENABLE ROW LEVEL SECURITY;
CREATE INDEX rcs_video_uploads_ip_created_idx ON public.rcs_video_uploads (ip_hash, created_at);
