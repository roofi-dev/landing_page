<?php

namespace App\Http\Controllers\Cms;

use App\Http\Controllers\Controller;
use App\Models\PageSection;
use Illuminate\Http\Request;

class PageSectionManagementController extends Controller
{
    protected $pages = [
        'home' => 'Home',
        'about' => 'About Us',
        'products' => 'Our Products',
        'recipes' => 'Recipes',
        'news' => 'News',
        'contact' => 'Contact Us',
        'faq' => 'FAQ',
    ];

    public function index(Request $request)
    {
        $currentPage = $request->get('page', 'home');
        $sections = PageSection::where('page', $currentPage)
            ->orderBy('sort_order')
            ->orderBy('id')
            ->get();
        $pages = $this->pages;

        return view('cms.sections.index', compact('sections', 'pages', 'currentPage'));
    }

    public function edit($id)
    {
        $section = PageSection::findOrFail($id);
        $pages = $this->pages;
        return view('cms.sections.edit', compact('section', 'pages'));
    }

    public function update(Request $request, $id)
    {
        $section = PageSection::findOrFail($id);

        $validated = $request->validate([
            'page' => 'required|string',
            'title' => 'required|string',
            'status' => 'in:draft,published',
            'sort_order' => 'integer',
            'content' => 'nullable|string',
        ]);

        if (isset($validated['content'])) {
            $decoded = json_decode($validated['content'], true);
            if (json_last_error() === JSON_ERROR_NONE) {
                $validated['content'] = $decoded;
            } else {
                $validated['content'] = null;
            }
        }

        $section->update($validated);

        return redirect()->route('cms.sections.index', ['page' => $section->page])->with('success', 'Section updated successfully');
    }
}
