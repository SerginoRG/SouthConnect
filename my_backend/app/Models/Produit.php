<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Produit extends Model
{
    protected $table = 'produits'; // nom de la table

    public $timestamps = false; // car on a annulé les timestamps

    protected $fillable = [
        'title',
        'description',
        'categorie',
        'image_produit',
        'client_id', //  ajout obligatoire
    ];

    // Relation : un produit appartient à un client
    public function client()
    {
        return $this->belongsTo(Client::class, 'client_id', 'id_client');
    }
}
