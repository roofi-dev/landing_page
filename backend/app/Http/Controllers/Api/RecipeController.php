<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Recipe;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class RecipeController extends Controller
{
    public function index()
    {
        return response()->json(Recipe::orderBy('sort_order')->orderBy('id')->get());
    }

    public function publicIndex()
    {
        return response()->json(
            Recipe::where('status', 'published')
                ->orderBy('sort_order')
                ->orderBy('id')
                ->get()
        );
    }

    public function show($id)
    {
        $recipe = Recipe::findOrFail($id);
        return response()->json($recipe);
    }

    public function publicShow($slug)
    {
        $recipe = Recipe::where('slug', $slug)->where('status', 'published')->first();
        if (!$recipe) {
            return response()->json(['message' => 'Recipe not found'], 404);
        }
        return response()->json($recipe);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string',
            'slug' => 'nullable|string|unique:recipes,slug',
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

        if (empty($validated['slug'])) {
            $validated['slug'] = Str::slug($validated['title']);
        }

        $recipe = Recipe::create($validated);
        return response()->json($recipe, 201);
    }

    public function update(Request $request, $id)
    {
        $recipe = Recipe::findOrFail($id);

        $validated = $request->validate([
            'title' => 'sometimes|string',
            'slug' => 'sometimes|string|unique:recipes,slug,' . $id,
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

        $recipe->update($validated);
        return response()->json($recipe);
    }

    public function destroy($id)
    {
        $recipe = Recipe::findOrFail($id);
        $recipe->delete();
        return response()->json(['message' => 'Recipe deleted']);
    }
}
