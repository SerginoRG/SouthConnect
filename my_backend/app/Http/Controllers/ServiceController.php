<?php
namespace App\Http\Controllers;

use App\Models\Services;  
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;

class ServiceController extends Controller
{
    public function index(Request $request)
    {
        $query = Services::query();
        
        if ($request->has('client_id')) {
            $query->where('client_id', $request->client_id);
        }
        
        if ($request->has('produit_id')) {
            $query->where('id_produit', $request->produit_id);
        }
        
        return response()->json($query->get());
    }

    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'titre_service' => 'required|string|max:255',
                'client_id' => 'required|integer',
                'id_produit' => 'required|integer',
                'image_service' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            ]);

            $path = null;
            if ($request->hasFile('image_service')) {
                $path = $request->file('image_service')->store('services', 'public');
            }

            $service = Services::create([
                'titre_service' => $validated['titre_service'],
                'image_service' => $path,
                'client_id' => $validated['client_id'],
                'id_produit' => $validated['id_produit'],
            ]);

            return response()->json([
                'message' => 'Service ajouté avec succès', 
                'service' => $service
            ], 201);

        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'message' => 'Erreur de validation',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            Log::error('Erreur lors de l\'ajout du service: ' . $e->getMessage());
            return response()->json([
                'message' => 'Erreur lors de l\'ajout du service',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $service = Services::findOrFail($id);

            $validated = $request->validate([
                'titre_service' => 'sometimes|required|string|max:255',
                'image_service' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            ]);

            if ($request->has('titre_service')) {
                $service->titre_service = $validated['titre_service'];
            }

            if ($request->hasFile('image_service')) {
                // Supprimer l'ancienne image
                if ($service->image_service) {
                    Storage::disk('public')->delete($service->image_service);
                }
                $service->image_service = $request->file('image_service')->store('services', 'public');
            }

            $service->save();

            return response()->json([
                'message' => 'Service mis à jour avec succès',
                'service' => $service
            ]);

        } catch (\Exception $e) {
            Log::error('Erreur lors de la mise à jour du service: ' . $e->getMessage());
            return response()->json([
                'message' => 'Erreur lors de la mise à jour',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function destroy($id)
    {
        try {
            $service = Services::findOrFail($id);

            if ($service->image_service) {
                Storage::disk('public')->delete($service->image_service);
            }

            $service->delete();

            return response()->json(['message' => 'Service supprimé avec succès']);

        } catch (\Exception $e) {
            Log::error('Erreur lors de la suppression du service: ' . $e->getMessage());
            return response()->json([
                'message' => 'Erreur lors de la suppression',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}