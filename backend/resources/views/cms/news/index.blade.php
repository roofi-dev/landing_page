@extends('cms.layout')

@section('title', 'News & Articles - Ladang Lima CMS')

@section('content')
<div class="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
    <div>
        <h1 class="text-4xl font-extrabold text-[#052e16] tracking-tight">News & Articles</h1>
        <p class="text-slate-500 text-sm mt-2 font-medium">Publish and manage stories, tips, and updates</p>
    </div>
    <a href="{{ route('cms.news.create') }}" class="bg-[#052e16] text-white px-8 py-4 rounded-2xl font-bold uppercase tracking-[0.2em] text-[11px] hover:bg-[#d97706] hover:shadow-lg hover:shadow-[#d97706]/20 transition-all active:scale-95 flex items-center gap-3">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
        New Article
    </a>
</div>

<div class="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
    <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
            <thead>
                <tr class="bg-slate-50/50 border-b border-slate-100">
                    <th class="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Article</th>
                    <th class="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Category</th>
                    <th class="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Date</th>
                    <th class="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                    <th class="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
                </tr>
            </thead>
            <tbody class="divide-y divide-slate-50">
                @forelse($articles as $article)
                    <tr class="group hover:bg-slate-50/50 transition-all">
                        <td class="px-8 py-6">
                            <div class="flex items-center gap-5">
                                <div class="relative w-16 h-16 rounded-2xl overflow-hidden shadow-sm border border-white flex-shrink-0 group-hover:scale-105 transition-transform duration-500">
                                    <img src="{{ $article->image_url }}" alt="{{ $article->title }}" class="w-full h-full object-cover">
                                    <div class="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                </div>
                                <div>
                                    <p class="text-sm font-extrabold text-[#052e16] tracking-tight group-hover:text-[#d97706] transition-colors">{{ $article->title }}</p>
                                    <div class="flex items-center gap-2 mt-1">
                                        @if($article->is_featured)
                                            <span class="px-2 py-0.5 bg-[#fbbf24]/10 text-[#d97706] text-[9px] font-black uppercase tracking-widest border border-[#fbbf24]/20 rounded-md">Featured</span>
                                        @endif
                                        <span class="text-[10px] text-slate-400 font-mono">#{{ $article->slug }}</span>
                                    </div>
                                </div>
                            </div>
                        </td>
                        <td class="px-8 py-6">
                            <span class="text-[10px] font-bold text-slate-500 uppercase tracking-[0.15em] bg-slate-100 px-3 py-1 rounded-lg">{{ $article->category }}</span>
                        </td>
                        <td class="px-8 py-6">
                            <span class="text-xs font-bold text-slate-500">{{ $article->published_date?->format('M d, Y') }}</span>
                        </td>
                        <td class="px-8 py-6">
                            <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest {{ $article->status === 'published' ? 'bg-green-50 text-green-600 border border-green-100' : 'bg-slate-100 text-slate-400 border border-slate-200' }}">
                                <span class="w-1.5 h-1.5 rounded-full {{ $article->status === 'published' ? 'bg-green-500' : 'bg-slate-300' }}"></span>
                                {{ $article->status }}
                            </span>
                        </td>
                        <td class="px-8 py-6 text-right">
                            <div class="flex items-center justify-end gap-3">
                                <a href="{{ route('cms.news.edit', $article->id) }}" class="p-2.5 bg-white border border-slate-200 rounded-xl text-[#052e16] hover:text-[#d97706] hover:border-[#fbbf24] hover:shadow-md transition-all">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
                                </a>
                                <form action="{{ route('cms.news.destroy', $article->id) }}" method="POST" class="inline" onsubmit="return confirm('Delete this article?')">
                                    @csrf
                                    @method('DELETE')
                                    <button type="submit" class="p-2.5 bg-white border border-slate-200 rounded-xl text-red-400 hover:text-red-600 hover:border-red-200 hover:shadow-md transition-all">
                                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                                    </button>
                                </form>
                            </div>
                        </td>
                    </tr>
                @empty
                    <tr>
                        <td colspan="5" class="px-8 py-32 text-center">
                            <div class="max-w-xs mx-auto">
                                <div class="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 border border-dashed border-slate-200">
                                    <svg class="w-10 h-10 text-slate-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"/></svg>
                                </div>
                                <h3 class="text-xl font-black text-[#052e16] mb-2 uppercase tracking-tight">No Articles</h3>
                                <p class="text-slate-400 text-sm font-medium leading-relaxed mb-8">You haven't published any articles yet.</p>
                                <a href="{{ route('cms.news.create') }}" class="inline-flex items-center gap-2 text-[10px] font-black text-[#d97706] uppercase tracking-[0.2em] hover:gap-3 transition-all">
                                    Write Your First Article
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
                                </a>
                            </div>
                        </td>
                    </tr>
                @endforelse
            </tbody>
        </table>
    </div>
</div>
@endsection
