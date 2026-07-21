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
        <form id="uploadForm" action="{{ route('cms.media.store') }}" method="POST" enctype="multipart/form-data">
            @csrf
            <div class="space-y-6">
                <div id="dropZone" class="p-8 border-2 border-dashed border-slate-200 rounded-3xl bg-slate-50/50 text-center group hover:border-[#fbbf24] transition-all relative">
                    <input type="file" name="files[]" id="fileInput" required accept="image/*,video/*" class="hidden" multiple>
                    <label for="fileInput" class="cursor-pointer block">
                        <svg class="w-12 h-12 text-slate-300 mx-auto mb-4 group-hover:text-[#d97706] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                        <p class="text-sm font-bold text-[#052e16] uppercase tracking-wider">Click to Choose</p>
                        <p class="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-2">Max 10MB Assets Only</p>
                    </label>
                </div>
                
                <!-- Preview Container -->
                <div id="previewContainer" class="hidden grid grid-cols-3 gap-4 p-4 bg-slate-50 rounded-3xl border border-slate-100 max-h-60 overflow-y-auto">
                    <!-- Previews will be injected here -->
                </div>

                <button type="submit" id="uploadBtn" class="w-full bg-[#052e16] text-white py-4 rounded-2xl font-black uppercase tracking-[0.2em] text-[11px] hover:bg-[#d97706] hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed">Start Upload</button>
            </div>
        </form>
    </div>
</div>

<!-- Media Grid -->
<div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
    @forelse($media as $item)
        <div id="media-card-{{ $item->id }}" class="bg-white rounded-3xl border border-slate-100 overflow-hidden group hover:shadow-2xl hover:-translate-y-1 transition-all duration-500">
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
                <button onclick="deleteMedia({{ $item->id }}, '{{ $item->name }}')" class="absolute top-3 right-3 w-9 h-9 rounded-full bg-red-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-red-600 transition-all shadow-lg z-10">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                </button>
            </div>
            <div class="p-5">
                <p class="text-[10px] font-bold text-[#052e16] uppercase tracking-wider truncate mb-1">{{ $item->name }}</p>
                <div class="flex items-center justify-between">
                    <p class="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{{ number_format($item->size / 1024, 0) }} KB</p>
                    <span class="text-[9px] font-bold text-slate-300 uppercase tracking-widest">{{ $item->resource_type }}</span>
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
            showToast('Digital Asset URL copied to clipboard.', 'success');
        });
    }

    function deleteMedia(id, name) {
        if (!confirm('Delete "' + name + '" from library and Cloudinary?\nThis action cannot be undone.')) {
            return;
        }

        const card = document.getElementById('media-card-' + id);
        const deleteBtn = card.querySelector('button[onclick*="deleteMedia"]');
        
        deleteBtn.disabled = true;
        deleteBtn.innerHTML = `
            <svg class="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
        `;

        fetch('{{ route('cms.media.index') }}/' + id, {
            method: 'DELETE',
            headers: {
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || document.querySelector('input[name="_token"]')?.value,
                'Accept': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
            },
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                card.style.transition = 'all 0.4s ease';
                card.style.opacity = '0';
                card.style.transform = 'scale(0.8)';
                setTimeout(() => card.remove(), 400);
                showToast(data.message, 'success');
            } else {
                throw new Error(data.message || 'Failed to delete');
            }
        })
        .catch(error => {
            showToast('Failed to delete asset: ' + error.message, 'error');
            deleteBtn.disabled = false;
            deleteBtn.innerHTML = `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>`;
        });
    }

    const fileInput = document.getElementById('fileInput');
    const previewContainer = document.getElementById('previewContainer');
    const uploadBtn = document.getElementById('uploadBtn');
    const dropZone = document.getElementById('dropZone');
    const uploadForm = document.getElementById('uploadForm');

    let selectedFiles = [];

    fileInput.addEventListener('change', handleFileSelect);

    function handleFileSelect(e) {
        const files = Array.from(e.target.files);
        if (files.length > 0) {
            selectedFiles = [...selectedFiles, ...files];
            renderPreviews();
        }
    }

    function renderPreviews() {
        previewContainer.innerHTML = '';
        
        if (selectedFiles.length > 0) {
            previewContainer.classList.remove('hidden');
            
            selectedFiles.forEach((file, index) => {
                const reader = new FileReader();
                const previewItem = document.createElement('div');
                previewItem.className = 'relative aspect-square rounded-xl overflow-hidden bg-white border border-slate-200 group';
                
                reader.onload = (e) => {
                    let previewContent = '';
                    if (file.type.startsWith('image/')) {
                        previewContent = `<img src="${e.target.result}" class="w-full h-full object-cover">`;
                    } else if (file.type.startsWith('video/')) {
                        previewContent = `
                            <div class="w-full h-full flex items-center justify-center bg-slate-900">
                                <svg class="w-8 h-8 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>
                            </div>
                        `;
                    }

                    previewItem.innerHTML = `
                        ${previewContent}
                        <div class="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 p-2">
                            <span class="text-[8px] text-white font-bold uppercase tracking-tighter text-center line-clamp-2">${file.name}</span>
                            <button type="button" onclick="removeFile(${index})" class="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600 transition-colors shadow-lg">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
                            </button>
                        </div>
                    `;
                };
                
                reader.readAsDataURL(file);
                previewContainer.appendChild(previewItem);
            });
        } else {
            previewContainer.classList.add('hidden');
        }
        updateFileInput();
    }

    function removeFile(index) {
        selectedFiles.splice(index, 1);
        renderPreviews();
    }

    function updateFileInput() {
        const dt = new DataTransfer();
        selectedFiles.forEach(file => dt.items.add(file));
        fileInput.files = dt.files;
    }

    uploadForm.addEventListener('submit', function(e) {
        if (selectedFiles.length === 0) {
            e.preventDefault();
            return;
        }

        uploadBtn.disabled = true;
        uploadBtn.innerHTML = `
            <div class="flex items-center justify-center gap-2">
                <svg class="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Uploading Assets...</span>
            </div>
        `;
    });

    // Drag and drop functionality
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, preventDefaults, false);
    });

    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    ['dragenter', 'dragover'].forEach(eventName => {
        dropZone.addEventListener(eventName, () => {
            dropZone.classList.add('border-[#fbbf24]', 'bg-[#fbbf24]/5');
        }, false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, () => {
            dropZone.classList.remove('border-[#fbbf24]', 'bg-[#fbbf24]/5');
        }, false);
    });

    dropZone.addEventListener('drop', (e) => {
        const dt = e.dataTransfer;
        const files = Array.from(dt.files);
        if (files.length > 0) {
            selectedFiles = [...selectedFiles, ...files];
            renderPreviews();
        }
    });
</script>
@endsection
