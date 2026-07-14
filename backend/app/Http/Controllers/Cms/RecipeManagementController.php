<?php

namespace App\Http\Controllers\Cms;

use App\Http\Controllers\Controller;
use App\Models\Recipe;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class RecipeManagementController extends Controller
{
    public function index()
    {
        $recipes = Recipe::orderBy('sort_order')->orderBy('id')->get();
        return view('cms.recipes.index', compact('recipes'));
    }

    public function create()
    {
        return view('cms.recipes.create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string',
            'description' => 'nullable|string',
            'image_url' => 'nullable|string',
            'prep_time' => 'nullable|string',
            'difficulty' => 'nullable|string',
            'ingredients_list' => 'nullable|string',
            'instructions' => 'nullable|string',
            'serving_size' => 'nullable|string',
            'status' => 'in:draft,published',
            'sort_order' => 'integer',
        ]);

        $validated['slug'] = Str::slug($validated['title']);

        Recipe::create($validated);

        return redirect()->route('cms.recipes.index')->with('success', 'Recipe created successfully');
    }

    public function edit($id)
    {
        $recipe = Recipe::findOrFail($id);
        return view('cms.recipes.edit', compact('recipe'));
    }

    public function update(Request $request, $id)
    {
        $recipe = Recipe::findOrFail($id);

        $validated = $request->validate([
            'title' => 'required|string',
            'description' => 'nullable|string',
            'image_url' => 'nullable|string',
            'prep_time' => 'nullable|string',
            'difficulty' => 'nullable|string',
            'ingredients_list' => 'nullable|string',
            'instructions' => 'nullable|string',
            'serving_size' => 'nullable|string',
            'status' => 'in:draft,published',
            'sort_order' => 'integer',
        ]);

        $validated['slug'] = Str::slug($validated['title']);

        $recipe->update($validated);

        return redirect()->route('cms.recipes.index')->with('success', 'Recipe updated successfully');
    }

    public function destroy($id)
    {
        $recipe = Recipe::findOrFail($id);
        $recipe->delete();
        return redirect()->route('cms.recipes.index')->with('success', 'Recipe deleted');
    }
}
