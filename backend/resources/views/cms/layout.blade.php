<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>@yield('title', 'CMS - Ladang Lima')</title>
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Instrument+Serif:ital@0;1&display=swap" rel="stylesheet">
    <style>
        body { font-family: 'Plus Jakarta Sans', sans-serif; }
        .font-serif { font-family: 'Instrument Serif', serif; }
        .sidebar-link.active { 
            background: linear-gradient(to right, rgba(251, 191, 36, 0.1), transparent); 
            color: #fbbf24; /* amber-400 */
            border-left: 4px solid #fbbf24;
            border-right: none;
            border-radius: 0;
        }
        .sidebar-link.active svg { color: #fbbf24; }
        .sidebar-sublink.active {
            color: #fbbf24;
            background-color: rgba(255, 255, 255, 0.03);
        }
        .custom-scrollbar::-webkit-scrollbar {
            width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
            background: #1b3b2f;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
            background: #2a5340;
            border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: #6b9b7e;
        }

        /* Toast Animations */
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
        .toast-animate-in { animation: slideIn 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards; }
        .toast-animate-out { animation: slideOut 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards; }
    </style>
</head>
<body class="bg-[#F8FAFC] min-h-screen text-[#0f172a]">
    <div class="flex min-h-screen">
        <!-- Toast Container -->
        <div id="toast-container" class="fixed top-8 right-8 z-[100] flex flex-col gap-4 w-full max-w-[400px] pointer-events-none"></div>

        <!-- Sidebar -->
        <aside class="w-72 bg-[#1b3b2f] text-white flex flex-col fixed h-full z-40 shadow-[4px_0_24px_rgba(0,0,0,0.1)]">
            <div class="p-10">
                <div class="flex flex-col items-center gap-4 text-center">
                    <div class="w-20 h-20 bg-white rounded-[2rem] flex items-center justify-center shadow-2xl p-3 transform -rotate-3 hover:rotate-0 transition-transform duration-500">
                        <img src="{{ asset('logo-ladang-lima.png') }}" alt="Ladang Lima Logo" class="w-full h-auto object-contain">
                    </div>
                    <div>
                        <h1 class="text-xl font-black tracking-tight leading-none text-white mt-2">Ladang Lima</h1>
                        <p class="text-[9px] font-black uppercase tracking-[0.3em] text-slate-500 mt-2">Executive Portal</p>
                    </div>
                </div>
            </div>

            <nav class="flex-1 px-4 space-y-1.5 overflow-y-auto custom-scrollbar">
                <p class="px-6 text-[9px] font-black text-slate-600 uppercase tracking-[0.25em] mb-4 mt-6">Core Control</p>
                <a href="{{ route('cms.dashboard') }}" class="sidebar-link {{ request()->routeIs('cms.dashboard') ? 'active' : '' }} flex items-center gap-4 px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-white hover:bg-white/5 transition-all group rounded-xl">
                    <svg class="w-5 h-5 opacity-50 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>
                    Dashboard
                </a>
                
                <a href="{{ route('cms.sections.index') }}" class="sidebar-link {{ request()->routeIs('cms.sections.*') ? 'active' : '' }} flex items-center gap-4 px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-white hover:bg-white/5 transition-all group rounded-xl">
                    <svg class="w-5 h-5 opacity-50 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7"/></svg>
                    Page Content
                </a>

                @if(request()->routeIs('cms.sections.*') || request()->routeIs('cms.dashboard'))
                <div class="mt-2 pb-4 space-y-1 ml-4 border-l border-slate-800">
                    @php
                        $cmsPages = [
                            'home' => 'Home',
                            'about' => 'About Us',
                            'products' => 'Our Products',
                            'recipes' => 'Recipes',
                            'news' => 'News',
                            'contact' => 'Contact Us',
                            'faq' => 'FAQ',
                        ];
                    @endphp
                    @foreach($cmsPages as $key => $label)
                    <a href="{{ route('cms.sections.index', ['page' => $key]) }}" 
                       class="sidebar-sublink block px-10 py-2.5 text-[10px] font-bold uppercase tracking-[0.15em] transition-all {{ (request()->get('page', 'home') === $key && request()->routeIs('cms.sections.*')) ? 'active' : 'text-slate-500 hover:text-slate-200 hover:bg-white/5' }}">
                        {{ $label }}
                    </a>
                    @endforeach
                </div>
                @endif

                <p class="px-6 text-[9px] font-black text-slate-600 uppercase tracking-[0.25em] mt-10 mb-4">Inventory & Assets</p>
                <a href="{{ route('cms.products.index') }}" class="sidebar-link {{ request()->routeIs('cms.products.*') ? 'active' : '' }} flex items-center gap-4 px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-white hover:bg-white/5 transition-all group rounded-xl">
                    <svg class="w-5 h-5 opacity-50 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg>
                    Products
                </a>
                <a href="{{ route('cms.recipes.index') }}" class="sidebar-link {{ request()->routeIs('cms.recipes.*') ? 'active' : '' }} flex items-center gap-4 px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-white hover:bg-white/5 transition-all group rounded-xl">
                    <svg class="w-5 h-5 opacity-50 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>
                    Kitchen Lab
                </a>
                <a href="{{ route('cms.news.index') }}" class="sidebar-link {{ request()->routeIs('cms.news.*') ? 'active' : '' }} flex items-center gap-4 px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-white hover:bg-white/5 transition-all group rounded-xl">
                    <svg class="w-5 h-5 opacity-50 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"/></svg>
                    News & Articles
                </a>
                <a href="{{ route('cms.media.index') }}" class="sidebar-link {{ request()->routeIs('cms.media.*') ? 'active' : '' }} flex items-center gap-4 px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-white hover:bg-white/5 transition-all group rounded-xl">
                    <svg class="w-5 h-5 opacity-50 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                    Asset Vault
                </a>
            </nav>

            <div class="p-8 border-t border-white/10">
                <div class="flex items-center gap-4 mb-6">
                    <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-800 to-[#1b3b2f] flex items-center justify-center text-sm font-black text-white border border-white/10 shadow-xl">
                        {{ strtoupper(substr(auth()->user()->name ?? 'A', 0, 1)) }}
                    </div>
                    <div class="flex-1 min-w-0">
                        <p class="text-xs font-black truncate tracking-widest text-white uppercase">{{ auth()->user()->name ?? 'Administrator' }}</p>
                        <p class="text-[9px] text-slate-500 truncate font-bold mt-0.5 tracking-wider uppercase">{{ auth()->user()->email ?? 'admin@ladanglima.com' }}</p>
                    </div>
                </div>
                <form action="{{ route('cms.logout') }}" method="POST">
                    @csrf
                    <button type="submit" class="w-full text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 hover:text-white border border-white/10 rounded-2xl py-4 transition-all hover:bg-white/5 active:scale-95 hover:border-white/20">Secure Logout</button>
                </form>
            </div>
        </aside>

        <!-- Main Content -->
        <main class="flex-1 ml-72 p-16">
            @yield('content')
        </main>
    </div>

    <script>
        function showToast(message, type = 'success') {
            const container = document.getElementById('toast-container');
            const toast = document.createElement('div');
            
            const bgColor = type === 'success' ? 'bg-[#1b3b2f]' : 'bg-red-900';
            const icon = type === 'success' 
                ? `<svg class="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>`
                : `<svg class="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>`;

            toast.className = `pointer-events-auto flex items-center gap-4 p-5 rounded-[2rem] shadow-2xl border border-white/10 ${bgColor} text-white toast-animate-in min-w-[320px]`;
            toast.innerHTML = `
                <div class="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center flex-shrink-0">
                    ${icon}
                </div>
                <div class="flex-1">
                    <p class="text-[11px] font-black uppercase tracking-[0.2em] text-white/40 mb-0.5">${type.toUpperCase()}</p>
                    <p class="text-sm font-bold tracking-tight">${message}</p>
                </div>
                <button onclick="this.parentElement.remove()" class="p-2 hover:bg-white/10 rounded-full transition-colors opacity-40 hover:opacity-100">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
                </button>
            `;

            container.appendChild(toast);

            // Auto remove after 5 seconds
            setTimeout(() => {
                toast.classList.replace('toast-animate-in', 'toast-animate-out');
                setTimeout(() => toast.remove(), 400);
            }, 5000);
        }

        // Initialize flash messages as toasts
        @if(session('success'))
            showToast("{{ session('success') }}", 'success');
        @endif
        @if(session('error'))
            showToast("{{ session('error') }}", 'error');
        @endif
    </script>
</body>
</html>
</html>
