<?php

namespace App\Http\Controllers\Cms;

use App\Http\Controllers\Controller;
use App\Models\News;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class NewsManagementController extends Controller
{
    public function index()
    {
        $articles = News::orderBy('sort_order')->orderBy('id', 'desc')->get();
        return view('cms.news.index', compact('articles'));
    }

    public function create()
    {
        return view('cms.news.create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string',
            'category' => 'nullable|string',
            'excerpt' => 'nullable|string',
            'content' => 'nullable|string',
            'image_url' => 'nullable|string',
            'published_date' => 'nullable|date',
            'is_featured' => 'boolean',
            'status' => 'in:draft,published',
            'sort_order' => 'integer',
        ]);

        $validated['slug'] = Str::slug($validated['title']);
        $validated['is_featured'] = $request->boolean('is_featured');

        News::create($validated);

        return redirect()->route('cms.news.index')->with('success', 'Article created successfully');
    }

    public function edit($id)
    {
        $article = News::findOrFail($id);
        return view('cms.news.edit', compact('article'));
    }

    public function update(Request $request, $id)
    {
        $article = News::findOrFail($id);

        $validated = $request->validate([
            'title' => 'required|string',
            'category' => 'nullable|string',
            'excerpt' => 'nullable|string',
            'content' => 'nullable|string',
            'image_url' => 'nullable|string',
            'published_date' => 'nullable|date',
            'is_featured' => 'boolean',
            'status' => 'in:draft,published',
            'sort_order' => 'integer',
        ]);

        $validated['slug'] = Str::slug($validated['title']);
        $validated['is_featured'] = $request->boolean('is_featured');

        $article->update($validated);

        return redirect()->route('cms.news.index')->with('success', 'Article updated successfully');
    }

    public function destroy($id)
    {
        $article = News::findOrFail($id);
        $article->delete();
        return redirect()->route('cms.news.index')->with('success', 'Article deleted');
    }
}
