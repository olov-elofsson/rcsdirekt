CREATE OR REPLACE FUNCTION public.enforce_rcs_video_upload_limit()
RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
DECLARE hour_count integer; day_count integer;
BEGIN
  PERFORM pg_advisory_xact_lock(hashtextextended(NEW.ip_hash, 0));
  SELECT count(*) FILTER (WHERE created_at >= now() - interval '1 hour'), count(*)
  INTO hour_count, day_count FROM public.rcs_video_uploads
  WHERE ip_hash = NEW.ip_hash AND created_at >= now() - interval '1 day';
  IF hour_count >= 5 OR day_count >= 20 THEN
    RAISE EXCEPTION 'Upload limit reached' USING ERRCODE = 'P0001';
  END IF;
  RETURN NEW;
END;
$$;
REVOKE ALL ON FUNCTION public.enforce_rcs_video_upload_limit() FROM PUBLIC;
CREATE TRIGGER rcs_video_upload_limit BEFORE INSERT ON public.rcs_video_uploads
FOR EACH ROW EXECUTE FUNCTION public.enforce_rcs_video_upload_limit();