@extends('cms.layout')

@section('title', 'Edit Section - Ladang Lima CMS')

@section('content')
<div class="mb-10">
    <a href="{{ route('cms.sections.index', ['page' => $section->page]) }}" class="group inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-[#d97706] transition-colors mb-4">
        <svg class="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
        Back to {{ $pages[$section->page] ?? 'Sections' }}
    </a>
    <h1 class="text-4xl font-extrabold text-[#052e16] tracking-tight">{{ $section->title }}</h1>
    <div class="flex items-center gap-3 mt-3">
        <span class="px-3 py-1 bg-[#052e16]/5 text-[#052e16] rounded-full text-[10px] font-bold uppercase tracking-widest border border-[#052e16]/10">
            {{ $pages[$section->page] ?? $section->page }}
        </span>
        <code class="text-[10px] font-bold text-slate-400 font-mono tracking-wider bg-slate-50 px-2 py-1 rounded border border-slate-100">
            {{ $section->section_key }}
        </code>
    </div>
</div>

<form action="{{ route('cms.sections.update', $section->id) }}" method="POST" id="sectionForm">
    @csrf
    @method('PUT')

    @if($errors->any())
    <div class="bg-red-50 border border-red-200 rounded-2xl p-6 mb-8 shadow-sm animate-in fade-in slide-in-from-top-4 duration-300">
        <div class="flex items-center gap-3 mb-2 text-red-800">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            <span class="font-bold text-sm uppercase tracking-wider">Validation Errors</span>
        </div>
        <ul class="text-xs text-red-600 space-y-1 ml-8 list-disc">
            @foreach($errors->all() as $error)
                <li>{{ $error }}</li>
            @endforeach
        </ul>
    </div>
    @endif

    <input type="hidden" name="page" value="{{ $section->page }}">
    <input type="hidden" name="sort_order" value="{{ $section->sort_order }}">

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div class="lg:col-span-2 space-y-8">
            {{-- Content Section --}}
            <div class="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                <div class="px-8 py-6 bg-slate-50/50 border-b border-slate-100 flex items-center justify-between">
                    <div class="flex items-center gap-3">
                        <div class="w-2 h-6 bg-[#fbbf24] rounded-full"></div>
                        <h2 class="font-extrabold text-[#052e16] uppercase tracking-wider text-sm">Content Editor</h2>
                    </div>
                    <span class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Live Preview Enabled</span>
                </div>
                
                <div class="p-8">
                    <div id="content-fields" class="space-y-8">
                        {{-- Dynamic content fields will be rendered by JS --}}
                    </div>
                </div>
            </div>
        </div>

        <div class="space-y-8">
            {{-- Settings Sidebar --}}
            <div class="bg-white rounded-3xl border border-slate-200 shadow-sm p-8 space-y-6 sticky top-8">
                <h3 class="font-extrabold text-[#052e16] uppercase tracking-wider text-xs mb-4">Section Settings</h3>
                
                <div class="space-y-2">
                    <label class="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">Section Title</label>
                    <input type="text" name="title" value="{{ $section->title }}" required
                        class="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-[#052e16] focus:ring-2 focus:ring-[#fbbf24]/20 focus:border-[#fbbf24] outline-none transition-all">
                </div>

                <div class="space-y-2">
                    <label class="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">Display Status</label>
                    <select name="status" class="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-[#052e16] focus:ring-2 focus:ring-[#fbbf24]/20 focus:border-[#fbbf24] outline-none transition-all appearance-none cursor-pointer">
                        <option value="published" {{ $section->status === 'published' ? 'selected' : '' }}>Published (Live)</option>
                        <option value="draft" {{ $section->status === 'draft' ? 'selected' : '' }}>Draft (Hidden)</option>
                    </select>
                </div>

                <div class="pt-6 border-t border-slate-100 space-y-3">
                    <button type="submit" class="w-full bg-[#052e16] text-white px-6 py-4 rounded-2xl font-bold uppercase tracking-[0.2em] text-[11px] hover:bg-[#d97706] hover:shadow-lg hover:shadow-[#d97706]/20 transition-all active:scale-95 flex items-center justify-center gap-2">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"/></svg>
                        Save Section
                    </button>
                    <a href="{{ route('cms.sections.index', ['page' => $section->page]) }}" class="w-full flex items-center justify-center px-6 py-4 border border-slate-200 rounded-2xl font-bold uppercase tracking-[0.2em] text-[11px] text-slate-400 hover:bg-slate-50 transition-all">
                        Discard Changes
                    </a>
                </div>
            </div>
        </div>
    </div>

    <input type="hidden" name="content" id="contentInput">
</form>

