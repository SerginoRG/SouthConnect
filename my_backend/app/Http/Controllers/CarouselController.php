<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Carousel;
use Illuminate\Support\Facades\Storage;

class CarouselController extends Controller
{
    // Liste des carousels filtrés par client et produit
    public function index(Request $request)
    {
        $query = Carousel::query();

        if ($request->has('client_id')) {
            $query->where('client_id', $request->client_id);
        }

        if ($request->has('produit_id')) {
            $query->where('id_produit', $request->produit_id);
        }

        return response()->json($query->get());
    }

    // Création d'un carousel
    public function store(Request $request)
    {
        $validated = $request->validate([
            'titre_carousel' => 'required|string|max:255',
            'description_carousel' => 'required|string',
            'client_id' => 'required|exists:clients,id_client',
            'id_produit' => 'nullable|exists:produits,id_produit', // ✅ Changé de 'required' à 'nullable'
            'image_carousel' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
        ]);

        $imagePath = null;
        if ($request->hasFile('image_carousel')) {
            $imagePath = $request->file('image_carousel')->store('carousels', 'public');
        }

        $carousel = Carousel::create([
            'titre_carousel' => $validated['titre_carousel'],
            'description_carousel' => $validated['description_carousel'],
            'client_id' => $validated['client_id'],
            'id_produit' => $validated['id_produit'] ?? null, // ✅ Ajout de la gestion du null
            'image_carousel' => $imagePath,
        ]);

        return response()->json([
            'message' => 'Carousel créé avec succès',
            'data' => $carousel,
        ], 201);
    }

    // Affichage d'un carousel
    public function show($id)
    {
        $carousel = Carousel::find($id);
        if (!$carousel) return response()->json(['message' => 'Carousel non trouvé'], 404);

        return response()->json($carousel);
    }

    // Mise à jour d'un carousel
    public function update(Request $request, $id)
    {
        $carousel = Carousel::find($id);
        if (!$carousel) return response()->json(['message' => 'Carousel non trouvé'], 404);

        $validated = $request->validate([
            'titre_carousel' => 'sometimes|string|max:255',
            'description_carousel' => 'sometimes|string',
            'client_id' => 'sometimes|exists:clients,id_client',
            'id_produit' => 'sometimes|exists:produits,id_produit',
            'image_carousel' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
        ]);

        if ($request->hasFile('image_carousel')) {
            if ($carousel->image_carousel && Storage::disk('public')->exists($carousel->image_carousel)) {
                Storage::disk('public')->delete($carousel->image_carousel);
            }
            $validated['image_carousel'] = $request->file('image_carousel')->store('carousels', 'public');
        }

        $carousel->update($validated);

        return response()->json([
            'message' => 'Carousel mis à jour avec succès',
            'data' => $carousel,
        ]);
    }

    // Suppression d'un carousel
    public function destroy($id)
    {
        $carousel = Carousel::find($id);
        if (!$carousel) return response()->json(['message' => 'Carousel non trouvé'], 404);

        if ($carousel->image_carousel && Storage::disk('public')->exists($carousel->image_carousel)) {
            Storage::disk('public')->delete($carousel->image_carousel);
        }

        $carousel->delete();

        return response()->json(['message' => 'Carousel supprimé avec succès']);
    }
}
