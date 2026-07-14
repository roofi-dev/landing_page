<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Media;
use App\Services\CloudinaryService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class MediaController extends Controller
{
    public function index()
    {
        return response()->json(Media::orderBy('id', 'desc')->get());
    }

    public function store(Request $request, CloudinaryService $cloudinary)
    {
        $request->validate([
            'file' => 'required|file|mimes:jpeg,jpg,png,gif,webp,svg,mp4,webm|max:10240',
        ]);

        $file = $request->file('file');
        $filePath = $file->getRealPath();

        if ($cloudinary->isConfigured()) {
            $result = $cloudinary->upload($filePath);

            $media = Media::create([
                'name' => $file->getClientOriginalName(),
                'file_path' => $result['public_id'],
                'file_url' => $result['secure_url'],
                'public_id' => $result['public_id'],
                'mime_type' => $file->getMimeType(),
                'resource_type' => $result['resource_type'],
                'size' => $result['bytes'] ?? $file->getSize(),
            ]);
        } else {
            $path = $file->store('uploads', 'public');
            $url = url('/storage/' . $path);

            $media = Media::create([
                'name' => $file->getClientOriginalName(),
                'file_path' => $path,
                'file_url' => $url,
                'mime_type' => $file->getMimeType(),
                'resource_type' => 'image',
                'size' => $file->getSize(),
            ]);
        }

        return response()->json($media, 201);
    }

    public function destroy($id, CloudinaryService $cloudinary)
    {
        $media = Media::findOrFail($id);

        if ($media->public_id && $cloudinary->isConfigured()) {
            $cloudinary->destroy($media->public_id);
        } elseif ($media->file_path) {
            Storage::disk('public')->delete($media->file_path);
        }

        $media->delete();
        return response()->json(['message' => 'Media deleted']);
    }
}