<script>
    const sectionContent = @json($section->content);
    const mediaUrl = '{{ route("cms.media.index") }}';

    function detectFieldType(key, value) {
        if (Array.isArray(value)) return 'array';
        if (typeof value === 'object' && value !== null) return 'object';
        if (typeof value === 'string' && (value.startsWith('http://') || value.startsWith('https://')) && (
            value.match(/\.(jpg|jpeg|png|gif|webp|svg)/i) ||
            value.includes('unsplash') ||
            value.includes('cloudinary.com') ||
            value.includes('/image/upload/') ||
            value.includes('/video/upload/')
        )) return 'image';
        if (typeof value === 'string' && value.length > 80) return 'textarea';
        return 'text';
    }

    function renderField(key, value, path = '') {
        const type = detectFieldType(key, value);
        const fieldId = path || key;
        let html = '';

        if (type === 'image') {
            html = `
                <div class="bg-slate-50/50 rounded-2xl p-6 border border-slate-100 group transition-all hover:border-[#fbbf24]/30">
                    <label class="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">${key}</label>
                    <div class="flex items-start gap-6">
                        <div class="relative w-32 h-32 rounded-2xl overflow-hidden shadow-sm border border-white flex-shrink-0">
                            <img src="${value}" alt="${key}" class="w-full h-full object-cover">
                            <div class="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        </div>
                        <div class="flex-1 space-y-4">
                            <div class="relative">
                                <input type="text" data-path="${fieldId}" data-type="image" value="${escapeHtml(value)}"
                                    class="w-full pl-4 pr-12 py-3 bg-white border border-slate-200 rounded-xl text-sm font-medium text-[#052e16] focus:ring-2 focus:ring-[#fbbf24]/20 focus:border-[#fbbf24] outline-none transition-all">
                                <div class="absolute right-4 top-1/2 -translate-y-1/2">
                                    <svg class="w-4 h-4 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                                </div>
                            </div>
                            <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Image URL from Cloudinary or Unsplash</p>
                        </div>
                    </div>
                </div>
            `;
        } else if (type === 'textarea') {
            html = `
                <div class="space-y-3">
                    <label class="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">${key}</label>
                    <textarea data-path="${fieldId}" data-type="textarea" rows="4"
                        class="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-medium text-[#052e16] leading-relaxed focus:ring-2 focus:ring-[#fbbf24]/20 focus:border-[#fbbf24] outline-none transition-all resize-none shadow-inner">${escapeHtml(value)}</textarea>
                </div>
            `;
        } else if (type === 'array') {
            html = `<div class="bg-slate-50/30 rounded-3xl p-8 border border-slate-100">
                <div class="flex items-center justify-between mb-6">
                    <label class="text-[11px] font-black text-[#052e16] uppercase tracking-[0.2em]">${key}</label>
                    <span class="px-2 py-0.5 bg-[#052e16] text-white rounded-md text-[9px] font-bold uppercase tracking-widest">${value.length} Items</span>
                </div>
                <div class="space-y-8">`;
            value.forEach((item, idx) => {
                if (typeof item === 'object' && item !== null) {
                    html += `<div class="relative pl-8 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-slate-200 before:rounded-full space-y-6">
                        <div class="flex items-center gap-2 -ml-8 mb-4">
                            <div class="w-6 h-6 bg-slate-200 rounded-full flex items-center justify-center text-[10px] font-black text-white">${idx + 1}</div>
                        </div>`;
                    Object.keys(item).forEach(subKey => {
                        html += renderField(`${key}[${idx}].${subKey}`, item[subKey], `${fieldId}[${idx}].${subKey}`);
                    });
                    html += `</div>`;
                } else {
                    html += renderField(`${key}[${idx}]`, item, `${fieldId}[${idx}]`);
                }
            });
            html += `</div></div>`;
        } else if (type === 'object') {
            html = `<div class="bg-slate-50/30 rounded-3xl p-8 border border-slate-100 space-y-6">
                <label class="block text-[11px] font-black text-[#052e16] uppercase tracking-[0.2em] mb-4">${key}</label>
                <div class="space-y-6">`;
            Object.keys(value).forEach(subKey => {
                html += renderField(`${key}.${subKey}`, value[subKey], `${fieldId}.${subKey}`);
            });
            html += `</div></div>`;
        } else {
            html = `
                <div class="space-y-3">
                    <label class="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">${key}</label>
                    <input type="text" data-path="${fieldId}" data-type="text" value="${escapeHtml(value)}"
                        class="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-[#052e16] focus:ring-2 focus:ring-[#fbbf24]/20 focus:border-[#fbbf24] outline-none transition-all shadow-inner">
                </div>
            `;
        }
        return html;
    }

    function escapeHtml(str) {
        if (str === null || str === undefined) return '';
        return String(str).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/'/g, '&#39;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }

    function setNestedValue(obj, path, value) {
        const parts = path.replace(/\[(\d+)\]/g, '.$1').split('.');
        let current = obj;
        for (let i = 0; i < parts.length - 1; i++) {
            const part = parts[i];
            if (!current[part]) current[part] = {};
            current = current[part];
        }
        current[parts[parts.length - 1]] = value;
    }

    function buildContentFromForm() {
        const content = JSON.parse(JSON.stringify(sectionContent));
        document.querySelectorAll('[data-path]').forEach(input => {
            const path = input.getAttribute('data-path');
            const value = input.value;
            setNestedValue(content, path, value);
        });
        return content;
    }

    // Render fields
    const container = document.getElementById('content-fields');
    if (sectionContent && typeof sectionContent === 'object') {
        Object.keys(sectionContent).forEach(key => {
            container.innerHTML += renderField(key, sectionContent[key]);
        });
    } else {
        container.innerHTML = '<div class="p-12 text-center bg-slate-50 rounded-3xl border border-dashed border-slate-200"><p class="text-slate-400 text-sm italic font-medium">No content fields defined for this section.</p></div>';
    }

    // On form submit, serialize content
    document.getElementById('sectionForm').addEventListener('submit', function(e) {
        const content = buildContentFromForm();
        document.getElementById('contentInput').value = JSON.stringify(content);
    });
</script>
@endsection
