<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ProductController extends Controller
{
    public function index()
    {
        return response()->json(Product::orderBy('sort_order')->orderBy('id')->get());
    }

    public function publicIndex()
    {
        return response()->json(
            Product::where('status', 'published')
                ->orderBy('sort_order')
                ->orderBy('id')
                ->get()
        );
    }

    public function show($id)
    {
        $product = Product::findOrFail($id);
        return response()->json($product);
    }

    public function publicShow($slug)
    {
        $product = Product::where('slug', $slug)->where('status', 'published')->first();
        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }
        return response()->json($product);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string',
            'slug' => 'nullable|string|unique:products,slug',
            'category' => 'nullable|string',
            'description' => 'nullable|string',
            'ingredients' => 'nullable|string',
            'nutritional_info' => 'nullable|string',
            'image_url' => 'nullable|string',
            'is_new' => 'boolean',
            'is_featured' => 'boolean',
            'status' => 'in:draft,published',
            'sort_order' => 'integer',
        ]);

        if (empty($validated['slug'])) {
            $validated['slug'] = Str::slug($validated['name']);
        }

        $product = Product::create($validated);
        return response()->json($product, 201);
    }

    public function update(Request $request, $id)
    {
        $product = Product::findOrFail($id);

        $validated = $request->validate([
            'name' => 'sometimes|string',
            'slug' => 'sometimes|string|unique:products,slug,' . $id,
            'category' => 'nullable|string',
            'description' => 'nullable|string',
            'ingredients' => 'nullable|string',
            'nutritional_info' => 'nullable|string',
            'image_url' => 'nullable|string',
            'is_new' => 'boolean',
            'is_featured' => 'boolean',
            'status' => 'in:draft,published',
            'sort_order' => 'integer',
        ]);

        $product->update($validated);
        return response()->json($product);
    }

    public function destroy($id)
    {
        $product = Product::findOrFail($id);
        $product->delete();
        return response()->json(['message' => 'Product deleted']);
    }
}
