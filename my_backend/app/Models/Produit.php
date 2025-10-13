<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Produit extends Model
{
    protected $table = 'produits';
    protected $primaryKey = 'id_produit';
    public $timestamps = false;

    protected $fillable = [
        'title',
        'description',
        'categorie',
        'image_produit',
        'client_id',
    ];

    public function client()
    {
        return $this->belongsTo(Client::class, 'client_id', 'id_client');
    }
}

