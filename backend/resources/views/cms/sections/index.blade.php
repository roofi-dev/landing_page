@extends('cms.layout')

@section('title', 'Page Sections - Ladang Lima CMS')

@section('content')
<div class="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
    <div>
        <h1 class="text-4xl font-extrabold text-[#052e16] tracking-tight">Page Sections</h1>
        <p class="text-slate-500 text-sm mt-2">Design and manage the narrative flow of your website</p>
    </div>
    <div class="bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-sm flex items-center gap-2">
        <span class="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
        <span class="text-[10px] font-bold uppercase tracking-widest text-slate-400">System Live</span>
    </div>
</div>

{{-- Page Tabs --}}
<div class="flex flex-wrap gap-1 mb-10 bg-white p-1.5 rounded-2xl border border-slate-200 shadow-sm w-fit">
    @foreach($pages as $key => $label)
        <a href="{{ route('cms.sections.index', ['page' => $key]) }}"
           class="px-6 py-2.5 text-xs font-bold uppercase tracking-widest transition-all rounded-xl {{ $currentPage === $key ? 'bg-[#052e16] text-white shadow-lg' : 'text-slate-400 hover:text-[#052e16] hover:bg-slate-50' }}">
            {{ $label }}
            <span class="ml-2 text-[10px] opacity-60">
                ({{ $key === 'home' ? $sections->count() : \App\Models\PageSection::where('page', $key)->count() }})
            </span>
        </a>
    @endforeach
</div>

<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    @foreach($sections as $section)
        <a href="{{ route('cms.sections.edit', $section->id) }}"
           class="bg-white rounded-2xl p-6 border border-slate-200 hover:border-[#fbbf24] hover:shadow-xl transition-all group flex flex-col h-full relative overflow-hidden">
            <div class="absolute top-0 left-0 w-1 h-full bg-[#fbbf24] opacity-0 group-hover:opacity-100 transition-all"></div>
            
            <div class="flex items-start justify-between mb-6">
                <div class="w-12 h-12 rounded-2xl bg-[#052e16]/5 flex items-center justify-center group-hover:bg-[#fbbf24]/10 transition-colors">
                    <svg class="w-6 h-6 text-[#052e16] group-hover:text-[#d97706] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
                </div>
                <span class="text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full {{ $section->status === 'published' ? 'bg-green-50 text-green-600 border border-green-100' : 'bg-slate-50 text-slate-400 border border-slate-100' }}">
                    {{ $section->status }}
                </span>
            </div>
            
            <div class="flex-1">
                <h3 class="font-extrabold text-[#052e16] text-base group-hover:text-[#d97706] transition-colors mb-1 uppercase tracking-tight">{{ $section->title }}</h3>
                <p class="text-[10px] text-slate-400 font-mono tracking-wider">{{ $section->section_key }}</p>
            </div>
            
            <div class="mt-8 flex items-center justify-between border-t border-slate-50 pt-4">
                <span class="text-[10px] font-bold text-[#4a7c59] uppercase tracking-[0.2em]">Edit Section</span>
                <svg class="w-4 h-4 text-[#fbbf24] transform translate-x-0 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
            </div>
        </a>
    @endforeach
</div>

@if($sections->isEmpty())
<div class="bg-white rounded-3xl p-20 text-center border border-slate-100 shadow-sm">
    <div class="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
        <svg class="w-10 h-10 text-slate-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
    </div>
    <h3 class="text-xl font-bold text-[#052e16] mb-2">No sections found</h3>
    <p class="text-slate-400 text-sm">Select another page or add new content to get started.</p>
</div>
@endif
@endsection
