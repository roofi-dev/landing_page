<?php

namespace App\Http\Controllers\Cms;

use App\Http\Controllers\Controller;
use App\Models\Media;
use App\Services\CloudinaryService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class MediaManagementController extends Controller
{
    public function index()
    {
        $media = Media::orderBy('id', 'desc')->get();
        return view('cms.media.index', compact('media'));
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

        return redirect()->route('cms.media.index')->with('success', 'File uploaded successfully');
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
        return redirect()->route('cms.media.index')->with('success', 'File deleted');
    }
}
