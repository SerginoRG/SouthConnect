<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\ProduitController;
use App\Http\Controllers\CarouselController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Ici toutes les routes API de ton application.
|
*/

// ------------------- ADMIN -------------------
Route::post('/admin/login', [AdminController::class, 'login']);

// ------------------- CLIENTS -------------------
Route::get('/clients', [ClientController::class, 'index']); // GET - Tous les clients
Route::post('/clients', [ClientController::class, 'store']); // POST - Ajouter un client
Route::post('/client/login', [ClientController::class, 'login']); // POST - login client
Route::get('/clients/{id}', [ClientController::class, 'show']); // GET - Un client
Route::put('/clients/{id}', [ClientController::class, 'update']); // PUT - Modifier un client
Route::delete('/clients/{id}', [ClientController::class, 'destroy']); // DELETE - Supprimer un client

// ------------------- PRODUITS -------------------
// ⚠️ Routes SPÉCIFIQUES en premier (avant les routes avec {id})
Route::get('/produits/liste', [ProduitController::class, 'getProduitList']); // GET - id + title pour dropdown
Route::get('/produits/categorie/{categorie}', [ProduitController::class, 'indexByCategorie']); // GET - produits par catégorie

// Routes GÉNÉRIQUES (avec {id} en dernier)
Route::get('/produits', [ProduitController::class, 'index']); // GET - produits filtrés par client_id
Route::post('/produits', [ProduitController::class, 'store']); // POST - ajouter un produit
Route::get('/produits/{id}', [ProduitController::class, 'show']); // GET - afficher un produit
Route::put('/produits/{id}', [ProduitController::class, 'update']); // PUT - modifier un produit
Route::delete('/produits/{id}', [ProduitController::class, 'destroy']); // DELETE - supprimer un produit

// ------------------- CAROUSELS -------------------
// CRUD carousels
Route::get('/carousels', [CarouselController::class, 'index']); // GET - tous ou filtrés
Route::post('/carousels', [CarouselController::class, 'store']); // POST - ajouter un carousel
Route::get('/carousels/{id}', [CarouselController::class, 'show']); // GET - afficher un carousel
Route::put('/carousels/{id}', [CarouselController::class, 'update']); // PUT - modifier un carousel
Route::delete('/carousels/{id}', [CarouselController::class, 'destroy']); // DELETE - supprimer un carousel