@extends('cms.layout')

@section('title', 'Dashboard - Ladang Lima CMS')

@section('content')
<div class="mb-12">
    <h1 class="text-4xl font-extrabold text-[#052e16] tracking-tight">Dashboard</h1>
    <p class="text-slate-500 text-sm mt-2 font-medium">Welcome back, <span class="text-[#d97706]">{{ auth()->user()->name }}</span>. Here's what's happening today.</p>
</div>

<!-- Stats Grid -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
    <div class="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm hover:shadow-xl transition-all group overflow-hidden relative">
        <div class="absolute top-0 right-0 w-24 h-24 bg-[#052e16]/5 rounded-full -mr-8 -mt-8 group-hover:scale-150 transition-transform"></div>
        <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest relative z-10">Total Sections</p>
        <div class="flex items-end justify-between mt-4 relative z-10">
            <p class="text-4xl font-black text-[#052e16]">{{ $stats['sections'] }}</p>
            <div class="w-10 h-10 rounded-xl bg-[#052e16]/5 flex items-center justify-center">
                <svg class="w-5 h-5 text-[#052e16]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7"/></svg>
            </div>
        </div>
    </div>
    
    <div class="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm hover:shadow-xl transition-all group overflow-hidden relative">
        <div class="absolute top-0 right-0 w-24 h-24 bg-[#d97706]/5 rounded-full -mr-8 -mt-8 group-hover:scale-150 transition-transform"></div>
        <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest relative z-10">Total Products</p>
        <div class="flex items-end justify-between mt-4 relative z-10">
            <div>
                <p class="text-4xl font-black text-[#052e16]">{{ $stats['products'] }}</p>
                <p class="text-[10px] font-bold text-green-600 mt-1 uppercase tracking-wider">{{ $stats['published_products'] }} Published</p>
            </div>
            <div class="w-10 h-10 rounded-xl bg-[#d97706]/5 flex items-center justify-center">
                <svg class="w-5 h-5 text-[#d97706]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg>
            </div>
        </div>
    </div>

    <div class="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm hover:shadow-xl transition-all group overflow-hidden relative">
        <div class="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-full -mr-8 -mt-8 group-hover:scale-150 transition-transform"></div>
        <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest relative z-10">Total Recipes</p>
        <div class="flex items-end justify-between mt-4 relative z-10">
            <div>
                <p class="text-4xl font-black text-[#052e16]">{{ $stats['recipes'] }}</p>
                <p class="text-[10px] font-bold text-green-600 mt-1 uppercase tracking-wider">{{ $stats['published_recipes'] }} Published</p>
            </div>
            <div class="w-10 h-10 rounded-xl bg-blue-500/5 flex items-center justify-center">
                <svg class="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>
            </div>
        </div>
    </div>

    <div class="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm hover:shadow-xl transition-all group overflow-hidden relative">
        <div class="absolute top-0 right-0 w-24 h-24 bg-purple-500/5 rounded-full -mr-8 -mt-8 group-hover:scale-150 transition-transform"></div>
        <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest relative z-10">Media Files</p>
        <div class="flex items-end justify-between mt-4 relative z-10">
            <p class="text-4xl font-black text-[#052e16]">{{ $stats['media'] }}</p>
            <div class="w-10 h-10 rounded-xl bg-purple-500/5 flex items-center justify-center">
                <svg class="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
            </div>
        </div>
    </div>
</div>

