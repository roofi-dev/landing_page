<?php

namespace App\Http\Controllers\Cms;

use App\Http\Controllers\Controller;
use App\Models\PageSection;
use App\Models\Product;
use App\Models\Recipe;
use App\Models\News;
use App\Models\Media;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index()
    {
        $stats = [
            'sections' => PageSection::count(),
            'products' => Product::count(),
            'recipes' => Recipe::count(),
            'news' => News::count(),
            'media' => Media::count(),
            'published_products' => Product::where('status', 'published')->count(),
            'published_recipes' => Recipe::where('status', 'published')->count(),
            'published_news' => News::where('status', 'published')->count(),
        ];

        $recent_products = Product::orderBy('created_at', 'desc')->take(5)->get();
        $recent_recipes = Recipe::orderBy('created_at', 'desc')->take(5)->get();
        $recent_news = News::orderBy('created_at', 'desc')->take(5)->get();

        return view('cms.dashboard', compact('stats', 'recent_products', 'recent_recipes', 'recent_news'));
    }

    public function login()
    {
        return view('cms.login');
    }

    public function authenticate(Request $request)
    {
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required|string',
        ]);

        if (auth()->attempt($credentials, $request->boolean('remember'))) {
            $request->session()->regenerate();
            return redirect()->intended('/cms');
        }

        return back()->withErrors(['email' => 'Invalid credentials'])->withInput();
    }

    public function logout(Request $request)
    {
        auth()->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return redirect('/cms/login');
    }
}
