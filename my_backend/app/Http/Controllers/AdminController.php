<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AdminController extends Controller
{
    // Authentifier un administrateur
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        // Rechercher l'admin par email
        $admin = DB::table('admins')->where('email', $request->email)->first();

        if (!$admin) {
            return response()->json(['error' => 'Adresse e-mail incorrecte.'], 401);
        }

        // Comparer le mot de passe directement (non crypté)
        if ($request->password !== $admin->password) {
            return response()->json(['error' => 'Mot de passe incorrect.'], 401);
        }

        // Si tout est bon
        return response()->json([
            'message' => 'Connexion réussie',
            'admin' => [
                'id' => $admin->id_admin,
                'email' => $admin->email,
            ],
        ]);
    }
}
