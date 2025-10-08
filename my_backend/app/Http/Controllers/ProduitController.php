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
        $clientId = $request->query('client_id'); // on reçoit l’id du client en paramètre

        if (!$clientId) {
            return response()->json(['error' => 'Client ID manquant'], 400);
        }

        // On récupère uniquement les produits appartenant à ce client
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

        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'categorie' => 'required|string|max:255',
            'image_produit' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        if ($request->hasFile('image_produit')) {
            if ($produit->image_produit) {
                Storage::disk('public')->delete($produit->image_produit);
            }
            $produit->image_produit = $request->file('image_produit')->store('produits', 'public');
        }

        $produit->update([
            'title' => $request->title,
            'description' => $request->description,
            'categorie' => $request->categorie,
        ]);

        return response()->json(['message' => 'Produit modifié avec succès']);
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


    // Récupérer produits par catégorie
   public function indexByCategorie($categorie)
    {
        // Récupérer uniquement les produits dont le client est actif
        $produits = Produit::where('categorie', $categorie)
            ->whereHas('client', function ($query) {
                $query->where('statut', true); // seulement les clients actifs
            })
            ->get();

        return response()->json($produits);
    }


}
