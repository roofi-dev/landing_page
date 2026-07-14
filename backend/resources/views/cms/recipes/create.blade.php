@extends('cms.layout')

@section('title', 'Add Recipe - Ladang Lima CMS')

@section('content')
<div class="mb-10">
    <a href="{{ route('cms.recipes.index') }}" class="group inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-[#d97706] transition-colors mb-4">
        <svg class="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
        Back to Recipes
    </a>
    <h1 class="text-4xl font-extrabold text-[#052e16] tracking-tight">Add Recipe</h1>
    <p class="text-slate-500 text-sm mt-2 font-medium">Share a new culinary masterpiece with the Ladang Lima community</p>
</div>

<form action="{{ route('cms.recipes.store') }}" method="POST">
    @csrf
    
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div class="lg:col-span-2 space-y-8">
            <div class="bg-white rounded-[2rem] border border-slate-200 shadow-sm p-8 space-y-8">
                <div class="space-y-2">
                    <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Recipe Title *</label>
                    <input type="text" name="title" required class="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-semibold text-[#052e16] focus:ring-2 focus:ring-[#fbbf24]/20 focus:border-[#fbbf24] outline-none transition-all shadow-inner">
                </div>

                <div class="space-y-2">
                    <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Hero Image (URL)</label>
                    <input type="text" name="image_url" placeholder="https://..." class="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-semibold text-[#052e16] focus:ring-2 focus:ring-[#fbbf24]/20 focus:border-[#fbbf24] outline-none transition-all shadow-inner">
                    <p class="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-2">Upload your asset to the <a href="{{ route('cms.media.index') }}" class="text-[#d97706] hover:underline" target="_blank">Media Library</a> first</p>
                </div>

                <div class="space-y-2">
                    <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Aromatic Intro / Description</label>
                    <textarea name="description" rows="3" class="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-medium text-[#052e16] leading-relaxed focus:ring-2 focus:ring-[#fbbf24]/20 focus:border-[#fbbf24] outline-none transition-all resize-none shadow-inner"></textarea>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
                    <div class="space-y-2">
                        <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Prep Time</label>
                        <input type="text" name="prep_time" placeholder="e.g. 30 Mins" class="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-semibold text-[#052e16] focus:ring-2 focus:ring-[#fbbf24]/20 focus:border-[#fbbf24] outline-none transition-all shadow-inner">
                    </div>
                    <div class="space-y-2">
                        <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Difficulty</label>
                        <select name="difficulty" class="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-semibold text-[#052e16] focus:ring-2 focus:ring-[#fbbf24]/20 focus:border-[#fbbf24] outline-none transition-all appearance-none cursor-pointer shadow-inner">
                            <option value="">Select Level</option>
                            <option value="BEGINNER">Beginner</option>
                            <option value="INTERMEDIATE">Intermediate</option>
                            <option value="ADVANCED">Advanced</option>
                        </select>
                    </div>
                    <div class="space-y-2">
                        <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Serving Size</label>
                        <input type="text" name="serving_size" placeholder="e.g. 4 Persons" class="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-semibold text-[#052e16] focus:ring-2 focus:ring-[#fbbf24]/20 focus:border-[#fbbf24] outline-none transition-all shadow-inner">
                    </div>
                </div>

                <div class="grid grid-cols-1 gap-8 pt-4">
                    <div class="space-y-2">
                        <label class="block text-[11px] font-black text-[#052e16] uppercase tracking-[0.2em]">Ingredients List</label>
                        <p class="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-2">Use new line for each ingredient</p>
                        <textarea name="ingredients_list" rows="8" class="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-[2rem] text-[13px] font-medium text-[#052e16] leading-relaxed focus:ring-2 focus:ring-[#fbbf24]/20 focus:border-[#fbbf24] outline-none transition-all shadow-inner"></textarea>
                    </div>
                    <div class="space-y-2">
                        <label class="block text-[11px] font-black text-[#052e16] uppercase tracking-[0.2em]">Step-by-Step Instructions</label>
                        <p class="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-2">Use new line for each step</p>
                        <textarea name="instructions" rows="8" class="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-[2rem] text-[13px] font-medium text-[#052e16] leading-relaxed focus:ring-2 focus:ring-[#fbbf24]/20 focus:border-[#fbbf24] outline-none transition-all shadow-inner"></textarea>
                    </div>
                </div>
            </div>
        </div>

        <div class="space-y-8">
            <div class="bg-white rounded-[2rem] border border-slate-200 shadow-sm p-8 space-y-8 sticky top-8">
                <h3 class="font-extrabold text-[#052e16] uppercase tracking-wider text-xs mb-4">Kitchen Management</h3>
                
                <div class="space-y-2">
                    <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Recipe Status</label>
                    <select name="status" class="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-[#052e16] focus:ring-2 focus:ring-[#fbbf24]/20 focus:border-[#fbbf24] outline-none transition-all appearance-none cursor-pointer">
                        <option value="published">Published (On Menu)</option>
                        <option value="draft">Draft (Testing)</option>
                    </select>
                </div>

                <div class="space-y-2">
                    <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Menu Order</label>
                    <input type="number" name="sort_order" value="0" class="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-[#052e16] focus:ring-2 focus:ring-[#fbbf24]/20 focus:border-[#fbbf24] outline-none transition-all shadow-inner">
                </div>

                <div class="pt-6 border-t border-slate-100 space-y-3">
                    <button type="submit" class="w-full bg-[#052e16] text-white px-6 py-4 rounded-2xl font-bold uppercase tracking-[0.2em] text-[11px] hover:bg-[#d97706] hover:shadow-lg hover:shadow-[#d97706]/20 transition-all active:scale-95 flex items-center justify-center gap-2">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
                        Create Recipe
                    </button>
                    <a href="{{ route('cms.recipes.index') }}" class="w-full flex items-center justify-center px-6 py-4 border border-slate-200 rounded-2xl font-bold uppercase tracking-[0.2em] text-[11px] text-slate-400 hover:bg-slate-50 transition-all">
                        Discard
                    </a>
                </div>
            </div>
        </div>
    </div>
</form>
@endsection
