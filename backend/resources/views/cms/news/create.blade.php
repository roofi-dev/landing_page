@extends('cms.layout')

@section('title', 'Add Article - Ladang Lima CMS')

@section('content')
<div class="mb-10">
    <a href="{{ route('cms.news.index') }}" class="group inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-[#d97706] transition-colors mb-4">
        <svg class="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
        Back to News
    </a>
    <h1 class="text-4xl font-extrabold text-[#052e16] tracking-tight">Add Article</h1>
    <p class="text-slate-500 text-sm mt-2 font-medium">Share a new story, tip, or update with your audience</p>
</div>

<form action="{{ route('cms.news.store') }}" method="POST">
    @csrf
    
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div class="lg:col-span-2 space-y-8">
            <div class="bg-white rounded-[2rem] border border-slate-200 shadow-sm p-8 space-y-8">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div class="space-y-2">
                        <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Article Title *</label>
                        <input type="text" name="title" required class="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-semibold text-[#052e16] focus:ring-2 focus:ring-[#fbbf24]/20 focus:border-[#fbbf24] outline-none transition-all shadow-inner">
                    </div>
                    <div class="space-y-2">
                        <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Category</label>
                        <input type="text" name="category" class="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-semibold text-[#052e16] focus:ring-2 focus:ring-[#fbbf24]/20 focus:border-[#fbbf24] outline-none transition-all shadow-inner" placeholder="e.g. Health Tips">
                    </div>
                </div>

                <div class="space-y-4">
                    <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Cover Image (URL)</label>
                    <div class="flex items-start gap-6">
                        <div class="flex-1">
                            <input type="text" name="image_url" placeholder="https://..." class="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-semibold text-[#052e16] focus:ring-2 focus:ring-[#fbbf24]/20 focus:border-[#fbbf24] outline-none transition-all shadow-inner">
                            <p class="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-3">Upload your asset to the <a href="{{ route('cms.media.index') }}" class="text-[#d97706] hover:underline" target="_blank">Media Library</a> first</p>
                        </div>
                    </div>
                </div>

                <div class="space-y-2">
                    <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Excerpt / Summary</label>
                    <textarea name="excerpt" rows="3" class="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-medium text-[#052e16] leading-relaxed focus:ring-2 focus:ring-[#fbbf24]/20 focus:border-[#fbbf24] outline-none transition-all resize-none shadow-inner" placeholder="A short summary that appears in the article list..."></textarea>
                </div>

                <div class="space-y-2">
                    <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Article Content</label>
                    <textarea name="content" rows="12" class="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-[13px] font-medium text-[#052e16] leading-relaxed focus:ring-2 focus:ring-[#fbbf24]/20 focus:border-[#fbbf24] outline-none transition-all resize-none shadow-inner" placeholder="Write your article here. Use double line breaks to separate paragraphs..."></textarea>
                    <p class="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Separate paragraphs with a blank line (press Enter twice)</p>
                </div>
            </div>
        </div>

        <div class="space-y-8">
            <div class="bg-white rounded-[2rem] border border-slate-200 shadow-sm p-8 space-y-8 sticky top-8">
                <h3 class="font-extrabold text-[#052e16] uppercase tracking-wider text-xs mb-4">Publishing</h3>
                
                <div class="space-y-2">
                    <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Display Status</label>
                    <select name="status" class="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-[#052e16] focus:ring-2 focus:ring-[#fbbf24]/20 focus:border-[#fbbf24] outline-none transition-all appearance-none cursor-pointer">
                        <option value="published">Published</option>
                        <option value="draft">Draft</option>
                    </select>
                </div>

                <div class="space-y-2">
                    <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Publish Date</label>
                    <input type="date" name="published_date" value="{{ date('Y-m-d') }}" class="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-[#052e16] focus:ring-2 focus:ring-[#fbbf24]/20 focus:border-[#fbbf24] outline-none transition-all shadow-inner">
                </div>

                <div class="space-y-2">
                    <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Sort Priority</label>
                    <input type="number" name="sort_order" value="0" class="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-[#052e16] focus:ring-2 focus:ring-[#fbbf24]/20 focus:border-[#fbbf24] outline-none transition-all shadow-inner">
                </div>

                <div class="space-y-4 pt-4 border-t border-slate-100">
                    <label class="flex items-center gap-3 cursor-pointer group">
                        <div class="relative">
                            <input type="checkbox" name="is_featured" value="1" class="sr-only peer">
                            <div class="w-10 h-6 bg-slate-200 peer-checked:bg-[#d97706] rounded-full transition-all"></div>
                            <div class="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-all peer-checked:translate-x-4"></div>
                        </div>
                        <span class="text-[10px] font-black text-slate-400 group-hover:text-[#052e16] uppercase tracking-widest transition-colors">Featured Article</span>
                    </label>
                </div>

                <div class="pt-6 border-t border-slate-100 space-y-3">
                    <button type="submit" class="w-full bg-[#052e16] text-white px-6 py-4 rounded-2xl font-bold uppercase tracking-[0.2em] text-[11px] hover:bg-[#d97706] hover:shadow-lg hover:shadow-[#d97706]/20 transition-all active:scale-95 flex items-center justify-center gap-2">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
                        Create Article
                    </button>
                    <a href="{{ route('cms.news.index') }}" class="w-full flex items-center justify-center px-6 py-4 border border-slate-200 rounded-2xl font-bold uppercase tracking-[0.2em] text-[11px] text-slate-400 hover:bg-slate-50 transition-all">
                        Discard
                    </a>
                </div>
            </div>
        </div>
    </div>
</form>
@endsection
