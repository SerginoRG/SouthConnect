<?php
// routes/api.php
use App\Http\Controllers\ProduitController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\ClientController;
use Illuminate\Support\Facades\Route;

Route::post('/produits', [ProduitController::class, 'store']); // POST - Ajouter un produit
Route::get('/produits/{categorie}', [ProduitController::class, 'index']); 
Route::get('/produits', [ProduitController::class, 'all']); // GET - Tous les produits
Route::put('/produits/{id}', [ProduitController::class, 'update']); // Modifier un produit
Route::delete('/produits/{id}', [ProduitController::class, 'destroy']); // Supprimer un produit

// Route Admin
Route::post('/admin/login', [AdminController::class, 'login']);

// Routes Clients
Route::get('/clients', [ClientController::class, 'index']); // GET - Tous les clients
Route::post('/clients', [ClientController::class, 'store']); // POST - Ajouter un client
Route::get('/clients/{id}', [ClientController::class, 'show']); // GET - Un client
Route::put('/clients/{id}', [ClientController::class, 'update']); // PUT - Modifier un client
Route::delete('/clients/{id}', [ClientController::class, 'destroy']); // DELETE - Supprimer un client
Route::post('/client/login', [ClientController::class, 'login']);
