<?php

namespace App\Http\Controllers;

use App\Models\Client;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ClientController extends Controller
{
    /**
     * Afficher tous les clients
     */
    public function index()
    {
        try {
            $clients = Client::orderBy('created_at', 'desc')->get();
            return response()->json($clients, 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Erreur lors de la récupération des clients',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Créer un nouveau client
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email|unique:clients,email',
            'password' => 'required|min:6',
        ], [
            'email.required' => 'L\'email est obligatoire',
            'email.email' => 'L\'email doit être valide',
            'email.unique' => 'Cet email est déjà utilisé',
            'password.required' => 'Le mot de passe est obligatoire',
            'password.min' => 'Le mot de passe doit contenir au moins 6 caractères',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Erreur de validation',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            $client = Client::create([
                'email' => $request->email,
                'password' => $request->password, // mot de passe en clair
                'statut' => true,
            ]);

            return response()->json([
                'message' => 'Client créé avec succès',
                'client' => $client
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Erreur lors de la création du client',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Afficher un client spécifique
     */
    public function show($id)
    {
        try {
            $client = Client::findOrFail($id);
            return response()->json($client, 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Client non trouvé',
                'error' => $e->getMessage()
            ], 404);
        }
    }

    /**
     * Mettre à jour un client
     */
    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email|unique:clients,email,' . $id . ',id_client',
            'password' => 'nullable|min:6',
            'is_active' => 'boolean',
        ], [
            'email.required' => 'L\'email est obligatoire',
            'email.email' => 'L\'email doit être valide',
            'email.unique' => 'Cet email est déjà utilisé',
            'password.min' => 'Le mot de passe doit contenir au moins 6 caractères',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Erreur de validation',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            $client = Client::findOrFail($id);

            $client->email = $request->email;

            if ($request->filled('password')) {
                $client->password = $request->password; // mot de passe en clair
            }

            if ($request->has('is_active')) {
                $client->statut = $request->is_active;
            }

            $client->save();

            return response()->json([
                'message' => 'Client modifié avec succès',
                'client' => $client
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Erreur lors de la modification du client',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Supprimer un client
     */
    public function destroy($id)
    {
        try {
            $client = Client::findOrFail($id);
            $client->delete();

            return response()->json([
                'message' => 'Client supprimé avec succès'
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Erreur lors de la suppression du client',
                'error' => $e->getMessage()
            ], 500);
        }
    }



    /**
     * Authentifier un client
     */
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $client = Client::where('email', $request->email)->first();

        if (!$client || $client->password !== $request->password) {
            return response()->json(['error' => 'Email ou mot de passe incorrect'], 401);
        }

        // ✅ Retourner les infos du client (plus tard tu pourras générer un token JWT)
        return response()->json([
            'message' => 'Connexion réussie',
            'client' => $client,
        ]);
    }


    
}
