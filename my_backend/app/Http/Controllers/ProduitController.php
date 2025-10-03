<?php

namespace App\Http\Controllers;

use App\Models\Produit;
use Illuminate\Http\Request;

class ProduitController extends Controller
{
    /**
     * Ajouter un produit.
     */
    public function store(Request $request)
    {
        // Validation simple
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'categorie' => 'required|string|max:255',
            'image_produit' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        // Gérer l'importation de l'image
        $imagePath = null;
        if ($request->hasFile('image_produit')) {
            $imagePath = $request->file('image_produit')->store('produits', 'public');
        }

        // Création du produit
        Produit::create([
            'title' => $request->title,
            'description' => $request->description,
            'categorie' => $request->categorie,
            'image_produit' => $imagePath,
        ]);

        return response()->json([
            'message' => 'Produit ajouté avec succès',
        ], 201);
    }


     // Récupérer produits par catégorie
    public function index($categorie)
    {
        $produits = Produit::where('categorie', $categorie)->get();
        return response()->json($produits);
    }




}
