<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Client extends Model
{
    use HasFactory;

    protected $table = 'clients';
    protected $primaryKey = 'id_client';

    protected $fillable = [
        'email',
        'password',
        'statut',
    ];

    // Ne pas cacher le mot de passe pour l'afficher en clair
    protected $hidden = [];

    protected $casts = [
        'statut' => 'boolean',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];
}