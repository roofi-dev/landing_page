<?php

use App\Http\Controllers\Cms\DashboardController;
use App\Http\Controllers\Cms\MediaManagementController;
use App\Http\Controllers\Cms\NewsManagementController;
use App\Http\Controllers\Cms\PageSectionManagementController;
use App\Http\Controllers\Cms\ProductManagementController;
use App\Http\Controllers\Cms\RecipeManagementController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return redirect('/cms/login');
});

// CMS Auth
Route::get('/cms/login', [DashboardController::class, 'login'])->name('login');
Route::post('/cms/login', [DashboardController::class, 'authenticate']);
Route::post('/cms/logout', [DashboardController::class, 'logout'])->name('cms.logout');

// CMS Protected Routes
Route::middleware('auth')->prefix('cms')->name('cms.')->group(function () {
    Route::get('/', [DashboardController::class, 'index'])->name('dashboard');

    // Page Sections
    Route::get('/sections', [PageSectionManagementController::class, 'index'])->name('sections.index');
    Route::get('/sections/{id}/edit', [PageSectionManagementController::class, 'edit'])->name('sections.edit');
    Route::put('/sections/{id}', [PageSectionManagementController::class, 'update'])->name('sections.update');

    // Products
    Route::resource('products', ProductManagementController::class)->except(['show']);

    // Recipes
    Route::resource('recipes', RecipeManagementController::class)->except(['show']);

    // News
    Route::resource('news', NewsManagementController::class)->except(['show']);

    // Media
    Route::get('/media', [MediaManagementController::class, 'index'])->name('media.index');
    Route::post('/media', [MediaManagementController::class, 'store'])->name('media.store');
    Route::delete('/media/{id}', [MediaManagementController::class, 'destroy'])->name('media.destroy');
});
