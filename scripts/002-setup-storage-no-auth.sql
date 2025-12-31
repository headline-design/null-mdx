-- Create storage bucket for docs and blog media (no auth version for testing)
INSERT INTO storage.buckets (id, name, public)
VALUES ('docs-blog-media', 'docs-blog-media', true)
ON CONFLICT (id) DO NOTHING;

-- Allow public read access
CREATE POLICY "Public read access"
ON storage.objects FOR SELECT
USING (bucket_id = 'docs-blog-media');

-- Allow anonymous uploads (for testing without auth)
CREATE POLICY "Anonymous upload access"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'docs-blog-media');

-- Allow anonymous deletes (for testing without auth)
CREATE POLICY "Anonymous delete access"
ON storage.objects FOR DELETE
USING (bucket_id = 'docs-blog-media');
