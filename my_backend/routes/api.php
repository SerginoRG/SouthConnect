<?php
// routes/api.php
use App\Http\Controllers\ProduitController;
use Illuminate\Support\Facades\Route;

Route::post('/produits', [ProduitController::class, 'store']); // POST - Ajouter un produit
Route::get('/produits/{categorie}', [ProduitController::class, 'index']); 
Route::get('/produits', [ProduitController::class, 'all']); // GET - Tous les produits
Route::put('/produits/{id}', [ProduitController::class, 'update']); // Modifier un produit
Route::delete('/produits/{id}', [ProduitController::class, 'destroy']); // Supprimer un produit
