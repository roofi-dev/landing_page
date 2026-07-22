@extends('cms.layout')

@section('title', 'Dashboard - Ladang Lima CMS')

@section('content')
<div class="mb-16">
    <div class="flex items-center gap-3 mb-4">
        <div class="h-px w-10 bg-[#fbbf24]"></div>
        <span class="text-[10px] font-bold tracking-[0.4em] text-[#fbbf24] uppercase">Management Suite</span>
    </div>
    <h1 class="text-6xl font-serif text-[#1b3b2f] leading-none tracking-tight">Executive <span class="italic text-[#6b9b7e]">Overview</span></h1>
    <p class="text-slate-400 text-sm mt-6 font-medium max-w-xl leading-relaxed">Welcome back, <span class="text-[#1b3b2f] font-bold">{{ auth()->user()->name }}</span>. Here is a curated summary of your digital ecosystem performance today.</p>
</div>

<!-- Stats Grid — Editorial Style -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-16">
    @php
        $stats_config = [
            ['label' => 'Total Sections', 'value' => $stats['sections'], 'color' => '#1b3b2f', 'icon' => 'M4 6h16M4 12h16M4 18h7'],
            ['label' => 'Total Products', 'value' => $stats['products'], 'sub' => $stats['published_products'] . ' Published', 'color' => '#fbbf24', 'icon' => 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4'],
            ['label' => 'Kitchen Lab', 'value' => $stats['recipes'], 'sub' => $stats['published_recipes'] . ' Published', 'color' => '#3b82f6', 'icon' => 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253'],
            ['label' => 'Asset Vault', 'value' => $stats['media'], 'color' => '#8b5cf6', 'icon' => 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z'],
            ['label' => 'Articles', 'value' => $stats['news'], 'sub' => $stats['published_news'] . ' Published', 'color' => '#10b981', 'icon' => 'M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z'],
        ];
    @endphp

    @foreach($stats_config as $s)
    <div class="group relative pt-8">
        <div class="absolute top-0 left-0 w-8 h-px bg-slate-200 group-hover:w-full group-hover:bg-[#fbbf24] transition-all duration-700"></div>
        <p class="text-[9px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-4">{{ $s['label'] }}</p>
        <div class="flex items-end justify-between">
            <div>
                <p class="text-5xl font-serif text-[#1b3b2f] leading-none">{{ $s['value'] }}</p>
                @if(isset($s['sub']))
                <p class="text-[9px] font-bold text-[#6b9b7e] mt-3 uppercase tracking-wider">{{ $s['sub'] }}</p>
                @endif
            </div>
            <div class="w-12 h-12 rounded-full border border-slate-100 flex items-center justify-center group-hover:border-[#fbbf24]/30 group-hover:bg-[#fbbf24]/5 transition-all duration-500">
                <svg class="w-5 h-5 text-slate-300 group-hover:text-[#fbbf24] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="{{ $s['icon'] }}"/></svg>
            </div>
        </div>
    </div>
    @endforeach
</div>

<div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
    <!-- Recent Products -->
    <div class="space-y-8">
        <div class="flex items-center justify-between pb-4 border-b border-slate-100">
            <h2 class="font-serif text-2xl text-[#1b3b2f]">Recent <span class="italic text-[#6b9b7e]">Products</span></h2>
            <a href="{{ route('cms.products.index') }}" class="text-[9px] font-bold text-slate-400 uppercase tracking-widest hover:text-[#fbbf24] transition-colors">View All</a>
        </div>
        <div class="space-y-6">
            @forelse($recent_products as $product)
                <div class="flex items-center gap-5 group">
                    <div class="relative w-16 h-16 shrink-0">
                        <div class="absolute inset-0 border border-slate-100 rounded-2xl translate-x-1 translate-y-1 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-500"></div>
                        <div class="relative w-full h-full rounded-2xl overflow-hidden bg-slate-50 border border-slate-100">
                            <img src="{{ $product->image_url }}" alt="{{ $product->name }}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700">
                        </div>
                    </div>
                    <div class="flex-1 min-w-0">
                        <p class="text-sm font-bold text-[#1b3b2f] truncate group-hover:text-[#6b9b7e] transition-colors">{{ $product->name }}</p>
                        <p class="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-1">{{ $product->category }}</p>
                    </div>
                    <div class="w-2 h-2 rounded-full {{ $product->status === 'published' ? 'bg-[#6b9b7e]' : 'bg-slate-200' }}"></div>
                </div>
            @empty
                <p class="text-sm text-slate-300 italic py-8">No products available</p>
            @endforelse
        </div>
    </div>

    <!-- Recent Recipes -->
    <div class="space-y-8">
        <div class="flex items-center justify-between pb-4 border-b border-slate-100">
            <h2 class="font-serif text-2xl text-[#1b3b2f]">Kitchen <span class="italic text-[#6b9b7e]">Lab</span></h2>
            <a href="{{ route('cms.recipes.index') }}" class="text-[9px] font-bold text-slate-400 uppercase tracking-widest hover:text-[#fbbf24] transition-colors">View All</a>
        </div>
        <div class="space-y-6">
            @forelse($recent_recipes as $recipe)
                <div class="flex items-center gap-5 group">
                    <div class="relative w-16 h-16 shrink-0">
                        <div class="absolute inset-0 border border-slate-100 rounded-2xl translate-x-1 translate-y-1 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-500"></div>
                        <div class="relative w-full h-full rounded-2xl overflow-hidden bg-slate-50 border border-slate-100">
                            <img src="{{ $recipe->image_url }}" alt="{{ $recipe->title }}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700">
                        </div>
                    </div>
                    <div class="flex-1 min-w-0">
                        <p class="text-sm font-bold text-[#1b3b2f] truncate group-hover:text-[#6b9b7e] transition-colors">{{ $recipe->title }}</p>
                        <p class="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-1">{{ $recipe->prep_time }} • {{ $recipe->difficulty }}</p>
                    </div>
                    <div class="w-2 h-2 rounded-full {{ $recipe->status === 'published' ? 'bg-[#6b9b7e]' : 'bg-slate-200' }}"></div>
                </div>
            @empty
                <p class="text-sm text-slate-300 italic py-8">No recipes available</p>
            @endforelse
        </div>
    </div>

    <!-- Recent News -->
    <div class="space-y-8">
        <div class="flex items-center justify-between pb-4 border-b border-slate-100">
            <h2 class="font-serif text-2xl text-[#1b3b2f]">Recent <span class="italic text-[#6b9b7e]">Articles</span></h2>
            <a href="{{ route('cms.news.index') }}" class="text-[9px] font-bold text-slate-400 uppercase tracking-widest hover:text-[#fbbf24] transition-colors">View All</a>
        </div>
        <div class="space-y-6">
            @forelse($recent_news as $article)
                <div class="flex items-center gap-5 group">
                    <div class="relative w-16 h-16 shrink-0">
                        <div class="absolute inset-0 border border-slate-100 rounded-2xl translate-x-1 translate-y-1 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-500"></div>
                        <div class="relative w-full h-full rounded-2xl overflow-hidden bg-slate-50 border border-slate-100">
                            <img src="{{ $article->image_url }}" alt="{{ $article->title }}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700">
                        </div>
                    </div>
                    <div class="flex-1 min-w-0">
                        <p class="text-sm font-bold text-[#1b3b2f] truncate group-hover:text-[#6b9b7e] transition-colors">{{ $article->title }}</p>
                        <p class="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-1">{{ $article->category }}</p>
                    </div>
                    <div class="w-2 h-2 rounded-full {{ $article->status === 'published' ? 'bg-[#6b9b7e]' : 'bg-slate-200' }}"></div>
                </div>
            @empty
                <p class="text-sm text-slate-300 italic py-8">No articles available</p>
            @endforelse
        </div>
    </div>
</div>

<!-- Quick Actions — Editorial Grid -->
<div class="mt-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-px bg-slate-100 border border-slate-100 rounded-3xl overflow-hidden">
    @php
        $actions = [
            ['label' => 'Edit Content', 'desc' => 'Banners & Story', 'route' => 'cms.sections.index', 'bg' => '#1b3b2f', 'text' => 'white'],
            ['label' => 'New Product', 'desc' => 'Add to inventory', 'route' => 'cms.products.create', 'bg' => 'white', 'text' => '#1b3b2f'],
            ['label' => 'New Recipe', 'desc' => 'Share a dish', 'route' => 'cms.recipes.create', 'bg' => 'white', 'text' => '#1b3b2f'],
            ['label' => 'New Article', 'desc' => 'Write a story', 'route' => 'cms.news.create', 'bg' => 'white', 'text' => '#1b3b2f'],
            ['label' => 'Asset Vault', 'desc' => 'Manage assets', 'route' => 'cms.media.index', 'bg' => 'white', 'text' => '#1b3b2f'],
        ];
    @endphp

    @foreach($actions as $a)
    <a href="{{ route($a['route']) }}" class="p-10 transition-all duration-500 hover:bg-slate-50 group" style="background-color: {{ $a['bg'] }}">
        <div class="space-y-4">
            <p class="text-[10px] font-bold uppercase tracking-[0.3em] {{ $a['text'] === 'white' ? 'text-white/40' : 'text-slate-400' }} group-hover:text-[#fbbf24] transition-colors">{{ $a['label'] }}</p>
            <p class="text-lg font-serif {{ $a['text'] === 'white' ? 'text-white' : 'text-[#1b3b2f]' }} tracking-tight">{{ $a['desc'] }}</p>
        </div>
    </a>
    @endforeach
</div>
@endsection
