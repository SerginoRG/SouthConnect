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
    ];
}
