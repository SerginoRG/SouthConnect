<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class Carousel extends Model
{
    protected $table = 'carousel';
    public $timestamps = false;
    
    protected $primaryKey = 'id_carousel'; // ✅ Ajoutez cette ligne
    public $incrementing = true; // ✅ Ajoutez cette ligne
    
    protected $fillable = [
        'titre_carousel',
        'description_carousel',
        'image_carousel',
        'client_id',
        'id_produit',
    ];

    // Relation vers Client
    public function client()
    {
        return $this->belongsTo(Client::class, 'client_id', 'id_client');
    }

    // Relation vers Produit
    public function produit()
    {
        return $this->belongsTo(Produit::class, 'id_produit', 'id_produit');
    }
}