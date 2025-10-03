<?php
// routes/api.php
use App\Http\Controllers\ProduitController;
use Illuminate\Support\Facades\Route;

Route::post('/produits', [ProduitController::class, 'store']); // POST - Ajouter un produit
Route::get('/produits/{categorie}', [ProduitController::class, 'index']); 
