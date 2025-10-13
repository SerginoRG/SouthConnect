<?php

namespace App\Http\Controllers;

use App\Models\Produit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProduitController extends Controller
{
    /**
     * 🔹 Lister les produits d’un client spécifique
     */
    public function index(Request $request)
    {
        $clientId = $request->query('client_id');

        if (!$clientId) {
            return response()->json(['error' => 'Client ID manquant'], 400);
        }

        $produits = Produit::where('client_id', $clientId)->get();

        return response()->json($produits);
    }

    /**
     * 🔹 Ajouter un produit
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'categorie' => 'required|string',
            'client_id' => 'required|integer',
            'image_produit' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
        ]);

        $imagePath = null;
        if ($request->hasFile('image_produit')) {
            $imagePath = $request->file('image_produit')->store('produits', 'public');
        }

        $produit = Produit::create([
            'title' => $validated['title'],
            'description' => $validated['description'],
            'categorie' => $validated['categorie'],
            'client_id' => $validated['client_id'],
            'image_produit' => $imagePath,
        ]);

        return response()->json([
            'message' => 'Produit ajouté avec succès',
            'produit' => $produit
        ]);
    }

    /**
     * 🔹 Mettre à jour un produit
     */
    public function update(Request $request, $id)
    {
        $produit = Produit::findOrFail($id);

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'categorie' => 'required|string',
            'client_id' => 'required|integer',
            'image_produit' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
        ]);

        if ($request->hasFile('image_produit')) {
            if ($produit->image_produit) {
                Storage::disk('public')->delete($produit->image_produit);
            }
            $produit->image_produit = $request->file('image_produit')->store('produits', 'public');
        }

        $produit->update([
            'title' => $validated['title'],
            'description' => $validated['description'],
            'categorie' => $validated['categorie'],
        ]);

        return response()->json(['message' => 'Produit modifié avec succès', 'produit' => $produit]);
    }

    /**
     * 🔹 Supprimer un produit
     */
    public function destroy($id)
    {
        $produit = Produit::findOrFail($id);

        if ($produit->image_produit) {
            Storage::disk('public')->delete($produit->image_produit);
        }

        $produit->delete();

        return response()->json(['message' => 'Produit supprimé avec succès']);
    }

    /**
     * 🔹 Récupérer un produit
     */
    public function show($id)
    {
        $produit = Produit::find($id);
        if (!$produit) return response()->json(['message' => 'Produit non trouvé'], 404);
        return response()->json($produit);
    }

    /**
     * 🔹 Lister les produits par catégorie (site vitrine)
     */
    public function indexByCategorie($categorie)
    {
        $produits = Produit::where('categorie', $categorie)
            ->whereHas('client', function ($query) {
                $query->where('statut', true);
            })->get();

        return response()->json($produits);
    }

    /**
     * 🔹 Lister id et titre uniquement (pour dropdown)
     */
    public function getProduitList(Request $request)
    {
        $clientId = $request->query('client_id');
        if (!$clientId) return response()->json(['error' => 'Client ID manquant'], 400);

        $produits = Produit::where('client_id', $clientId)
            ->select('id_produit', 'title')
            ->get();

        return response()->json($produits);
    }
}
