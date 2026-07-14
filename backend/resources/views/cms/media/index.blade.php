@extends('cms.layout')

@section('title', 'Media Library - Ladang Lima CMS')

@section('content')
<div class="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
    <div>
        <h1 class="text-4xl font-extrabold text-[#052e16] tracking-tight">Media Library</h1>
        <p class="text-slate-500 text-sm mt-2 font-medium">Digital assets and storytelling resources</p>
        <div class="mt-4">
            @if(app(App\Services\CloudinaryService::class)->isConfigured())
                <span class="inline-flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest text-green-600 bg-green-50 px-3 py-1 rounded-full border border-green-100">
                    <span class="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                    Cloudinary Connected
                </span>
            @else
                <span class="inline-flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest text-[#d97706] bg-amber-50 px-3 py-1 rounded-full border border-amber-100">
                    <span class="w-1.5 h-1.5 bg-[#fbbf24] rounded-full"></span>
                    Local Storage Vault
                </span>
            @endif
        </div>
    </div>
    <button onclick="document.getElementById('uploadModal').classList.remove('hidden')"
        class="bg-[#052e16] text-white px-8 py-4 rounded-2xl font-bold uppercase tracking-[0.2em] text-[11px] hover:bg-[#d97706] hover:shadow-lg hover:shadow-[#d97706]/20 transition-all active:scale-95 flex items-center gap-3">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/></svg>
        Upload Asset
    </button>
</div>

<!-- Upload Modal -->
<div id="uploadModal" class="hidden fixed inset-0 bg-[#052e16]/40 backdrop-blur-sm z-50 flex items-center justify-center p-6 animate-in fade-in duration-300">
    <div class="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl border border-white/20 transform scale-100 transition-transform">
        <div class="flex items-center justify-between mb-8">
            <h2 class="text-xl font-black text-[#052e16] uppercase tracking-tight">Upload Asset</h2>
            <button onclick="document.getElementById('uploadModal').classList.add('hidden')" class="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-red-50 hover:text-red-500 transition-all">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
        </div>
        <form action="{{ route('cms.media.store') }}" method="POST" enctype="multipart/form-data">
            @csrf
            <div class="space-y-6">
                <div class="p-8 border-2 border-dashed border-slate-200 rounded-3xl bg-slate-50/50 text-center group hover:border-[#fbbf24] transition-all">
                    <input type="file" name="file" id="fileInput" required accept="image/*,video/*" class="hidden">
                    <label for="fileInput" class="cursor-pointer block">
                        <svg class="w-12 h-12 text-slate-300 mx-auto mb-4 group-hover:text-[#d97706] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                        <p class="text-sm font-bold text-[#052e16] uppercase tracking-wider">Click to Choose</p>
                        <p class="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-2">Max 10MB Assets Only</p>
                    </label>
                </div>
                <button type="submit" class="w-full bg-[#052e16] text-white py-4 rounded-2xl font-black uppercase tracking-[0.2em] text-[11px] hover:bg-[#d97706] hover:shadow-lg transition-all">Start Upload</button>
            </div>
        </form>
    </div>
</div>

<!-- Media Grid -->
<div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
    @forelse($media as $item)
        <div class="bg-white rounded-3xl border border-slate-100 overflow-hidden group hover:shadow-2xl hover:-translate-y-1 transition-all duration-500">
            <div class="aspect-square bg-slate-50 relative overflow-hidden">
                @if(str_starts_with($item->mime_type, 'image/'))
                    <img src="{{ $item->file_url }}" alt="{{ $item->name }}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700">
                @else
                    <div class="w-full h-full flex items-center justify-center text-slate-200">
                        <svg class="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>
                    </div>
                @endif
                
                <div class="absolute inset-0 bg-gradient-to-t from-[#052e16]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <button onclick="copyUrl('{{ $item->file_url }}')" class="w-full text-[9px] font-black uppercase tracking-[0.2em] text-white bg-white/20 backdrop-blur-md py-2 rounded-xl hover:bg-[#fbbf24] hover:text-[#052e16] transition-all">Copy Direct Link</button>
                </div>
            </div>
            <div class="p-5">
                <p class="text-[10px] font-bold text-[#052e16] uppercase tracking-wider truncate mb-1">{{ $item->name }}</p>
                <div class="flex items-center justify-between">
                    <p class="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{{ number_format($item->size / 1024, 0) }} KB</p>
                    <form action="{{ route('cms.media.destroy', $item->id) }}" method="POST" class="inline" onsubmit="return confirm('Evict this asset from library?')">
                        @csrf
                        @method('DELETE')
                        <button type="submit" class="text-[9px] font-black uppercase tracking-[0.2em] text-red-400 hover:text-red-600 transition-colors">Evict</button>
                    </form>
                </div>
            </div>
        </div>
    @empty
        <div class="col-span-full py-32 text-center bg-white rounded-[40px] border border-slate-100 shadow-sm">
            <div class="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-8 border border-dashed border-slate-200">
                <svg class="w-12 h-12 text-slate-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
            </div>
            <h3 class="text-2xl font-black text-[#052e16] mb-2 uppercase tracking-tight">Gallery is Empty</h3>
            <p class="text-slate-400 text-sm font-medium mb-10">Upload images or videos to start building your narrative.</p>
            <button onclick="document.getElementById('uploadModal').classList.remove('hidden')" class="inline-flex items-center gap-2 text-[10px] font-black text-[#d97706] uppercase tracking-[0.2em] hover:gap-3 transition-all">
                Upload Your First Asset
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
            </button>
        </div>
    @endforelse
</div>

<script>
    function copyUrl(url) {
        navigator.clipboard.writeText(url).then(() => {
            alert('Digital Asset URL copied to clipboard.');
        });
    }
</script>
@endsection
