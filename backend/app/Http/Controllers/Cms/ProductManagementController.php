<?php

namespace App\Http\Controllers\Cms;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ProductManagementController extends Controller
{
    public function index()
    {
        $products = Product::orderBy('sort_order')->orderBy('id')->get();
        return view('cms.products.index', compact('products'));
    }

    public function create()
    {
        return view('cms.products.create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string',
            'category' => 'required|in:Flour,Cookies,Noodle,Pasta',
            'description' => 'nullable|string',
            'ingredients' => 'nullable|string',
            'nutritional_info' => 'nullable|string',
            'buy_now_text' => 'nullable|string',
            'buy_now_link' => 'nullable|string',
            'image_url' => 'nullable|string',
            'is_new' => 'boolean',
            'is_featured' => 'boolean',
            'status' => 'in:draft,published',
            'sort_order' => 'integer',
        ]);

        $validated['slug'] = Str::slug($validated['name']);
        $validated['is_new'] = $request->boolean('is_new');
        $validated['is_featured'] = $request->boolean('is_featured');

        Product::create($validated);

        return redirect()->route('cms.products.index')->with('success', 'Product created successfully');
    }

    public function edit($id)
    {
        $product = Product::findOrFail($id);
        return view('cms.products.edit', compact('product'));
    }

    public function update(Request $request, $id)
    {
        $product = Product::findOrFail($id);

        $validated = $request->validate([
            'name' => 'required|string',
            'category' => 'required|in:Flour,Cookies,Noodle,Pasta',
            'description' => 'nullable|string',
            'ingredients' => 'nullable|string',
            'nutritional_info' => 'nullable|string',
            'buy_now_text' => 'nullable|string',
            'buy_now_link' => 'nullable|string',
            'image_url' => 'nullable|string',
            'is_new' => 'boolean',
            'is_featured' => 'boolean',
            'status' => 'in:draft,published',
            'sort_order' => 'integer',
        ]);

        $validated['slug'] = Str::slug($validated['name']);
        $validated['is_new'] = $request->boolean('is_new');
        $validated['is_featured'] = $request->boolean('is_featured');

        $product->update($validated);

        return redirect()->route('cms.products.index')->with('success', 'Product updated successfully');
    }

    public function destroy($id)
    {
        $product = Product::findOrFail($id);
        $product->delete();
        return redirect()->route('cms.products.index')->with('success', 'Product deleted');
    }
}
