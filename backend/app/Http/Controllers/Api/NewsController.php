<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\News;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class NewsController extends Controller
{
    public function index()
    {
        return response()->json(News::orderBy('sort_order')->orderBy('id')->get());
    }

    public function publicIndex()
    {
        return response()->json(
            News::where('status', 'published')
                ->orderBy('sort_order')
                ->orderBy('published_date', 'desc')
                ->orderBy('id', 'desc')
                ->get()
        );
    }

    public function show($id)
    {
        $news = News::findOrFail($id);
        return response()->json($news);
    }

    public function publicShow($slug)
    {
        $news = News::where('slug', $slug)->where('status', 'published')->first();
        if (!$news) {
            return response()->json(['message' => 'Article not found'], 404);
        }
        return response()->json($news);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string',
            'slug' => 'nullable|string|unique:news,slug',
            'category' => 'nullable|string',
            'excerpt' => 'nullable|string',
            'content' => 'nullable|string',
            'image_url' => 'nullable|string',
            'published_date' => 'nullable|date',
            'is_featured' => 'boolean',
            'status' => 'in:draft,published',
            'sort_order' => 'integer',
        ]);

        if (empty($validated['slug'])) {
            $validated['slug'] = Str::slug($validated['title']);
        }

        $news = News::create($validated);
        return response()->json($news, 201);
    }

    public function update(Request $request, $id)
    {
        $news = News::findOrFail($id);

        $validated = $request->validate([
            'title' => 'sometimes|string',
            'slug' => 'sometimes|string|unique:news,slug,' . $id,
            'category' => 'nullable|string',
            'excerpt' => 'nullable|string',
            'content' => 'nullable|string',
            'image_url' => 'nullable|string',
            'published_date' => 'nullable|date',
            'is_featured' => 'boolean',
            'status' => 'in:draft,published',
            'sort_order' => 'integer',
        ]);

        $news->update($validated);
        return response()->json($news);
    }

    public function destroy($id)
    {
        $news = News::findOrFail($id);
        $news->delete();
        return response()->json(['message' => 'Article deleted']);
    }
}
