<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\PageSection;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class PageSectionController extends Controller
{
    public function index()
    {
        return response()->json(PageSection::orderBy('id')->get());
    }

    public function show($key)
    {
        $section = PageSection::where('section_key', $key)->first();
        if (!$section) {
            return response()->json(['message' => 'Section not found'], 404);
        }
        return response()->json($section);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'section_key' => 'required|string|unique:page_sections,section_key',
            'title' => 'required|string',
            'content' => 'nullable|array',
            'status' => 'in:draft,published',
        ]);

        $section = PageSection::create($validated);
        return response()->json($section, 201);
    }

    public function update(Request $request, $id)
    {
        $section = PageSection::findOrFail($id);

        $validated = $request->validate([
            'section_key' => 'sometimes|string|unique:page_sections,section_key,' . $id,
            'title' => 'sometimes|string',
            'content' => 'nullable|array',
            'status' => 'in:draft,published',
        ]);

        $section->update($validated);
        return response()->json($section);
    }

    public function destroy($id)
    {
        $section = PageSection::findOrFail($id);
        $section->delete();
        return response()->json(['message' => 'Section deleted']);
    }

    public function publicContent()
    {
        $sections = PageSection::where('status', 'published')->get()->keyBy('section_key');
        $result = [];
        foreach ($sections as $key => $section) {
            $result[$key] = $section->content;
        }
        return response()->json($result);
    }
}
