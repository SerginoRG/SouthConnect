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

    
    // Récupérer tous les produits
    public function all()
    {
        $produits = Produit::all();
        return response()->json($produits);
    }
    // Modifier un produit
    public function update(Request $request, $id)
    {
        $produit = Produit::findOrFail($id);

        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'categorie' => 'required|string|max:255',
            'image_produit' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        // Gérer l'image
        if ($request->hasFile('image_produit')) {
            $imagePath = $request->file('image_produit')->store('produits', 'public');
            $produit->image_produit = $imagePath;
        }

        $produit->update([
            'title' => $request->title,
            'description' => $request->description,
            'categorie' => $request->categorie,
        ]);

        return response()->json(['message' => 'Produit modifié avec succès']);
    }

    // Supprimer un produit
    public function destroy($id)
    {
        $produit = Produit::findOrFail($id);
        $produit->delete();

        return response()->json(['message' => 'Produit supprimé avec succès']);
    }




}
