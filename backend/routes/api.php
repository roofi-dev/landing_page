<?php

use App\Http\Controllers\Api\MediaController;
use App\Http\Controllers\Api\NewsController;
use App\Http\Controllers\Api\PageSectionController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\RecipeController;
use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Auth
Route::post('/auth/login', [AuthController::class, 'login']);
Route::post('/auth/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');
Route::get('/auth/me', [AuthController::class, 'me'])->middleware('auth:sanctum');

// Public content (no auth needed)
Route::get('/public/content', [PageSectionController::class, 'publicContent']);
Route::get('/public/products', [ProductController::class, 'publicIndex']);
Route::get('/public/products/{slug}', [ProductController::class, 'publicShow']);
Route::get('/public/recipes', [RecipeController::class, 'publicIndex']);
Route::get('/public/recipes/{slug}', [RecipeController::class, 'publicShow']);
Route::get('/public/news', [NewsController::class, 'publicIndex']);
Route::get('/public/news/{slug}', [NewsController::class, 'publicShow']);

// Protected CMS routes
Route::middleware('auth:sanctum')->group(function () {
    // Page Sections
    Route::get('/page-sections', [PageSectionController::class, 'index']);
    Route::get('/page-sections/{key}', [PageSectionController::class, 'show']);
    Route::post('/page-sections', [PageSectionController::class, 'store']);
    Route::put('/page-sections/{id}', [PageSectionController::class, 'update']);
    Route::delete('/page-sections/{id}', [PageSectionController::class, 'destroy']);

    // Products
    Route::get('/products', [ProductController::class, 'index']);
    Route::get('/products/{id}', [ProductController::class, 'show']);
    Route::post('/products', [ProductController::class, 'store']);
    Route::put('/products/{id}', [ProductController::class, 'update']);
    Route::delete('/products/{id}', [ProductController::class, 'destroy']);

    // Recipes
    Route::get('/recipes', [RecipeController::class, 'index']);
    Route::get('/recipes/{id}', [RecipeController::class, 'show']);
    Route::post('/recipes', [RecipeController::class, 'store']);
    Route::put('/recipes/{id}', [RecipeController::class, 'update']);
    Route::delete('/recipes/{id}', [RecipeController::class, 'destroy']);

    // News
    Route::get('/news', [NewsController::class, 'index']);
    Route::get('/news/{id}', [NewsController::class, 'show']);
    Route::post('/news', [NewsController::class, 'store']);
    Route::put('/news/{id}', [NewsController::class, 'update']);
    Route::delete('/news/{id}', [NewsController::class, 'destroy']);

    // Media
    Route::get('/media', [MediaController::class, 'index']);
    Route::post('/media', [MediaController::class, 'store']);
    Route::delete('/media/{id}', [MediaController::class, 'destroy']);
});
