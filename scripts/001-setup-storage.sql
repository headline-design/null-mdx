-- Create storage bucket for docs/blog media
-- Run this script after connecting Supabase

-- Create the bucket (public for easy access to images)
INSERT INTO storage.buckets (id, name, public)
VALUES ('docs-blog-media', 'docs-blog-media', true)
ON CONFLICT (id) DO NOTHING;

-- Allow public read access to all files
CREATE POLICY "Public read access"
ON storage.objects FOR SELECT
USING (bucket_id = 'docs-blog-media');

-- Allow authenticated users to upload files
CREATE POLICY "Authenticated upload access"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'docs-blog-media'
  AND auth.role() = 'authenticated'
);

-- Allow authenticated users to update their files
CREATE POLICY "Authenticated update access"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'docs-blog-media'
  AND auth.role() = 'authenticated'
);

-- Allow authenticated users to delete their files
CREATE POLICY "Authenticated delete access"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'docs-blog-media'
  AND auth.role() = 'authenticated'
);
