@extends('cms.layout')

@section('title', 'Edit Product - Ladang Lima CMS')

@section('content')
<div class="mb-10">
    <a href="{{ route('cms.products.index') }}" class="group inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-[#d97706] transition-colors mb-4">
        <svg class="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
        Back to Products
    </a>
    <h1 class="text-4xl font-extrabold text-[#052e16] tracking-tight">Edit Product</h1>
    <p class="text-slate-500 text-sm mt-2 font-medium">Update details for <span class="text-[#d97706]">{{ $product->name }}</span></p>
</div>

<form action="{{ route('cms.products.update', $product->id) }}" method="POST">
    @csrf
    @method('PUT')
    
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div class="lg:col-span-2 space-y-8">
            <div class="bg-white rounded-[2rem] border border-slate-200 shadow-sm p-8 space-y-8">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div class="space-y-2">
                        <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Product Name *</label>
                        <input type="text" name="name" value="{{ $product->name }}" required class="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-semibold text-[#052e16] focus:ring-2 focus:ring-[#fbbf24]/20 focus:border-[#fbbf24] outline-none transition-all shadow-inner">
                    </div>
                    <div class="space-y-2">
                        <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Category *</label>
                        @php
                            $category = strtolower((string) $product->category);
                            $categoryValue = str_contains($category, 'flour') || str_contains($category, 'baking') ? 'Flour' : (str_contains($category, 'cookie') ? 'Cookies' : (str_contains($category, 'noodle') ? 'Noodle' : (str_contains($category, 'pasta') || $category === 'pantry' ? 'Pasta' : '')));
                        @endphp
                        <select name="category" required class="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-semibold text-[#052e16] focus:ring-2 focus:ring-[#fbbf24]/20 focus:border-[#fbbf24] outline-none transition-all appearance-none cursor-pointer">
                            <option value="" disabled {{ $categoryValue === '' ? 'selected' : '' }}>Select product category</option>
                            <option value="Flour" {{ $categoryValue === 'Flour' ? 'selected' : '' }}>Flour</option>
                            <option value="Cookies" {{ $categoryValue === 'Cookies' ? 'selected' : '' }}>Cookies</option>
                            <option value="Noodle" {{ $categoryValue === 'Noodle' ? 'selected' : '' }}>Noodle</option>
                            <option value="Pasta" {{ $categoryValue === 'Pasta' ? 'selected' : '' }}>Pasta</option>
                        </select>
                        <p class="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-2">This determines the tab where the product appears</p>
                    </div>
                </div>

                <div class="space-y-4">
                    <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Visual Asset (Image URL)</label>
                    <div class="flex items-start gap-6">
                        @if($product->image_url)
                            <div class="relative w-32 h-32 rounded-2xl overflow-hidden shadow-sm border border-white flex-shrink-0">
                                <img src="{{ $product->image_url }}" alt="{{ $product->name }}" class="w-full h-full object-cover">
                            </div>
                        @endif
                        <div class="flex-1">
                            <input type="text" name="image_url" value="{{ $product->image_url }}" class="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-semibold text-[#052e16] focus:ring-2 focus:ring-[#fbbf24]/20 focus:border-[#fbbf24] outline-none transition-all shadow-inner">
                            <p class="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-3">Supports Unsplash or Cloudinary Direct Links</p>
                        </div>
                    </div>
                </div>

                <div class="space-y-2">
                    <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Story / Description</label>
                    <textarea name="description" rows="4" class="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-medium text-[#052e16] leading-relaxed focus:ring-2 focus:ring-[#fbbf24]/20 focus:border-[#fbbf24] outline-none transition-all resize-none shadow-inner">{{ $product->description }}</textarea>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                    <div class="space-y-2">
                        <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Ingredients</label>
                        <textarea name="ingredients" rows="5" class="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-[13px] font-medium text-[#052e16] leading-relaxed focus:ring-2 focus:ring-[#fbbf24]/20 focus:border-[#fbbf24] outline-none transition-all resize-none shadow-inner">{{ $product->ingredients }}</textarea>
                    </div>
                    <div class="space-y-2">
                        <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Nutritional Information</label>
                        <textarea name="nutritional_info" rows="5" class="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-[13px] font-medium text-[#052e16] leading-relaxed focus:ring-2 focus:ring-[#fbbf24]/20 focus:border-[#fbbf24] outline-none transition-all resize-none shadow-inner">{{ $product->nutritional_info }}</textarea>
                    </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t border-slate-100">
                    <div class="space-y-2">
                        <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Buy Now Button Text</label>
                        <input type="text" name="buy_now_text" value="{{ $product->buy_now_text }}" placeholder="e.g. Buy Now, Beli Sekarang" class="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-semibold text-[#052e16] focus:ring-2 focus:ring-[#fbbf24]/20 focus:border-[#fbbf24] outline-none transition-all shadow-inner">
                        <p class="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-2">Text shown on the Buy Now button</p>
                    </div>
                    <div class="space-y-2">
                        <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Buy Now Button Link</label>
                        <input type="text" name="buy_now_link" value="{{ $product->buy_now_link }}" placeholder="https://tokopedia.com/..." class="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-semibold text-[#052e16] focus:ring-2 focus:ring-[#fbbf24]/20 focus:border-[#fbbf24] outline-none transition-all shadow-inner">
                        <p class="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-2">URL when the button is clicked</p>
                    </div>
                </div>
            </div>
        </div>

        <div class="space-y-8">
            <div class="bg-white rounded-[2rem] border border-slate-200 shadow-sm p-8 space-y-8 sticky top-8">
                <h3 class="font-extrabold text-[#052e16] uppercase tracking-wider text-xs mb-4">Publishing Stats</h3>
                
                <div class="space-y-2">
                    <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Display Status</label>
                    <select name="status" class="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-[#052e16] focus:ring-2 focus:ring-[#fbbf24]/20 focus:border-[#fbbf24] outline-none transition-all appearance-none cursor-pointer">
                        <option value="published" {{ $product->status === 'published' ? 'selected' : '' }}>Published</option>
                        <option value="draft" {{ $product->status === 'draft' ? 'selected' : '' }}>Draft</option>
                    </select>
                </div>

                <div class="space-y-2">
                    <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Sort Priority</label>
                    <input type="number" name="sort_order" value="{{ $product->sort_order }}" class="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-[#052e16] focus:ring-2 focus:ring-[#fbbf24]/20 focus:border-[#fbbf24] outline-none transition-all shadow-inner">
                </div>

                <div class="space-y-4 pt-4 border-t border-slate-100">
                    <label class="flex items-center gap-3 cursor-pointer group">
                        <div class="relative">
                            <input type="checkbox" name="is_new" value="1" {{ $product->is_new ? 'checked' : '' }} class="sr-only peer">
                            <div class="w-10 h-6 bg-slate-200 peer-checked:bg-[#d97706] rounded-full transition-all"></div>
                            <div class="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-all peer-checked:translate-x-4"></div>
                        </div>
                        <span class="text-[10px] font-black text-slate-400 group-hover:text-[#052e16] uppercase tracking-widest transition-colors">New Launch</span>
                    </label>
                    
                    <label class="flex items-center gap-3 cursor-pointer group">
                        <div class="relative">
                            <input type="checkbox" name="is_featured" value="1" {{ $product->is_featured ? 'checked' : '' }} class="sr-only peer">
                            <div class="w-10 h-6 bg-slate-200 peer-checked:bg-[#4a7c59] rounded-full transition-all"></div>
                            <div class="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-all peer-checked:translate-x-4"></div>
                        </div>
                        <span class="text-[10px] font-black text-slate-400 group-hover:text-[#052e16] uppercase tracking-widest transition-colors">Featured Item</span>
                    </label>
                </div>

                <div class="pt-6 border-t border-slate-100 space-y-3">
                    <button type="submit" class="w-full bg-[#052e16] text-white px-6 py-4 rounded-2xl font-bold uppercase tracking-[0.2em] text-[11px] hover:bg-[#d97706] hover:shadow-lg hover:shadow-[#d97706]/20 transition-all active:scale-95 flex items-center justify-center gap-2">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"/></svg>
                        Update Product
                    </button>
                    <a href="{{ route('cms.products.index') }}" class="w-full flex items-center justify-center px-6 py-4 border border-slate-200 rounded-2xl font-bold uppercase tracking-[0.2em] text-[11px] text-slate-400 hover:bg-slate-50 transition-all">
                        Cancel Edit
                    </a>
                </div>
            </div>
        </div>
    </div>
</form>
@endsection
