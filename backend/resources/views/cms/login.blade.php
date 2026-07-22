<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Executive Login - Ladang Lima CMS</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <style>
        body { font-family: 'Plus Jakarta Sans', sans-serif; }
        .glass-card {
            background: rgba(255, 255, 255, 0.98);
            backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.2);
        }
        .bg-pattern {
            background-image: radial-gradient(#1e293b 1px, transparent 1px);
            background-size: 40px 40px;
        }
    </style>
</head>
<body class="min-h-screen bg-[#0f172a] bg-pattern flex items-center justify-center p-6 relative overflow-hidden">
    <!-- Decorative Elements -->
    <div class="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/10 blur-[120px] rounded-full"></div>
    <div class="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-amber-500/5 blur-[120px] rounded-full"></div>

    <div class="w-full max-w-[440px] z-10">
        <div class="text-center mb-10 flex flex-col items-center">
            <div class="w-20 h-20 bg-white rounded-[2rem] flex items-center justify-center shadow-2xl p-4 mb-6 transform -rotate-3 hover:rotate-0 transition-transform duration-500">
                <img src="{{ asset('logo-ladang-lima.png') }}" alt="Logo" class="w-full h-auto object-contain">
            </div>
            <h1 class="text-3xl font-black text-white tracking-tight uppercase">Ladang Lima</h1>
            <p class="text-slate-500 text-[10px] font-black uppercase tracking-[0.4em] mt-3">Executive CMS Portal</p>
        </div>

        <div class="glass-card rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.3)] p-10 lg:p-12 relative overflow-hidden group">
            <div class="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-amber-400 to-amber-600"></div>
            
            <div class="mb-10">
                <h2 class="text-2xl font-black text-[#0f172a] tracking-tight uppercase">Welcome Back</h2>
                <p class="text-slate-400 text-xs font-bold mt-2 uppercase tracking-wider">Access your control center</p>
            </div>

            @if ($errors->any())
                <div class="mb-8 bg-red-50 border border-red-100 text-red-600 rounded-2xl px-5 py-4 text-[11px] font-bold uppercase tracking-wider flex items-center gap-3 animate-pulse">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
                    {{ $errors->first() }}
                </div>
            @endif

            <form action="{{ route('login') }}" method="POST">
                @csrf
                <div class="space-y-6">
                    <div class="space-y-2">
                        <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Identity (Email)</label>
                        <input type="email" name="email" value="{{ old('email') }}" required
                            class="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold text-[#0f172a] focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none transition-all placeholder-slate-300"
                            placeholder="admin@ladanglima.com">
                    </div>
                    <div class="space-y-2">
                        <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Secret Access (Password)</label>
                        <input type="password" name="password" required
                            class="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold text-[#0f172a] focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none transition-all placeholder-slate-300"
                            placeholder="••••••••••••">
                    </div>
                    
                    <div class="flex items-center justify-between py-2">
                        <label class="flex items-center gap-3 cursor-pointer group">
                            <div class="relative">
                                <input type="checkbox" name="remember" class="sr-only peer">
                                <div class="w-9 h-5 bg-slate-200 peer-checked:bg-amber-500 rounded-full transition-all"></div>
                                <div class="absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition-all peer-checked:translate-x-4"></div>
                            </div>
                            <span class="text-[10px] font-black text-slate-400 group-hover:text-slate-600 uppercase tracking-widest transition-colors">Remember Me</span>
                        </label>
                    </div>

                    <button type="submit"
                        class="w-full bg-[#0f172a] text-white py-5 rounded-2xl font-black uppercase tracking-[0.3em] text-[11px] hover:bg-[#1e293b] hover:shadow-2xl hover:shadow-[#0f172a]/20 transition-all active:scale-[0.98] mt-4 flex items-center justify-center gap-3 group">
                        Enter Portal
                        <svg class="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
                    </button>
                </div>
            </form>

            <div class="mt-10 pt-8 border-t border-slate-100">
                <div class="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                    <p class="text-[9px] font-black text-slate-400 text-center uppercase tracking-[0.15em] leading-relaxed">
                        Default Credentials:<br>
                        <span class="text-amber-600">admin@ladanglima.com</span> / <span class="text-amber-600">password123</span>
                    </p>
                </div>
            </div>
        </div>

        <p class="text-center text-slate-500 text-[10px] font-bold uppercase tracking-[0.2em] mt-10">
            &copy; {{ date('Y') }} Ladang Lima. All Rights Reserved.
        </p>
    </div>
</body>
</html>