<div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
    <!-- Recent Products -->
    <div class="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <div class="flex items-center justify-between p-6 bg-slate-50/50 border-b border-slate-100">
            <div class="flex items-center gap-3">
                <div class="w-2 h-6 bg-[#d97706] rounded-full"></div>
                <h2 class="font-extrabold text-[#052e16] uppercase tracking-wider text-sm">Recent Products</h2>
            </div>
            <a href="{{ route('cms.products.index') }}" class="text-[10px] font-bold text-[#d97706] uppercase tracking-widest hover:underline">View All</a>
        </div>
        <div class="divide-y divide-slate-50">
            @forelse($recent_products as $product)
                <div class="flex items-center gap-4 p-5 hover:bg-slate-50 transition-colors group">
                    <div class="relative w-14 h-14 rounded-2xl overflow-hidden shadow-sm group-hover:shadow-md transition-all">
                        <img src="{{ $product->image_url }}" alt="{{ $product->name }}" class="w-full h-full object-cover">
                    </div>
                    <div class="flex-1 min-w-0">
                        <p class="text-sm font-bold text-[#052e16] truncate">{{ $product->name }}</p>
                        <p class="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{{ $product->category }}</p>
                    </div>
                    <span class="text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full {{ $product->status === 'published' ? 'bg-green-50 text-green-600 border border-green-100' : 'bg-slate-50 text-slate-400' }}">
                        {{ $product->status }}
                    </span>
                </div>
            @empty
                <div class="p-12 text-center">
                    <p class="text-sm text-slate-300 italic">No products available yet</p>
                </div>
            @endforelse
        </div>
    </div>

    <!-- Recent Recipes -->
    <div class="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <div class="flex items-center justify-between p-6 bg-slate-50/50 border-b border-slate-100">
            <div class="flex items-center gap-3">
                <div class="w-2 h-6 bg-blue-500 rounded-full"></div>
                <h2 class="font-extrabold text-[#052e16] uppercase tracking-wider text-sm">Recent Recipes</h2>
            </div>
            <a href="{{ route('cms.recipes.index') }}" class="text-[10px] font-bold text-blue-500 uppercase tracking-widest hover:underline">View All</a>
        </div>
        <div class="divide-y divide-slate-50">
            @forelse($recent_recipes as $recipe)
                <div class="flex items-center gap-4 p-5 hover:bg-slate-50 transition-colors group">
                    <div class="relative w-14 h-14 rounded-2xl overflow-hidden shadow-sm group-hover:shadow-md transition-all">
                        <img src="{{ $recipe->image_url }}" alt="{{ $recipe->title }}" class="w-full h-full object-cover">
                    </div>
                    <div class="flex-1 min-w-0">
                        <p class="text-sm font-bold text-[#052e16] truncate">{{ $recipe->title }}</p>
                        <p class="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{{ $recipe->prep_time }} • {{ $recipe->difficulty }}</p>
                    </div>
                    <span class="text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full {{ $recipe->status === 'published' ? 'bg-green-50 text-green-600 border border-green-100' : 'bg-slate-50 text-slate-400' }}">
                        {{ $recipe->status }}
                    </span>
                </div>
            @empty
                <div class="p-12 text-center">
                    <p class="text-sm text-slate-300 italic">No recipes available yet</p>
                </div>
            @endforelse
        </div>
    </div>
</div>

<!-- Quick Links -->
<div class="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
    <a href="{{ route('cms.sections.index') }}" class="bg-[#052e16] rounded-3xl p-6 shadow-lg shadow-[#052e16]/20 hover:scale-105 transition-all group overflow-hidden relative">
        <div class="absolute -right-4 -bottom-4 w-20 h-20 bg-white/5 rounded-full group-hover:scale-150 transition-transform"></div>
        <div class="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center mb-4">
            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7"/></svg>
        </div>
        <p class="text-sm font-bold text-white uppercase tracking-wider">Edit Content</p>
        <p class="text-[10px] text-white/40 mt-1 font-medium">Banners & Story</p>
    </a>
    
    <a href="{{ route('cms.products.create') }}" class="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm hover:shadow-xl hover:border-[#d97706]/20 transition-all group overflow-hidden relative">
        <div class="absolute -right-4 -bottom-4 w-20 h-20 bg-[#d97706]/5 rounded-full group-hover:scale-150 transition-transform"></div>
        <div class="w-10 h-10 rounded-xl bg-[#d97706]/5 flex items-center justify-center mb-4">
            <svg class="w-5 h-5 text-[#d97706]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
        </div>
        <p class="text-sm font-bold text-[#052e16] uppercase tracking-wider">New Product</p>
        <p class="text-[10px] text-slate-400 mt-1 font-medium">Add to inventory</p>
    </a>

    <a href="{{ route('cms.recipes.create') }}" class="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm hover:shadow-xl hover:border-blue-500/20 transition-all group overflow-hidden relative">
        <div class="absolute -right-4 -bottom-4 w-20 h-20 bg-blue-500/5 rounded-full group-hover:scale-150 transition-transform"></div>
        <div class="w-10 h-10 rounded-xl bg-blue-500/5 flex items-center justify-center mb-4">
            <svg class="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
        </div>
        <p class="text-sm font-bold text-[#052e16] uppercase tracking-wider">New Recipe</p>
        <p class="text-[10px] text-slate-400 mt-1 font-medium">Share a dish</p>
    </a>

    <a href="{{ route('cms.media.index') }}" class="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm hover:shadow-xl hover:border-purple-500/20 transition-all group overflow-hidden relative">
        <div class="absolute -right-4 -bottom-4 w-20 h-20 bg-purple-500/5 rounded-full group-hover:scale-150 transition-transform"></div>
        <div class="w-10 h-10 rounded-xl bg-purple-500/5 flex items-center justify-center mb-4">
            <svg class="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
        </div>
        <p class="text-sm font-bold text-[#052e16] uppercase tracking-wider">Library</p>
        <p class="text-[10px] text-slate-400 mt-1 font-medium">Manage assets</p>
    </a>
</div>
@endsection
